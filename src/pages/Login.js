import React, { useState } from 'react';

export default function Login() {
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
      >
        Enter
      </button>
    </form>
  );
}
