import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import CardParent, { capitalize } from './CardParent';
import PokemonImage from './PokemonImage';
import PokemonData  from './PokemonData';
import '../stylesheets/Card.scss';

/**
 * Prints a single card with the Pokemon data.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 */

class Card extends CardParent {
  constructor( props ) {
    super( props );  // Create the state

    this.state.id   = props.id;
    this.state.name = capitalize( props.name );

    this.handleClick = this.handleClick.bind( this );
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
    const kindList    = this.printKindList();
  
    return (
      <article className="card" onClick={this.handleClick}>
        <PokemonImage name={pokemonData.name} id={pokemonData.id} imageURI={pokemonData.imageURI} />
        <PokemonData  name={pokemonData.name} kinds={kindList}    evolvesFrom={pokemonData.evolvesFrom} />
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