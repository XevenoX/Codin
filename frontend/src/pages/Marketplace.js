import React, { useState } from 'react';
import PriceSlider from '../components/marketplace/marketplace-filters/PriceSlider';
import { Typography } from '@mui/material';
import Category from '../components/marketplace/marketplace-filters/Category';
// import DateRange from '../components/marketplace/marketplace-filters/DateRange';
import dayjs from 'dayjs';
// import Transitions from '../components/marketplace/LongSelect';
import SortByMenu from '../components/marketplace/SortByMenu';
import MarketHeader from '../components/marketplace/marketplace-header/MarketHeader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MarketFilters from '../components/marketplace/marketplace-filters/MarketFilters';
import MarketItems from '../components/marketplace/marketplace-items/MarketItems';

const MarketPlace = () => {
  // ---------------- Select Price Range ----------------------
  const [priceRange, setPriceRange] = useState([20, 37]);

  const handlePriceChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  // ---------------- Select Task Category ----------------------
  const [category, setCategory] = useState('frontend');

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log(`category: ${category}`);
  };

  // ---------------- Select Date Range ----------------------
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleSelectStartDate = (newValue) => {
    setStartDate(newValue);
    console.log(`start date: ${startDate}`);
  };

  const handleSelectEndDate = (newValue) => {
    setEndDate(newValue);
    console.log(`end date: ${endDate}`);
  };

  return (
    <Box
      className="marketplace"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Box
        className="marketplace-container"
        sx={{
          width: '100%',
          maxWidth: '980px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MarketHeader />
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-left',
              alignItems: 'flex-top',
            }}
          >
            <Grid item xs={12} md={3} className="market-filters">
              {/* <Category
                category={category}
                handleSelectCategory={handleSelectCategory}
              />
              <PriceSlider
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
              /> */}
              {/* <DateRange
                startDate={startDate}
                handleSelectStartDate={handleSelectStartDate}
                endDate={endDate}
                handleSelectEndDate={handleSelectEndDate}
              />
              <Transitions />
              <br />
              <SortByMenu /> */}
              <MarketFilters
                category={category}
                handleSelectCategory={handleSelectCategory}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                startDate={startDate}
                handleSelectStartDate={handleSelectStartDate}
                endDate={endDate}
                handleSelectEndDate={handleSelectEndDate}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              className="market-items"
              sx={{ display: 'flex' }}
            >
              <MarketItems />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MarketPlace;
