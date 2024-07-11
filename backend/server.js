// server.js
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection using Mongoose
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose connected to MongoDB');
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: Date,
  endDate: Date,
});

const Project = mongoose.model('Project', projectSchema);

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
        status: 'Open',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-07-01')
      },
      {
        name: 'Part-time Website Product Assistant (PM Assistant)',
        description: 'Assist with website product management tasks',
        status: 'Awaiting Acceptance',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-08-01')
      },
      {
        name: 'Redesign Frontend UI for Website',
        description: 'Design a new user interface for the website frontend',
        status: 'Completed',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-09-01')
      }
    ];

    await Project.insertMany(sampleProjects);
    res.status(201).json({ message: 'Sample data created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
