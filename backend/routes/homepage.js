// routes/homepage.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // 可以在这里处理主页数据的 API 请求
  res.json({ message: "This is the homepage data" });
});

export default router;
