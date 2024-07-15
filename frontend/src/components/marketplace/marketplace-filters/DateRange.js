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
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  return (
    <Card sx={{ width: '100%' }}>
      <Box sx={{ m: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid spacing={2} container sx={{ display: 'flex' }}>
            <Typography sx={{ pl: 1, pt: 1 }} variant="body1">
              Task Start
            </Typography>
            <Grid item>
              <DatePicker
                defaultValue={yesterday}
                disablePast
                value={startDate}
                onChange={handleSelectStartDate}
                required={true}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Grid item>
              <Typography sx={{ pb: 1 }} variant="body1">
                Task End
              </Typography>
              <DatePicker
                defaultValue={yesterday}
                disablePast
                minDate={startDate}
                value={endDate}
                onChange={handleSelectEndDate}
                required={true}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </Card>
  );
}
