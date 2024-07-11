import React, { useState } from 'react';
import Card from '@mui/material/Card';

import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Collapse,
} from '@mui/material';

export default function LongSelect({ category, handleSelectCategory }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const categories = [
    'Frontend',
    'Backend',
    'AI',
    'Data Science',
    'DevOps',
    'Security',
    'UI/UX',
    'Marketing',
    'Sales',
    'Finance',
  ];

  const initialCategories = categories.slice(0, 5);
  const hiddenCategories = categories.slice(5);

  const radioStyles = {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  };

  return (
    <Card sx={{ width: '100%' }}>
      <FormControl component="fieldset" sx={{ m: 2 }}>
        <FormLabel component="legend">Category</FormLabel>
        <RadioGroup value={category} onChange={handleSelectCategory}>
          {initialCategories.map((cat) => (
            <FormControlLabel
              key={cat}
              value={cat.toLowerCase()}
              control={<Radio sx={radioStyles} />}
              label={cat}
            />
          ))}

          <Collapse in={showAll}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {hiddenCategories.map((cat) => (
                <FormControlLabel
                  key={cat}
                  value={cat.toLowerCase()}
                  control={<Radio sx={radioStyles} />}
                  label={cat}
                />
              ))}
            </Box>
          </Collapse>

          <Button onClick={toggleShowAll} sx={{ mr: 8, pl: 0 }}>
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
