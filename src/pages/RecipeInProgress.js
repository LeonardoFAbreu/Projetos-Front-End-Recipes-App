import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FavoriteAndShare from '../components/FavoriteAndShare';
import { getRecipesById } from '../helpers/api';
import { getRecipeIngredients } from '../helpers/services';

export default function RecipeInProgress() {
  const [recipesDetails, setRecipesDetails] = useState({});

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

  // const newTypeSemS = type.replace('s', '');

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
                  className="form-check-input me-2"
                  value={ ingredient }
                />
                { ingredient }
              </label>
            )))}
          </ul>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-11 text-center">
          <button
            type="button"
            className="btn btn-md btn-warning"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
