import express from "express";
import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/projects", async (req, res) => {
  const {
    page = 1,
    limit = 5,
    sort = "",
    search = "",
    minPrice = 0,
    maxPrice = 3000,
    startDate,
    endDate,
    selectedCategories,
  } = req.query;

  const sortCriteria = {};
  if (sort === "priceAsc") {
    sortCriteria.project_budget = 1; // Ascending order
  } else if (sort === "priceDesc") {
    sortCriteria.project_budget = -1; // Descending order
  } else if (sort === "nearestDeadline") {
    sortCriteria.project_deadline = 1; // Ascending order (nearest deadline)
  } else if (sort === "farthestDeadline") {
    sortCriteria.project_deadline = -1; // Descending order (farthest deadline)
  } else if (sort === "newest") {
    sortCriteria.project_posttime = -1; // Descending order (newest first)
  } else if (sort === "oldest") {
    sortCriteria.project_posttime = 1; // Ascending order (oldest first)
  } else if (sort === "shortestDuration") {
    sortCriteria.project_duration = 1; // Ascending order (shortest duration)
  } else if (sort === "longestDuration") {
    sortCriteria.project_duration = -1; // Descending order (longest duration)
  }

  try {
    const db = getDB();
    const collection = db.collection("projects");

    const query = {
      project_budget: {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      },
    };

    if (search) {
      query.project_name = { $regex: search, $options: "i" };
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      query.$expr = {
        $and: [
          {
            $gte: [
              {
                $subtract: [
                  { $toDate: "$project_deadline" },
                  {
                    $multiply: [{ $toInt: "$project_duration" }, 86400000],
                  },
                ],
              },
              start,
            ],
          },
          { $lte: [{ $toDate: "$project_deadline" }, end] },
        ],
      };
    }

    if (selectedCategories) {
      const categoriesArray = selectedCategories
        .split(",")
        .map((cat) => new RegExp(cat, "i"));
      query.project_labels = { $all: categoriesArray };
    }

    // console.log("Query:", JSON.stringify(query, null, 2));
    // console.log("Sort Criteria:", JSON.stringify(sortCriteria, null, 2));

    const projects = await collection
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "project_publisher",
            foreignField: "_id",
            as: "publisherDetails",
          },
        },
        {
          $unwind: {
            path: "$publisherDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            project_name: 1,
            project_description: 1,
            project_skills: 1,
            project_posttime: 1,
            project_deadline: 1,
            project_duration: 1,
            project_completetime: 1,
            project_budget: 1,
            project_labels: 1,
            applicants: 1,
            chosen_applicants: 1,
            project_status: 1,
            avatar: {
              $ifNull: ["$publisherDetails.avatar", "default-avatar-url"],
            },
            publisher_name: "$publisherDetails.name",
          },
        },
        { $sort: sortCriteria },
        { $skip: (page - 1) * limit },
        { $limit: parseInt(limit) },
      ])
      .toArray();

    const totalProjects = await collection.countDocuments(query);

    res.json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: parseInt(page),
      totalProjects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error.message, error.stack);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
