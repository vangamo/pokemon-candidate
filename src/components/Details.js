import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import PokemonService from '../services/PokemonService';
import '../stylesheets/Details.scss';

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
 * Prints a single card with the Pokemon details filling all the with of the page.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 */

class Details extends Component {
  constructor( props ) {
    super(props);

    const [pokemonId, pokemonName] = props.match.params.key.split('-');

    this.state = {
      id: pokemonId,
      name: capitalize(pokemonName),
      imageURI: '',
      kind: [],
      evolvesFrom: null
    };

    this.isComponentMounted = true;

    this.handleClickGoBack = this.handleClickGoBack.bind( this );
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
    PokemonService.getInstance()
      .getPokemonData( this.state.id )
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
      .getPokemonEvolution( this.state.id )
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
    const kindList    = pokemonData.kind.map( kind => (
      <span key={kind}>{kind}</span>
    ));

    return (
      <section className="details">
        <div className="breadcrumb">
          <input type="button" className="back" value="Volver a la lista" onClick={this.handleClickGoBack} />
        </div>
        <article className="card big">
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