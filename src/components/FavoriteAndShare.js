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

  useEffect(() => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoritesRecipes.some((recipe) => recipe.id === id));
  }, [id, isFavorite]);

  const handleFavorite = () => setIsFavorite(saveFavorite(recipesDetails, type, id));

  const handleShare = () => {
    shareRecipe(location.pathname.replace('/in-progress', ''));
    setShared(true);
  };

  return (
    <div className="row justify-content-start my-2">
      <div className="col-2 text-end">

        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite"
          onClick={ handleFavorite }
          role="presentation"
          className="img-fluid"
          style={ { maxWidth: '26px', cursor: 'pointer' } }
          data-testid="favorite-btn"
        />
      </div>
      <div className="col-10 text-start">
        <img
          src={ shareIcon }
          alt="Share"
          onClick={ handleShare }
          role="presentation"
          className="img-fluid"
          style={ { maxWidth: '26px', cursor: 'pointer' } }
          data-testid="share-btn"
        />
        {shared && <span className="ms-3">Link copied!</span>}
      </div>
    </div>
  );
}

FavoriteAndShare.propTypes = {
  recipesDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
