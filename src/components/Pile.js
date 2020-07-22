import React, { Component } from 'react';
import Card from './Card';
import '../stylesheets/Pile.scss';

class Pile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.pokemonList.map( pokemon => (
      <Card key={pokemon.uri} uri={pokemon.uri} name={pokemon.name}></Card>
    ));

    return (
      <section className="pile">
        {cards}
      </section>
    );
  }
}

export default Pile;