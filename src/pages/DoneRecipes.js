import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { shareRecipe } from '../helpers/services';

export default function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  }, []);
  const [shared, setShared] = useState(false);

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

  const checkType = (recipe) => {
    if (recipe.type === 'drink') return `${recipe.alcoholicOrNot}`;
    return `${recipe.nationality} - ${recipe.category}`;
  };

  const handleClickFilter = (type) => {
    let dones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (type === 'meals') {
      dones = dones.filter((e) => e.type === 'meal');
    }
    if (type === 'drinks') {
      dones = dones.filter((e) => e.type === 'drink');
    }
    setDoneRecipes(dones);
  };

  return (
    <div>
      <Header title="Done Recipes" showSearch={ false } showProfile />
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
            onClick={ () => handleClickFilter('meals') }
            data-testid="filter-by-meal-btn"
          >
            <i className="fa-solid fa-bowl-food" />
            {' '}
            Meals
          </button>
          <button
            type="button"
            className="btn btn-md btn-secondary mx-1"
            onClick={ () => handleClickFilter('drinks') }
            data-testid="filter-by-drink-btn"
          >
            <i className="fa-solid fa-martini-glass-citrus" />
            {' '}
            Drinks
          </button>
        </div>
        {doneRecipes.map((recipe, index) => (
          <div
            key={ recipe.id }
            className="row align-items-center my-3 p-3 border"
            style={ { background: 'white' } }
          >
            <div className="col-4">

              <img
                src={ recipe.image }
                alt={ recipe.name }
                onClick={ () => {
                  history.push(`/${recipe.type.replace('s', '')}s/${recipe.id}`);
                } }
                role="presentation"
                style={ { maxHeight: '200px' } }
                className="img-fluid mx-auto d-block img-thumbnail"
                data-testid={ `${index}-horizontal-image` }
              />

            </div>
            <div className="col-8">
              <Link
                to={ `/${recipe.type.replace('s', '')}s/${recipe.id}` }
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {checkType(recipe)}
              </p>
              <p>
                {(recipe.tags).map((tag) => (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
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

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
