import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactForm/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import css from '../../components/ContactForm/style.module.css'

import '../../redux/store';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../../redux/selectors';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className={css.app}>Phonebook</h2>
      <ContactForm />
      <h2 className={css.app}>Contacts list</h2>
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
      {contacts.length > 0 ? (
        <Filter />
      ) : (
        <div className={css.app}>Your phonebook is empty. Add first contact!</div>
      )}
 
    </>
  );
};

export default Contacts;