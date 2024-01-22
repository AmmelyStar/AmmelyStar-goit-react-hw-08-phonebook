import { deleteContact } from '../../../redux/operations';
import { selectVisibleContacts} from '../../../redux/selectors';
import css from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectVisibleContacts);

   return (
    <div className={css.container}>

      <div className={css.form}>
        <ul className={css.list}>
          {contacts.map(({ id, name, number }) => (
            <li key={id} className={css.item}>
              {name} - {number}
              <button
                type="button"
                name="delete"
                onClick={() => dispatch(deleteContact(id))}
                className={css.button}
              >
                Delete contact
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ContactList;