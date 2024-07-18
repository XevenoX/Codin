import express from "express";
import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

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
    startDate, // 新增的开始日期
    endDate, // 新增的结束日期
    selectedCategories, // 修改为 selectedCategories
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

    const query = {
      project_budget: {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      },
    };

    if (search) {
      query.project_name = { $regex: search, $options: "i" }; // 添加搜索条件，忽略大小写
    }

    // 添加日期过滤条件
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // 计算项目的开始日期（project_start = project_deadline - project_duration + 1）
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

    // 添加类别过滤条件，使用 $all 和正则表达式忽略大小写
    if (selectedCategories) {
      const categoriesArray = selectedCategories
        .split(",")
        .map((cat) => new RegExp(cat, "i"));
      query.project_labels = { $all: categoriesArray }; // 确保项目包含所有 selectedCategories
    }

    // console.log("Query:", JSON.stringify(query, null, 2)); // 打印查询条件
    // console.log("Sort Criteria:", JSON.stringify(sortCriteria, null, 2)); // 打印排序条件

    // 获取符合条件的项目，并关联发布者信息
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
        }, // 展开数组，保留空值
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
            }, // 使用默认 avatar
            publisher_name: "$publisherDetails.name", // 可选，添加发布者的名字
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
