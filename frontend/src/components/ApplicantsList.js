import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';


const initialOptions = {
  clientId:
    'AQ8p-mKOE6XzJ1tmLS6ItynEuf3_W2kaz85dV4USBvtqjCrT13m-hAGiBJoIDA4c5zgMiGCqg1QtzjO5',
  currency: 'EUR',
  // Add other options as needed
};


export default function ApplicantsList({ data, budget }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('rating'); // set default sorting method
  const [sortOrder, setSortOrder] = useState('desc');
  const [showCompare, setShowCompare] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState(Number(budget) * 1.03);
  const navigate = useNavigate();

  const { id } = useParams(); //get project id
const user={
  _id:"668a5888c8ffc377f5295970",
};
  const handlePayed = async () =>{
    const requestBody = {
      value: offerAmount,
      _id: user._id,
    };
    
    try {
      const response = await fetch(
        `http://localhost:5050/payment/project/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const data = await response.json();

    } catch (error) {
      console.error("Error updating project:", error);
    }

    handleOfferClose();
  };

  const handleSortingChange = (event) => {
    setSortBy(event.target.value);
    if (event.target.value === 'rating') {
      setSortOrder('desc');
    } else {
      setSortOrder('desc');
    }
  };

  const handleCheckboxChange = (event, item) => {
    const itemId = item._id;
    setSelectedItems((prevSelectedItems) =>
      event.target.checked
        ? [...prevSelectedItems, itemId].slice(-3) // limit to 3 items
        : prevSelectedItems.filter((id) => id !== itemId)
    );
  };

  const handleCompare = () => {
    setShowCompare(true);
  };
  const handleOfferOpen = () => {
    console.log('offerAmount', offerAmount);
    // setOfferAmount();
    setOfferOpen(true);
  };

  const handleOfferClose = () => {
    setOfferOpen(false);
  };

  const handleOfferAmountChange = () => {
    setOfferAmount();
  };

  const handleSeeMoreClick = (item) => {
    navigate(`/developerhomepage/${item._id}`);
  };
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'rating') {
      return sortOrder === 'desc'
        ? b.averageRating - a.averageRating
        : a.averageRating - b.averageRating;
    } else if (sortBy === 'reviews') {
      return sortOrder === 'desc'
        ? b.ratingCount - a.ratingCount
        : a.ratingCount - b.ratingCount;
    } else if (sortBy === 'first_applied') {
      // todo : how to sort with date type
      return sortOrder === 'asc'
        ? new Date(b.apply_time) - new Date(a.apply_time)
        : new Date(a.apply_time) - new Date(b.apply_time);
    } else if (sortBy === 'newest') {
      // todo : how to sort with date type
      return sortOrder === 'desc'
        ? new Date(b.apply_time) - new Date(a.apply_time)
        : new Date(a.apply_time) - new Date(b.apply_time);
    }
    // todo: Add more sorting options
    return 0;
  });

  const selectedData = data.filter((item) => selectedItems.includes(item._id));
  const selectedApplicant = selectedData[0];
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
                  value={sortBy || ''}
                  onChange={handleSortingChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Sort By' }}
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
          <ImageList sx={{ width: '75%', height: 450 }}>
            {sortedData.map((item) => (
              <ImageListItem key={item._id}>
                <Card sx={{ minWidth: 180 }}>
                  <CardContent sx={{ width: '100%' }}>
                    <Link to={`/developerhomepage/${item._id}`}>
                      <Typography variant="h5" component="div">
                        {item.name}
                      </Typography>
                    </Link>
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedItems.includes(item._id)}
                          onChange={(e) => handleCheckboxChange(e, item)}
                          value={item._id}
                        />
                      }
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="contained"
                      onClick={() => handleSeeMoreClick(item)}
                    >
                      See More
                    </Button>
                  </CardActions>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
          <Grid>
            <Button
              variant="contained"
              onClick={handleCompare}
              disabled={selectedItems.length === 0 || selectedItems.length > 3}
            >
              Compare
            </Button>
            <Button
              variant="contained"
              onClick={handleOfferOpen}
              disabled={selectedItems.length !== 1}
            >
              Offer
            </Button>
          </Grid>
          {showCompare && (
            <ImageList
              sx={{ width: '75%', height: 450, mt: 2, spacing: 4 }}
              cols={3}
              rowHeight={350}
            >
              {selectedData.map((item) => (
                <ImageListItem key={item._id}>
                  <Card sx={{ backgroundColor: '#e6f2ff' }}>
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
          )}
        </Box>
        <Dialog open={offerOpen} onClose={handleOfferClose}>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to hire {selectedApplicant?.name}? You have to pay{' '}
              {offerAmount} to get to the next stage
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOfferClose}>Cancel</Button>
            <Button onClick={handlePayed}>Submit</Button>
            <PayPalScriptProvider options={initialOptions}>
              <ButtonBehavior />
            </PayPalScriptProvider>
          </DialogActions>
        </Dialog>
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
          sx={{ marginBottom: '20px' }}
        >
          <Grid item>
            <Typography noWrap variant="h5">
              Applications
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid>
          <Typography variant="h5" sx={{ marginLeft: '2em' }}>
            no applicants found
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }
}

function ButtonBehavior({ plans, selectedPlan }) {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  
  const [{ isPending }] = usePayPalScriptReducer();
  // const selectedPlanDetails = plans.find(plan => plan.plan === selectedPlan) || {};
  // console.log(selectedPlanDetails);
  // let sendamount=setAmount(plans, selectedPlan);


  
  // console.log("amount",sendamount);
  const paypalbuttonTransactionProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: '0.01',
            },
          },
        ],
      });
    },
    onApprove(data, actions) {

      return actions.order.capture({}).then((details) => {
        alert(
          'Transaction completed by' +
            (details?.payer.name.given_name ?? 'No details')
        );

        alert('Data details: ' + JSON.stringify(data, null, 2));
      });
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}


