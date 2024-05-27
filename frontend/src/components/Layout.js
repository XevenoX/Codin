import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import AccountMenu from './AccountMenu';


const drawerWidth = 240;

const CustomPage = styled('div')({
  flexGrow: 1,
  padding: '20px',
  minHeight: '100vh', // 确保页面至少占满整个视窗高度
});

const CustomDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const CustomDrawerRoot = styled('div')({
  display: 'flex',
});

const CustomAppBar = styled(AppBar)({
    width: '100%'
})

const CustomToolbar = styled(Toolbar)({
    height: 20
})



const Layout = ({ children }) => {

  const navigate = useNavigate();

  return (
    // app bar 
    <div>
        {/* elevation 没有阴影 */}
        <CustomAppBar elevation={0}>  
            <CustomToolbar>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link to='/'>
                            Welcome to Codin.
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to='/marketplace'>
                            Marketplace
                        </Link>
                    </Grid>
                    <Grid item>
                        <AccountMenu />
                    </Grid>
                </Grid>
            </CustomToolbar>
        </CustomAppBar>
    
        <CustomDrawerRoot>
            <CustomPage>
                {/* 在展示 Notes 的 div 中插入一个 CustomToobar, 这样 Toolbar 就不会压着 Notes 了。  */}
                <CustomToolbar />
                {children}
            </CustomPage>
        </CustomDrawerRoot>
    </div>

  );
};

export default Layout;