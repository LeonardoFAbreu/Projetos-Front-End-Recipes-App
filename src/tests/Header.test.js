import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';

const searchImgButtonID = 'search-top-btn';
const searchInputID = 'search-input';
describe('Testa o header', () => {
  test('Verifica se é possível digitar na barra de pesquisa', () => {
    renderWithRouter(<Recipes />);
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.type(searchInput, 'onion');
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
