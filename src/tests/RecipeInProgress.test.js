import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';

describe('Testa a tela RecipeDetails', () => {
  test('Verifica se existem os ingredientes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/meals/52977');
      const firstIngredient = screen.getByTestId('0-ingredient-name-and-measure');
      expect(firstIngredient).toBeInTheDocument();
      const buttonStart = screen.getByText('Start Recipe');
      userEvent.click(buttonStart);
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
    });
  });
  test('Verifica se existem os ingredientes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/drinks/15997');
      const firstIngredient = screen.getByTestId('0-ingredient-name-and-measure');
      expect(firstIngredient).toBeInTheDocument();
      const buttonStart = screen.getByText('Start Recipe');
      userEvent.click(buttonStart);
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    });
  });

  test('Verifica se existem os ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupoo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/drinks/15997/in-progress');
      const ingredient = screen.getByTestId('0-ingredient-step');
      expect(ingredient).toBeInTheDocument();
    });
  });
});
