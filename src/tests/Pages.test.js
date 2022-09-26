import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa se as páginas são renderizadas', () => {
  test('Verifica se...', () => {
    renderWithRouter(<DoneRecipes />);
    renderWithRouter(<Drinks />);
    renderWithRouter(<FavoriteRecipes />);
    renderWithRouter(<Profile />);
  });
});
