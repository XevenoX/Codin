import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import frontEndPic from '../../pics/Tags/Frontend.png';

const destinations = [
  { name: 'Frontend', image: frontEndPic },
  { name: 'Material UI', image: '/api/placeholder/300/200' },
  { name: 'React', image: '/api/placeholder/300/200' },
  { name: 'MongoDB', image: '/api/placeholder/300/200' },
  { name: 'JavaScript', image: '/api/placeholder/300/200' },
  { name: 'NodeJS', image: '/api/placeholder/300/200' },
  // Add more destinations as needed
];

const TagsScroll = () => {
  const scrollContainerRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      setShowLeftArrow(scrollLeft > 10);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Explore Projects
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        See projects with different technologies
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
              sx={{ width: '150px', height: 'auto', ml: 7 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {destination.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {showLeftArrow && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'action.hover' },
            boxShadow: 2,
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}
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
