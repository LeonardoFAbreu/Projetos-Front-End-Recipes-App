import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getMeals from '../helpers/api';

export default function SearchBar(props) {
  const [radioSearchBar, setRadioSearchBar] = useState({ searchBar: '' });

  const handleSelectOrderControl = ({ target }) => {
    setRadioSearchBar((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const { inputSearch } = props;

  const handleSearch = () => {
    const { searchBar } = radioSearchBar;
    if (searchBar === 'First letter' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    getMeals(inputSearch, searchBar);
  };

  return (
    <div>
      <label className="form-check-label mx-2 mt-3" htmlFor="ingrediente">
        Ingredient
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="Ingredient"
          onChange={ handleSelectOrderControl }
          data-testid="ingredient-search-radio"
        />
      </label>
      <br />
      <label className="form-check-label mx-2" htmlFor="nome">
        Name
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="Name"
          onChange={ handleSelectOrderControl }
          data-testid="name-search-radio"
        />
      </label>
      <br />
      <label className="form-check-label mx-2" htmlFor="primeraLetra">
        First letter
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="First letter"
          onChange={ handleSelectOrderControl }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  inputSearch: PropTypes.string.isRequired,
};
