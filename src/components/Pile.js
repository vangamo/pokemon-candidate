import React from 'react';
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

export default Pile;