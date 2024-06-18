import React, { useState } from 'react';
import { Box, Typography, Avatar, Rating, Stack, Grid, Divider, Pagination } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';


const testimonials = [
    {
        name: "Hanna Müller",
        review: "Smooth communication and a fantastic experience overall. Throughout this internship, I was able to apply what I've learned in my courses, making the entire process highly rewarding. Additionally, the compensation exceeded my expectations!",
        rating: 5,
        avatarUrl: "avatar_1.jpg",
        date: "2024-06-01"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 3,
        avatarUrl: "avatar_2.jpg",
        date: "2024-05-05"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 3.5,
        avatarUrl: "avatar_2.jpg",
        date: "2024-04-01"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 4.5,
        avatarUrl: "avatar_2.jpg",
        date: "2024-04-01"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 2,
        avatarUrl: "avatar_2.jpg",
        date: "2024-04-01"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 3,
        avatarUrl: "avatar_2.jpg",
        date: "2024-02-01"
    },
    {
        name: "Alex Fisher",
        review: "Unfortunately, the experience did not meet my expectations. Communication with the team was often unclear and delayed, making it difficult to progress in my tasks efficiently.",
        rating: 3,
        avatarUrl: "avatar_2.jpg",
        date: "2023-01-01"
    }
];

const ReviewsTab = ({ style }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const count = Math.ceil(testimonials.length / itemsPerPage);

    const displayedTestimonials = testimonials.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box sx={{ my: 1 }}>
            {displayedTestimonials.map((testimonial, index) => (
                <Box key={index} sx={{ mb: style == 'compact' ? 0 : 4, position: 'relative' }}>
                    <Box>
                        <Box>
                            <Stack direction="row" spacing={2} sx={{ mb: style == 'compact' ? 0 : 2 }}>
                                <Avatar src={testimonial.avatarUrl} alt={testimonial.name} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" component="div">{testimonial.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {formatDistanceToNow(new Date(testimonial.date), { addSuffix: true })}
                                    </Typography>
                                </Box>
                                <Rating value={testimonial.rating} precision={0.5} readOnly />
                            </Stack>
                            <Typography variant="body2">{testimonial.review}</Typography>
                        </Box>
                    </Box>
                    {index !== displayedTestimonials.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
            ))}
            <Pagination count={count} page={page} onChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center' }} />
        </Box>
    );
};

export default ReviewsTab;