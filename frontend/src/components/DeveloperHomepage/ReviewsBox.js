import React, { useState } from 'react';
import { Box, Typography, Rating, Stack, Divider } from '@mui/material';
import ReviewsTab from '../PublisherHomepage/Tab/ReviewsTab';

const ReviewsBox = () => {
    return (
        <div>
            <Box sx={{ position: 'sticky', background: 'white', top: 0, zIndex: 3 }}>
                <Stack direction="row" spacing={4} alignItems="center" sx={{ padding: '0px 20px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: 20 }}>Customer Reviews</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: 30, color: 'blue' }}>4.5</Typography>
                        <Rating value={4.5} readOnly />
                        <Typography variant="body2">(136)</Typography>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ padding: '1px 10px', m: '10px', overflowY: 'auto' }}>
                <ReviewsTab style='compact' />
            </Box>
        </div >
    );
};

export default ReviewsBox;