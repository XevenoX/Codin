import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  // delete the cookie which includes JWT
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // expire now
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Signed out successfully" });
});

export default router;
