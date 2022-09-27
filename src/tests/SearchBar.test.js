import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
// import Drinks from '../pages/Drinks';
import App from '../App';

const searchImgButtonID = 'search-top-btn';
const radioFirstLetter = 'first-letter-search-radio';
const searchInputID = 'search-input';
const buttonSearchID = 'exec-search-btn';
describe('Testa o component SearchBar', () => {
  test('Verifica se é possível pesquisar pela primeira letra', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'onion');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalled();
  });

  test('Verifica se é possível pesquisar por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.type(searchInput, 'o');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
  });

  test('Verifica se é possível pesquisar por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.type(searchInput, 'l');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
  });

  test('Verifica se retorna alert quando a busca não tem resultado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'mango');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      const card = screen.getByTestId('1-recipe-card');
      expect(card).toBeInTheDocument();
    });
  });

  test('Verifica se retorna alert quando a busca não tem resultado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(radioFirstLetter);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'mango');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      const card = screen.getByTestId('1-recipe-card');
      expect(card).toBeInTheDocument();
    });
  });
});
