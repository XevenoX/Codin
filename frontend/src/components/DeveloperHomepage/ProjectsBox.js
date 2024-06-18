import React, { useState } from 'react';
import { Box, Typography, Rating, Stack, Divider } from '@mui/material';
import ProjectOverview from '../ProjectOverview'

const ProjectsBox = () => {
    return (
        <div>
            <Box sx={{ position: 'sticky', background: 'white', top: 0, zIndex: 3 }}>
                <Typography variant="h5" sx={{ padding: '8px 20px', fontWeight: 'bold', fontSize: 20 }}>Past Projects</Typography>
            </Box>
            <Box sx={{
                padding: '1px 10px', m: '10px', overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'darkgrey',
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: '#555',
                    }
                }
            }}>
                <ProjectOverview />
            </Box>
        </div>
    );
};

export default ProjectsBox;