import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const RestrictedRoute = ({ component: Component, ...rest }) => {
    const {  isLoggedIn } = useAuth();


  return (
    <Route
      {...rest}
      render={(props) =>
         isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RestrictedRoute;