import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;