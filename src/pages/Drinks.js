import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Filters from '../components/Filters';

export default function Drinks() {
  const { drinksRecipes, isLoading, drinksCategories } = useContext(MyContext);

  const cards = drinksRecipes;

  const maximumCards = 12;

  return (
    <>
      <Header title="Drinks" showSearch showProfile />
      <Filters categories={ drinksCategories } />
      <div className="container mt-3">
        <div className="row justify-content-center">
          {isLoading && <Loading />}
          {(!isLoading && cards.length > 0) && cards.map((card, index) => (
            index < maximumCards
          && <Card
            key={ card.idDrink }
            id={ `/drinks/${card.idDrink}` }
            index={ index }
            name={ card.strDrink }
            image={ card.strDrinkThumb }
          />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
