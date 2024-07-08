import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Avatar from "@mui/material/Avatar";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";

import IconButton from "@mui/material/IconButton";
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function ApplyContactButton({ user, projectDetails }) {
  console.log("user:",user.applicantId);
  console.log(projectDetails);

  const handleApply = async () => {
    try {
      let response = await fetch(`http://localhost:5050/applyProject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectDetails._id,
          applicantId: user.applicantId,
        }),
      });
      if (response.status === 200) {
        alert("Successfully applied to the project");
        // update local state or refetch project details
        window.location.reload();
      }
    } catch (error) {
      console.error("Error applying to the project:", error);
      alert("Failed to apply to the project");
    }
  };

  const alreadyApplied = Array.isArray(projectDetails.applicants)
  ? projectDetails.applicants.some(
      (applicant) => applicant.toString() === user.applicantId
    )
  : false;
  console.log("alreadyApplied",alreadyApplied);

  // replace with date later
  if (user.subscription == 1) {

      return (
        <React.Fragment>
          <Typography noWrap variant="caption" color="grey">
            {projectDetails.applicants.length} people have applied for the task
          </Typography>
          <Button
            variant="contained"
            onClick={handleApply}
            disabled={alreadyApplied}
          >
            {alreadyApplied ? "Already Applied" : "Apply Now"}
          </Button>
          <Button variant="contained">Contact</Button>
        </React.Fragment>
      );

    
  } else {
    return (
      <React.Fragment>
        <Typography noWrap variant="caption" color="grey">
          subscribe and see how many people have applied for the task
        </Typography>
        <Button variant="contained" disabled>
          Apply Now{" "}
        </Button>
        <Button variant="contained" disabled>
          Contact
        </Button>
        <Typography noWrap variant="h5" color="black">
          only members! please
        </Typography>
        <Link to={"/subscription"}>
          <Typography noWrap variant="h5" color="red">
            subscribe
          </Typography>
        </Link>
      </React.Fragment>
    );
  }
}
