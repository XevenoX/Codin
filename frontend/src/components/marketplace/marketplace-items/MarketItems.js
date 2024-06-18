import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Overview from './Overview';

const MarketItems = () => {
  const gridItemStyle = { mb: 2, width: '100%' };
  return (
    <Grid
      container
      className="market-item-container"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Grid item sx={gridItemStyle}>
        <Overview />
      </Grid>
      <Grid item sx={gridItemStyle}>
        <Overview />
      </Grid>
      <Grid item sx={gridItemStyle}>
        <Overview />
      </Grid>
      <Grid item sx={gridItemStyle}>
        <Overview />
      </Grid>
    </Grid>
  );
};

export default MarketItems;
