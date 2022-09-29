import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';

describe('Testa a tela de favorites', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/meals');
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push('/favorite-recipes');
  });

  test('Verifica se a receita aparece na tela', async () => {
    await waitFor(() => {
      const mealsRecipeFav = screen.getByTestId('0-horizontal-name');
      expect(mealsRecipeFav).toBeInTheDocument();
      const mealsRecipeFav2 = screen.getByTestId('1-horizontal-name');
      expect(mealsRecipeFav2).toBeInTheDocument();
    });
  });
  test('Verifica se os filtros existem', async () => {
    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    expect(btnMeals).toBeInTheDocument();
    userEvent.click(btnMeals);
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrinks).toBeInTheDocument();
    userEvent.click(btnDrinks);
  });
  test('Verifica se é possivel clicar na imagem ', async () => {
    await waitFor(() => {
      const mealsRecipeFav = screen.getByTestId('0-horizontal-image');
      expect(mealsRecipeFav).toBeInTheDocument();
      userEvent.click(mealsRecipeFav);
      const meals = screen.getByTestId('recipe-photo');
      expect(meals).toBeInTheDocument();
    });
  });
  test.only('Verifica se ao clicar em btnFavorite é possivel copiar a url', async () => {
    await waitFor(() => {
      const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');
      expect(btnFavorite).toBeInTheDocument();
      userEvent.click(btnFavorite);

      // expect(favoriteRecipes).toHaveLength(1);
    });
  });
  test('Verifica se ao clicar em btnShare é possivel copiar a url', async () => {
    await waitFor(() => {
      // document.execCommand = jest.fn();
      const btnShare = screen.getByTestId('0-horizontal-share-btn');
      expect(btnShare).toBeInTheDocument();
      userEvent.click(btnShare);
      // const clipBoard = screen.getByText('Link copied!');
      // expect(clipBoard).toBeInTheDocument();
    });
  });
});
