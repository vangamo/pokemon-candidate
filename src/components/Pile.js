import React, { Component } from 'react';
import PokemonService from '../services/PokemonService';
import Card from './Card';
import '../stylesheets/Pile.scss';

class Pile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: []
    }
  }

  componentDidMount() {
    PokemonService.getInstance()
      .getPokemons( this.props.searchText )
      .then(  data  => { this.setState( {pokemonList: data} ); })
      .catch( error => { console.error(error); });
  }

  render() {
    const cards = this.state.pokemonList.map( pokemon => (
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