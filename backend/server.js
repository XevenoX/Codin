import express from "express";
import cors from "cors";
import signUp from "./routes/signUp.js";
import createProject from "./routes/createProject.js";
import homepage from "./routes/homepage.js";
import dotenv from "dotenv";

// manage and use the enviromental variables in config.env
dotenv.config({ path: "./.env" });

// add import& app.use in this file and write the api in /routes/<yourAPI>.js
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", homepage);
app.use("/signUp", signUp);
app.use("/createProject", createProject);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
