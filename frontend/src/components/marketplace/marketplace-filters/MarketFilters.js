import * as React from 'react';
import Grid from '@mui/material/Grid'; // 确保使用正确的 Grid 组件
import PriceSlider from './PriceSlider';
import DateRange from './DateRange';
import Categories from './Categories';

const MarketFilters = ({
  selectedCategories,
  handleSelectCategories,
  priceRange,
  handlePriceChange,
  startDate,
  handleSelectStartDate,
  endDate,
  handleSelectEndDate,
}) => {
  const gridItemStyle = { mb: 2, width: '100%' };

  return (
    <Grid
      container
      className="market-filters-container"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Grid item sx={gridItemStyle}>
        <PriceSlider
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
        />
      </Grid>
      <Grid item sx={gridItemStyle}>
        <DateRange
          startDate={startDate}
          handleSelectStartDate={handleSelectStartDate}
          endDate={endDate}
          handleSelectEndDate={handleSelectEndDate}
        />
      </Grid>
      <Grid item sx={gridItemStyle}>
        <Categories
          selectedCategories={selectedCategories}
          handleSelectCategories={handleSelectCategories}
        />
      </Grid>
    </Grid>
  );
};

export default MarketFilters;
