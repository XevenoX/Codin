import React, { useState } from 'react';
import { Avatar, Typography, Box, Rating, Stack } from '@mui/material';

const ProfileBox = () => {

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            border: '0.5px solid grey',
            borderRadius: '5px'
        }}>
            <img
                src="/banner.jpg"
                alt="Banner"
                style={{
                    width: '100%',
                    height: '50%',
                    objectFit: 'cover',
                    borderRadius: '5px 5px 0px 0px'
                }}
            />
            <Avatar
                sx={{
                    width: 90,
                    height: 90,
                    position: 'absolute',
                    left: 20,
                    top: 20,
                    bgcolor: 'blue'
                }}
                variant="square"
                src="logo.jpg"
                alt="Logo"
            />
            <Typography variant="h5" component="div" align="left" sx={{ ml: '20px', mt: '20px', fontWeight: 'bold' }}>
                Codefive
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ ml: '20px', mt: '5px' }}>
                Together, we create results.
            </Typography>
            <Box sx={{
                mt: '-80px',
                mr: '3%',
                bottom: '20px',
                height: '50%',
                display: 'grid',
                justifyContent: 'flex-end',
            }}>
                <Stack direction="column" alignItems="left" >
                    <Typography variant="h5" sx={{ ml: 1, color: 'black', fontWeight: 'bold', fontSize: 40 }}>4.5</Typography>
                    <Rating name="read-only" value={4.5} readOnly precision={0.5} size={'small'} color={'blue'} />
                    <Typography sx={{ ml: 1 }}>(136)</Typography>
                </Stack>
            </Box>
        </Box>);
};

export default ProfileBox;