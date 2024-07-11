import React, { useState } from 'react';
import { Box, TextField, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const OverviewTab = ({ userInfo, setUserInfo }) => {
    const attributesToDisplay = { industry: 'Industry', website: 'Website', organization_size: 'Organization Size', specialities: 'Specialities' };

    const [isEditing, setIsEditing] = useState(false);
    const [tempUserInfo, setTempUserInfo] = useState(userInfo);

    async function publisherInfoUpdate(tempUserInfo) {
        try {
            const res = await axios.post("/userInfo/publisherUpdate", {
                email: tempUserInfo.email,
                about_us: tempUserInfo.about_us,
                industry: tempUserInfo.industry,
                website: tempUserInfo.website,
                organization_size: tempUserInfo.organization_size,
                specialities: tempUserInfo.specialities
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSave = () => {
        publisherInfoUpdate(tempUserInfo);
        setUserInfo(tempUserInfo);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempUserInfo(userInfo);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setTempUserInfo(userInfo);
        setIsEditing(true);
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Box sx={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.35em' }}>
                    About us
                </Box>

                {isEditing ? (
                    <Grid item>
                        <IconButton onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel}>
                            <CancelIcon />
                        </IconButton>
                    </Grid>
                ) : (
                    <Grid item>
                        <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                )}
            </Box>

            <Grid item xs={12} md={12} mb={'10px'}>
                {isEditing ? (
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline="true"
                        autoFocus
                        value={tempUserInfo.about_us}
                        onChange={(e) => setTempUserInfo((prevTempUserInfo) => ({
                            ...prevTempUserInfo,
                            about_us: e.target.value,
                        }))}
                    />
                ) : (
                    <Box sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'blue' }}>
                        {userInfo.about_us}
                    </Box>
                )}
            </Grid>

            {Object.entries(attributesToDisplay).map(([key, value]) => (
                <Grid container alignItems="center" spacing={3} key={key}>
                    <Grid item xs={4} md={3} >
                        <Box sx={{ fontWeight: 'bold' }}>
                            {value}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9} mb={'10px'}>
                        {isEditing ? (
                            <TextField
                                variant="standard"
                                fullWidth
                                multiline={false}
                                autoFocus
                                value={tempUserInfo[key]}
                                onChange={(e) => setTempUserInfo((prevTempUserInfo) => ({
                                    ...prevTempUserInfo,
                                    [key]: e.target.value
                                }))}
                            />

                        ) : (
                            <Box sx={{ cursor: 'text', whiteSpace: 'pre-wrap' }}>
                                {tempUserInfo[key]}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            ))}

        </Box>
    );
};

export default OverviewTab;