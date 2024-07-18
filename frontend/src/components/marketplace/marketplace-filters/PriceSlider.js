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
        <Box sx={{ ml: 1 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
            Your price is <br />
            {minPrice}€ - {maxPrice}€:
          </Typography>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Slider
            getAriaLabel={() => 'Price Range'}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0} // 设置最小值
            max={3000} // 设置最大值
          />
        </Box>
      </Box>
    </Card>
  );
}
