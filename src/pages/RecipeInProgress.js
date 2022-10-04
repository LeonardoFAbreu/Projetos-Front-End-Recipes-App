import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteAndShare from '../components/FavoriteAndShare';
import { getRecipesById } from '../helpers/api';
import { getRecipeIngredients, manageDoneRecipes } from '../helpers/services';

export default function RecipeInProgress({ history }) {
  const [recipesDetails, setRecipesDetails] = useState({});
  const INITIAL_STATE = {
    drinks: {},
    meals: {},
  };

  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || INITIAL_STATE,
  );

  const { id, type } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getRecipesById(type, id);
      setRecipesDetails(data[type][0]);
    };
    getDetails();
  }, [id, type]);

  const thumbUrl = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameRecipe = type === 'meals' ? 'strMeal' : 'strDrink';

  const getIngredients = () => getRecipeIngredients(recipesDetails);

  const addIngredientInProgressRecipe = (name) => {
    const arrayIngredients = inProgressRecipes[type][id] || [];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...inProgressRecipes[type],
        [id]: [...arrayIngredients, name] },
    }));
    setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  const removeIngredientInProgressRecipe = (name) => {
    const arrayIngredients = inProgressRecipes[type][id].filter((e) => e !== name);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...inProgressRecipes[type],
        [id]: arrayIngredients },
    }));
    setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  const handleChangeCheckbox = ({ target }) => {
    if (target.checked === true) {
      addIngredientInProgressRecipe(target.name);
    } else {
      removeIngredientInProgressRecipe(target.name);
    }
  };

  const ingredientIsChecked = (ingredient) => {
    const local = inProgressRecipes[type][id] || [];
    return local.includes(ingredient);
  };

  const allIngredientsChecked = () => {
    const filterIngredients = getIngredients();
    const allIngredients = [];
    filterIngredients.forEach((ingredient) => {
      if (ingredient !== 'undefined undefined' && ingredient
      !== 'null null' && ingredient !== '  ' && ingredient !== ' ') {
        allIngredients.push(ingredient);
      }
    });
    const local = inProgressRecipes[type][id] || [];
    return allIngredients.length !== local.length;
  };

  const addDoneRecipes = () => {
    manageDoneRecipes(type, recipesDetails);
    history.push('/done-recipes');
    return 0;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h3
          data-testid="recipe-title"
          className="text-center mt-3"
        >
          { recipesDetails[nameRecipe] }
        </h3>
        <h6
          data-testid="recipe-category"
          className="text-center text-muted"
        >
          { recipesDetails.strCategory }
        </h6>
      </div>
      <img
        src={ recipesDetails[thumbUrl] }
        alt={ recipesDetails.strMeal }
        className="img-fluid mx-auto d-block img-thumbnail"
        style={ { maxHeight: '400px' } }
        data-testid="recipe-photo"
      />
      <FavoriteAndShare
        recipesDetails={ recipesDetails }
        id={ id }
        location={ location }
        type={ type.replace('s', '') }
      />
      <div className="row justify-content-center">
        <div className="col-11">
          <ul className="list-group list-group-flush" data-testid="instructions">
            {getIngredients().map((ingredient, index) => (
              (ingredient !== 'undefined undefined' && ingredient
            !== 'null null' && ingredient !== '  ' && ingredient !== ' ')
            && (
              <label
                key={ index }
                htmlFor={ ingredient }
                className="list-group-item"
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  name={ ingredient }
                  className="form-check-input me-2"
                  value={ ingredient }
                  onChange={ handleChangeCheckbox }
                  checked={ ingredientIsChecked(ingredient) }
                />
                { ingredient }
              </label>
            )))}
          </ul>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-11 text-center">
          <button
            type="button"
            className="btn btn-md btn-warning my-3"
            data-testid="finish-recipe-btn"
            onClick={ () => addDoneRecipes() }
            disabled={ allIngredientsChecked() }
          >
            Finish Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
