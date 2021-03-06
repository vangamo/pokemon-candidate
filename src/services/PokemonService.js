const BASE_URL                   = 'https://pokeapi.co/api/v2/';
const POKEMON_DATA_ENDPOINT      = 'pokemon/';
const POKEMON_EVOLUTION_ENDPOINT = 'pokemon-species/';
const LIMIT                      = 811;

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
   * 
   * @param {String} name 
   */ 

  getPokemons() {
    let apiURL = BASE_URL + POKEMON_DATA_ENDPOINT;

    apiURL += '?limit=' + LIMIT;

    return fetch( apiURL )
      .then(response => response.json())
      .then(data => {
        const filteredData = data.results.map( pokemon => {
          const lastSlashPos = pokemon.url.lastIndexOf( '/', pokemon.url.length-2 );
          const pokemonId    = pokemon.url.substring( lastSlashPos+1, pokemon.url.length-1 );

          return { id: pokemonId, name: pokemon.name };
        });

        return filteredData;
      });
  }


  /**
   * Fetch the name, image and type of a specific Pokemon from de PokeAPI.
   * 
   * @param {int} id The ID to identify the Pokemon at the PokeAPI
   */

  getPokemonData( id ) {
    return fetch( BASE_URL + POKEMON_DATA_ENDPOINT + `${id}/` )
      .then( response => response.json() )
      .then( data => {
        const sortedTypes = data.types.sort( (first, second) => first.slot > second.slot );
        const kinds = sortedTypes.map( eachType => eachType.type.name );

        const pokemonData = {
          id:       data.id,
          name:     data.name,
          imageURI: data.sprites.front_default,
          kind:     kinds
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
    return fetch( BASE_URL + POKEMON_EVOLUTION_ENDPOINT + `${id}/` )
      .then( response => response.json() )
      .then( data => {
        if( !data.evolves_from_species ) {
          return null;
        }

        const pokemonData = {
          id:          data.id,
          evolvesFrom: data.evolves_from_species.name,
        };

        return pokemonData;
      })
  }
}

export default PokemonService;