export const verifyApiResponse = (data) => data.length === 1;

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
    return data;
  } catch (error) {
    return error;
  }
};

export const getMealsCategories = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDrinksCategories = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const filterByCategory = async (type, category) => {
  let urlSearch = '';
  if (type === 'meals') urlSearch = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  if (type === 'drinks') urlSearch = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const response = await fetch(urlSearch);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
