import express from "express";
import cors from "cors";
import signUp from "./routes/signUp.js";
import createProject from "./routes/createProject.js";
import homepage from "./routes/homepage.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB, getDB } from "./db/connection.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from config.env file
dotenv.config({ path: path.resolve(__dirname, './config.env') });

console.log('ATLAS_URI:', process.env.ATLAS_URI);
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 5050;
const app = express();

// Supply static file
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure database connection before handling routes
app.use(async (req, res, next) => {
  try {
    if (!getDB()) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

app.use("/", homepage);
app.use("/signUp", signUp);
app.use("/createProject", createProject);

// MongoDB connection using Mongoose
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: Date,
  endDate: Date,
});

const Project = mongoose.model('Project', projectSchema);

// API routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/createSampleData', async (req, res) => {
  try {
    const sampleProjects = [
      {
        name: 'Website Compliance Specialist (Privacy Law)',
        description: 'Ensure website meets all privacy law requirements',
        status: 'In Progress',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-01')
      },
      {
        name: 'Framer Design Mobile Responsiveness Specialist',
        description: 'Optimize designs for mobile responsiveness',
        status: 'Applied',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-07-01')
      }
    ];

    await Project.insertMany(sampleProjects);
    res.status(201).json({ message: 'Sample data created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 处理所有未匹配的 GET 请求。请求都返回前端的 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
