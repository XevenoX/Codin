import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email); // 记录登录请求

    // Ensure both email and password are provided
    if (!email || !password) {
      console.log("Email or password not provided"); // 添加日志
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check Password
    const isMatch = await user.checkPassword(password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JSON Web Token (JWT)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Protect against CSRF
      maxAge: 3600000, // 1 hour
    });

    console.log("Login successful for user:", email);

    // Send response without including the token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

export default router;
