import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();
import { getDB } from "../db/connection.js";

const currentDate = new Date();

// test GET to fetch all projects
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    let collection = await db.collection("projects");
    const projects = await collection.find({}).toArray();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal server error");
  }
});

//get list of publishers ongoing projects
router.get("/byPublisher/ongoing", async (req, res) => {
  const project_publisher = req.query.project_publisher;
  try {
    const db = getDB();
    const collection = db.collection("projects");
    const ongoingProjects = await collection
      .aggregate([
        {
          $match: {
            project_publisher: new ObjectId(project_publisher),
            project_status: { $in: [1] }, // Add more status values as needed
            project_deadline: { $gt: currentDate },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "project_publisher",
            foreignField: "_id",
            as: "publisherDetails",
          },
        },
        {
          $sort: {
            project_posttime: -1,
          },
        },
        {
          $unwind: "$publisherDetails",
        },
        {
          $project: {
            _id: 1,
            project_name: 1,
            project_status: 1,
            project_description: 1,
            project_labels: 1,
            project_budget: 1,
            project_deadline: 1,
            project_posttime: 1,
            project_completetime: 1,
            applicants: 1,
            avatar: "$publisherDetails.avatar",
            publisher_name: "$publisherDetails.name",
          },
        },
      ])
      .toArray();

    res.status(200).json(ongoingProjects);
  } catch (error) {
    console.error("Error fetching ongoing projects:", error);
    res.status(500).send("Internal server error");
  }
});

//get list of developer past projects
router.get("/byDeveloper/past", async (req, res) => {
  const chosen_applicants = req.query.chosen_applicants;
  try {
    const db = getDB();
    const collection = db.collection("projects");
    const pastProjects = await collection
      .aggregate([
        {
          $match: {
            chosen_applicants: new ObjectId(chosen_applicants),
            project_status: { $in: [5] }, // Add more status values as needed
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "project_publisher",
            foreignField: "_id",
            as: "publisherDetails",
          },
        },
        {
          $sort: {
            project_posttime: -1,
          },
        },
        {
          $unwind: "$publisherDetails",
        },
        {
          $project: {
            _id: 1,
            project_name: 1,
            project_status: 1,
            project_description: 1,
            project_labels: 1,
            project_budget: 1,
            project_deadline: 1,
            project_posttime: 1,
            project_completetime: 1,
            applicants: 1,
            avatar: "$publisherDetails.avatar",
            publisher_name: "$publisherDetails.name",
          },
        },
      ])
      .toArray();
    res.status(200).json(pastProjects);
  } catch (error) {
    console.error("Error fetching past projects:", error);
    res.status(500).send("Internal server error");
  }





  //   const pastProjects = await collection
  //     .find({
  //       chosen_applicants: new ObjectId(chosen_applicants),
  //       project_status: { $in: [5] }, // contain more items to also select projects in other status
  //     })
  //     .sort({ project_completetime: -1 })
  //     .toArray();
  //   res.status(200).json(pastProjects);
  // } catch (error) {
  //   console.error("Error fetching ongoing projects:", error);
  //   res.status(500).send("Internal server error");
  // }
});

export default router;
