import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

import signUp from "./routes/signUp.js";
import signIn from "./routes/signIn.js";
import signOut from "./routes/signOut.js";
import getMarketplaceProjects from "./routes/getMarketplaceProjects.js";
import createProject from "./routes/createProject.js";
import homepage from "./routes/homepage.js";
import userInfo from "./routes/userInfo.js";
import projectsList from "./routes/projectsList.js";
import getProject from "./routes/getProject.js";
import applyProject from "./routes/applyProject.js";
import updateProject from "./routes/updateProject.js";
import contact from "./routes/contact.js";
import { connectDB } from "./db/connection.js";
import projectpage from "./routes/projectpage.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

// Supply static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

// Ensure database connection before handling routes
// app.use(async (req, res, next) => {
//   try {
//     if (!getDB()) {
//       await connectDB();
//     }
//     next();
//   } catch (err) {
//     console.error("Database connection error:", err);
//     res.status(500).json({ error: "Database connection error" });
//   }
// });

// Define routes
app.use("/", homepage);
app.use("/signUp", signUp);
app.use("/signIn", signIn);
app.use("/signOut", signOut);
app.use("/createProject", createProject);
app.use("/userInfo", userInfo);
app.use("/projectsList", projectsList);
app.use("/getProject", getProject);
app.use("/applyProject", applyProject);
app.use("/updateProject", updateProject);
app.use("/contact", contact);
app.use("/marketplace", getMarketplaceProjects);
app.use("/projectpage", projectpage);

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
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
