import { getMeals, getDrinks, verifyApiResponse, filterByCategory } from '../helpers/api';
import { createNewDone, getDate, manageDoneRecipes, saveFavorite } from '../helpers/services';

const drinkDetails = {
  id: 15997,
  type: 'drinks',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  tags: null,
};
const mealDetails = {
  id: 52771,
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  tags: ['Pasta', 'Curry'],
};
describe('Verifica APIs', () => {
  test('Verifica a api de Meals', async () => {
    await getMeals('comida', 'Ingredient');
    await getMeals('comida', 'Name');
    await getMeals('c', 'First letter');
    await getMeals('c', 'Batata');
  });
  test('Verifica a api de Drinks', async () => {
    await getDrinks('bebida', 'Ingredient');
    await getDrinks('bebida', 'Name');
    await getDrinks('b', 'First letter');
    await getDrinks('b', 'suco');
  });
  test('Testa verifyApiResponse', () => {
    verifyApiResponse(['comida', 'bebida']);
  });
  test('Verifica o funcionamento da função filterByCategory', async () => {
    await filterByCategory('drinks', 'Shake');
    await filterByCategory('meals', 'Beef');
  });
  test('Verifica o funcionamento da função createFavorite', () => {
    saveFavorite(drinkDetails, 'drinks', 15997);
  });
  test('Verifica o funcionamento da função saveFavorite', () => {
    saveFavorite(mealDetails, 'meals', 52771);
  });
});

describe('Verifica o funcionamento das receitas concluidas', () => {
  test('Verifica o funcionamento da função manageDoneRecipes com uma comida', () => {
    manageDoneRecipes(mealDetails, 'meals');
  });
  test('Verifica o funcionamento da função manageDoneRecipes com uma comida', () => {
    manageDoneRecipes(drinkDetails, 'drinks');
  });
  test('testa getDate', () => {
    getDate();
  });
  test('testa createNewDone', () => {
    createNewDone('meal', mealDetails);
  });
  test('testa createNewDone', () => {
    createNewDone('drinks', drinkDetails);
  });
});
