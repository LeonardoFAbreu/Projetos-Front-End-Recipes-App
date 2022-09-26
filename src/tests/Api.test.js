import getMeals from '../helpers/api';

test('Verifica se a api é chamada', async () => {
  await getMeals('comida', 'Ingredient');
  await getMeals('comida', 'Name');
  await getMeals('c', 'First letter');
  await getMeals('c', 'Batata');
});
