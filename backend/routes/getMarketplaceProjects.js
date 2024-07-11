import express from "express";
import { getDB } from "../db/connection.js";

const router = express.Router();

// Get projects with pagination and sorting
router.get("/projects", async (req, res) => {
  const {
    page = 1,
    limit = 5,
    sort = "",
    search = "",
    minPrice = 0,
    maxPrice = 3000,
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
    const db = getDB(); // 使用 getDB 函数获取数据库连接
    const collection = db.collection("projects");

    // 暂时去掉 project_deadline 过滤
    const query = {
      project_budget: {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      }, // 添加价格区间过滤
    };

    if (search) {
      query.project_name = { $regex: search, $options: "i" }; // 添加搜索条件，忽略大小写
    }

    console.log("Query:", query); // 打印查询条件
    console.log("Sort Criteria:", sortCriteria); // 打印排序条件

    // 获取符合条件的项目
    const projects = await collection.find(query).sort(sortCriteria).toArray();
    console.log("Projects found:", projects.length); // 打印找到的项目数量

    // 计算 applicants_count 字段
    const projectsWithApplicantsCount = projects.map((project) => ({
      ...project,
      applicants_count: project.applicants ? project.applicants.length : 0,
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
    console.error("Failed to fetch projects:", error.message, error.stack);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
