import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Loading from '../components/Loading';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function Recipes() {
  const { foodRecipes, isLoading } = useContext(MyContext);

  const cards = foodRecipes;

  const maximumCards = 12;

  return (
    <>
      <Header title="Meals" showSearch showProfile />
      <div className="container mt-3">
        <div className="row justify-content-center">
          {isLoading && <Loading />}
          {!isLoading && cards.length > 0 && cards.map((card, index) => (
            index < maximumCards
          && <Card
            key={ card.idMeal }
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
