import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Recommended() {
  const { drinkRecipes, isLoading } = useContext(MyContext);

  const cards = drinkRecipes;

  const maximumCards = 6;
  return (
    <div className="wrapper">
      {
        (!isLoading && cards.length > 0) && cards.map((card, index) => (
          index < maximumCards)
          && (
            <div
              key={ card.idMeal }
              className="item"
              data-testid={ `${index}-recommendation-card` }
            >
              <p data-testid={ `${index}-recommendation-title` }>{card.strMeal}</p>
            </div>
          ))
      }
    </div>
  );
}
