import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../stylesheets/Pile.scss';
import IMG_ERROR from '../images/pika-error.gif';

/**
 * Prints the list of selected Pokemon cards.
 * It receives a list of objects that contains the Pokemon's name and its URI.
 * 
 * @param {Array[Object]} props 
 */
const Pile = (props) => {
  const cards = props.pokemonList.map( pokemon => (
    <Card key={pokemon.id} id={pokemon.id} name={pokemon.name}></Card>
  ));

  return (
    <section className="pile">
      { (props.state === 'loading')   && (<div className="message">Cargando datos...</div>) }
      { (props.state === 'filtering') && (<div className="message">Filtrando Pokémons...</div>) }
      { (props.state === 'done')      && (cards) }
      { (props.state === 'error')     && (<div className="error"><div>Hemos tenido un error de conexión</div><img src={IMG_ERROR} alt="Pikachu asustado por la situación" /></div>) }
    </section>
  );
};

const STATE_VALUES = [ 'loading', 'filtering', 'done', 'error' ];

Pile.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  state:       PropTypes.oneOf(STATE_VALUES)
};

Pile.defaultProps = {
  // pokemonList isRequired
  state: 'loading'
};

export default Pile;