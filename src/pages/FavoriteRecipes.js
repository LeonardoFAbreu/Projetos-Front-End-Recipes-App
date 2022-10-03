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
      <div className="container">
        <div className="col-12 text-center my-4">
          <button
            type="button"
            onClick={ () => handleClickFilter('all') }
            className="btn btn-md btn-secondary mx-1"
            data-testid="filter-by-all-btn"
          >
            <i className="fa-solid fa-filter" />
            {' '}
            All
          </button>
          <button
            type="button"
            className="btn btn-md btn-secondary mx-1"
            onClick={ () => handleClickFilter('meal') }
            data-testid="filter-by-meal-btn"
          >
            <i className="fa-solid fa-bowl-food" />
            {' '}
            Meals
          </button>
          <button
            type="button"
            className="btn btn-md btn-secondary mx-1"
            onClick={ () => handleClickFilter('drink') }
            data-testid="filter-by-drink-btn"
          >
            <i className="fa-solid fa-martini-glass-citrus" />
            {' '}
            Drinks
          </button>
        </div>
        {favorites.map((recipe, index) => (
          <div
            key={ recipe.id }
            className="row align-items-center my-3 p-3 border"
            style={ { background: 'white' } }
          >
            <div className="col-4">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                  role="presentation"
                  style={ { maxHeight: '200px' } }
                  className="img-fluid mx-auto d-block img-thumbnail"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div className="col-8">
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
              <img
                src={ blackHeartIcon }
                alt="Favorite"
                onClick={ () => handleFavorite(recipe) }
                role="presentation"
                className="img-fluid me-2"
                style={ { maxWidth: '26px', cursor: 'pointer' } }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
              <img
                src={ shareIcon }
                alt="Share"
                onClick={ () => handleShare(recipe) }
                role="presentation"
                className="img-fluid me-2"
                style={ { maxWidth: '26px', cursor: 'pointer' } }
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {shared && <span>Link copied!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
