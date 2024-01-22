import React from 'react';
import css from './style.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from '../../redux/filterSlice';


export const Filter = () => {
  const filter = useSelector(state => state.filter.filter);

  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(filterContacts(e.target.value));
  };

  return (
    <>
      <div  className={css.container}>
        <h3 className={css.subtitle}>Find contacts by name</h3>

        <input className={css.fild}
          name="filter"
          value={filter}
          type="text"
          onChange={changeFilter}
        />
      </div>
    </>
  );
};



export default Filter;