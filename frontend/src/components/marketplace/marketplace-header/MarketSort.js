import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SelectSort from './SelectSort';

const MarketSort = ({ onSortChange }) => {
  return (
    <Grid
      container={true} // 确保 container 为布尔值
      className="market-search"
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Grid item={true} sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <Typography variant="body1">Sort by</Typography>
      </Grid>
      <Grid
        item={true}
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
