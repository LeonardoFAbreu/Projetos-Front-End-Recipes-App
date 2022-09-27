import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [drinkRecipes, setDrinkRecipes] = useState([]);

  const [foodRecipes, setFoodRecipes] = useState([]);

  const contextValue = {
    drinkRecipes,
    setDrinkRecipes,
    foodRecipes,
    setFoodRecipes,
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
