import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';

const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/registration"
        element={<RestrictedRoute component={<Link to="/registration">Registration</Link>} />}
      />
      <Route
        path="/login"
        element={<RestrictedRoute component={<Link to="/login">Login</Link>} />}
      />
      <Route
        path="/contacts"
        element={<PrivateRoute component={<Link to="/contacts">Contacts</Link>} />}
      />
    </Routes>
  );
};

export default Navigation;