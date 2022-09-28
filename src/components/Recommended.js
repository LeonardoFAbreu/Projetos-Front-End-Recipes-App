import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function Recommended() {
  const { mealsRecipes, drinksRecipes, isLoading } = useContext(MyContext);

  const location = useLocation();

  const type = location.pathname;

  const cards = type.includes('meals') ? drinksRecipes : mealsRecipes;

  const maximumCards = 6;
  return (
    <>
      <div className="wrapper">
        {
          (!isLoading && cards.length > 0) && cards.map((card, index) => (
            index < maximumCards)
          && (
            <div
              key={ index }
              className="item"
              data-testid={ `${index}-recommendation-card` }
            >
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {type.includes('meals') ? card.strDrink : card.strMeal}
              </p>
            </div>
          ))
        }
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
