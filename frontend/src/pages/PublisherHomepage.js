import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import ProfileBox from '../components/PublisherHomepage/ProfileBox';
import TabContainer from '../components/PublisherHomepage/Tab/TabContainer';
import axios from "axios";

const PublisherHomepage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadUserInfo() {
        try {
            const res = await axios.get("/userInfo/findByEmail", {
                params: { email: "codefive@gmail.com" } //replace this after having user session
            });
            setUserInfo(res.data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        axios.defaults.baseURL = "http://localhost:5050"
        loadUserInfo().catch((e) => console.log(e))
    }, []);

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
        <Container>
            <ProfileBox userInfo={userInfo} setUserInfo={setUserInfo} />
            <TabContainer userInfo={userInfo} setUserInfo={setUserInfo} />
        </Container >
    );
}

export default PublisherHomepage;