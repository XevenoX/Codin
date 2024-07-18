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
import { useNavigate } from 'react-router-dom';
import reactPic from '../../pics/Tags/React.png';
import mongodbPic from '../../pics/Tags/mongodb.png';
import pythonPic from '../../pics/Tags/python.png';
import nodeJSPic from '../../pics/Tags/nodejs.png';
import phpPic from '../../pics/Tags/php.png';
import mysqlPic from '../../pics/Tags/sql.png';
import vuePic from '../../pics/Tags/vue.png';

const destinations = [
  { name: 'Python', image: pythonPic },
  { name: 'PHP', image: phpPic },
  { name: 'React', image: reactPic },
  { name: 'MongoDB', image: mongodbPic },
  { name: 'NodeJS', image: nodeJSPic },
  { name: 'MySQL', image: mysqlPic },
  { name: 'Vue', image: vuePic },
  // Add more destinations as needed
];

const TagsScroll = () => {
  const navigate = useNavigate();
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

  const handleCardClick = (name) => {
    navigate(`/marketplace?category=${name}`);
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
          mt: 3,
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
            onClick={() => handleCardClick(destination.name)}
            sx={{
              width: 250,
              mr: 2,
              transition: 'transform 0.3s',
              cursor: 'pointer',
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
              sx={{ width: '80px', height: 'auto', ml: 10 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
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
            top: '60%', // 向下移动 10%
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
            top: '60%', // 向下移动 10%
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
