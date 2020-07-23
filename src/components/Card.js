import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import PokemonService from '../services/PokemonService';
import '../stylesheets/Card.scss';

/**
 * Helper function to capitalize a string.
 * I.E.
 *   capitalize( 'text' )  --> 'Text'
 * 
 * @param {String} text 
 */

function capitalize( text ) {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
}

/**
 * Prints a single card with the Pokemon data.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 */

class Card extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      id: props.id,
      name: capitalize(props.name),
      imageURI: '',
      kind: [],
      evolvesFrom: null
    };

    this.isComponentMounted = true;

    this.handleClick = this.handleClick.bind( this );
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
    const pokemonId = this.props.id;

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
   * When the user clicks on the card this function loads the details page.
   */

  handleClick() {
    this.props.history.push( `/details/${this.props.id}-${this.props.name}`  );
  }

  /**
   * Prints data.
   *
   */

  render() {
    const pokemonData = this.state;
    const kindList    = pokemonData.kind.map( kind => (
      <span key={kind}>{kind}</span>
    ));
  
    return (
      <article className="card" onClick={this.handleClick}>
        <div className="greypart">
          <div className="photo">
            <img src={pokemonData.imageURI} alt={ (pokemonData.imageURI==='') ? `Cargando imagen de ${pokemonData.name}` : `Imagen de ${pokemonData.name}`} />
          </div>
          <span className="id">
            ID / {pokemonData.id}
          </span>
        </div>
        <div className="whitepart">
          <div className="name">{pokemonData.name}</div>
          <div className="kind">{kindList}</div>
          {!!pokemonData.evolvesFrom && (
            <div className="evolution">
              <div className="ttile">Evoluciona de:</div>
              <div className="parent">EVOL</div>
            </div>
          )}
        </div>
      </article>
    );
  }
}

Card.propTypes = {
    id:   PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

Card.defaultProps = {
  // id,name isRequired
};

export default withRouter( Card );