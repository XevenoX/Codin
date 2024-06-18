import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import AccountMenu from './AccountMenu';

const CustomPage = styled('div')({
  flexGrow: 1,
  padding: '20px',
  minHeight: '100vh', // 确保页面至少占满整个视窗高度
});

const CustomAppBar = styled(AppBar)({
  width: '100%',
});

const CustomToolbar = styled(Toolbar)({
  height: 20,
});

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* AppBar */}
      <CustomAppBar elevation={0}>
        <CustomToolbar>
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/">Welcome to Codin.</Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/marketplace">Marketplace</Link>
            </Grid>
            <Grid item>
              <AccountMenu />
            </Grid>
          </Grid>
        </CustomToolbar>
      </CustomAppBar>

      {/* Drawer and Content */}
      <CustomPage>
        {/* 插入 Toolbar 确保内容不被 AppBar 覆盖 */}
        <CustomToolbar />
        {/* 渲染子路由内容 */}
        <Outlet />
      </CustomPage>
    </div>
  );
};

export default Layout;
