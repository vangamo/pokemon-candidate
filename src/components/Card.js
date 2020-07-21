import React, { Component } from 'react';
import '../stylesheets/Card.scss';

const App = (props) => {
  const pkId = props.uri.substr(-2,1);
  const pokemonData = {
    id: pkId,
    name: '',
    imageURI: '',
    kind: [],
    evolvesFrom: null
  };

  const kindList = pokemonData.kind.map( kind => (
    <span>{kind}</span>
  ));

  return (
    <article className="card">
      <div className="greypart">
        <div className="photo">
          <img src="none" alt="IMG" />
        </div>
        <span className="id">
          ID / {pokemonData.id}
        </span>
      </div>
      <div className="whitepart">
        <div className="name">{pokemonData.name}</div>
        <div className="kind">{kindList}</div>
        <div className="evolution">
          <div className="ttile">Evoluciona de:</div>
          <div className="parent">EVOL</div>
        </div>
      </div>
    </article>
  );
}


export default App;