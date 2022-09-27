import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';

describe('Verifica o funcionamento da rota Filters', () => {
  test('Verifica a renderiçao de receitas com carne', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);
    await waitFor(() => {
      const beefCategory = screen.getByTestId('Beef-category-filter');
      userEvent.click(beefCategory);
      const firstBeefMeal = screen.getByTestId('0-recipe-card');
      expect(firstBeefMeal).toBeInTheDocument();
      const allButton = screen.getByTestId('All-category-filter');
      userEvent.click(allButton);
    });
  });
  test('Verifica a renderização das bebidas', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);
    await waitFor(() => {
      const drinksButton = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(drinksButton);
      const shakeButton = screen.getByTestId('Shake-category-filter');
      userEvent.click(shakeButton);
      const shakeCard = screen.getByTestId('0-recipe-card');
      expect(shakeCard).toBeInTheDocument();
      const allButton = screen.getByTestId('All-category-filter');
      userEvent.click(allButton);
    });
  });
});
