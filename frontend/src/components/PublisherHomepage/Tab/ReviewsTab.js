import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Rating, Stack, Divider, Pagination } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";

const ReviewsTab = ({ style, userInfo }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const displayedFeedbacks = feedbacks.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    async function fetchPublisherFeedbacks(userInfo) {
        try {
            const response = await axios.get('/userInfo/feedbacks', {
                params: {
                    _id: userInfo._id
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            throw error;
        }
    }

    useEffect(() => {
        if (userInfo && userInfo._id) {
            fetchPublisherFeedbacks(userInfo)
                .then((feedbacks) => {
                    setFeedbacks(feedbacks);
                    setCount(Math.ceil(feedbacks.length / itemsPerPage));
                })
                .catch((e) => console.log(e));
        }
    }, [userInfo]);

    return (
        <>
            {feedbacks.length > 0 ? (
                <Box sx={{ my: 1 }}>
                    {displayedFeedbacks.map((testimonial, index) => (
                        <Box key={index} sx={{ mb: style === 'compact' ? 0 : 4, position: 'relative' }}>
                            <Box>
                                <Box>
                                    <Stack direction="row" spacing={2} sx={{ mb: style === 'compact' ? 0 : 2 }}>
                                        <Avatar src="avatar_1.jpg" alt="Logo" />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" component="div">{testimonial.rater_name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {formatDistanceToNow(new Date(testimonial.rated_date), { addSuffix: true })}
                                            </Typography>
                                        </Box>
                                        <Rating value={testimonial.rating} precision={0.5} readOnly />
                                    </Stack>
                                    <Typography variant="body2">{testimonial.comment}</Typography>
                                </Box>
                            </Box>
                            {index !== displayedFeedbacks.length - 1 && <Divider sx={{ my: 2 }} />}
                        </Box>
                    ))}
                    <Pagination count={count} page={page} onChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center' }} />
                </Box>
            ) : (
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'gray' }}>
                    No feedbacks yet
                </Typography>
            )}
        </>
    );
};

export default ReviewsTab;
