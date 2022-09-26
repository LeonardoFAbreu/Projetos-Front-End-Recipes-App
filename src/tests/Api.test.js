import { getMeals, getDrinks } from '../helpers/api';

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
});
