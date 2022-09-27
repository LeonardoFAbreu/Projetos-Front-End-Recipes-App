import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function Drinks() {
  const { drinkRecipes } = useContext(MyContext);

  const cards = drinkRecipes;

  const maximumCards = 12;

  return (
    <div>
      <Header title="Drinks" showSearch showProfile />
      Drinks
      {cards.length > 0 && cards.map((card, index) => (
        index < maximumCards
        && (
          <div key={ card.idDrink } data-testid={ `${index}-recipe-card` }>
            {card.idDrink}
            <p data-testid={ `${index}-card-name` }>{ card.strDrink }</p>
            <img
              src={ card.strDrinkThumb }
              alt={ card.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        )
      ))}
    </div>
  );
}
