import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const ingredientID = 'ingredient-search-radio';
const radioFirstLetter = 'first-letter-search-radio';
const nameSearch = 'name-search-radio';
const searchImgButtonID = 'search-top-btn';
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
    global.alert = jest.fn(() => 'Sorry, we haven\'t found any recipes for these filters.');
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(ingredientID);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'etyjhtyj');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });
  test('Verifica se quando apenas um prato é encontrado, o usuário é redirecionado automagicamente para a tela de detalhes da receita', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(ingredientID);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'Corba');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
  });
  test('Verifica se quando apenas um prato é encontrado, o usuário é redirecionado automagicamente para a tela de detalhes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(nameSearch);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'Corba');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });
  test('Verifica se quando apenas um drink é encontrado, o usuário é redirecionado automagicamente para a tela de detalhes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(nameSearch);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'Lassi - Mango');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/12698'));
  });
  test('Verifica se nenhum drink é encontrado, o usuário recebe um ALERT', async () => {
    global.alert = jest.fn(() => 'Sorry, we haven\'t found any recipes for these filters.');
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchButton = screen.getByTestId(searchImgButtonID);
    userEvent.click(searchButton);
    const radio = screen.getByTestId(nameSearch);
    userEvent.click(radio);
    const searchInput = screen.getByTestId(searchInputID);
    userEvent.paste(searchInput, 'dsfgdfgdfsg');
    const buttonSearch = screen.getByTestId(buttonSearchID);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });
});
