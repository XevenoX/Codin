import express from "express";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import { getDB } from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);

  try {
    const db = getDB(); // use getDB() to ensure database is connected

    // res.status(201).json({ message: "new user created" });
    const { first_name, last_name, email, role, password } = req.body;
    // TODO: error handling for missing value

    // test if the user already exists (no need to register again)
    console.log("Checking if user already exists...");
    const userAlreadyExists = await User.findOne({ email });
    console.log("User exists:", userAlreadyExists);
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // add user
    const newUser = {
      first_name,
      last_name,
      email,
      role,
      password,
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newUser);
    res.status(201).json({
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
