import express from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

const router = express.Router();

// Get projects with pagination and sorting
router.get("/projects", async (req, res) => {
  const { page = 1, limit = 5, sort = "", search = "" } = req.query;

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
    const db = getDB(); // 使用 getDB 函数获取数据库连接
    const collection = db.collection("projects");
    const startDate = new Date("2024-01-01T00:00:00.000Z");

    const query = {
      project_deadline: { $gte: startDate }, // 只返回2024年以来的项目
    };

    if (search) {
      query.project_name = { $regex: search, $options: "i" }; // 添加搜索条件，忽略大小写
    }

    // 获取符合条件的项目
    const projects = await collection.find(query).sort(sortCriteria).toArray();

    // 计算 applicants_count 字段
    const projectsWithApplicantsCount = projects.map((project) => ({
      ...project,
      applicants_count: project.applicants.length,
    }));

    // 根据排序条件进行排序
    if (sort === "fewestApplicants") {
      projectsWithApplicantsCount.sort(
        (a, b) => a.applicants_count - b.applicants_count
      );
    } else if (sort === "mostApplicants") {
      projectsWithApplicantsCount.sort(
        (a, b) => b.applicants_count - a.applicants_count
      );
    }

    // 分页
    const paginatedProjects = projectsWithApplicantsCount.slice(
      (page - 1) * limit,
      page * limit
    );

    const totalProjects = await collection.countDocuments(query);

    res.json({
      projects: paginatedProjects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
