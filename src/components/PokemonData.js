import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/PokemonData.scss';

/**
 * Prints the information about a Pokemon inside a card
 * 
 * @param {Array[Object]} props 
 */
const PokemonData = (props) => {

  return (
    <div className="whitepart">
      <div className="name">{props.name}</div>
      <div className="kind">{props.kinds}</div>
      {!!props.evolvesFrom && (
        <div className="evolution">
          <div className="ttile">Evoluciona de:</div>
          <div className="parent">EVOL</div>
        </div>
      )}
    </div>
  );
};


PokemonData.propTypes = {
  name:        PropTypes.string.isRequired,
  kinds:       PropTypes.node.isRequired,
  evolvesFrom: PropTypes.string
};

PokemonData.defaultProps = {
  // name, kinds isRequired
  evolvesFrom: null
};

export default PokemonData;