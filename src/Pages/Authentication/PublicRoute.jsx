import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, user }) => {
  return (user === null) ? children : <Navigate to="/" />;
    
}

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/home" />;
};

export { PublicRoute , PrivateRoute}
