// routes/userInfo.js
import express from "express";
const router = express.Router();
import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

// test GET to fetch all users
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    let collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
});

// load user info by email
router.get("/findByEmail", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const db = getDB();
    let collection = await db.collection("users");

    const user = await collection.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal server error");
  }
});

// update publisher info
router.post("/publisherUpdate", async (req, res) => {
  try {
    const {
      email,
      about_us,
      industry,
      website,
      organization_size,
      specialities,
    } = req.body;
    let updatedPublisherInfo = {
      about_us,
      industry,
      website,
      organization_size,
      specialities,
    };
    const db = getDB();
    let collection = await db.collection("users");
    let result = await collection.updateOne(
      { email: email },
      { $set: updatedPublisherInfo }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Record updated successfully" });
    } else {
      res.status(404).send({ message: "Record not found or no changes made" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user information");
  }
});

// update publisher slogan
router.post("/sloganUpdate", async (req, res) => {
  try {
    const { email, slogan } = req.body;
    let updatedslogan = {
      slogan,
    };
    const db = getDB();
    let collection = await db.collection("users");
    let result = await collection.updateOne(
      { email: email },
      { $set: updatedslogan }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Record updated successfully" });
    } else {
      res.status(404).send({ message: "Record not found or no changes made" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user information");
  }
});

// update developer info
router.post("/developerUpdate", async (req, res) => {
  try {
    const { email, website, work_status, location, school, skills } = req.body;
    let updatedDeveloperInfo = {
      website,
      work_status,
      location,
      school,
      skills,
    };
    const db = getDB();
    let collection = await db.collection("users");
    let result = await collection.updateOne(
      { email: email },
      { $set: updatedDeveloperInfo }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Record updated successfully" });
    } else {
      res.status(404).send({ message: "Record not found or no changes made" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user information");
  }
});

//updateAvatar
router.post("/updateAvatar", async (req, res) => {
  try {
    const { email, avatar } = req.body;
    // Decode the base64 image
    let base64Data = avatar.replace(/^data:image\/png;base64,/, "");
    const db = getDB();
    let collection = await db.collection("users");
    let result = await collection.updateOne(
      { email: email },
      { $set: { avatar: base64Data } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Avatar updated successfully" });
    }
    // else {
    //     res.status(404).send({ message: "Record not found or no changes made" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading avatar");
  }
});

//updateBanner
router.post("/updateBanner", async (req, res) => {
  try {
    const { email, banner } = req.body;
    // Decode the base64 image
    let base64Data = banner.replace(/^data:image\/png;base64,/, "");
    const db = getDB();
    let collection = await db.collection("users");
    let result = await collection.updateOne(
      { email: email },
      { $set: { banner: base64Data } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Banner updated successfully" });
    }
    // else {
    //     res.status(404).send({ message: "Record not found or no changes made" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading banner");
  }
});

//get feedbacks
router.get("/feedbacks", async (req, res) => {
  try {
    const rated_for = req.query._id;
    const db = getDB();
    const collection = db.collection("feedbacks");
    const pipeline = [
      {
        $match: {
          rated_for: new ObjectId(rated_for),
        },
      },
      {
        $sort: {
          rated_date: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "rated_by",
          foreignField: "_id",
          as: "raterDetails",
        },
      },
      {
        $unwind: "$raterDetails",
      },
      {
        $project: {
          comment: 1,
          rated_date: 1,
          rating: 1,
          avatar: "$raterDetails.avatar",
          rater_name: "$raterDetails.name",
        },
      },
    ];
    const feedbacks = await collection.aggregate(pipeline).toArray();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).send("Internal server error");
  }
});

//get average rating
router.get("/averageRating", async (req, res) => {
  try {
    const rated_for = req.query._id;
    const db = getDB();
    const collection = db.collection("feedbacks");
    const pipeline = [
      {
        $match: {
          rated_for: new ObjectId(rated_for),
        },
      },
      {
        $group: {
          _id: "$ratedFor",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ];
    const result = await collection.aggregate(pipeline).toArray();
    if (result.length === 0) {
      res.status(200).send({ averageRating: null, totalRatings: 0 });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
