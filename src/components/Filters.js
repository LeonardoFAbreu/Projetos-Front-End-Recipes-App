import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getMeals, getDrinks, filterByCategory } from '../helpers/api';
import MyContext from '../context/MyContext';
import funnel from '../assets/images/funnel.png';
import steak from '../assets/images/steak.png';
import breakfast from '../assets/images/breakfast.png';
import chicken from '../assets/images/chicken.png';
import sweets from '../assets/images/sweets.png';
import lamb from '../assets/images/lamb.png';
import ordinary from '../assets/images/ordinary.png';
import cocktail from '../assets/images/cocktail.png';
import shake from '../assets/images/shake.png';
import other from '../assets/images/other.png';
import cocoa from '../assets/images/cocoa.png';

export default function Filters(props) {
  const { categories } = props;

  const { setDrinkRecipes, setMealsRecipes } = useContext(MyContext);

  const [toggle, setToggle] = useState('');

  const firstsCategories = 5;

  const location = useLocation();

  const type = location.pathname;

  const handleClickFilterAll = async () => {
    if (type === '/meals') {
      const data = await getMeals('', 'Name');
      return setMealsRecipes(data.meals);
    }
    const data = await getDrinks('', 'Name');
    return setDrinkRecipes(data.drinks);
  };

  const handClickFilter = async (category) => {
    if (category === toggle) return handleClickFilterAll();
    if (type === '/meals') {
      const data = await filterByCategory('meals', category);
      setToggle(category);
      return setMealsRecipes(data.meals);
    }
    const data = await filterByCategory('drinks', category);
    setToggle(category);
    return setDrinkRecipes(data.drinks);
  };

  const mealsImages = [steak, breakfast, chicken, sweets, lamb];

  const drinksImages = [ordinary, cocktail, shake, other, cocoa];

  const filterImages = type === '/meals' ? mealsImages : drinksImages;

  return (
    <div className="container">
      <div className="row justify-content-center align-items-start mt-3">
        <div
          className="col-2 text-center"
          style={ { maxWidth: '90px' } }
        >
          <div className="div-image">
            <img
              src={ funnel }
              alt="All"
              className="img-fluid mx-auto d-block filter-image"
              role="presentation"
              onClick={ handleClickFilterAll }
            />
          </div>
          <span
            role="presentation"
            onClick={ handleClickFilterAll }
            className="text-filter"
            data-testid="All-category-filter"
          >
            All
          </span>
        </div>
        {categories.map((category, index) => (
          index < firstsCategories
        && (
          <div
            className="col-2 text-center"
            style={ { maxWidth: '90px' } }
            key={ category.strCategory }
          >
            <div className="div-image">
              <img
                src={ filterImages[index] }
                alt={ category.strCategory }
                role="presentation"
                onClick={ () => handClickFilter(category.strCategory) }
                className="img-fluid mx-auto d-block filter-image"
              />
            </div>
            <span
              role="presentation"
              onClick={ () => handClickFilter(category.strCategory) }
              className="text-filter"
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </span>
          </div>)
        ))}
      </div>
    </div>
  );
}

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
