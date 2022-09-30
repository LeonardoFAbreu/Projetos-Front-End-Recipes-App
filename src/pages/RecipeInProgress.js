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
  console.log(recipesDetails);

  return (
    <div>
      RecipeInProgress
      <p data-testid="recipe-title">{ recipesDetails[nameRecipe] }</p>
      <p data-testid="recipe-category">{ recipesDetails.strCategory }</p>
      <FavoriteAndShare
        recipesDetails={ recipesDetails }
        id={ id }
        location={ location }
        type={ type }
      />
      <img
        src={ recipesDetails[thumbUrl] }
        alt={ recipesDetails.strMeal }
        className="img-fluid mx-auto d-block"
        data-testid="recipe-photo"
      />
      <div
        data-testid="instructions"
      >
        {getIngredients().map((ingredient, index) => (
          (ingredient !== 'undefined undefined' && ingredient
          !== 'null null' && ingredient !== '  ')
          && (
            <label
              key={ index }
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input id={ ingredient } type="checkbox" value={ ingredient } />
              { ingredient }
            </label>
          )))}
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}
