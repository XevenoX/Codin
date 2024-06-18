import React from "react";

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
import InputAdornment from '@mui/material/InputAdornment';

export default function ProjectCreate() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          firstname: data.get('firstName'),
          lastname: data.get('lastName'),
          email: data.get('email'),
          password: data.get('password'),
        });
      };


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
    >
      <Grid>
        <TextField
          id="project-name"
          label="Project Name"
          type="name"
          variant="filled"
        />
        <TextField
          id="project-duration"
          label="Duration"
          type="duration"
          variant="filled"
        />
        <TextField
          id="project-application-deadline"
          label="Application Deadline"
          type="deadline"
          variant="filled"
        />
        <TextField
          id="project-budget"
          label="Project Budget"
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          type="budget"
          variant="filled"
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
          type="description"
          defaultValue="Please describe your project in detail!"
          variant="filled"
        />
        <TextField
          id="project-skills-description"
          label="Skills required"
          multiline
          rows={4}
          type="skills"
          defaultValue="Please describe the skills an applicant should bring! Note: You could also mention skills that are not included in our labels"
          variant="filled"
        />
        
      </Grid>
      <Button variant="contained">save and publish</Button>
    </Box>

    // /* </Container> */
  );
}
