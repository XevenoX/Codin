//JUST FOR TESTING WILLBE REPLAACED, I GUESS

import express from "express";

// This will help us connect to the database
import { getDB } from "../db/connection.js";

const db = getDB();

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.post("/", async (req, res) => {
  const db = getDB();

  try {
    console.log(req.body);
    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
