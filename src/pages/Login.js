import React from 'react';

export default function Login() {
  return (
    <form>
      <input type="text" data-testid="email-input" placeholder="email" />
      <input type="password" data-testid="password-input" placeholder="password" />
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </form>
  );
}
