import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../helpers/api';

export default function DrinksDetails() {
  const [recipesDetails, setRecipesDetails] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getRecipesById('drinks', id);
      setRecipesDetails(data.drinks[0]);
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
      if (recipesDetails[ingredient] != null) {
        if (recipesDetails[measure] !== null) {
          ingredients.push(`${recipesDetails[ingredient]} ${recipesDetails[measure]}`);
        } else {
          ingredients.push(recipesDetails[ingredient]);
        }
      }
    }
    return ingredients;
  };

  return (
    <div>
      <p data-testid="recipe-title">{ recipesDetails.strDrink }</p>
      <p data-testid="recipe-category">{ recipesDetails.strAlcoholic }</p>
      <img
        src={ recipesDetails.strDrinkThumb }
        alt={ recipesDetails.strDrink }
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
            title={ recipesDetails.strDrink }
            allowFullScreen
            data-testid="video"
          />
        </div>)}
    </div>
  );
}
