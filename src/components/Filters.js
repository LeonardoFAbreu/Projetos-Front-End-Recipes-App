import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getMeals, getDrinks, filterByCategory } from '../helpers/api';
import MyContext from '../context/MyContext';

export default function Filters(props) {
  const { categories } = props;

  const { setDrinkRecipes, setMealsRecipes } = useContext(MyContext);

  const firstsCategories = 5;

  const location = useLocation();

  const type = location.pathname;

  const handClickFilter = async (category) => {
    if (type === '/meals') {
      const data = await filterByCategory('meals', category);
      return setMealsRecipes(data.meals);
    }
    const data = await filterByCategory('drinks', category);
    return setDrinkRecipes(data.drinks);
  };

  const handleClickFilterAll = async () => {
    if (type === '/meals') {
      const data = await getMeals('', 'Name');
      return setMealsRecipes(data.meals);
    }
    const data = await getDrinks('', 'Name');
    return setDrinkRecipes(data.drinks);
  };

  return (
    <>
      <div className="col-2">
        <button
          type="button"
          onClick={ handleClickFilterAll }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      {categories.map((category, index) => (
        index < firstsCategories
        && (
          <div className="col-3" key={ category.strCategory }>
            <button
              type="button"
              onClick={ () => handClickFilter(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          </div>)
      ))}
    </>
  );
}

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
