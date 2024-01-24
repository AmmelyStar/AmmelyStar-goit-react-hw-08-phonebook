import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter) || '';

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value.toLowerCase()));
  };

  return (
    <TextField
      sx={{
        width: '100%',
        maxWidth: 300,
        margin: 'auto',
        marginBottom: theme => theme.spacing(2),
        '& input::placeholder': {
          paddingLeft: theme => theme.spacing(1),
        },
      }}
      type="text"
      placeholder="Search contacts"
      variant="outlined"
      value={filter}
      onChange={handleFilterChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Filter;
