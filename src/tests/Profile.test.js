import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('Testa se ao clicar no botão é redirecionado para pagina Recipes', async () => {
  const emailTestID = 'email-input';
  const passwordID = 'password-input';
  const buttonEnterID = 'login-submit-btn';
  const { history } = renderWithRouter(<App />);
  const email = screen.getByTestId(emailTestID);
  const password = screen.getByTestId(passwordID);
  const buttonEnter = screen.getByTestId(buttonEnterID);
  userEvent.type(email, 'grupo12@trybe.com');
  userEvent.type(password, '1234567');
  userEvent.click(buttonEnter);
  history.push('/profile');
  const buttonLogout = screen.getByTestId('profile-logout-btn');
  userEvent.click(buttonLogout);
  expect(history.location.pathname).toBe('/');
});
