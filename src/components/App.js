import React, { Component } from 'react';
import PokemonService from '../services/PokemonService';
import SearchBox from './SearchBox';
import Pile from './Pile';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      pokemonList: []
    }
  }

  componentDidMount() {
    PokemonService.getInstance()
      .getPokemons( this.state.searchText )
      .then(  data  => { this.setState( {pokemonList: data} ); })
      .catch( error => { console.error(error); });
  }

  render() {
    return (
    <div className="app">
      <section className="header">
        <SearchBox searchText={this.state.searchText}/>
      </section>
      <Pile pokemonList={this.state.pokemonList}/>
    </div>
    );
  }
}

export default App;