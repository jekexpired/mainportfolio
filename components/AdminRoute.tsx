
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useConfig } from '../ConfigContext';

const AdminRoute: React.FC = () => {
  const { isAuthenticated } = useConfig();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};

export default AdminRoute;
