import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MarketSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <Grid
      container
      className="market-search"
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Grid
        item
        sx={{ display: 'flex', alignItems: 'flex-start', mr: 1, mt: 1 }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300, height: 20 }}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '18px',
          marginRight: '10px',
        }}
      >
        <Button variant="contained" onClick={handleSearchClick}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default MarketSearch;
