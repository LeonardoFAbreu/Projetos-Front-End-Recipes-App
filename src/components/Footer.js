import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div className="container-fluid fixed-bottom" data-testid="footer">
      <div
        className="row justify-content-between p-2 shadow-sm align-items-center"
        style={ { background: '#ffca2c' } }
      >
        <div className="col-3">

          <Link to="/drinks">
            <img
              src={ drinkIcon }
              alt="drink"
              className="img-fluid"
              style={ { maxWidth: '80px' } }
              data-testid="drinks-bottom-btn"
            />
          </Link>
        </div>
        <div className="col-2">
          <Link to="/meals">
            <img
              src={ mealIcon }
              alt="meal"
              className="img-fluid"
              style={ { maxWidth: '80px' } }
              data-testid="meals-bottom-btn"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
