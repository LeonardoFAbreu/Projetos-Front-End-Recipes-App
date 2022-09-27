import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [drinkRecipes, setDrinkRecipes] = useState([]);

  const [foodRecipes, setFoodRecipes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
