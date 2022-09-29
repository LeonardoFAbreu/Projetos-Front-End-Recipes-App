import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { shareRecipe, saveFavorite } from '../helpers/services';

export default function FavoriteAndShare(props) {
  const [shared, setShared] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const { recipesDetails, id, location, type } = props;
  console.log(recipesDetails);

  useEffect(() => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoritesRecipes.some((recipe) => recipe.id === id));
  }, [id, isFavorite]);

  const handleFavorite = () => setIsFavorite(saveFavorite(recipesDetails, type, id));

  const handleShare = () => {
    shareRecipe(location.pathname);
    setShared(true);
  };

  return (
    <>
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        onClick={ handleFavorite }
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
    </>
  );
}

FavoriteAndShare.propTypes = {
  recipesDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
