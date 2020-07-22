import React from 'react';
import Card from './Card';
import '../stylesheets/Pile.scss';

const Pile = (props) => {
  const cards = props.pokemonList.map( pokemon => (
    <Card key={pokemon.uri} uri={pokemon.uri} name={pokemon.name}></Card>
  ));

  return (
    <section className="pile">
      {cards}
    </section>
  );
};

export default Pile;