import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

// function valuetext(value) {
//   return `${value}°C`;
// }

export default function PriceSlider({ priceRange, handlePriceChange }) {
  // 使用 priceRange 创建显示的文本
  // const valuetext = (value) => {
  //   const [minPrice, maxPrice] = priceRange;
  //   if (value === minPrice) {
  //     return `${minPrice}`;
  //   } else if (value === maxPrice) {
  //     return `${maxPrice}`;
  //   } else {
  //     return `${value}°C`;
  //   }
  // };

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
          //getAriaValueText={valuetext}
        />
      </Box>
    </Card>
  );
}
