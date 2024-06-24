// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <Route
      {...rest}
      element={props =>
        isAuthenticated ? <Element {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
