import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProjectOverviewBox from '../../ProjectOverviewBox';
import axios from "axios";

const ProjectsTab = ({ userInfo }) => {
    const [ongoingProjects, setOngoingProjects] = useState([]);

    async function fetchOngoingProjects(userInfo) {
        try {
            const response = await axios.get('/projectsList/byPublisher/ongoing', {
                params: {
                    project_publisher: userInfo._id
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching ongoing projects:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchOngoingProjects(userInfo)
            .then((projects) => {
                setOngoingProjects(projects);
            })
            .catch((e) => console.log(e));
    }, [userInfo]);


    return (

        <Box>
            {ongoingProjects && ongoingProjects.length > 0 ? (
                <Grid container spacing={3}>
                    {ongoingProjects.map((projectInfo) => (
                        <Grid item xs={12} key={projectInfo._id}>
                            <ProjectOverviewBox projectInfo={projectInfo} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
                    No open projects for application now
                </Typography>
            )}
        </Box>);
};

export default ProjectsTab;