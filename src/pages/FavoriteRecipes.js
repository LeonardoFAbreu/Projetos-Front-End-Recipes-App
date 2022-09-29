import React, { useState } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { shareRecipe, saveFavorite } from '../helpers/services';

export default function FavoriteRecipes() {
  const [shared, setShared] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const checkType = (recipe) => {
    if (recipe.type === 'drink') return `${recipe.alcoholicOrNot}`;
    return `${recipe.nationality} - ${recipe.category}`;
  };

  const handleFavorite = (recipe) => {
    const { type, id } = recipe;
    saveFavorite(recipe, type, id);
    setIsFavorite(!isFavorite);
  };

  const handleShare = (recipe) => {
    if (recipe.type === 'drink') {
      const url = `/drinks/${recipe.id}`;
      shareRecipe(url);
      return setShared(true);
    }
    const url = `/meals/${recipe.id}`;
    shareRecipe(url);
    return setShared(true);
  };

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  return (
    <div>
      <Header title="Favorite Recipes" showSearch={ false } showProfile />
      {favorites.map((recipe, index) => (
        <div key={ recipe.id }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {checkType(recipe)}
          </p>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <img
            src={ blackHeartIcon }
            alt="Favorite"
            onClick={ () => handleFavorite(recipe) }
            role="presentation"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
          <img
            src={ shareIcon }
            alt="Share"
            onClick={ () => handleShare(recipe) }
            role="presentation"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          {shared && <span>Link copied!</span>}
        </div>
      ))}
    </div>
  );
}
