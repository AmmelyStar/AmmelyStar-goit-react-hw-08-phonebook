import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Typography from '@mui/material/Typography';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const isAdding = useSelector(state => state.contacts.isAdding);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isAuthenticated) {
      Report.failure(
        'Authentication Required',
        'Please register or log in to add a contact.',
        'Okay'
      );
      return;
    }

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Report.warning(
        'This name is already in contacts',
        `Contact with name "${name}" is already in contacts`,
        'Okay'
      );
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    try {
      await dispatch(addContact(newContact));
      Report.success(
        'Contact added',
        `Contact with name "${newContact.name}" was added`,
        'Okay'
      );
      setName('');
      setNumber('');
    } catch (error) {
      Report.failure(
        'Failed to add contact',
        'An error occurred while adding the contact',
        'Okay'
      );
    }
  };

  return (
    <form
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme => theme.spacing(3),
        maxWidth: 400,
        margin: 'auto',
        padding: theme => theme.spacing(3),
        borderRadius: 15,
        backgroundColor: '#f8f8f8',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h1"
        style={{ fontWeight: 600, fontSize: 32, textAlign: 'center' }}
      >
        Phonebook
      </Typography>
      <TextField
        sx={{ width: '70%', margin: 'auto' }}
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
        variant="outlined"
      />
      <TextField
        sx={{ width: '70%', margin: 'auto' }}
        label="Number"
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        required
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: '70%',
          backgroundColor: theme => theme.palette.secondary.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme => theme.palette.secondary.main,
          },
        }}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Contact'}
      </Button>
    </form>
  );
};

export default ContactForm;
