//JUST FOR TESTING WILLBE REPLAACED, I GUESS

import express from "express";

// This will help us connect to the database
import { getDB } from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import nodemailer from "nodemailer";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail", //
  auth: {
    user: "codin.services@gmail.com",
    pass: "lqtcvfzylubnrmkm ",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "codin.services@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// This section will help you get a list of all the records.
router.post("/", async (req, res) => {
  const db = getDB();

  try {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.body.publisher_id) };
    let publisher = await collection.findOne(query);
    console.log(publisher.email);
    query = { _id: new ObjectId(req.body.userId) };
    let developer = await collection.findOne(query);
    if (publisher && developer) {
        
        const subject = 'New Project Application Question';
        const text = `You have a new question \n\n ${req.body.message}\n\nPlease reply to: ${developer.email}`;
        await sendEmail(publisher.email, subject, text);
        res.status(200).send({ message: 'Email sent successfully' });
      } else {
        res.status(404).send({ error: 'Publisher or Developer not found' });
      }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
