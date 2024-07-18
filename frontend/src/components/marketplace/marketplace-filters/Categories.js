import React, { useState } from 'react';
import Card from '@mui/material/Card';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Collapse,
} from '@mui/material';

export default function Categories({
  selectedCategories,
  handleSelectCategories,
}) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const categories = [
    'React',
    'NodeJS',
    'Python',
    'Ruby',
    'PHP',
    'HTML',
    'CSS',
    'Angular',
    'Vue',
    'jQuery',
    'Java',
    'Bootstrap',
    'Sass',
    'TailwindCSS',
    'Firebase',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
  ];

  const initialCategories = categories.slice(0, 5);
  const hiddenCategories = categories.slice(5);

  const handleCheckboxChange = (event) => {
    const value = event.target.value.toLowerCase(); // 确保转换为小写
    handleSelectCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((category) => category !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <Card sx={{ width: '100%' }}>
      <FormControl component="fieldset" sx={{ m: 2 }}>
        <FormLabel component="legend">Category</FormLabel>
        {initialCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat.toLowerCase())}
                onChange={handleCheckboxChange}
                value={cat.toLowerCase()}
              />
            }
            label={cat}
          />
        ))}

        <Collapse in={showAll}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {hiddenCategories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat.toLowerCase())}
                    onChange={handleCheckboxChange}
                    value={cat.toLowerCase()}
                  />
                }
                label={cat}
              />
            ))}
          </Box>
        </Collapse>

        <Button onClick={toggleShowAll} sx={{ mr: 8, pl: 0 }}>
          {showAll ? 'Show Less' : 'Show All'}
        </Button>
      </FormControl>
    </Card>
  );
}
