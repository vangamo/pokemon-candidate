import React, { Component } from 'react';
import PokemonService from '../services/PokemonService';
import SearchBox from './SearchBox';
import Pile from './Pile';
import '../stylesheets/App.scss';

/**
 * Main component.
 * Prints the search box section and the pile of cards.
 * Also, keeps a list of all Pokemons names and URI and performs the search filter.
 * 
 */

class App extends Component {
  constructor(props) {
    super(props);

    this.ALL_POKEMONS = [];

    this.state = {
      searchText: '',
      pokemonList: []
    }

    this.searchPokemons = this.searchPokemons.bind( this );
  }


  /**
   * Changes the search keyword stored in the state.
   * Then, starts the Pokemon filtering process.
   * 
   * @param {String} text 
   */

  searchPokemons( text ) {
    this.setState( { searchText: text }, () => { this.filterPokemons(); } );
  }


  /**
   * Filters the Pokemon according to the keyword typed in the search box and puts the result
   * in the state.
   * It performs a full text search: search all Pokemons which have the keyword in its name.
   * 
   */

  filterPokemons() {
    const cleanText = this.state.searchText.trim().toLowerCase();

    if( cleanText === '' ) {
      this.setState( { pokemonList: this.ALL_POKEMONS.slice( 0, 6 ) } )
    }
    else {
      const matchExpression  = RegExp( cleanText, 'gi' );
      const filteredPokemons = this.ALL_POKEMONS.filter( (pokemonData) => matchExpression.test( pokemonData.name ) );
      this.setState( { pokemonList: filteredPokemons } )
    }
  }

  /**
   * Fetch all Pokemon names and URIs at start.
   * Then, starts the Pokemon filtering process to update the state.
   * 
   */

  componentDidMount() {
    PokemonService.getInstance()
    .getPokemons( '' )
    .then(  data  => {
      this.ALL_POKEMONS = data;
      this.filterPokemons();
    })
    .catch( error => { console.error(error); });  
  }


  /**
   * Prints search section using SearchBox component and the list of Pokemon cards using Pile component.
   * 
   */

  render() {
    return (
    <div className="app">
      <section className="header">
        <SearchBox handleSearch={this.searchPokemons} searchText={this.state.searchText}/>
      </section>
      <Pile pokemonList={this.state.pokemonList}/>
    </div>
    );
  }
}

export default App;