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

router.post("/", async (req, res) => {
    try {
      let newDocument = {
        project_name: req.body.projectName,
        position: req.body.projectDescription,
        level: req.body.projectSkills,
      };
      let collection = await db.collection("projects");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });
  


export default router;