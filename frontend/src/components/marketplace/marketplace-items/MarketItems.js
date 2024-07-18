import * as React from 'react';
import Grid from '@mui/material/Grid';
import Overview from './Overview';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const MarketItems = ({ projects }) => {
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
      {projects.length > 0 ? (
        projects.map((project) => (
          <Grid item key={project._id} sx={gridItemStyle}>
            <Overview project={project} />
          </Grid>
        ))
      ) : (
        <Typography variant="h6">No projects found.</Typography>
      )}
    </Grid>
  );
};

export default MarketItems;
