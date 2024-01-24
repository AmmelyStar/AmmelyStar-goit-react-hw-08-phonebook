import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from '../Registration/userMenu';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navigation = () => {
  const location = useLocation();
  const showMenu = location.pathname !== '/contacts';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px',
        paddingRight: '20px',
        paddingLeft: '20px',
      }}
    >
      {showMenu && (
        <>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{
              color: 'secondary.main',
              borderColor: 'secondary.main',
              marginRight: 'auto',
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            sx={{
              color: 'secondary.main',
              borderColor: 'secondary.main',
              marginLeft: 'auto',
            }}
          >
            Registration
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              color: 'secondary.main',
              borderColor: 'secondary.main',
              marginLeft: '10px', 
            }}
          >
            Login
          </Button>
        </>
      )}
      <UserMenu />
    </Box>
  );
};

export default Navigation;
