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
import AssignmentIcon from "@mui/icons-material/Assignment";
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

export default function ProjectDetailDeveloper() {
  const subscription = 1;
  // const subscription = 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    // /* replace <AssignmentIcon /> with avatar later */
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
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
              <AssignmentIcon />
            </Avatar>
            <Typography noWrap variant="h2">
              Project Name
            </Typography>
          </Stack>

          <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <BusinessIcon color="primary" />
              <Typography noWrap variant="h5">
                Umbrella Corporation
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="primary" />

              <Typography noWrap variant="h5">
                Duration: 5 Days
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <HourglassTopIcon color="primary" />

              <Typography noWrap variant="h5">
                Applicable before: 20/05/2024
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip label="label 1" />
              <Chip label="label 2" />
              <Chip label="label 3" />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={2}
          mt={2} 
          alignItems="center" 
          justifyContent="center" 
          sx={{ height: '100%' }} >
            <Typography noWrap variant="h5">
              Budget
            </Typography>

            <Typography noWrap variant="caption" color="grey">
              3 people have applied for the task
            </Typography>
            <Button variant="contained">Apply Now</Button>
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
              <Typography>
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
              <Typography>
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
