import React, { Component } from 'react';
import PokemonService from '../services/PokemonService';
import '../stylesheets/Card.scss';

/**
 * Helper function to capitalize a string.
 * I.E.
 *   capitalize( 'text' )  --> 'Text'
 * 
 * @param {String} text 
 */

export function capitalize( text ) {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
}

/**
 * Prints a single card with the Pokemon data.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 */

class CardParent extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      id: 0,
      name: '',
      imageURI: '',
      kind: [],
      evolvesFrom: null
    };

    this.isComponentMounted = true;
  }

  /**
   * Use DidMount to double fetch the Pokemon data using PokemonService.
   * It has to take Pokemon data from two endpoints:
   *  - /pokemon/         For the sprite image and kind of the Pokemon
   *  - /pokemon-species/ For the evolution data
   * This data is stored in the state.
   * This function uses a hack inside the fetch process to prevent memory
   * leaks due to lost information when the fetch response arrives too late.
   * It checks if the component has been unmount before assign the data.
   *
   */

  componentDidMount() {
    const pokemonId = this.state.id;

    PokemonService.getInstance()
      .getPokemonData( pokemonId )
      .then( data => {
        if( this.isComponentMounted ) {
          this.setState({
            ...this.state,
            ...data,
            name: capitalize( data.name )
          });
        }
      })
      .catch(error => {console.error(error);});

    PokemonService.getInstance()
      .getPokemonEvolution( pokemonId )
      .then( data => {
        if( this.isComponentMounted ) {
          this.setState({
            ...this.state,
            ...data
          });
        }
      })
      .catch(error => {console.error(error);});
  }

  /**
   * Completes the hack used in the fetch functions into componentDidMount().
   * 
   */

   componentWillUnmount() {
    this.isComponentMounted = false;
  }

  /**
   * Prints data.
   *
   */

  printKindList() {
    const pokemonData = this.state;
    const kindList    = pokemonData.kind.map( kind => (
      <span key={kind}>{kind}</span>
    ));
  
    return kindList;
  }
}


export default CardParent;