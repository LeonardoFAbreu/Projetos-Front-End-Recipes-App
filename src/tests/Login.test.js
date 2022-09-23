import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a tela de Login', () => {
  test('Verifica se os inputs do formulário de login existem', async () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });
  test('Verifica se é possível digitar nos inputs', async () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).not.toBeDisabled();
  });
});
