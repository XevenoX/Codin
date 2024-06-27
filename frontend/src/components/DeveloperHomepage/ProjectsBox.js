import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProjectOverviewBox from '../ProjectOverviewBox'
import axios from "axios";


const ProjectsBox = ({ userInfo }) => {
    const [pastProjects, setPastProjects] = useState([]);
    async function fetchPastProjects(userInfo) {
        try {
            const response = await axios.get('/projectsList/byDeveloper/past', {
                params: {
                    chosen_applicants: userInfo._id
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching past projects:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchPastProjects(userInfo)
            .then((projects) => {
                setPastProjects(projects);
            })
            .catch((e) => console.log(e));
    }, [userInfo]);

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
                <Box>
                    {pastProjects && pastProjects.length > 0 ? (
                        <Grid container spacing={1}>
                            {pastProjects.map((projectInfo) => (
                                <Grid item xs={12} key={projectInfo._id}>
                                    <ProjectOverviewBox projectInfo={projectInfo} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
                            No completed projects on Codin yet...
                        </Typography>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default ProjectsBox;