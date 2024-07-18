import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const introductionData = [
  {
    title: 'As Project Publisher',
    description:
      'We conduct frontier AI research across a variety of modalities, and explore novel and emerging safety research areas from interpretability to RL from human feedback to policy and societal impacts analysis.',
    image: 'path_to_research_image',
  },
  {
    title: 'As Developer',
    description:
      'We think about the impacts of our work and strive to communicate what we’re seeing at the frontier to policymakers and civil society in the US and abroad to help promote safe and reliable AI.',
    image: 'path_to_policy_image',
  },
  {
    title: '',
    description:
      'We translate our research into tangible, practical tools like Claude that benefit businesses, nonprofits and civil society groups and their clients and people around the globe.',
    image: 'path_to_product_image',
  },
  {
    title: 'Payment',
    description:
      'Our people, finance, legal, and recruiting teams are the human engines that make Anthropic go. We’ve had previous careers at NASA, startups, and the armed forces and our diverse experiences help make Anthropic a great place to work (and we love plants!).',
    image: 'path_to_operations_image',
  },
];

const ServiceIntroduction = () => {
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Our Service
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '40px' }}>
        We’re a team of researchers, engineers, policy experts and operational
        leaders, with experience spanning a variety of disciplines, all working
        together to build reliable and understandable AI systems.
      </Typography>
      <Grid container spacing={4}>
        {introductionData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
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
