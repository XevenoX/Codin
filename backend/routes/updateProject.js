import express from "express";
// remember to add this to app.use in server.js
// This will help us connect to the database
import { getDB } from "../db/connection.js";

const db = getDB();

// This help convert the id from string to ObjectId for the _id.
import { Double, ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/:id", async (req, res) => {
  const db = getDB();

  try {
    const updates = req.body;
    console.log("updates", updates, new ObjectId(req.params.id));
    //convert to double
    if (updates.project_budget) {
      updates.project_budget = new Double(parseFloat(updates.project_budget));
    }
    const result = await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Project not found" });
    }
    const updatedProject = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.send(updatedProject);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
