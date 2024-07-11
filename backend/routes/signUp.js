import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
    try {
      let newDocument = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        role:req.body.role,
        password:req.body.password
      };
      let collection = await db.collection("users");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });
  


export default router;