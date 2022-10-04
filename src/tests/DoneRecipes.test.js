import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';

document.execCommand = jest.fn().mockResolvedValue('');

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
describe('Testa a tela de favorites', () => {
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

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/meals');
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  });

  const img = '0-horizontal-image';
  test('Verifica se os botões de compartilhar são clicáveis', async () => {
    await waitFor(() => {
      jest.spyOn(navigator.clipboard, 'writeText');
      const doneMealShareButton = screen.getByTestId('0-horizontal-share-btn');
      const doneDrinkShareButton = screen.getByTestId('1-horizontal-share-btn');
      userEvent.click(doneMealShareButton, doneDrinkShareButton);
      const btnShare1 = screen.getByTestId('0-horizontal-share-btn');
      expect(btnShare1).toBeInTheDocument();
      userEvent.click(btnShare1);
      userEvent.click(doneDrinkShareButton);
      // const clipBoard1 = screen.getByText('Link copied!')[0];
      // expect(clipBoard1).toBeInTheDocument();
    });
    // const clipBoard1 = screen.getAllByText('Link copied!')[0];
    // expect(window.navigator.clipboard.writeText)
    //   .toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  test('Verifica se encaminha para pagina Detalhes', async () => {
    await waitFor(() => {
      const imgThumb = screen.getByTestId(img);
      userEvent.click(imgThumb);
      const imgDetail = screen.getByTestId('recipe-photo');
      expect(imgDetail).toBeInTheDocument();
    });
  });

  test('Verifica se aparece Comida no filtro MEALS', async () => {
    await waitFor(() => {
      const buttonMeals = screen.getByTestId('filter-by-meal-btn');
      userEvent.click(buttonMeals);
      const imgMeals = screen.getByTestId(img);
      expect(imgMeals).toBeInTheDocument();
    });
  });
  test('Verifica se aparece Bebida no filtro Drinks', async () => {
    await waitFor(() => {
      const buttonDrink = screen.getByTestId('filter-by-drink-btn');
      userEvent.click(buttonDrink);
      const imgDrink = screen.getByTestId('1-horizontal-image');
      expect(imgDrink).toBeInTheDocument();
    });
  });
  test('Verifica se ao clicar em ALL, Limpa os filtros', async () => {
    await waitFor(() => {
      const imgThumb = screen.getByTestId('filter-by-all-btn');
      userEvent.click(imgThumb);
      const imgMeals = screen.getByTestId(img);
      const imgDrink = screen.getByTestId('1-horizontal-image');
      expect(imgMeals).toBeInTheDocument();
      expect(imgDrink).toBeInTheDocument();
    });
  });
});
