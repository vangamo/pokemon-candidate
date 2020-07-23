import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../stylesheets/Pile.scss';

/**
 * Prints the list of selected Pokemon cards.
 * It receives a list of objects that contains the Pokemon's name and its URI.
 * 
 * @param {Array[Object]} props 
 */
const Pile = (props) => {
  const cards = props.pokemonList.map( pokemon => (
    <Card key={pokemon.id} id={pokemon.id} name={pokemon.name}></Card>
  ));

  return (
    <section className="pile">
      {cards}
    </section>
  );
};

Pile.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
};

Pile.defaultProps = {
  // pokemonList isRequired
};

export default Pile;