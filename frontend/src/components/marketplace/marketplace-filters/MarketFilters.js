import * as React from 'react';
import Grid from '@mui/material/Grid'; // 确保使用正确的 Grid 组件
import Category from './Category';
import PriceSlider from './PriceSlider';
import DateRange from './DateRange';
import LongSelect from './LongSelect';

const MarketFilters = ({
  category,
  handleSelectCategory,
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
        <Category
          category={category}
          handleSelectCategory={handleSelectCategory}
        />
      </Grid>
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
        <LongSelect />
      </Grid>
    </Grid>
  );
};

export default MarketFilters;
