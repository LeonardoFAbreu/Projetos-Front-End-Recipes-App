import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';

const searchImgButtonID = 'search-top-btn';
const radioFirstLetter = 'first-letter-search-radio';
const searchInputID = 'search-input';
const buttonSearchID = 'exec-search-btn';
describe('Testa o component SearchBar', () => {
  test('Verifica se é possível pesquisar pela primeira letra', () => {
    renderWithRouter(<Recipes />);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'onion');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalled();
  });

  test('Verifica se é possível pesquisar por ingrediente', () => {
    renderWithRouter(<Recipes />);
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.type(searchInput, 'o');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
  });
});
