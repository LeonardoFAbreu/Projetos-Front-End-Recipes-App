const filterType = (input, radio) => {
  let urlSearch = '';
  if (radio === 'Ingredient') urlSearch = `filter.php?i=${input}`;
  if (radio === 'Name') urlSearch = `search.php?s=${input}`;
  if (radio === 'First letter') urlSearch = `search.php?f=${input}`;
  return urlSearch;
};

export const getMeals = async (input, radio) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/';
  try {
    const response = await fetch(`${URL}${filterType(input, radio)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDrinks = async (input, radio) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  try {
    const response = await fetch(`${URL}${filterType(input, radio)}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
