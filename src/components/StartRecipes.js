import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function StartRecipes(props) {
  const { id, type, continueButton } = props;

  return (
    <div className="container-fluid fixed-bottom" data-testid="start-recipe-btn">
      <div
        className="row justify-content-center p-2 shadow-sm align-items-center"
        style={ { background: '#ffca2c' } }
      >
        <div className="col-5 text-center">
          <Link
            to={ `/${type}/${id}/in-progress` }
            type="button"
            className="btn btn-md btn-dark"
          >
            {continueButton === true ? 'Continue Recipe' : 'Start Recipe'}
          </Link>
        </div>
      </div>
    </div>
  );
}

StartRecipes.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  continueButton: PropTypes.bool.isRequired,
};
