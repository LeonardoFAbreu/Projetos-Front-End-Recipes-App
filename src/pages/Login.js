import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    isButtonEnterDisabled: true,
  });

  const validateInputs = () => {
    const minimumPasswordLength = 5;
    const isValidEmail = /\S+@\S+\.\S+/.test(inputs.email);
    const isValidLength = inputs.password.length > minimumPasswordLength;
    return !(isValidEmail && isValidLength);
  };

  const handleLoginForm = ({ target }) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
      isButtonEnterDisabled: validateInputs(),
    }));
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputs.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <form>
      <input
        type="text"
        name="email"
        value={ inputs.email }
        placeholder="email"
        onChange={ handleLoginForm }
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        value={ inputs.password }
        placeholder="password"
        onChange={ handleLoginForm }
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ inputs.isButtonEnterDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
