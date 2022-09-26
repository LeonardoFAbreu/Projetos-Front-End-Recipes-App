import React from 'react';

export default function SearchBar() {
  // const [radioSearchBar, setRadioSearchBar] = useState({ searchBar: '' });

  // const handleSelectOrderControl = ({ target }) => {
  //   setRadioSearchBar((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  return (
    <div>
      <label className="form-check-label mx-2 mt-3" htmlFor="ingrediente">
        Ingrediente
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="Ingrediente"
          // onChange={ handleSelectOrderControl }
          data-testid="ingredient-search-radio"
        />
      </label>
      <br />
      <label className="form-check-label mx-2" htmlFor="nome">
        Nome
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="Nome"
          // onChange={ handleSelectOrderControl }
          data-testid="name-search-radio"
        />
      </label>
      <br />
      <label className="form-check-label mx-2" htmlFor="primeraLetra">
        Primeira letra
        <input
          className="form-check-input ms-1"
          type="radio"
          name="searchBar"
          value="Primeira letra"
          // onChange={ handleSelectOrderControl }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}
