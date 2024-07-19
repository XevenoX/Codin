// Navigation.js
import {
  Tooltip,
  Divider,
  Badge,
  Avatar,
  Menu,
  Toolbar,
  IconButton,
  AppBar,
  Box,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import codinLogo from '../pics/Codin-Logo.png';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import CheckIcon from '@mui/icons-material/Check';
import Logout from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import HomeRounded from '@mui/icons-material/Home';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Navigation({ user, onLogout }) {
  // cookie
  const [cookies] = useCookies(['user']);
  const currentUser = cookies.user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subscription, setSubscription] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [anchorElMail, setAnchorElMail] = React.useState(null);
  const openMail = Boolean(anchorElMail);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMailClick = (event) => {
    setAnchorElMail(event.currentTarget);
  };

  const handleMailClose = () => {
    setAnchorElMail(null);
  };

  const handleMyHomepage = () => {
    console.log('User object:', user); // Add this line to debug
    if (user) {
      const role = user.role;
      const userId = user.id;
      if (role === 'publisher') {
        navigate(`/publisherhomepage/${userId}`);
      } else if (role === 'developer') {
        navigate(`/developerhomepage/${userId}`);
      }
    }
    handleClose();
  };

  const handleSubscription = () => {
    navigate('/subscription');
    handleClose();
  };

  const handleSignOut = async () => {
    if (user) {
      try {
        await axios.post('/signOut');
        onLogout();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
    handleClose();
  };

  async function loadAvatar() {
    try {
      const res = await axios.get('/userInfo/loadAvatar', {
        params: { _id: currentUser.id }, //replace this after having user session
      });
      setAvatar(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMessages() {
    try {
      const res = await axios.get('/message/findUnreadMessage', {
        params: { _id: currentUser.id },
      });
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function markMessageAsRead(messageId) {
    try {
      await axios.post('/message/updateMessageStatus', { messageId });
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/payment/checkSubscription/${currentUser.id}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      let isSubscribed = false;
      if (new Date(result.newest) - new Date() > 0) {
        isSubscribed = true;
      }
      setSubscription(isSubscribed);
    } catch (error) {
      console.error('Failed to fetch subscription details:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      axios.defaults.baseURL = 'http://localhost:5050';
      loadAvatar();
      loadMessages();
      fetchSubscription();
      console.log(subscription);
    }
  }, [currentUser]);

  //create the message message based on the type
  const renderMessageContent = (message) => {
    switch (message.message_type) {
      case 1:
        return `You received a new offer from ${message.publisher_name}! Check it on the project management page and decide whether to accept it or not.`;
      case 2:
        return `${message.developer_name} rejected the offer. Please choose another applicant.`;
      case 3:
        return `${message.developer_name} accepted the offer. The project is now in progress!`;
      case 4:
        return `${message.developer_name} has finished the project. Please check and confirm the completion on the project management page. After confirmation, the project budget will be transferred to the developer.`;
      case 5:
        return `${message.publisher_name} confirmed the completion. You will receive the payment within 5 working days! Please contact us if there is any delay.`;
    }
    console.log(message);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
            width: '73%',
            maxHeight: '35px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img src={codinLogo} alt="Logo" style={{ height: '40px' }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ ml: 20 }}>
              <Link
                to="/marketplace"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Marketplace
              </Link>
            </Typography>

            {currentUser && (
              <Typography variant="h6" component="div" sx={{ ml: 20 }}>
                <Link
                  to={
                    currentUser.role === 'developer'
                      ? '/project-management'
                      : currentUser.role === 'publisher'
                        ? '/company-project-management'
                        : '#'
                  }
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {currentUser.role === 'developer' ||
                    currentUser.role === 'publisher'
                    ? 'Project Management'
                    : 'Not Authorized'}
                </Link>
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: currentUser ? 'block' : 'none', //  only display when logged in
            }}
          >
            <Tooltip title="Messages">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={handleMailClick}
              >
                <Badge badgeContent={messages.length} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElMail}
              open={openMail}
              onClose={handleMailClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {messages.map((message) => (
                <MenuItem key={message._id}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      maxWidth: 300,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                      >
                        {renderMessageContent(message)}
                      </Typography>
                    </Box>
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => markMessageAsRead(message._id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="large"
                edge="end"
                color="inherit"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {subscription ? (
                  <Badge
                    badgeContent="V"
                    color="warning"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      src={avatar}
                    ></Avatar>
                  </Badge>
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }} src={avatar}></Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMyHomepage}>
                <ListItemIcon>
                  <HomeRounded fontSize="medium" color="primary" />
                </ListItemIcon>
                <ListItemText>My Homepage</ListItemText>
              </MenuItem>
              {currentUser && currentUser.role === 'developer' && (
                <MenuItem onClick={handleSubscription}>
                  <ListItemIcon>
                    <SubscriptionsRoundedIcon fontSize="medium" color="primary" />
                  </ListItemIcon>
                  <ListItemText>Subscription</ListItemText>
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
