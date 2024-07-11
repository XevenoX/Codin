import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Typography from '@mui/material/Typography';
import SelectSort from './SelectSort';

const MarketSort = ({ onSortChange }) => {
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
          marginRight: '10px',
        }}
      >
        <SelectSort onSortChange={onSortChange} />
      </Grid>
    </Grid>
  );
};

export default MarketSort;
