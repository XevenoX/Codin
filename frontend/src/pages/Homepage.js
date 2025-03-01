import React from 'react';
import { Box } from '@mui/material';
import SignIn from '../components/SignIn';
import TagsScroll from '../components/homepage/TagsScroll';
import ServiceIntroduction from '../components/homepage/ServiceIntroduction';
import FrequentlyAskedQuestions from '../components/homepage/FrequentlyAskedQuestions';
import homepageThemeImage from '../pics/Homepage-Theme.jpg';

const Homepage = ({ onLogin }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${homepageThemeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '60vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: { xs: '80%', sm: '70%', md: '60%' }, mb: 14 }}>
            <SignIn onLogin={onLogin} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ width: { xs: '65%' }, height: 'auto' }}>
            <TagsScroll />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ width: '60%' }}>
            <ServiceIntroduction />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ width: '60%' }}>
            <FrequentlyAskedQuestions />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
