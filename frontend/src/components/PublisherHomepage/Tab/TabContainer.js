import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import OverviewTab from './OverviewTab';
import ProjectsTab from './ProjectsTab';
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
                    <Box sx={{ fontSize: '1rem', color: 'text.primary' }}>
                        {children}
                    </Box>
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

const TabContainer = ({ userInfo, setUserInfo }) => {
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
                <OverviewTab userInfo={userInfo} setUserInfo={setUserInfo} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ProjectsTab userInfo={userInfo} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ReviewsTab style='normal' userInfo={userInfo} />
            </CustomTabPanel>
        </Box>
    );
};

export default TabContainer;