import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/SearchBox.scss';

/**
 * Prints the search box with an input text.
 * This component monitorizes the user input and calls to refresh the search
 * results when the user pressed Enter key or is typing a new text.
 *
 * Needs handleSearch prop from parent with a function that updates the search.
 *
 */

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: props.searchText
    }
    this.keyPressedTimeout = null;

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleChange     = this.handleChange.bind(this);
  }

  /**
   * Calls to the parent function handleSearch to lift the search keyword
   * to the parent component.
   * This function is called when the user is typing or presses Enter key.
   *
   */

  launchSearch() {
    const searchText = this.state.searchText.trim();
    this.props.handleSearch( searchText );
  }

  /**
   * Auto-updates the state with the input value.
   *
   * @param {Event} event Event object generated.
   */

  handleChange( event ) {
    this.setState({ searchText: event.target.value });
  }

  /**
   * Detects which key has pressed the user.
   * If has pressed Enter, performs a lifting calling search update
   * function of parent Component.
   * If has pressed other key, waits a fraction of a second to check if
   * the user is already typing and then performs the lifting.
   *
   * @param {Event} event Event object with the key info.
   */

  handleKeyPressed( event ) {
    var code = (event.keyCode ? event.keyCode : event.which);

    if( this.keyPressedTimeout != null ) {
      clearTimeout( this.keyPressedTimeout );
    }

    if( code===13 ) {
      event.preventDefault();
      this.launchSearch();
    }
    else {
      this.keyPressedTimeout = setTimeout(
        () => { this.launchSearch(); },
        300
        );
    }
  }
  
  /**
   * Prints the search box with a input text element.
   * The input auto-refreshes the state.
   *
   */

  render() {
    return (
      <div className="searchbox">
        <input className="search" type="text" placeholder="Filtra pokemons por nombre" value={this.state.searchText} onChange={this.handleChange} onKeyUp={this.handleKeyPressed} />
      </div>
    );
  }
}

SearchBox.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchText:   PropTypes.string
};

SearchBox.defaultProps = {
  // handleSearch isRequired
  searchText: ''
};

export default SearchBox;