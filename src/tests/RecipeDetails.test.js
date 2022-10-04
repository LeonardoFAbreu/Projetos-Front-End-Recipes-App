import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';
const CONTINUE = 'Continue Recipe';

describe('Testa a tela RecipeDetails', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '17222',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      tags: [],
    },
  ];
  test('Verifica se existem os ingredientes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/meals/53060');
      const firstIngredient = screen.getByTestId('0-ingredient-name-and-measure');
      expect(firstIngredient).toBeInTheDocument();
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
    });
  });
  test('Verifica o Botao Start', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupoo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/drinks/15997');
      const firstIngredient = screen.getByText('Start Recipe');
      expect(firstIngredient).toBeInTheDocument();
    });
  });

  test('Verifica O Botao Start', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupoo12@trybee.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/meals/53060');
      const firstIngredient = screen.getByText('Start Recipe');
      expect(firstIngredient).toBeInTheDocument();
    });
  });

  test('Verifica os recomendados', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybeee.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/drinks/17203/in-progress');
      const ingredient = screen.getByTestId('0-ingredient-step');
      userEvent.click(ingredient);
    });
    await waitFor(() => {
      history.push('/drinks/17203');
      const continueButton = screen.getByText(CONTINUE);
      expect(continueButton).toBeInTheDocument();
    });
  });
  test('Verifica o botao CONTINUE', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybee.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      history.push('/meals/52977/in-progress');
      const ingredient = screen.getByTestId('0-ingredient-step');
      userEvent.click(ingredient);
    });

    await waitFor(() => {
      history.push('/meals/52977');
      const continueButton = screen.getByText('Continue Recipe');
      expect(continueButton).toBeInTheDocument();
    });
  });
  test('Verifica os recomendados', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybee.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await waitFor(() => {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      history.push('/meals/52977');
      const continueButton = screen.getByText(CONTINUE);
      expect(continueButton).not.toBeInTheDocument();
    });
  });
});
