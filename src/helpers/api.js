const getMeals = async (input, radio) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/';
  let urlSearch = '';
  if (radio === 'Ingredient') urlSearch = `filter.php?i=${input}`;
  if (radio === 'Name') urlSearch = `search.php?s=${input}`;
  if (radio === 'First letter') urlSearch = `search.php?f=${input}`;
  try {
    const response = await fetch(`${URL}${urlSearch}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getMeals;
