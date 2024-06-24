import express from "express";
// Remember to add this to app.use in server.js
// This will help us connect to the database
import { getDB } from "../db/connection.js";

// Router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      project_name: req.body.projectName,
      position: req.body.projectDescription,
      level: req.body.projectSkills,
    };
    let db = getDB(); // Get the database connection
    let collection = await db.collection("projects");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result); // Correct status code for creation is 201
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    let db = getDB(); // Get the database connection
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.status(200).send(results); // Ensure to set the status before sending the response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

export default router;
