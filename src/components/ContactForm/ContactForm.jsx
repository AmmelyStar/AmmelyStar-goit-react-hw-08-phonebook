import css from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../redux/operations';
import { selectVisibleContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectVisibleContacts);

  const dispatch = useDispatch();

  const handleSubmitContact = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };
    const isNameExist =
      Array.isArray(contacts) &&
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      );

    if (isNameExist) {
      alert(`${newContact.name} is already in contacts!`);
    } else {
      dispatch(addContact(newContact));

      e.target.reset();
    }
  };

  return (
    <div className={css.formContainer}>
        <form onSubmit={handleSubmitContact}>
             
        <label>
          Name
          <input type="text" name="name" required />
        </label>

        <label>
          Number
          <input className={css.formInput} type="tel" name="number" required />
        </label>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};