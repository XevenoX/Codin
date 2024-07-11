import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export default function PriceSlider({ priceRange, handlePriceChange }) {
  const [minPrice, maxPrice] = priceRange;

  return (
    <Card>
      <Box sx={{ width: '80%', m: 1 }}>
        <Typography variant="body1">
          Your price is {minPrice}-{maxPrice}
        </Typography>
        <Slider
          getAriaLabel={() => 'Price Range'}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0} // 设置最小值
          max={3000} // 设置最大值
        />
      </Box>
    </Card>
  );
}
