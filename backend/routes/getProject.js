//JUST FOR TESTING WILLBE REPLAACED, I GUESS

import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();


router.get("/publisher/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ObjectId format");
  }

  try {
    let collection = await db.collection("projects");
    let query = { _id: new ObjectId(id) };
    let project = await collection.findOne(query);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    if (project.applicants && project.applicants.length > 0) {
      collection = await db.collection("users");
      const applicantIds = project.applicants.map(
        (applicant) => new ObjectId(applicant.applicantId)
      );
      query = { _id: { $in: applicantIds } };
      const applicants = await collection.find(query).toArray();

      collection = await db.collection("projects");
      for (let applicant of applicants) {
        let completedProjectsQuery = {
          chosen_applicants: applicant._id,
          project_status: 5,
        };

        let completedProjects = await collection
          .find(completedProjectsQuery)
          .toArray();

        let totalRating = 0;
        let ratingCount = 0;
        for (let completedProject of completedProjects) {
          if (completedProject.developer_rating) {
            totalRating += parseFloat(completedProject.developer_rating);
            ratingCount += 1;
          }
        }

        applicant.averageRating =
          ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : null;
        applicant.ratingCount = ratingCount;
      }

      project.applicants = project.applicants.map((app) => {
        let user = applicants.find(
          (u) => u._id && u._id.toString() === app.applicantId.toString()
        );
        if (user) {
          return {
            ...user,
            motivation: app.motivation,
            apply_time:app.apply_time,
          };
        } else {
          return app;
        }
      });
    }
console.log(project);
    res.status(200).json(project);
  } catch (error) {
    console.error("Failed to fetch project and applicants:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/developer/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ObjectId format");
  }
  try {
    let collection = await db.collection("projects");
    let query = { _id: new ObjectId(id) };
    let project = await collection.findOne(query);
    console.log("project:", project);

    if (!project) {
      return res.status(404).send("Project not found");
    } else {
      //  get publisher
      collection = await db.collection("users");
      // query = {_id: { $in: project.applicants }};
      query = { _id: new ObjectId(project.project_publisher) };
      let publisher = await collection.findOne(query);
      // console.log(publisher);
      project.project_publisher = publisher.name;
      // console.log(publisher.name);
    }

    //get applicants

    //TODO: if (subscription)
    if (project.applicants && project.applicants.length > 0) {
      collection = await db.collection("users");
      // query = {_id: { $in: project.applicants }};
      const applicantIds = project.applicants.map(
        (applicant) => applicant.applicantId
      );
      query = { _id: { $in: applicantIds.map((id) => new ObjectId(id)) } };
      const applicants = await collection.find(query).toArray();

      project.applicants = project.applicants.map((applicant) => {
        const foundApplicant = applicants.find((a) =>
          a._id.equals(applicant.applicantId)
        );
        return {
          ...applicant,
          applicantInfo: foundApplicant,
        };
      });
      // query = { _id: { $in: project.applicants.map(applicantId => new ObjectId(applicantId)) } };
      // const applicants = await collection.find(query).toArray();

      // project.applicants = applicants.length;

      ///TODO: get reviews of each applicants (projects: finished & _id matches)
      // console.log(project);

      // console.log(project);
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Failed to fetch project and applicants:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
