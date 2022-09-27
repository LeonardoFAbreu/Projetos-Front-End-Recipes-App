import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import logo from '../images/logo.png';

function LoginForm({ history }) {
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
    <form
      onSubmit={ handleClick }
      className="col-10 col-md-6 col-lg-4 rounded-3 p-4 shadow"
      style={ { maxWidth: '400px', background: 'white' } }
    >
      <img
        src={ logo }
        alt="Recipes Logo"
        className="img-fluid mx-auto d-block"
        style={ { maxHeight: '150px' } }
      />
      <div className="input-group my-3">
        <span className="input-group-text" style={ { background: '#FFC36B' } }>
          <i className="fa-solid fa-envelope" />
        </span>
        <input
          type="text"
          name="email"
          value={ inputs.email }
          placeholder="email"
          className="form-control"
          onChange={ handleLoginForm }
          data-testid="email-input"
        />
      </div>
      <div className="input-group my-3">
        <span className="input-group-text" style={ { background: '#FFC36B' } }>
          <i className="fa-solid fa-key" />
        </span>
        <input
          type="password"
          name="password"
          value={ inputs.password }
          placeholder="password"
          className="form-control"
          onChange={ handleLoginForm }
          data-testid="password-input"
        />
      </div>
      <button
        type="submit"
        className={
          `btn btn-md btn-warning d-block mx-auto my-3 col-10 button-theme-bg
        ${button && 'disabled'}`
        }
        data-testid="login-submit-btn"
        disabled={ button }
      >
        Enter
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default withRouter(LoginForm);
