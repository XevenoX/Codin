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

export default function ApplicationList({data})  {

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
              >
                <MenuItem value={10}>First Applied</MenuItem>
                <MenuItem value={20}>Rating </MenuItem>
                <MenuItem value={30}>Reviews</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      <Box>
        <ImageList sx={{ width: "75%", height: 450 }}>
          {data.map((item) => (
            <ImageListItem key={item.id}>
              <Card sx={{ minWidth: 180 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
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
    </React.Fragment>
  );
};



