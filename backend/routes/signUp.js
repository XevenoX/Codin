import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // 使用 Mongoose 模型创建新用户
    const newUser = new User({ name, email, role, password });

    // 保存新用户，触发 pre-save 钩子来编码密码
    const savedUser = await newUser.save();

    // 生成 JWT
    const token = jwt.sign(
      { _id: savedUser._id, role: savedUser.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // 设置 cookie 并响应新用户（不包括密码）
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ error: messages });
    }

    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

export default router;
