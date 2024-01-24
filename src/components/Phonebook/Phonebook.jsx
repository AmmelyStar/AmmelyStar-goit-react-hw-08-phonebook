import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Home from '../Home/Home';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactForm/ContactList/ContactList';
import { fetchContacts } from '../../redux/contactsSlice';

const styles = {
  container: {
    maxWidth: 'calc(100% - 100px)',
    margin: '0 auto',
    marginTop: 5,
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: '#f4f4f4', // Gentle color
    padding: '20px', // Adjust padding for additional spacing
  },
  title: {
    marginBottom: 4,
    fontSize: 36,
  },

  contactsSection: {
    marginTop: 5,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    marginBottom: 2,
    fontSize: 18,
    color: 'black',
  },
  error: {
    marginBottom: 2,
    fontSize: 18,
    color: 'red',
  },
};

const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div sx={styles.container}>
      {isAuthenticated ? (
        <>
          <ContactForm />
        </>
      ) : (
        <Home />
      )}

      {isAuthenticated && (
        <div sx={styles.contactsSection}>
          <Typography
            variant="h2"
            sx={{ margin: 4, fontSize: 36, fontWeight: 600, textAlign: 'center' }}
          >
            Contacts
          </Typography>
          <Filter />
          {isLoading && <p sx={styles.loading}>Loading...</p>}
          {error && <p sx={styles.error}>Error: {error}</p>}
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default Phonebook;
