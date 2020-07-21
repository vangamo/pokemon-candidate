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
    let apiURL = BASE_URL;
    apiURL += '?limit=' + LIMIT;

    return fetch( apiURL )
      .then(response => response.json())
      .then(data => {
        const filteredData = data.results.map( pokemon => ({ name: pokemon.name, uri: pokemon.url }) );

        return filteredData;
      });
  }
}

export default PokemonService;