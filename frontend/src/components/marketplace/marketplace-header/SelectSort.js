import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSort({ onSortChange }) {
  const [criteria, setCriteria] = React.useState('');

  const handleChange = (event) => {
    const newCriteria = event.target.value;
    setCriteria(newCriteria);
    onSortChange(newCriteria);
  };

  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Criteria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={criteria}
          label="Sort by"
          onChange={handleChange}
          sx={{ width: '200px' }}
        >
          <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
          <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
          <MenuItem value="nearestDeadline">Nearest Deadline</MenuItem>
          <MenuItem value="farthestDeadline">Farthest Deadline</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="shortestDuration">Shortest Duration</MenuItem>
          <MenuItem value="longestDuration">Longest Duration</MenuItem>
          <MenuItem value="fewestApplicants">Fewest Applicants</MenuItem>
          <MenuItem value="mostApplicants">Most Applicants</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
