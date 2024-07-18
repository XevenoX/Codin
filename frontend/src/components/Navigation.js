// Navigation.js
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Navigation({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', width: '53%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ mr: 10 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Codin.
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              <Link
                to="/marketplace"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Marketplace
              </Link>
            </Typography>
          </Box>
          <Box>
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
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleSubscription}>
                <Avatar /> Subscription
              </MenuItem>
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
