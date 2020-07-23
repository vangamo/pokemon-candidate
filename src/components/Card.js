import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
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
 * Hook to double fetch the Pokemon data using PokemonService.
 * It has to take Pokemon data from two endpoints:
 *  - /pokemon/         For the sprite image and kind of the Pokemon
 *  - /pokemon-species/ For the evolution data
 * 
 * @param {int} id It's the numeric ID (set by API) of the Pokemon to fetch.
 */

const useFetchPokemon = (id, name) => {
  const [pokemonData, setPokemonData] = useState({
    id: id,
    name: capitalize(name),
    imageURI: '',
    kind: [],
    evolvesFrom: null
  });

  useEffect(() => {
    PokemonService.getInstance()
      .getPokemonData( id )
      .then( data => {
        setPokemonData({
          ...pokemonData,
          ...data,
          name: capitalize( data.name )
        });
      })
      .catch(error => {console.error(error);});

      PokemonService.getInstance()
        .getPokemonEvolution( id )
        .then( data => {
          setPokemonData({
            ...pokemonData,
            ...data
          });
        })
        .catch(error => {console.error(error);});
  });

  return pokemonData;
}


/**
 * Prints a single card with the Pokemon data.
 * It has two parts:
 *  - Grey part with the image and ID.
 *  - White part with the name, type and evolves from info.
 * 
 * @param {*} props 
 */

const Card = (props) => {
  const pokemonData = useFetchPokemon( props.id, props.name );

  const history = useHistory();

  function handleClick() {
    history.push( `/details/${props.id}-${props.name}`  );
  }

  const kindList = pokemonData.kind.map( kind => (
    <span key={kind}>{kind}</span>
  ));

  return (
    <article className="card" onClick={handleClick}>
      <div className="greypart">
        <div className="photo">
          <img src={pokemonData.image} alt={'Imagen de ' + pokemonData.name} />
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

Card.propTypes = {
  id:   PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

Card.defaultProps = {
  // id,name isRequired
};


export default Card;