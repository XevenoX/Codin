import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import signUp from "./routes/signUp.js";
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
import createProject from "./routes/createProject.js";
import getProject from "./routes/getProject.js";
import applyProject from "./routes/applyProject.js";
import updateProject from "./routes/updateProject.js"
import contact from "./routes/contact.js"

// add import& app.use in this file and write the api in /routes/<yourAPI>.js
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
// to receive and send out json properly
app.use(express.json());
// 使用中间件解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));
// 使用中间件解析 cookie
app.use(cookieParser());

app.use("/", homepage);
app.use("/signUp", signUp);
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
});app.use("/signUp", signUp);
app.use("/createProject", createProject);
app.use("/getProject",getProject);
app.use("/applyProject",applyProject);
app.use("/updateProject",updateProject);
app.use("/contact",contact);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});