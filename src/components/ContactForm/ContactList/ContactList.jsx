import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../../redux/contactsSlice';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts) || [];
  const filter = useSelector(state => state.contacts.filter) || '';
  const isDeleting = useSelector(state => state.contacts.isDeleting);

  const filteredContacts = contacts.filter(
    contact =>
      contact.name &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = id => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      dispatch(deleteContact(id))
        .then(() => {
          Report.success(
            'Contact deleted',
            `Contact with name: "${contact.name}" was deleted`,
            'Okay'
          );
        })
        .catch(() => {
          Report.failure(
            'Failed to delete contact',
            'An error occurred while deleting the contact',
            'Okay'
          );
        });
    }
  };

 

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space between',
        border: '2px solid #6c5691', // Add border styling
        borderRadius: '10px', // Optional: Add border radius
        padding: '10px', // Optional: Add padding
        maxWidth: '400px', // Optional: Set maximum width
        margin: 'auto', // Optional: Center horizontally
      }}
    >
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <Button
              onClick={() => handleDeleteContact(contact.id)}
              sx={{
                margin: '40px',
                textAlign: 'end',
                backgroundColor: 'secondary.main',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                },
                disabled: {
                  backgroundColor: '#ccc',
                  color: '#666',
                },
              }}
              disabled={isDeleting}
              startIcon={<DeleteIcon />}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;








