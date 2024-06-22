import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, FormLabel } from "@mui/material";

export default function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [projectApplicationDeadline, setProjectApplicationDeadline] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectLabels, setProjectLabels] = useState("");

//   const [projectNameError, setProjectNameError] = useState(false);
//   const [projectDurationError, setProjectDurationError] = useState(false);
//   const [projectApplicationDeadlineError, setProjectApplicationDeadlineError] = useState(false);
//   const [projectBudgetError, setProjectBudgetError] = useState(false);
//   const [projectDescriptionError, setProjectDescriptionError] = useState(false);
//   const [projectSkillsError, setProjectSkillsError] = useState(false);
//   const [projectLabelsError, setProjectLabelsError] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    // const project_detail = { ...form };
    try {
      let response;

        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/createProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({projectName,projectDescription,projectSkills}),
        });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
    //   setForm({ name: "", position: "", level: "" });
    //   navigate("/");
    }
  }

  return (
    // <Container component="main" maxWidth="xs">
    // <CssBaseline />
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <Grid>
          <TextField
            id="project-name"
            name="project-name"
            label="Project Name"
            type="project_name"
            variant="filled"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
          <TextField
            id="project-duration"
            label="Duration"
            type="project_duration"
            variant="filled"
            onChange={(e) => setProjectDuration(e.target.value)}
            value={projectDuration}
          />
          <TextField
            id="project-application-deadline"
            label="Application Deadline"
            type="date"
            variant="filled"
          />
          <TextField
            id="project-budget"
            label="Project Budget"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
            type="project_budget"
            variant="filled"
            onChange={(e) => setProjectBudget(e.target.value)}
            value={projectBudget}
          />
          <TextField
            id="project-labels"
            label="Labels"
            type="labels"
            defaultValue="Please choose keywords of your project!"
            variant="filled"
          />
          <TextField
            id="project-description"
            label="Description"
            multiline
            rows={4}
            type="project_description"
            defaultValue="Please describe your project in detail!"
            variant="filled"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
          />
          <TextField
            id="project-skills-description"
            label="Skills required"
            multiline
            rows={4}
            type="project_skills"
            defaultValue="Please describe the skills an applicant should bring! Note: You could also mention skills that are not included in our labels"
            variant="filled"
            onChange={(e) => setProjectSkills(e.target.value)}
            value={projectSkills}
          />
        </Grid>
        <Button variant="contained" type="submit">
          save and publish
        </Button>
    </Box>

    // /* </Container> */
  );
}
