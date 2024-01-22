import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
      const shouldRedirect = !isLoggedIn && !isRefreshing;

  return (
    <Route
      {...rest}
      render={(props) =>
        shouldRedirect ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;