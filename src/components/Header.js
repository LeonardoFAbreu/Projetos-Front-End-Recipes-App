import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const [showInputSearch, setShowInputSearch] = useState(false);

  const [inputSearch, setInputSearch] = useState('');

  const { title, showSearch, showProfile } = props;

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  return (
    <div>
      <h2 data-testid="page-title">{title}</h2>
      {showProfile && (
        <Link to="/profile">
          <img
            alt="profile"
            src={ profileIcon }
            data-testid="profile-top-btn"
          />
        </Link>
      )}
      <br />
      <br />
      {showSearch && (
        <>
          <img
            alt="search"
            src={ searchIcon }
            onClick={ () => setShowInputSearch(!showInputSearch) }
            role="presentation"
            style={ { cursor: 'pointer' } }
            data-testid="search-top-btn"
          />
          {showInputSearch && (
            <input
              type="text"
              name="search"
              value={ inputSearch }
              placeholder="search"
              onChange={ handleInputSearch }
              data-testid="search-input"
            />
          )}
          <SearchBar inputSearch={ inputSearch } title={ title } />
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  showProfile: PropTypes.bool.isRequired,
};
