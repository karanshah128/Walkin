import React from 'react';
import { Redirect } from 'react-router-dom';
import useGlobalState from './Context';

const PrivateRoute = ({ children }) => {
  const [{ isAuthenticated  }] = useGlobalState();
  return (
    <>
      {isAuthenticated
        ? children
        : <Redirect to="/" />}
    </>
  )
}

export default PrivateRoute;