const BASE_URL = 'http://pokeapi.salestock.net/api/v2/pokemon/';
const LIMIT    = 5;

class PokemonService {

  static instance = null;

  static getInstance() {
    if (null === PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }

    return PokemonService.instance;
  }

  getPokemons( name ) {
    name = name.trim().toLowerCase();

    let apiURL = BASE_URL;
    if( name !== '' ) {
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

  getPokemon( id ) {
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
}

export default PokemonService;