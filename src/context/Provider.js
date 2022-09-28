import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import {
  getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories,
} from '../helpers/api';

export default function Provider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);

  const [mealsCategories, setMealsCategories] = useState([]);

  const [drinksRecipes, setDrinkRecipes] = useState([]);

  const [drinksCategories, setDrinksCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const meals = async () => {
      const initialSearch = await getMeals('', 'Name');
      setMealsRecipes(initialSearch.meals);
    };
    meals();
    const drinks = async () => {
      const initialSearch = await getDrinks('', 'Name');
      setDrinkRecipes(initialSearch.drinks);
    };
    drinks();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const meals = async () => {
      const initialSearch = await getMealsCategories();
      setMealsCategories(initialSearch.meals);
    };
    meals();
    const drinks = async () => {
      const initialSearch = await getDrinksCategories();
      setDrinksCategories(initialSearch.drinks);
    };
    drinks();
  }, []);

  const contextValue = {
    drinksRecipes,
    setDrinkRecipes,
    mealsRecipes,
    setMealsRecipes,
    isLoading,
    setIsLoading,
    mealsCategories,
    drinksCategories,
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
