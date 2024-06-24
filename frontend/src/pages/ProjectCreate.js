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
import { FormControl, FormLabel, FormGroup } from "@mui/material";

export default function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [projectApplicationDeadline, setProjectApplicationDeadline] =
    useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectPublisher,setProjectPublisher]= useState("test");
  //default: all labels are unchosen
  const [projectLabels, setProjectLabels] = useState({
    Java: 0,
    JavaScript: 0,
    react: 0,
    NodeJS: 0,
    Python: 0,
    Ruby: 0,
    PHP: 0,
    HTML: 0,
    CSS: 0,
    Angular: 0,
    Vue: 0,
    TypeScript: 0,
    jQuery: 0,
    Bootstrap: 0,
    Sass: 0,
    TailwindCSS: 0,
    Firebase: 0,
    MongoDB: 0,
    MySQL: 0,
    PostgreSQL: 0,
  });

  //   const [projectNameError, setProjectNameError] = useState(false);
  //   const [projectDurationError, setProjectDurationError] = useState(false);
  //   const [projectApplicationDeadlineError, setProjectApplicationDeadlineError] = useState(false);
  //   const [projectBudgetError, setProjectBudgetError] = useState(false);
  //   const [projectDescriptionError, setProjectDescriptionError] = useState(false);
  //   const [projectSkillsError, setProjectSkillsError] = useState(false);
  //   const [projectLabelsError, setProjectLabelsError] = useState(false);

  const publisher = "test"; //replace with user email from props later
  const navigate = useNavigate();
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
        body: JSON.stringify({
          projectName,
          projectDescription,
          projectSkills,
          projectBudget,
          projectApplicationDeadline,
          projectDuration,
          projectPublisher,
          projectLabels: Object.keys(projectLabels).filter(
            (label) => projectLabels[label] === 1
          ),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      navigate("/projectdetail/publisher");
    }
  }
  const handleCheckboxChange = (label) => (event) => {
    setProjectLabels((prevLabels) => ({
      ...prevLabels,
      [label]: event.target.checked ? 1 : 0,
    }));
  };

  return (
    <Container
      component="project-create"
      maxWidth="xl"
      sx={{ width: "75%", margin: "0 auto" }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <Box sx={{ width: "100%", m: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="project-name"
                name="project-name"
                label="Project Name"
                type="project_name"
                variant="filled"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="project-duration"
                label="Duration"
                type="project_duration"
                variant="filled"
                onChange={(e) => setProjectDuration(e.target.value)}
                value={projectDuration}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
                id="project-application-deadline"
                label="Application Deadline"
                type="date"
                variant="filled"
                onChange={(e) => setProjectApplicationDeadline(e.target.value)}
                value={projectApplicationDeadline}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ m: 1 }}
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
          </Grid>
          <Grid item xs={12}>
            <LabelCheckboxList
              projectLabels={projectLabels}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              sx={{ m: 1, width: "25ch" }}
              variant="contained"
              type="submit"
            >
              save and publish
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function LabelCheckboxList({ projectLabels, handleCheckboxChange }) {
  const labelsArray = Object.keys(projectLabels);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Project Labels</FormLabel>
      <FormGroup>
        <Grid container spacing={2}>
          {labelsArray.map((label) => (
            <Grid item xs={3} key={label}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={projectLabels[label] === 1}
                    onChange={handleCheckboxChange(label)}
                    name={label}
                  />
                }
                label={label}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
