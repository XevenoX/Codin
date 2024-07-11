import express from "express";
// Remember to add this to app.use in server.js
// This will help us connect to the database
import { getDB } from "../db/connection.js";
import { Double, ObjectId } from "mongodb";

// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you create a new record.
// const project_posttime =  new Date();
router.post("/", async (req, res) => {
  // console.log(req.body);
  const berlinOffset = 2; // Berlin is GMT+2 during daylight saving time
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 6000;
  const berlinTime = new Date(utcTime + berlinOffset * 3600000);
  console.log(req.body.projectPublisher);
  try {
    let newDocument = {
      project_name: req.body.projectName,
      project_description: req.body.projectDescription,
      project_skills: req.body.projectSkills,
      project_budget: new Double(parseFloat(req.body.projectBudget)),
      project_deadline: new Date(req.body.projectApplicationDeadline), //transform
      project_duration: req.body.projectDuration,
      project_publisher: new ObjectId(req.body.projectPublisher),
      project_labels: req.body.projectLabels,
      project_status: 1,
      // project_posttime: req.body.posttime,
      project_posttime: now,
      applicants: req.body.applicants,
      chosen_applicants: req.body.chosen_applicants,
    };
    let collection = await db.collection("projects");
    let result = await collection.insertOne(newDocument);
    res.status(201).json({ id: result.insertedId }); // to get the id of just stored new project
    console.log(result.insertedId);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    let db = getDB(); // Get the database connection
    let collection = await db.collection("projects");
    let results = await collection.find({}).toArray();
    res.status(200).send(results); // Ensure to set the status before sending the response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

export default router;
