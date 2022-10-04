import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Recommended from '../components/Recommended';
import FavoriteAndShare from '../components/FavoriteAndShare';
import StartRecipes from '../components/StartRecipes';
import { getRecipesById } from '../helpers/api';
import { embedVideo, getRecipeIngredients } from '../helpers/services';

export default function DrinksDetails() {
  const [recipesDetails, setRecipesDetails] = useState({});

  const [continueButton, setContinueButton] = useState(false);

  const [doneRecipes, setDoneRecipes] = useState(false);

  const { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getRecipesById('drinks', id);
      setRecipesDetails(data.drinks[0]);
    };
    getDetails();
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (inProgress.drinks && inProgress.drinks[id]) {
      setContinueButton(true);
    }
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(done.some((recipe) => recipe.id === id));
  }, [id]);

  const getIngredients = () => getRecipeIngredients(recipesDetails);

  const handleVideo = (url) => embedVideo(url);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h3
          data-testid="recipe-title"
          className="text-center mt-3"
        >
          { recipesDetails.strDrink }
        </h3>
        <h6
          data-testid="recipe-category"
          className="text-center text-muted"
        >
          { recipesDetails.strAlcoholic }
        </h6>
      </div>
      <img
        src={ recipesDetails.strDrinkThumb }
        alt={ recipesDetails.strDrink }
        className="img-fluid mx-auto d-block img-thumbnail"
        style={ { maxHeight: '400px' } }
        data-testid="recipe-photo"
      />
      <FavoriteAndShare
        recipesDetails={ recipesDetails }
        id={ id }
        location={ location }
        type="drink"
      />
      <div className="row justify-content-center">
        <div className="col-11">
          <p data-testid="instructions">{ recipesDetails.strInstructions }</p>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item bg-secondary text-white text-center"
        >
          Ingredients
        </li>
        {getIngredients().map((ingredient, index) => (
          (ingredient !== 'undefined undefined' && ingredient
          !== 'null null' && ingredient !== '  ' && ingredient !== ' ')
        && (
          <li
            key={ index }
            className="list-group-item"
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>)))}
      </ul>
      {recipesDetails.strYoutube && (
        <div className="ratio ratio-16x9 my-4">
          <iframe
            src={ handleVideo(recipesDetails.strYoutube) }
            title={ recipesDetails.strDrink }
            allowFullScreen
            data-testid="video"
          />
        </div>
      )}
      <Recommended />
      {!doneRecipes
      && <StartRecipes id={ id } type="drinks" continueButton={ continueButton } />}
    </div>
  );
}
