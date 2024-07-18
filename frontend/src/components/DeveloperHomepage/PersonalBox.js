import React, { useState } from 'react';
import { Box, Avatar, Typography, Stack, Grid, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AvatarUpload from '../AvatarUpload';
import { useCookies } from 'react-cookie';
import axios from "axios";

const PersonalBox = ({ userInfo, setUserInfo }) => {
    // cookie
    const [cookies] = useCookies(['user']); // 读取 'user' cookie
    const currentUser = cookies.user;
    const attributesToDisplay = { work_status: 'Work Status', website: 'Website', location: 'Location', school: 'School', skills: 'Skills' };
    const [tempUserInfo, setTempUserInfo] = useState(userInfo);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        developerInfoUpdate(tempUserInfo);
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

    async function developerInfoUpdate(tempUserInfo) {
        try {
            const res = await axios.post("/userInfo/developerUpdate", {
                email: tempUserInfo.email,
                website: tempUserInfo.website,
                work_status: tempUserInfo.work_status,
                location: tempUserInfo.location,
                school: tempUserInfo.school,
                skills: tempUserInfo.skills
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Stack direction='column' spacing={5} sx={{ m: '10px', padding: '20px', alignItems: 'center' }}>
            {/* <Avatar src='avatar_1.jpg' alt='test' sx={{ height: '200px', width: '200px' }} /> */}
            <Box sx={{ height: '200px', width: '200px' }}>
                <AvatarUpload userInfo={userInfo} width={'200px'} height={'200px'} variant={'circle'} />
            </Box>
            <Stack direction='column' sx={{ alignItems: 'center' }}>
                <Typography variant="h5" component="div" align="left" sx={{ fontWeight: 'bold' }}>{userInfo.name}</Typography>
                <Typography variant="body1" component="div" align="left" sx={{ color: 'grey' }}>{userInfo.email}</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {isEditing ? (
                            <Box>
                                <IconButton onClick={handleSave}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={handleCancel}>
                                    <CancelIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            currentUser.email === userInfo.email && (
                                <IconButton onClick={handleEditClick}>
                                    <EditIcon />
                                </IconButton>
                            )
                        )}
                    </Box>
                </Grid>
                {Object.entries(attributesToDisplay).map(([key, value]) => (
                    <Grid container alignItems="center" spacing={3} key={key} sx={{ mb: 2 }}>
                        <Grid item xs={4} md={3}>
                            <Box sx={{ fontWeight: 'bold' }}>
                                {value}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {isEditing ? (
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    multiline={true}
                                    autoFocus
                                    value={tempUserInfo[key]}
                                    onChange={(e) => setTempUserInfo((prevTempUserInfo) => ({
                                        ...prevTempUserInfo,
                                        [key]: e.target.value
                                    }))}
                                />
                            ) : (
                                <Box sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'blue' }}>
                                    {tempUserInfo[key]}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default PersonalBox;