import * as React from 'react';
import Grid from '@mui/material/Grid';
import StillOpeningProjects from './StillOpeningProjects';
import MarketSearch from './MarketSearch';
import MarketSort from './MarketSort';

const MarketHeader = ({ onSortChange, onSearch, totalProjects }) => {
  return (
    <Grid
      container
      className="market-header"
      sx={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        // border: 1,
        mb: 1,
      }}
    >
      <Grid
        item
        container
        className="market-header-container"
        sx={{
          width: '100%',
          maxWidth: '2014px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
        <Grid item>
          <StillOpeningProjects totalProjects={totalProjects} />
        </Grid>
        <Grid item sx={{ marginBottom: '18px' }}>
          <MarketSearch onSearch={onSearch} />
        </Grid>
        <Grid item>
          <MarketSort onSortChange={onSortChange} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MarketHeader;
