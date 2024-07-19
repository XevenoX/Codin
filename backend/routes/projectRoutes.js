import express from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// 获取与用户相关的所有项目
router.get("/all", async (req, res) => {
  const userId = req.query.userId;

  if (!ObjectId.isValid(userId)) {
    console.error("Invalid user ID format:", userId);
    return res.status(400).send("Invalid user ID format");
  }

  try {
    const db = getDB();
    const projects = await db
      .collection("projects")
      .find({
        $or: [
          { project_publisher: new ObjectId(userId) },
          { "applicants.applicantId": new ObjectId(userId) },
          { chosen_applicants: new ObjectId(userId) },
        ],
      })
      .toArray();

    console.log("Projects found for user:", userId, projects);
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: err.message });
  }
});

// 更新项目状态
router.patch("/:id", async (req, res) => {
  const userId = req.body.userId;
  const projectId = req.params.id;
  const newStatus = req.body.project_status;

  if (!ObjectId.isValid(userId) || !ObjectId.isValid(projectId)) {
    console.error("Invalid ID format:", userId, projectId);
    return res.status(400).send("Invalid ID format");
  }

  try {
    const db = getDB();
    const result = await db.collection("projects").updateOne(
      {
        _id: new ObjectId(projectId),
        $or: [
          { project_publisher: new ObjectId(userId) },
          { "applicants.applicantId": new ObjectId(userId) },
        ],
      },
      { $set: { project_status: newStatus } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Project not found or user not authorized");
    }

    const updatedProject = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(projectId) });
    res.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: err.message });
  }
});

// 删除申请者
router.patch("/withdraw/:id", async (req, res) => {
  const projectId = req.params.id;
  const { applicantId } = req.body;

  if (!ObjectId.isValid(applicantId) || !ObjectId.isValid(projectId)) {
    console.error("Invalid ID format:", applicantId, projectId);
    return res.status(400).send("Invalid ID format");
  }

  try {
    const db = getDB();
    const result = await db
      .collection("projects")
      .updateOne(
        { _id: new ObjectId(projectId) },
        { $pull: { applicants: { applicantId: new ObjectId(applicantId) } } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).send("Project not found");
    }

    const updatedProject = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(projectId) });
    res.json(updatedProject);
  } catch (err) {
    console.error("Error withdrawing applicant:", err);
    res.status(500).json({ message: err.message });
  }
});

// 提交评价
router.post("/rate", async (req, res) => {
  const { projectId, rating, comment, rated_by } = req.body;

  if (!ObjectId.isValid(projectId) || !ObjectId.isValid(rated_by)) {
    console.error("Invalid ID format:", projectId, rated_by, rated_for);
    return res.status(400).send("Invalid ID format");
  }

  try {
    const db = getDB();
    let collection = db.collection("projects");
    let query = { _id: new ObjectId(projectId) };
    let project = await collection.findOne(query);
    let rated_for = project.project_publisher;
    if (rated_by === rated_for) {
      rated_for = project.chosen_applicants;
    }
    console.log("rated_for:" + rated_for);

    console.log(project);
    const feedback = {
      project_id: new ObjectId(projectId),
      rated_by: new ObjectId(rated_by),
      rated_for,
      rating,
      comment,
      rated_date: new Date(),
    };
    await db.collection("feedbacks").insertOne(feedback);
    res.json(feedback);
  } catch (err) {
    console.error("Error submitting rating:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
