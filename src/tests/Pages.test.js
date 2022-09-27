import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import DrinksDetails from '../pages/DrinksDetails';
import RecipesDetails from '../pages/RecipesDetails';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Profile from '../pages/Profile';

describe('Testa se as páginas são renderizadas', () => {
  test('Verifica se...', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    history.push('/drinks');
  });
  test('Verifica se...', () => {
    renderWithRouter(<DrinksDetails />);
    renderWithRouter(<RecipesDetails />);
    renderWithRouter(<FavoriteRecipes />);
    renderWithRouter(<Profile />);
  });
});
