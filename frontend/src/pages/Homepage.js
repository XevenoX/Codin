import React from 'react';
import { Box } from '@mui/material';
import SignIn from '../components/SignIn';
import TagsScroll from '../components/homepage/TagsScroll';
import homepageThemeImage from '../pics/Homepage-Theme.jpg'; // 引入背景图片

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
            height: '60vh', // 你可以根据需要调整高度
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: { xs: '80%', sm: '70%', md: '60%' }, mb: 14 }}>
            <SignIn onLogin={onLogin} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ width: '60%' }}>
            <TagsScroll />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
