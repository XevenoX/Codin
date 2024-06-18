import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectSort from './SelectSort';

const MarketSort = () => {
  return (
    <Grid
      container
      className="market-search"
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Grid item sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <Typography variant="body1">Sort by</Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop: '18px', // 把 Button 往下面移一点
          marginRight: '10px',
        }}
      >
        <SelectSort />
      </Grid>
    </Grid>
  );
};

export default MarketSort;
