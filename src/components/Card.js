import React, { useState, useEffect } from 'react';
import PokemonService from '../services/PokemonService';
import '../stylesheets/Card.scss';

function capitalize( text ) {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
}

const useFetchPokemon = (id) => {
  const [pokemonData, setPokemonData] = useState({
    id: id,
    name: '',
    imageURI: '',
    kind: [],
    evolvesFrom: null
  });

  useEffect(() => {
    PokemonService.getInstance()
      .getPokemon( id )
      .then( data => {
        setPokemonData({
          ...data,
          name: capitalize( data.name )
        });
      })
      .catch(error => {console.error(error);});
  });

  return pokemonData;
}

const App = (props) => {
  const pkId = props.uri.substr(-2,1);
  const pokemonData = useFetchPokemon(pkId);

  const kindList = pokemonData.kind.map( kind => (
    <span>{kind}</span>
  ));

  return (
    <article className="card">
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

export default App;