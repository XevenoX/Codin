import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import AutoCompleteControlled from './AutoCompleteControlled';
import Button from '@mui/material/Button';

const MarketSearch = () => {
  return (
    <Grid
      container
      className="market-search"
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Grid item sx={{ display: 'flex', alignItems: 'flex-start', mr: 1 }}>
        <AutoCompleteControlled />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '18px', // 把 Button 往下面移一点
          marginRight: '10px',
        }}
      >
        <Button variant="contained">Search</Button>
      </Grid>
    </Grid>
  );
};

export default MarketSearch;
