import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Rating,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AvatarUpload from '../AvatarUpload';
import BannerUpload from '../PublisherHomepage/BannerUpload';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const ProfileBox = ({ userInfo, setUserInfo }) => {
  // cookie
  const [cookies] = useCookies(['user']);
  const currentUser = cookies.user;
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(null);
  const [numberOfRating, setNumberOfRating] = useState(null);
  async function sloganUpdate(tempUserInfo) {
    console.log(tempUserInfo.email, tempUserInfo.slogan);
    try {
      const res = await axios.post('/userInfo/sloganUpdate', {
        email: tempUserInfo.email,
        slogan: tempUserInfo.slogan,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPublisherRating(userInfo) {
    try {
      const response = await axios.get('/userInfo/averageRating', {
        params: {
          _id: userInfo._id,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching average rating:', error);
      throw error;
    }
  }

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    sloganUpdate(tempUserInfo);
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

  useEffect(() => {
    if (userInfo && userInfo._id) {
      fetchPublisherRating(userInfo)
        .then((rating) => {
          setRating(rating.averageRating);
          setNumberOfRating(rating.totalRatings);
        })
        .catch((e) => console.log(e));
    }
  }, [userInfo]);

  const handleChange = (setter) => (e) => setter(e.target.value);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '200px',
        // display: 'flex',
        flexDirection: 'column',
        padding: 0,
        border: '0.5px solid grey',
        borderRadius: '5px',
      }}
    >
      <BannerUpload userInfo={userInfo} objectFit={'cover'} />
      <Box
        sx={{
          width: 90,
          height: 90,
          position: 'absolute',
          left: 20,
          top: 20,
        }}
      >
        <AvatarUpload
          userInfo={userInfo}
          width={'90px'}
          height={'90px'}
          variant={'square'}
        />
      </Box>

      <Typography
        variant="h5"
        component="div"
        align="left"
        sx={{ ml: '20px', mt: '20px', fontWeight: 'bold' }}
      >
        {userInfo.name}
      </Typography>
      <Box sx={{ ml: '20px', width: '60%', height: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="standard"
                fullWidth
                multiline="true"
                autoFocus
                value={tempUserInfo.slogan}
                onChange={(e) =>
                  setTempUserInfo((prevTempUserInfo) => ({
                    ...prevTempUserInfo,
                    slogan: e.target.value,
                  }))
                }
              />
              <IconButton onClick={handleSave}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'grey' }}
              >
                {userInfo.slogan}
              </Typography>
              {/* only allow the owner to edit */}
              {currentUser.email === userInfo.email && (
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          mt: '-105px',
          mr: '3%',
          bottom: '20px',
          height: '50%',
          display: 'grid',
          justifyContent: 'flex-end',
        }}
      >
        <Stack direction="column" alignItems="left">
          {rating !== null ? (
            <>
              <Typography
                variant="h5"
                sx={{ ml: 1, color: 'black', fontWeight: 'bold', fontSize: 40 }}
              >
                {rating !== null ? rating.toFixed(1) : 'No ratings yet'}
              </Typography>
              <Rating
                name="read-only"
                value={rating}
                readOnly
                precision={0.5}
                size={'small'}
                color={'blue'}
              />
              <Typography sx={{ ml: 1 }}>({numberOfRating})</Typography>
            </>
          ) : (
            <Typography
              variant="body1"
              sx={{ fontStyle: 'italic', color: 'gray' }}
            >
              No rating yet
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileBox;
