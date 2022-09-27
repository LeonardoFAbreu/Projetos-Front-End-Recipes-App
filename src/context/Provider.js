import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getMeals, getDrinks } from '../helpers/api';

export default function Provider({ children }) {
  const [drinkRecipes, setDrinkRecipes] = useState([]);

  const [foodRecipes, setFoodRecipes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const meals = async () => {
      const initialSearch = await getMeals('', 'Name');
      setFoodRecipes(initialSearch.meals);
    };
    meals();
    const drinks = async () => {
      const initialSearch = await getDrinks('', 'Name');
      setDrinkRecipes(initialSearch.drinks);
    };
    drinks();
    setIsLoading(false);
  }, []);

  const contextValue = {
    drinkRecipes,
    setDrinkRecipes,
    foodRecipes,
    setFoodRecipes,
    isLoading,
    setIsLoading,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
