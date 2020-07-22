import React, { Component } from 'react';
import '../stylesheets/SearchBox.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: props.searchText
    }

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleChange     = this.handleChange.bind(this);
  }

  launchSearch() {
    const searchText = this.state.searchText.trim();
    this.props.handleSearch( searchText );
  }

  handleChange( event ) {
    this.setState({ searchText: event.target.value });
  }

  handleKeyPressed( event ) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if( code===13 ) {
      event.preventDefault();
      this.launchSearch();
    }
  }
  
  render() {
    return (
      <div className="searchbox">
        <input className="search" type="text" placeholder="Filtra pokemons por nombre" value={this.state.searchText} onChange={this.handleChange} onKeyUp={this.handleKeyPressed} />
      </div>
    );
  }
}

export default SearchBox;