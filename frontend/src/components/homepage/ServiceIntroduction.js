import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import developerPic from '../../pics/IntroductionData/Developer.jpg';
import publisherPic from '../../pics/IntroductionData/Publisher.jpg';
import projectTypePic from '../../pics/IntroductionData/Project-Type.jpg';
import paymentPic from '../../pics/IntroductionData/Payment.jpg';

const introductionData = [
  {
    title: 'As Developer',
    description:
      'As an IT developer, you can search for projects you like in the marketplace. After registering and logging in, you can apply for projects from the publishers. You can also edit the content on your homepage to better introduce yourself to others.',
    image: developerPic,
  },
  {
    title: 'As Project Publisher',
    description:
      'As an IT project publisher, you can design your own homepage and post your projects after registering and logging in. On your personal homepage, you can view applicants for your projects, select your preferred candidate, send offers, and make payments, and end the finished tasks.',
    image: publisherPic,
  },
  {
    title: 'Project Type',
    description:
      'As a specialized transaction platform, we focus on being the best intermediary for IT development-related tasks.',
    image: projectTypePic,
  },
  {
    title: 'Payment',
    description:
      'We support quick payments through PayPal. Currently, we do not accept other payment methods.',
    image: paymentPic,
  },
];

const ServiceIntroduction = () => {
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Our Service
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '40px' }}>
        We are an intermediary platform to help publishers and developers of
        IT-development tasks to facilitate communication and agreement.
      </Typography>
      <Grid container spacing={4}>
        {introductionData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceIntroduction;
