import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Recommended from '../components/Recommended';
import FavoriteAndShare from '../components/FavoriteAndShare';
import StartRecipes from '../components/StartRecipes';
import { getRecipesById } from '../helpers/api';
import { embedVideo, getRecipeIngredients } from '../helpers/services';

export default function DrinksDetails() {
  const [recipesDetails, setRecipesDetails] = useState({});

  const { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getRecipesById('drinks', id);
      setRecipesDetails(data.drinks[0]);
    };
    getDetails();
  }, [id]);

  const getIngredients = () => getRecipeIngredients(recipesDetails);

  const handleVideo = (url) => embedVideo(url);

  return (
    <>
      <p data-testid="recipe-title">{ recipesDetails.strDrink }</p>
      <p data-testid="recipe-category">{ recipesDetails.strAlcoholic }</p>
      <FavoriteAndShare
        recipesDetails={ recipesDetails }
        id={ id }
        location={ location }
        type="drink"
      />
      <img
        src={ recipesDetails.strDrinkThumb }
        alt={ recipesDetails.strDrink }
        className="img-fluid mx-auto d-block"
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">{ recipesDetails.strInstructions }</p>
      {getIngredients().map((ingredient, index) => (
        ingredient !== 'undefined undefined' && ingredient !== 'null null'
                && (
                  <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                    {ingredient}
                  </p>)))}
      {recipesDetails.strYoutube && (
        <div className="ratio ratio-16x9">
          <iframe
            src={ handleVideo(recipesDetails.strYoutube) }
            title={ recipesDetails.strDrink }
            allowFullScreen
            data-testid="video"
          />
        </div>
      )}
      <Recommended />
      <StartRecipes id={ id } type="drinks" />
    </>
  );
}
