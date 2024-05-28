// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, isAuthenticated, isAdmin, ...rest }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin-login" />;
  }
  if (!isAdmin) {
    // Redirect to homepage or a 'not authorized' page if not an admin
    return <Navigate to="/" />;
  }
  // Render the admin component if authenticated and authorized
  return <Component {...rest} />;
};

export default AdminRoute;
