import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile({ history }) {
  const email = localStorage.getItem('user');
  const objectEmail = JSON.parse(email);

  const logoutAccount = (event) => {
    event.preventDefault();
    history.push('/');
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" showSearch={ false } showProfile />
      <div className="container">
        <h5 data-testid="profile-email" className="text-center my-4">
          { objectEmail && objectEmail.email }
        </h5>
        <div className="row justify-content-center">
          <Link
            to="/done-recipes"
            className="col-3 btn btn-sm btn-warning"
            data-testid="profile-done-btn"
          >
            <i className="fa-solid fa-check me-1" />
            Done Recipes
          </Link>
          <Link
            to="/favorite-recipes"
            className="col-4 btn btn-sm btn-warning mx-1"
            data-testid="profile-favorite-btn"
          >
            <i className="fa-regular fa-heart me-2" />
            Favorite Recipes
          </Link>
          <button
            type="button"
            className="col-3 btn btn-sm btn-danger"
            onClick={ logoutAccount }
            data-testid="profile-logout-btn"
          >
            <i className="fa-solid fa-right-from-bracket me-2" />
            {' '}
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
