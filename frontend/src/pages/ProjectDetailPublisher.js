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

export default function ProjectDetailPublisher() {

  const testCandidates = [
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
  ];

  const testProjectDetails = [
    {
      id: "Project Name 1",
      duration: 4,
      deadline: "12.07.2024",
      budget: 100,
    },
  ];

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
                {testProjectDetails[0].id}
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
                Duration: {testProjectDetails[0].duration} Days
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
                Appliable before: {testProjectDetails[0].deadline}
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
                Budget: ${testProjectDetails[0].budget}
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
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid>
        <Grid>
          <Typography noWrap variant="h5">
            Applications
          </Typography>
        </Grid>
        <Stack direction="row" spacing={1}>
          <Typography>Sorted by:</Typography>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="candidate-sorting"
            >
              <MenuItem value={10}>First Applied</MenuItem>
              <MenuItem value={20}>Rating </MenuItem>
              <MenuItem value={30}>Reviews</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>

      <Box>
        <ImageList sx={{ width: "75%", height: 450 }}>
          {testCandidates.map((item) => (
            <ImageListItem key={item.id}>
              <Card sx={{ minWidth: 180 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.id}
                  </Typography>
                  <Rating name="read-only" value={item.rating} readOnly />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.review} Reviews
                  </Typography>
                  <Typography variant="body2">
                    {item.motivation}
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                  <FormControlLabel control={<Checkbox />} />
                </CardContent>
                <CardActions>
                  <Button size="contained">See More</Button>
                </CardActions>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
        <Grid>
          <Button variant="contained">Compare</Button>
          <Button variant="contained">Offer</Button>
        </Grid>
      </Box>

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
          <Typography>Description</Typography>

          <Stack direction="row" spacing={2}>
            <ButtonBase>
              <Typography color="grey">[edit]</Typography>
            </ButtonBase>
            <Typography noWrap variant="h5">
              Skills
            </Typography>
          </Stack>
          <Typography>Skills</Typography>
        </Stack>
      </Grid>
    </Box>
  );
}
