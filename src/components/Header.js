import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import logo from '../images/logo.png';
import logoTitle from '../images/title.png';

export default function Header(props) {
  const [showInputSearch, setShowInputSearch] = useState(false);

  const [inputSearch, setInputSearch] = useState('');

  const location = useLocation();

  const { title, showSearch, showProfile } = props;

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center p-1 shadow-sm align-items-center"
        style={ { background: '#f1f1f1' } }
      >
        <div className="col-3">
          <Link to="/meals">
            <img
              src={ logo }
              alt="Recipes Logo"
              className="img-fluid"
              style={ { maxWidth: '60px', borderRadius: '50%' } }
            />
          </Link>
        </div>
        <div className="col-6">
          <Link to="/meals">
            <img
              src={ logoTitle }
              alt="Recipes Title Logo"
              className="img-fluid"
              style={ { maxWidth: '180px' } }
            />
          </Link>
        </div>
        <div className="col-3 d-flex">
          {showSearch && (
            <img
              alt="search"
              src={ searchIcon }
              onClick={ () => setShowInputSearch(!showInputSearch) }
              className="img-fluid mx-auto d-block me-3"
              role="presentation"
              style={ { cursor: 'pointer' } }
              data-testid="search-top-btn"
            />
          )}
          {showProfile && (
            <Link to="/profile">
              <img
                alt="profile"
                className="img-fluid"
                src={ profileIcon }
                data-testid="profile-top-btn"
              />
            </Link>
          )}
          <Link to="/favorite-recipes">
            Fav
          </Link>
        </div>
      </div>
      <div className="row text-center mt-5 justify-content-center">
        <div className="col-10 align-items-center">
          {location.pathname === '/meals'
          && <i className="fa-solid fa-utensils me-2 fa-2xl" /> }
          {location.pathname === '/drinks'
          && <i className="fa-solid fa-martini-glass-citrus me-2 fa-2xl" /> }
          <span
            data-testid="page-title"
            className="d-block mt-2"
            style={ {
              fontSize: '2em',
              fontWeight: '700',
              color: '#f28300',
              letterSpacing: '0.3em',
            } }
          >
            {title}
          </span>
        </div>
      </div>
      <div className="row justify-content-center">
        <div
          className="col-10 text-center rounded-3"
          style={ { background: 'white' } }
        >
          {showInputSearch && (
            <>
              <input
                type="text"
                name="search"
                value={ inputSearch }
                placeholder="Search"
                className="form-control mt-3"
                onChange={ handleInputSearch }
                data-testid="search-input"
              />
              <SearchBar inputSearch={ inputSearch } title={ title } />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  showProfile: PropTypes.bool.isRequired,
};
