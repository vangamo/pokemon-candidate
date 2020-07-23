import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import CardParent, { capitalize } from './CardParent';
import PokemonImage from './PokemonImage';
import PokemonData  from './PokemonData';
import '../stylesheets/Details.scss';

/**
 * Prints a single card with the Pokemon details filling all the with of the page.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 */

class Details extends CardParent {
  constructor( props ) {
    super(props);

    const [pokemonId, pokemonName] = props.match.params.key.split('-');

    this.state.id   = pokemonId;
    this.state.name = capitalize(pokemonName);

    this.handleClickGoBack = this.handleClickGoBack.bind( this );
  }

  /**
   * When the user clicks on the go back button this function loads the search page.
   */

  handleClickGoBack() {
    this.props.history.push( '/' );
  }

  /**
   * Prints data.
   *
   */

  render() {
    const pokemonData = this.state;
    const kindList    = this.printKindList();

    return (
      <section className="details">
        <div className="breadcrumb">
          <input type="button" className="back" value="Volver a la lista" onClick={this.handleClickGoBack} />
        </div>
        <article className="card big">
          <PokemonImage name={pokemonData.name} id={pokemonData.id} imageURI={pokemonData.imageURI} />
          <PokemonData  name={pokemonData.name} kinds={kindList}    evolvesFrom={pokemonData.evolvesFrom} />
        </article>
      </section>
    );
  }
}

Details.propTypes = {
  match:   PropTypes.object.isRequired
};

Details.defaultProps = {
  // match isRequired
};

export default withRouter( Details );