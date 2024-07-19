import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/system/Unstable_Grid';
import TextField from '@mui/material/TextField';

export default function DateRange({
  startDate,
  handleSelectStartDate,
  endDate,
  handleSelectEndDate,
}) {
  return (
    <Card sx={{ width: '100%', bgcolor: '#f0f0f0' }}>
      <Box sx={{ m: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid spacing={2} container sx={{ display: 'flex' }}>
            <Typography sx={{ pl: 1, pt: 1, fontSize: 16, fontWeight: 'bold' }}>
              Task Start
            </Typography>
            <Grid item>
              <DatePicker
                value={dayjs(startDate)}
                onChange={(newValue) => handleSelectStartDate(newValue)}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Typography sx={{ pl: 1, pt: 1, fontSize: 16, fontWeight: 'bold' }}>
              Task End
            </Typography>
            <Grid item>
              <DatePicker
                value={dayjs(endDate)}
                minDate={dayjs(startDate)}
                onChange={(newValue) => handleSelectEndDate(newValue)}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </Card>
  );
}
