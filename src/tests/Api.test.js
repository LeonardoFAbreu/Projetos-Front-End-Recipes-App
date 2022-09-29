import { getMeals, getDrinks, verifyApiResponse, filterByCategory } from '../helpers/api';
import { createFavorite } from '../helpers/services';

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
    const drinkDetails = {
      id: 15997,
      type: 'drinks',
      nationality: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    };
    createFavorite('drinks', drinkDetails);
  });
});
