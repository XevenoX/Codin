import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, Stack } from '@mui/material';
import ReviewsTab from '../PublisherHomepage/Tab/ReviewsTab';
import axios from "axios";

const ReviewsBox = ({ userInfo }) => {
    const [rating, setRating] = useState(null);
    const [numberOfRating, setNumberOfRating] = useState(null);
    async function fetchDeveloperRating(userInfo) {
        try {
            const response = await axios.get('/userInfo/averageRating', {
                params: {
                    _id: userInfo._id
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching average rating:', error);
            throw error;
        }
    }

    useEffect(() => {
        if (userInfo && userInfo._id) {
            fetchDeveloperRating(userInfo)
                .then((rating) => {
                    setRating(rating.averageRating);
                    setNumberOfRating(rating.totalRatings);
                })
                .catch((e) => console.log(e));
        }
    }, [userInfo]);

    return (
        <div>
            <Box sx={{ position: 'sticky', background: 'white', top: 0, zIndex: 3 }}>
                <Stack direction="row" spacing={4} alignItems="center" sx={{ padding: '0px 20px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: 20 }}>Customer Reviews</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {rating !== null ? (
                            <>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>{rating !== null ? rating.toFixed(1) : 'No ratings yet'}</Typography>
                                <Rating name="read-only" value={rating} readOnly precision={0.5} size={'small'} color={'blue'} />
                                <Typography sx={{ ml: 1 }}>({numberOfRating})</Typography>
                            </>
                        ) : (
                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'gray' }}>
                                No rating yet
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ padding: '1px 10px', m: '10px', overflowY: 'auto' }}>
                <ReviewsTab style='compact' userInfo={userInfo} />
            </Box>
        </div >
    );
};

export default ReviewsBox;