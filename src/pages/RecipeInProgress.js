import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FavoriteAndShare from '../components/FavoriteAndShare';
import { getRecipesById } from '../helpers/api';

export default function RecipeInProgress() {
  const [recipesDetails, setRecipesDetails] = useState({});

  console.log(recipesDetails);

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
        checkBox
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
