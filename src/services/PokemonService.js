const BASE_URL           = 'http://pokeapi.salestock.net/api/v2/pokemon/';
const BASE_URL_EVOLUTION = 'http://pokeapi.salestock.net/api/v2/pokemon-species/';
const LIMIT              = 5;

/**
 * Helper class used as a service to group the interaction with the PokeAPI.
 * This class has to be used as a Singleton:
 *   PokemonService.getInstance()
 */

class PokemonService {

  static instance = null;

  static getInstance() {
    if (null === PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }

    return PokemonService.instance;
  }


  /**
   * Fetch a list of pokemons from PokeAPI.
   * If a name is provided, finds only one Pokemon which has that name.
   * 
   * @param {String} name 
   */ 

  getPokemons( name ) {
    name = name.trim().toLowerCase();

    let apiURL = BASE_URL;
    if( !!name && name !== '' ) {
      apiURL += name + '/';
    }

    apiURL += '?limit=' + LIMIT;

    return fetch( apiURL )
      .then(response => response.json())
      .then(data => {
        const filteredData = data.results.map( pokemon => ({ name: pokemon.name, uri: pokemon.url }) );

        return filteredData;
      });
  }


  /**
   * Fetch the name, image and type of a specific Pokemon from de PokeAPI.
   * 
   * @param {int} id The ID to identify the Pokemon at the PokeAPI
   */

  getPokemonData( id ) {
    return fetch( BASE_URL + `${id}/` )
      .then( response => response.json() )
      .then( data => {
        const sortedTypes = data.types.sort( (first, second) => first.slot > second.slot );
        const kinds = sortedTypes.map( eachType => eachType.type.name );

        const pokemonData = {
          id:    data.id,
          name:  data.name,
          image: data.sprites.front_default,
          kind:  kinds
        };

        return pokemonData;
      })
  }


  /**
   * Fetch the parent name of the Pokemon evolution line.
   * 
   * @param {int} id The ID to identify the Pokemon at the PokeAPI
   */

  getPokemonEvolution( id ) {
    return fetch( BASE_URL_EVOLUTION + `${id}/` )
      .then( response => response.json() )
      .then( data => {
        const pokemonData = {
          id:          data.id,
          evolvesFrom: data.evolves_from_species.name,
        };

        return pokemonData;
      })
  }
}

export default PokemonService;