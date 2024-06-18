import React, { useState } from 'react';
import { Typography, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Overview from './OverviewTab';
import Projects from './ProjectsTab';
import ReviewsTab from './ReviewsTab';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={'simple-tabpanel-${index}'}
            aria-labelledby={'simple-tab-${index}'}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: 'simple-tab-${index}',
        'aria-controls': 'simple-tabpanel-${index}',
    };
}

const ProfileTab = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} sx={{ textTransform: 'none' }}
                    />
                    <Tab label="Projects" {...a11yProps(1)} sx={{ textTransform: 'none' }}
                    />
                    <Tab label="Reviews" {...a11yProps(2)} sx={{ textTransform: 'none' }}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Overview />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Projects />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ReviewsTab style='normal' />
            </CustomTabPanel>
        </Box>
    );
};

export default ProfileTab;