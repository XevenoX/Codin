import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// 统一制定 Radio CSS
const radioStyles = {
  '& .MuiSvgIcon-root': {
    fontSize: 12,
  },
};

export default function Category({ category, handleSelectCategory }) {
  return (
    <Card sx={{ width: '100%' }}>
      {/* <CardContent>
      </CardContent> */}
      <CardActions>
        <FormControl sx={{ m: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
          <RadioGroup
            // 绑定最终选择值到 reactive variable
            value={category}
            onChange={handleSelectCategory}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="frontend"
            name="radio-buttons-group"
          >
            {['frontend', 'backend', 'AI', 'Other'].map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio sx={radioStyles} />}
                label={value.charAt(0).toUpperCase() + value.slice(1)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardActions>
    </Card>
  );
}
