import express from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js"; // 修改导入语句

const router = express.Router();

// Get projects with pagination and sorting
router.get("/projects", async (req, res) => {
  const { page = 1, limit = 5, sort = "" } = req.query;

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
  } else if (sort === "fewestApplicants") {
    sortCriteria.applicants_count = 1; // Ascending order (fewest applicants)
  } else if (sort === "mostApplicants") {
    sortCriteria.applicants_count = -1; // Descending order (most applicants)
  }

  try {
    const db = getDB(); // 使用 getDB 函数获取数据库连接
    const collection = await db.collection("projects");
    const projects = await collection
      .find()
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .toArray();

    const totalProjects = await collection.countDocuments();
    res.json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
