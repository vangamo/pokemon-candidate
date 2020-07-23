import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/PokemonImage.scss';

/**
 * Prints the sprite and ID of a Pokemon
 * 
 * @param {Array[Object]} props 
 */
const PokemonImage = (props) => {

  return (
    <div className="greypart">
      <div className="photo">
        <img src={props.imageURI} alt={ (props.imageURI==='') ? `Cargando imagen de ${props.name}` : `Imagen de ${props.name}`} />
      </div>
      <span className="id">
        ID / {props.id}
      </span>
  </div>
  );
};


PokemonImage.propTypes = {
  name:     PropTypes.string.isRequired,
  id:       PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ).isRequired,
  imageURI: PropTypes.string.isRequired
};

PokemonImage.defaultProps = {
  // name, id and imageURI isRequired
};

export default PokemonImage;