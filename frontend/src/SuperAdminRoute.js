// SuperAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const SuperAdminRoute = ({ element: Component, isAuthenticated, isSuperAdmin, ...rest }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/superadmin-login" />;
  }
  if (!isSuperAdmin) {
    // Redirect to homepage or a 'not authorized' page if not a superadmin
    return <Navigate to="/" />;
  }
  // Render the superadmin component if authenticated and authorized
  return <Component {...rest} />;
};

export default SuperAdminRoute;
