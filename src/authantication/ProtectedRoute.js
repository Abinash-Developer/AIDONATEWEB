import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  console.log("requiredRole =",requiredRole)
  if (isAuthenticated && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
