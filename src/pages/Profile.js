import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile({ history }) {
  const [emailValue, setEmailValue] = useState();
  useEffect(() => {
    const email = localStorage.getItem('user');
    const objectEmail = JSON.parse(email);
    setEmailValue(objectEmail.email);
  }, []);

  const logoutAccount = (event) => {
    event.preventDefault();
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" showSearch={ false } showProfile />
      <h2 data-testid="profile-email">{ emailValue }</h2>
      <Link to="/done-recipes" data-testid="profile-done-btn">
        Done Recipes
      </Link>
      <Link to="/favorite-recipes" data-testid="profile-favorite-btn">
        Favorite Recipes
      </Link>
      <button
        type="button"
        onClick={ logoutAccount }
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
