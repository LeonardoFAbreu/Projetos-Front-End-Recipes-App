import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import Recommended from '../components/Recommended';
import StartRecipes from '../components/StartRecipes';
import { getRecipesById } from '../helpers/api';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function RecipesDetails() {
  const [recipesDetails, setRecipesDetails] = useState([]);

  const [shared, setShared] = useState(false);

  const { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getRecipesById('meals', id);
      setRecipesDetails(data.meals[0]);
    };
    getDetails();
  }, [id]);

  const embedVideo = (urlYoutube) => {
    const limit = -1;
    const embed = 'https://www.youtube.com/embed/';
    return `${embed}${urlYoutube.split('=', limit)[1]}`;
  };

  const getIngredients = () => {
    const totalOfIngredients = 21;
    const ingredients = [];
    for (let index = 1; index < totalOfIngredients; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      ingredients.push(`${recipesDetails[ingredient]} ${recipesDetails[measure]}`);
    }
    return ingredients;
  };
  const saveFavorite = () => {
    const favorites = {
      id: recipesDetails.idMeal,
      type: 'meal',
      nationality: recipesDetails.strArea,
      category: recipesDetails.strCategory,
      alcoholicOrNot: '',
      name: recipesDetails.strMeal,
      image: recipesDetails.strMealThumb,
    };
    const arr = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const data = [...arr, favorites];
    localStorage.setItem('favoriteRecipes', JSON.stringify(data));
  };

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShared(true);
  };

  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const trueOrFalse = recipes.some((element) => element.id === id);

  return (
    <>
      <p data-testid="recipe-title">{ recipesDetails.strMeal }</p>
      <p data-testid="recipe-category">{ recipesDetails.strCategory }</p>
      <img
        src={ trueOrFalse ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        onClick={ () => saveFavorite() }
        role="presentation"
        data-testid="favorite-btn"
      />
      <img
        src={ shareIcon }
        alt="Share"
        onClick={ handleShare }
        role="presentation"
        data-testid="share-btn"
      />
      {shared && <span>Link copied!</span>}
      <img
        src={ recipesDetails.strMealThumb }
        alt={ recipesDetails.strMeal }
        className="img-fluid mx-auto d-block"
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">{ recipesDetails.strInstructions }</p>
      {getIngredients().map((ingredient, index) => (
        ingredient !== 'undefined undefined'
       && (
         <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
           {ingredient}
         </p>)))}
      {recipesDetails.strYoutube && (
        <div className="ratio ratio-16x9">
          <iframe
            src={ embedVideo(recipesDetails.strYoutube) }
            title={ recipesDetails.strMeal }
            allowFullScreen
            data-testid="video"
          />
        </div>
      )}
      <Recommended />
      <StartRecipes id={ id } type="meals" />
    </>
  );
}
