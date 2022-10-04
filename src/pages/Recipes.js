import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Filters from '../components/Filters';

export default function Recipes() {
  const { mealsRecipes, isLoading, mealsCategories } = useContext(MyContext);

  const cards = mealsRecipes;

  const maximumCards = 12;

  return (
    <>
      <Header title="Meals" showSearch showProfile />
      <Filters categories={ mealsCategories } />
      <div className="container mt-3">
        <div className="row justify-content-center">
          {isLoading && <Loading />}
          {(!isLoading && cards.length > 0) && cards.map((card, index) => (
            index < maximumCards
          && <Card
            key={ card.idMeal }
            id={ `/meals/${card.idMeal}` }
            index={ index }
            name={ card.strMeal }
            image={ card.strMealThumb }
          />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
