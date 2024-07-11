import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const destinations = [
  { name: 'Berlin', properties: 1750, image: '/api/placeholder/300/200' },
  { name: 'Hamburg', properties: 724, image: '/api/placeholder/300/200' },
  { name: 'Munich', properties: 719, image: '/api/placeholder/300/200' },
  { name: 'Baltic Sea', properties: 25021, image: '/api/placeholder/300/200' },
  { name: 'Cologne', properties: 757, image: '/api/placeholder/300/200' },
  { name: 'Dresden', properties: 561, image: '/api/placeholder/300/200' },
  // Add more destinations as needed
];

const TagsScroll = () => {
  const scrollContainerRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Explore Germany
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        These popular destinations have a lot to offer
      </Typography>
      <Box
        ref={scrollContainerRef}
        onScroll={handleScroll}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '& > *': {
            flexShrink: 0,
          },
        }}
      >
        {destinations.map((destination, index) => (
          <Card
            key={index}
            component="a"
            href={`/marketplace?destination=${destination.name}`}
            sx={{
              width: 250,
              mr: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={destination.image}
              alt={destination.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {destination.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {destination.properties} properties
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {showRightArrow && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'action.hover' },
            boxShadow: 2,
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};

export default TagsScroll;
