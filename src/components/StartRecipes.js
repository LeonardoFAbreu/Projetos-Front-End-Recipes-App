import React from 'react';

export default function StartRecipes() {
  return (
    <div className="container-fluid fixed-bottom" data-testid="start-recipe-btn">
      <div
        className="row justify-content-center p-2 shadow-sm align-items-center"
        style={ { background: '#ffca2c' } }
      >
        <div className="col-3">
          <button
            type="button"
            className="btn btn-md btn-dark"
          >
            Start Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
