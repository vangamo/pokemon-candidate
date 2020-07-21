import React, { Component } from 'react';
import '../stylesheets/SearchBox.scss';

class SearchBox extends Component {
  render() {
    return (
      <div className="searchbox">
        <input className="search" type="text" placeholder="Filtra pokemons por nombre" />
      </div>
    );
  }
}

export default SearchBox;