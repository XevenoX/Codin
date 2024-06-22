import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.senFile("./../../frontend/src/pages/Homepage.js");
});

export default router;
