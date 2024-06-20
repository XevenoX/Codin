import express from "express";
import cors from "cors";
import registration from "./routes/register.js";
import createProject from "./routes/createProject.js";

// add import& app.use in this file and write the api in /routes/<yourAPI>.js
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/register", registration);
app.use("/createProject", createProject);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});