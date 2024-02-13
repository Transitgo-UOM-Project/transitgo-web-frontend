import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <TextField
      placeholder="Search..."
      style={{
     
        width: '100%', // Adjust the width as needed
        borderRadius: '4px',
        padding: '0px', // Adjust padding for the inner content
        height: '55px',
        backgroundColor: '#020552',
      }}
      value={searchTerm}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ color: '#edebe6', marginRight: '0' }} />
        ),
        style: { padding: '0', margin: '0' }, // Adjust padding and margin for the input field
        inputProps: { style: { color: '#edebe6' } }, // Set color for the input text
      }}
    />
  );
};

export default SearchFilter;
