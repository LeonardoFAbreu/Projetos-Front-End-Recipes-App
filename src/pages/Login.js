import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

export default function Login({ history }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [button, setButton] = useState(true);

  const handleLoginForm = ({ target }) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    const minimumPasswordLength = 6;
    const isValidEmail = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/.test(inputs.email);
    const isValidLength = inputs.password.length > minimumPasswordLength;
    return setButton(!(isValidEmail && isValidLength));
  }, [inputs]);

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: inputs.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <div>
      <form onSubmit={ handleClick }>
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
          type="submit"
          data-testid="login-submit-btn"
          disabled={ button }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
