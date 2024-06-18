import React from 'react';
import { Box } from '@mui/material';
import ReviewsBox from '../components/DeveloperHomepage/ReviewsBox';
import ProjectsBox from '../components/DeveloperHomepage/ProjectsBox';
import PersonalBox from '../components/DeveloperHomepage/PersonalBox';

const DeveloperHomepage = () => {
    return (
        <Box sx={{ display: 'flex', height: '75%' }}>
            <Box sx={{ flex: 1 }}>
                <PersonalBox />
            </Box>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: '10px', flex: 1, overflowY: 'auto' }}>
                    <ProjectsBox />
                </Box>
                <Box sx={{
                    mt: '10px', flex: 1, overflowY: 'scroll',
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
                }
                }>
                    <ReviewsBox />
                </Box>
            </Box>
        </Box >
    );
}

export default DeveloperHomepage;