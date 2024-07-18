import React from 'react';
import { Box, Container } from '@mui/material';
import SignUpComponent from '../components/SignUpComponent';
import signUpThemeImage from '../pics/SignUp-Theme.jpg'; // 引入背景图片

const SignUp = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${signUpThemeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh', // 设置为全屏高度
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '70%', md: '50%' },
              bgcolor: 'rgba(255, 255, 255, 0.8)', // 设置白色背景，带有透明度
              p: 4, // 内边距
              borderRadius: 2, // 圆角
              boxShadow: 3, // 添加阴影
            }}
          >
            <SignUpComponent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
