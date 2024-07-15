import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <Box
      className="navbar"
      sx={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#003580',
      }}
    >
      <Box
        className="navContainer"
        sx={{
          width: '100%',
          maxWidth: '1024px',
          justifyContent: 'space-between',
          display: 'flex',
          direction: 'row',
          alignItems: 'space-between',
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          lamabooking
        </Typography>
        <Box>
          <Button
            className="navButton"
            sx={{
              marginLeft: '20px',
              border: 'none',
              padding: '5px 10px',
              color: '#003580',
              backgroundColor: 'white',
            }}
          >
            Register
          </Button>
          <Button
            className="navButton"
            sx={{
              marginLeft: '20px',
              border: 'none',
              padding: '5px 10px',
              color: '#003580',
              backgroundColor: 'white',
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
