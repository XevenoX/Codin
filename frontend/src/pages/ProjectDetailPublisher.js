import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApplicantsList from "../components/ApplicantsList";
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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CircularProgress } from "@mui/material";
import { format } from 'date-fns';

export default function ProjectDetailPublisher() {
  //Todo: replace by session subscription

  const [testCandidates, setCandidates] = useState([
    {
      id: "Candidate 1",
      rating: 4,
      review: 12,
      motivation: "motivation 1",
    },
    {
      id: "Candidate 2",
      rating: 2,
      review: 4,
      motivation: "motivation 2",
    },
    {
      id: "Candidate 3",
      rating: 1,
      review: 1,
      motivation: "motivation 3",
    },
    {
      id: "Candidate 4",
      rating: 5,
      review: 20,
      motivation: "motivation 4",
    },
  ]);

  // const projectDetails = [
  //   {
  //     id: "Project Name 1",
  //     duration: 4,
  //     deadline: "12.07.2024",
  //     budget: 100,
  //     labels: { "Java": 0, "JavaScript": 1, "react":1 },
  //   },
  // ];
  const { id } = useParams(); //get project id

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // const id = params.id?.toString() || undefined;
      // test project id
      // const id = '667c3472880c0b162d2e1fd9';
      // const id = '6685e158480050cf96708509';
      try {
        // const response = await fetch(
        //   "http://localhost:5050/getProject/${params.id.toString()}"
        // ); 
        const response = await fetch(`http://localhost:5050/getProject/publisher/${id}`);

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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid>
        <Grid>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <ButtonBase>
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Grid>
                <BusinessIcon color="primary" />
              </Grid>
              <Typography noWrap variant="h5">
                {projectDetails.project_name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <ButtonBase>
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Grid>
                <AccessTimeIcon color="primary" />
              </Grid>
              <Typography noWrap variant="h5">
                Duration: {projectDetails.project_duration} Days
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <ButtonBase>
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Grid>
                <HourglassTopIcon color="primary" />
              </Grid>
              <Typography noWrap variant="h5">
                Appliable before: {format(new Date(projectDetails.project_deadline), 'dd/MM/yyyy HH:mm:ss')}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <ButtonBase>
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Grid>
                <BusinessIcon color="primary" />
              </Grid>
              <Typography noWrap variant="h5">
                Budget: €{projectDetails.project_budget}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <ButtonBase>
                <Typography color="grey">[edit]</Typography>
              </ButtonBase>
              <Grid>
                <BusinessIcon color="primary" />
              </Grid>
              <Typography noWrap variant="h5">
                Labels:
              </Typography>
              <Typography noWrap variant="h5">
                {Object.values(projectDetails.project_labels).join(", ")}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <ApplicantsList data={projectDetails.applicants} />

      <Grid>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <ButtonBase>
              <Typography color="grey">[edit]</Typography>
            </ButtonBase>
            <Typography noWrap variant="h5">
              Description
            </Typography>
          </Stack>
          <Typography>{projectDetails.project_description}</Typography>

          <Stack direction="row" spacing={2}>
            <ButtonBase>
              <Typography color="grey">[edit]</Typography>
            </ButtonBase>
            <Typography noWrap variant="h5">
              Skills
            </Typography>
          </Stack>
          <Typography>{projectDetails.project_skills}</Typography>
        </Stack>
      </Grid>
    </Box>
  );
}
