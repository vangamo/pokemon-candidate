import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PokemonService from '../services/PokemonService';
import SearchBox from './SearchBox';
import Pile from './Pile';
import Details from './Details';
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
      pokemonList: [],
      dataState: 'loading'
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
    if( this.props.history.location.pathname !== '/' ) {
      this.props.history.push('/');
    }
  }


  /**
   * Filters the Pokemon according to the keyword typed in the search box and puts the result
   * in the state.
   * It performs a full text search: search all Pokemons which have the keyword in its name.
   * 
   */

  filterPokemons() {
    const cleanText = this.state.searchText.trim().toLowerCase();
    this.setState( {dataState: 'filtering'} );

    if( cleanText === '' ) {
      this.setState( { pokemonList: this.ALL_POKEMONS.slice( 0, 6 ), dataState: 'done' } )
    }
    else {
      const matchExpression  = RegExp( cleanText, 'gi' );
      const filteredPokemons = this.ALL_POKEMONS.filter( (pokemonData) => matchExpression.test( pokemonData.name ) );
      this.setState( { pokemonList: filteredPokemons, dataState: 'done' } )
    }
  }

  /**
   * Fetch all Pokemon names and URIs at start.
   * Then, starts the Pokemon filtering process to update the state.
   * 
   */

  componentDidMount() {
    PokemonService.getInstance()
    .getPokemons()
    .then(  data  => {
      this.ALL_POKEMONS = data;
      this.filterPokemons();
    })
    .catch( error => {
      this.setState( {dataState: 'error'} );
     });
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
      <Switch>
        <Route exact path="/" render={ (routerProps) => (
          <Pile pokemonList={this.state.pokemonList} state={this.state.dataState}/>
        )} />
        <Route exact path="/details/:key" render={ (routerProps) => (
          <Details match={routerProps.match}/>
        )} />
      </Switch>
    </div>
    );
  }
}

export default withRouter( App );