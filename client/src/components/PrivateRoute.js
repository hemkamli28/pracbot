import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRoute = ({element, role}) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    } 
  
    // If roles are provided and the user role doesn't match any of the allowed roles, redirect to home
    if (role && role === userRole) {
      return <Navigate to="/" />;
    }
  
    return <Route element={element} />;

};

export default PrivateRoute;
