import express from "express";
// remember to add this to app.use in server.js
// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
// This section will help you create a new record.
// const project_posttime =  new Date();
router.post("/", async (req, res) => {
  console.log(req.body);
    try {
      let newDocument = {
        project_name: req.body.projectName,
        project_description: req.body.projectDescription,
        project_skills: req.body.projectSkills,
        project_budget: req.body.projectBudget, 
        project_deadline: req.body.projectApplicationDeadline,
        project_duration: req.body.projectDuration,
        project_publisher:req.body.projectPublisher,
        project_labels:req.body.projectLabels,
        project_status: 1, 
        project_posttime: new Date(),
      };
      let collection = await db.collection("projects");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });
  
// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("projects");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

export default router;