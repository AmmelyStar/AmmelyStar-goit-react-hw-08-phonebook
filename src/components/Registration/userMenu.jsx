import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, getCurrentUser } from '../../redux/authSlise';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  if (location.pathname !== '/contacts') {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme => theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center', 
        backgroundColor: 'secondary.main',
        border: 'none',
        color: '#fff',
        maxHeight: '20px',
        width: 100,
        margin: 2,
        position: 'fixed',
        top: 0,
        right: -10,
        zIndex: 0,
      }}
    >
      {loading ? (
        <CircularProgress style={{ color: '#fff', fontSize: '16px' }} />
      ) : isAuthenticated ? (
        <>
            <Typography sx={{
              marginBottom: theme => theme.spacing(-2)
            }}>
            Welcome, {user?.name || 'User'}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              marginTop: theme => theme.spacing(2),
              backgroundColor: 'secondary.main',
              color: '#fff',
              borderRadius: 20,
              '&:hover': {
                backgroundColor: '#2a3a8a',
              },
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <p style={{ color: '#fff' }}>User not logged in</p>
      )}
    </Paper>
  );
};

export default UserMenu;
