import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';

export default function Provider({ children }) {
  // const [titlePage, setTitlePage] = useState('');
  const contextValue = {
  };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
