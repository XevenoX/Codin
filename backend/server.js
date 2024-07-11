import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import signUp from "./routes/signUp.js";
import signIn from "./routes/signIn.js";
import signOut from "./routes/signOut.js";
import getMarketplaceProjects from "./routes/getMarketplaceProjects.js";
import createProject from "./routes/createProject.js";
import homepage from "./routes/homepage.js";
import userInfo from "./routes/userInfo.js";
import projectsList from "./routes/projectsList.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./db/connection.js";
import cookieParser from "cookie-parser";



// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// add import& app.use in this file and write the api in /routes/<yourAPI>.jsimport signUp from "./routes/signUp.js";
import getProject from "./routes/getProject.js";
import applyProject from "./routes/applyProject.js";
import updateProject from "./routes/updateProject.js"
import contact from "./routes/contact.js"
import homepage from "./routes/homepage.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB, getDB } from "./db/connection.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });


const PORT = process.env.PORT || 5050;
const app = express();

// Supply static file
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(cors());
// to receive and send out json properly
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
app.use("/signIn", signIn);
app.use("/signOut", signOut);
app.use("/createProject", createProject);
app.use("/userInfo", userInfo);
app.use("/projectsList", projectsList);
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));


// supply static file
app.use(express.static(path.join(__dirname, "../frontend/build")));

// 处理所有未匹配的 GET 请求。请求都返回前端的 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
}); app.use("/signUp", signUp);
app.use("/createProject", createProject);
app.use("/getProject", getProject);
app.use("/applyProject", applyProject);
app.use("/updateProject", updateProject);
app.use("/contact", contact);
app.use("/marketplace", getMarketplaceProjects); // Add this line to use the getMarketplaceProjects route


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
