import express from "express";
import cors from "cors";
import signUp from "./routes/signUp.js";
import createProject from "./routes/createProject.js";
import getProject from "./routes/getProject.js";
import applyProject from "./routes/applyProject.js"

// add import& app.use in this file and write the api in /routes/<yourAPI>.js
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/signUp", signUp);
app.use("/createProject", createProject);
app.use("/getProject",getProject);
app.use("/applyProject",applyProject);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});