import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const StillOpeningProjects = () => {
  return (
    <Grid container className="still-opening-projects">
      <Grid item container className="still-opening-projects-container">
        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Still Opening Projects
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'light' }}>
            49 projects found
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StillOpeningProjects;
