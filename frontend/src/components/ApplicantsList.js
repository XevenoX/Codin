import React from "react";
import { useState, useEffect } from "react";
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

export default function ApplicantsList({ data }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState("rating"); // set default sorting method
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSortingChange = (event) => {
    setSortBy(event.target.value);
    if (event.target.value === "rating") {
      setSortOrder("desc");
    } else {
      setSortOrder("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "rating") {
      return sortOrder === "desc"
        ? b.averageRating - a.averageRating
        : a.averageRating - b.averageRating;
    }else if (sortBy === "reviews") {
      return sortOrder === "desc"
        ? b.ratingCount - a.ratingCount
        : a.ratingCount - b.ratingCount;
    }
    else if (sortBy === "first_applied") {
      // todo : how to sort with date type
      return sortOrder === "asc"
        ? new Date(b.apply_time) - new Date(a.apply_time)
        : new Date(a.apply_time) - new Date(b.apply_time);
    }else if (sortBy === "newest") {
      // todo : how to sort with date type
      return sortOrder === "desc"
        ? new Date(b.apply_time) - new Date(a.apply_time)
        : new Date(a.apply_time) - new Date(b.apply_time);
    }
    // todo: Add more sorting options 
    return 0;
  });

  if (data.length > 0) {
    return (
      <React.Fragment>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item>
            <Typography noWrap variant="h5">
              Applications
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Sorted by:</Typography>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="candidate-sorting"
                  value={sortBy || ""}
                  onChange={handleSortingChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Sort By" }}
                >
                  <MenuItem value="first_applied">First Applied</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="rating">Rating </MenuItem>
                  <MenuItem value="reviews">Reviews</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <ImageList sx={{ width: "75%", height: 450 }}>
            {sortedData.map((item) => (
              <ImageListItem key={item.id}>
                <Card sx={{ minWidth: 180 }}>
                  <CardContent sx={{ width: "100%" }}>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={parseFloat(item.averageRating)}
                      readOnly
                    />
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.averageRating} average
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.ratingCount} Reviews
                    </Typography>
                    <Typography variant="body2">
                      {item.motivation}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      {item.apply_time}
                      <br />
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
          <ImageList
            sx={{ width: "75%", height: 450, mt: 2, spacing: 4 }}
            cols={3}
            rowHeight={350}
          >
            {data.map((item) => (
              <ImageListItem key={item.id}>
                <Card sx={{ backgroundColor: "#e6f2ff" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>

                    <Typography variant="body2">
                      {item.location}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      {item.school}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      {item.website}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      {item.work_status}
                      <br />
                    </Typography>
                    <Typography variant="body2">
                      {item.skills}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ marginBottom: "20px" }}
        >
          <Grid item>
            <Typography noWrap variant="h5">
              Applications
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid>
          <Typography variant="h5" sx={{ marginLeft: "2em" }}>
            no applicants found
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }
}
