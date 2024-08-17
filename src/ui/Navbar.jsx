import React, { useState } from 'react';
import './Navbar.css';
import { setSearchText } from '../dashboardSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    dispatch(setSearchText(searchText));
  };

  return (
    <div className='navbar'>
      Dashboard
      <input
        type="text"
        className='searchbar'
        placeholder='Search anything...'
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Navbar;
