import React from 'react';
import Paper from '@mui/material/Paper';

const Home = () => {
  return (
    <Paper
      sx={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#e0e0e0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: 'secondary.main',
        fontSize: '25px',
      }}
    >
      Welcome to Phonebook
    </Paper>
  );
};

export default Home;
