import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Phonebook from '../components/Phonebook/Phonebook';
import Registration from './Registration/Registration';
import Login from '../pages/Login/Login';
import Navigation from '../components/Navigation/Navigation';
import Home from './Home/Home';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, redirectTo }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/contacts" /> : <Home />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/contacts" /> : <Registration />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/contacts" /> : <Login />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute element={<Phonebook />} redirectTo="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/contacts' : '/'} />}
        />
      </Routes>
    </>
  );
};
