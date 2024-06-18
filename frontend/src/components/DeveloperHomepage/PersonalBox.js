import React, { useState } from 'react';
import { Box, Avatar, Typography, Rating, Stack, Divider, Container } from '@mui/material';
import EditableText from '../EditableText';

const PersonalBox = () => {
    const [workInfo, setWorkInfo] = useState("Currently working in KAN LABs, NYC USA as an ML Engineer(Remote)");
    const [location, setLocation] = useState("Munich");
    const [school, setSchool] = useState("Technical University of Munich");
    const [website, setWebsite] = useState("https://github.com/maxmustermann");
    const [skills, setSkills] = useState("frontend development");
    const handleChange = setter => e => setter(e.target.value);

    return (
        <Stack direction='column' spacing={5} sx={{ m: '30px', padding: '20px', alignItems: 'center' }}>
            <Avatar src='avatar_1.jpg' alt='test' sx={{ height: '200px', width: '200px' }} />
            <Stack direction='column' sx={{ alignItems: 'center' }}>
                <Typography variant="h5" component="div" align="left" sx={{ fontWeight: 'bold' }}>Max Mustermann</Typography>
                <Typography variant="body1" component="div" align="left" sx={{ color: 'grey' }}>1223356456</Typography>
            </Stack>
            <Stack direction='column' sx={{ alignItems: 'center' }}>
                <EditableText type={1} label="Work Status" value={workInfo} onChange={handleChange(setWorkInfo)} />
                <EditableText type={1} label="Location" value={location} onChange={handleChange(setLocation)} />
                <EditableText type={1} label="School" value={school} onChange={handleChange(setSchool)} />
                <EditableText type={1} label="website" value={website} onChange={handleChange(setWebsite)} />
                <EditableText type={1} label="skills" value={skills} onChange={handleChange(setSkills)} />
            </Stack>
        </Stack>
    );
};

export default PersonalBox;