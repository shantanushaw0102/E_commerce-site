/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

function PrivateRoute({ outlet }) {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate to="/login" /> : outlet;
}

export default PrivateRoute;
