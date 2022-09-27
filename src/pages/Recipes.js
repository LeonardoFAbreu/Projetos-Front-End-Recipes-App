import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function Recipes() {
  const { foodRecipes } = useContext(MyContext);

  const cards = foodRecipes;

  const maximumCards = 12;

  return (
    <div>
      <Header title="Meals" showSearch showProfile />
      Recipes
      {cards.length > 0 && cards.map((card, index) => (
        index < maximumCards
        && (
          <div key={ card.idMeal } data-testid={ `${index}-recipe-card` }>
            {card.idMeal}
            <p data-testid={ `${index}-card-name` }>{ card.strMeal }</p>
            <img
              src={ card.strMealThumb }
              alt={ card.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        )
      ))}
    </div>
  );
}
