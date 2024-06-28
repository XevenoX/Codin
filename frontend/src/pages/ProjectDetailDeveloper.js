import React from "react";
import ApplyContactButton from "../components/ApplyContactButton";
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

export default function ProjectDetailDeveloper() {
  const subscription = 1;
  const [projectDetail, setProjectDetail] = useState([]);
  // const subscription = 0;

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const id = "667c3472880c0b162d2e1fd9"; //a test project in database
      try {
        const response = await fetch(
          `http://localhost:5050/getProject/developer/${id}`
        ); // Adjust the URL according to your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjectDetails(data);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!projectDetails) {
    return <Typography>No project details found</Typography>;
  }


  const handleApply = async () => {
    const applicantId = '667c33a8c6d615bee2e0ba0e';
    try {
      let response = await fetch(`http://localhost:5050/applyProject`, {
        
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectDetails._id,
        applicantId: applicantId
       
        }),
      });
      if (response.status === 200) {
        alert('Successfully applied to the project');
        // todo: update local state or refetch project details
      }
    } catch (error) {
      console.error('Error applying to the project:', error);
      alert('Failed to apply to the project');
    }
  };

  

  return (
    // /* replace <AssignmentIcon /> with avatar later */
    <Box
      component="form"
      sx={{
        width: "74%", 
        margin: "0 auto", 
        "& .MuiTextField-root": { 
          m: 1, 
          width: "25ch" 
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid>
        <IconButton aria-label="arrow-back">
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Avatar sx={{ width: 100, height: 100 }} variant="rounded">
              
            </Avatar>
            <Typography noWrap variant="h3">
              {projectDetails.project_name}
            </Typography>
          </Stack>

          <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <BusinessIcon color="primary" />
              <Typography noWrap variant="h5">
                {projectDetails.project_publisher}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="primary" />

              <Typography noWrap variant="h5">
                Duration: {projectDetails.project_duration} Days
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <HourglassTopIcon color="primary" />

              <Typography noWrap variant="h5">
                Applicable before: {projectDetails.project_deadline}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              {projectDetails.project_labels.map((label, index) => (
                <Chip key={index} label={label} />
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            spacing={2}
            mt={2}
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Typography noWrap variant="h3">
              € {projectDetails.project_budget}
            </Typography>

            <Typography noWrap variant="caption" color="grey">
              {projectDetails.applicants} people have applied for the task
            </Typography>
            <Button variant="contained" onClick={handleApply}>Apply Now </Button>
            <Button variant="contained">Contact</Button>
            <Typography noWrap variant="h5" color="black">
              only members! please
            </Typography>
            <Link to={"/subscription"}>
              <Typography noWrap variant="h5" color="red">
                subscribe
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid>
          <Stack direction="column" spacing={2}>
            <Paper elevation={0}>
              <Typography noWrap variant="h5">
                Your Task
              </Typography>
              <Typography sx={{ marginLeft: '2em' }}>
                task details: Use the elevation prop to establish hierarchy
                through the use of shadows. The Paper component's default
                elevation level is 1. The prop accepts values from 0 to 24. The
                higher the number, the further away the Paper appears to be from
                its background.
              </Typography>
            </Paper>
            <Paper elevation={0}>
              <Typography noWrap variant="h5">
                Skills required
              </Typography>
              <Typography sx={{ marginLeft: '2em' }}>
                task details: Use the elevation prop to establish hierarchy
                through the use of shadows. The Paper component's default
                elevation level is 1. The prop accepts values from 0 to 24. The
                higher the number, the further away the Paper appears to be from
                its background.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
