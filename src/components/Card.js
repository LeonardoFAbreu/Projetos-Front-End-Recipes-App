import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const { id, index, name, image } = props;
  return (
    <Link
      to={ `${id}` }
      className="col-6 p-2 my-1"
      data-testid={ `${index}-recipe-card` }
    >
      <div
        className="border border-2 border-warning rounded-3 text-center shadow"

      >
        <p data-testid={ `${index}-card-name` } className="my-2">{ name }</p>
        <img
          src={ image }
          className="img-fluid img-thumbnail"
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
