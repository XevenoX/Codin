import React, { useState, useEffect } from 'react';
import { Box, Alert, Container, CircularProgress, Divider } from '@mui/material';
import ReviewsBox from '../components/DeveloperHomepage/ReviewsBox';
import ProjectsBox from '../components/DeveloperHomepage/ProjectsBox';
import PersonalBox from '../components/DeveloperHomepage/PersonalBox';
import { useParams } from 'react-router-dom';
import axios from "axios";


const DeveloperHomepage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [subscription, setSubscription] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const _id = useParams();

    async function loadUserInfo() {
        try {
            const res = await axios.get("/userInfo/findUser", {
                params: { _id: _id }  //replace this after having user session
            });
            setUserInfo(res.data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchSubscription = async () => {
        try {
            const response = await fetch(
                `http://localhost:5050/payment/checkSubscription/${userInfo._id}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log("newest", result);
            console.log("new Date(result) - new Date() > 0", new Date(result.newest) - new Date());
            let isSubscribed = false;
            if (new Date(result.newest) - new Date() > 0) {
                isSubscribed = true;
            };
            console.log("isSubscribed", isSubscribed);
            setSubscription({ status: isSubscribed, end_time: new Date(result.newest) });
        } catch (error) {
            console.error("Failed to fetch subscription details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.defaults.baseURL = "http://localhost:5050";
        loadUserInfo().catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchSubscription();
        }
    }, [userInfo]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">Error loading user info: {error.message}</Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ display: 'flex', height: '85%', backgroundColor: 'white' }}>
            <Box sx={{ flex: 1 }}>
                <PersonalBox userInfo={userInfo} setUserInfo={setUserInfo} subscription={subscription} />
            </Box>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{
                    mb: '10px', flex: 1, overflowY: 'auto',
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
                    <ProjectsBox userInfo={userInfo} />
                </Box>
                <Divider></Divider>
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
                    <ReviewsBox userInfo={userInfo} />
                </Box>
            </Box>
        </Box >
    );
}

export default DeveloperHomepage;