import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();
import { getDB } from "../db/connection.js";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    startDate: Date,
    endDate: Date,
  });
  
  const Project = mongoose.model('Project', projectSchema);
  
  router.get('/', async (req, res) => {
    try {
        const db = getDB();
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;