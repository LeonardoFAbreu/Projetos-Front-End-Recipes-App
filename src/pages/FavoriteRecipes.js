import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { shareRecipe, saveFavorite } from '../helpers/services';

export default function FavoriteRecipes({ history }) {
  const [shared, setShared] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  useEffect(() => {
    setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, [isFavorite]);

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

  const handleClickFilter = (type) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (type === 'meal') {
      return setFavoritesRecipes(favorites.filter((e) => e.type === 'meal'));
    }
    if (type === 'drink') {
      return setFavoritesRecipes(favorites.filter((e) => e.type === 'drink'));
    }
    setFavoritesRecipes(favorites);
  };

  const favorites = favoritesRecipes;

  return (
    <div>
      <Header title="Favorite Recipes" showSearch={ false } showProfile />
      <button
        type="button"
        onClick={ () => handleClickFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favorites.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {checkType(recipe)}
          </p>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              role="presentation"
              style={ { maxHeight: '200px' } }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
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

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
