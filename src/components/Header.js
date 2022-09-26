import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { title, showSearch, showProfile } = props;
  return (
    <div>
      <h2 data-testid="page-title">{title}</h2>
      {showProfile && (
        <img
          alt="profile"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      )}
      <br />
      <br />
      {showSearch && (
        <img
          alt="search"
          src={ searchIcon }
          data-testid="search-top-btn"
        />
      )}
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  showProfile: PropTypes.bool.isRequired,
};
