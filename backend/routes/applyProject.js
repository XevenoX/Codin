import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.patch("/", async (req, res) => {
  if (!ObjectId.isValid(req.body.projectId) || !ObjectId.isValid(req.body.applicantId)) {
    return res.status(400).send("Invalid ObjectId format");
  }
//   console.log(req.body);

  try {
    let collection = await db.collection("projects");
    let query = { _id: new ObjectId(req.body.projectId) };
    let project = await collection.findOne(query);
    console.log(project);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    if (
      project.applicants &&
      project.applicants.includes(req.body.applicantId)
    ) {
      return res.status(400).send("Applicant has already applied");
    } else {
      project.applicants = project.applicants;
      project.applicants.push(new ObjectId(req.body.applicantId));
      console.log(project.applicants);
      const updates = {
        $set: {
          applicants: project.applicants,
        },
      };
      collection = await db.collection("projects");
      query = { _id: new ObjectId(req.body.projectId) };
      let result = await collection.updateOne(query, updates);
      return res.status(200).send("Applicant added successfully");
    }

    
  } catch (error) {
    console.error("Error applying to project:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
