import React from 'react';
import { Container } from '@mui/material';
import ProfileBox from '../components/PublisherHomepage/ProfileBox';
import ProfileTab from '../components/PublisherHomepage/Tab/FullTab';

const PublisherHomepage = () => {

    return (
        <Container>
            <ProfileBox />
            <ProfileTab />
        </Container >
    );
}

export default PublisherHomepage;