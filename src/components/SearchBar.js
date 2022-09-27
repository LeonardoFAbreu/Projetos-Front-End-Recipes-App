import React, { useContext, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMeals, getDrinks, verifyApiResponse } from '../helpers/api';
import MyContext from '../context/MyContext';

function SearchBar(props) {
  const [radioSearchBar, setRadioSearchBar] = useState({ searchBar: '' });

  const { setDrinkRecipes, setFoodRecipes, setIsLoading } = useContext(MyContext);

  const location = useLocation();

  const handleSelectOrderControl = ({ target }) => {
    setRadioSearchBar((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const { inputSearch, history } = props;

  const searchNotFound = () => {
    setIsLoading(false);
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const { searchBar } = radioSearchBar;
    if (searchBar === 'First letter' && inputSearch.length > 1) {
      setIsLoading(false);
      return global.alert('Your search must have only 1 (one) character');
    }
    if (location.pathname === '/drinks') {
      const data = await getDrinks(inputSearch, searchBar);
      if (data.drinks === null) return searchNotFound();
      if (verifyApiResponse(data.drinks)) {
        setIsLoading(false);
        return history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
      setIsLoading(false);
      return setDrinkRecipes(data.drinks);
    }
    const data = await getMeals(inputSearch, searchBar);
    if (data.meals === null) return searchNotFound();
    if (verifyApiResponse(data.meals)) {
      setIsLoading(false);
      return history.push(`/meals/${data.meals[0].idMeal}`);
    }
    setIsLoading(false);
    return setFoodRecipes(data.meals);
  };

  return (
    <>
      <label className="form-check-label mx-2 mt-3" htmlFor="ingrediente">
        <input
          className="form-check-input me-1"
          type="radio"
          name="searchBar"
          value="Ingredient"
          onChange={ handleSelectOrderControl }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label className="form-check-label mx-2" htmlFor="nome">
        <input
          className="form-check-input me-1"
          type="radio"
          name="searchBar"
          value="Name"
          onChange={ handleSelectOrderControl }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label className="form-check-label mx-2" htmlFor="primeraLetra">
        <input
          className="form-check-input me-1"
          type="radio"
          name="searchBar"
          value="First letter"
          onChange={ handleSelectOrderControl }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        type="button"
        className="btn btn-md btn-warning d-block mx-auto my-3 col-10"
        style={ { fontSize: '1.2em' } }
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </>
  );
}

SearchBar.propTypes = {
  inputSearch: PropTypes.shape({
    length: PropTypes.number,
  }),
  title: PropTypes.string,
}.isRequired;

export default withRouter(SearchBar);
