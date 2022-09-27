import { getMeals, getDrinks, verifyApiResponse, filterByCategory } from '../helpers/api';

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
});
