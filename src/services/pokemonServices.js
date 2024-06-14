/**
 * This file manage the api's fetch request.
 */

const API_URL = 'http://localhost:4000';

/**
 * Fetches the list of pokemons associated with a specific user.
 * @param {string} userId The ID of the user whose pokemons are to be fetched.
 * @returns {Promise<Array>} An array of pokemons with additional details (types).
 * @throws {Error} If there is an error fetching pokemons or parsing the response.
 */
export const fetchPokemons = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemons');
    }
    const data = await response.json();

    // Transforming each pokemon object to add 'types' as an array of strings
    const pokemonsWithDetails = data.map(pokemon => ({
      ...pokemon,
      types: pokemon.types ? pokemon.types.split(',').map(type => type.trim()) : [],
    }));

    return pokemonsWithDetails;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
};


/**
 * Adds a new pokemon to the server.
 * @param {Object} pokemon The pokemon object to add.
 * @returns {Promise<Object>} The created pokemon object from the server.
 * @throws {Error} If there is an error while adding the pokemon.
 */

export const addPokemon = async (pokemon) => {
  try {
    const response = await fetch(`${API_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      throw new Error('Error at create Pokémon');
    }

    return await response.json();
  } catch (error) {
    console.error('Error at create Pokémon:', error);
    throw error;
  }
};

/**
 * Updates an existing pokemon on the server.
 * @param {Object} pokemon The pokemon object to update.
 * @returns {Promise<boolean>} True if the update was successful.
 * @throws {Error} If there is an error while updating the pokemon.
 */

export const updatePokemon = async (pokemon) => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${pokemon.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: pokemon.name,
        lvl: pokemon.lvl,
        evolutionId: pokemon.evolutionId,
        types: pokemon.types,
        urlImagen: pokemon.urlImagen,
        abilities: pokemon.abilities
      })
    });

    if (!response.ok) {
      throw new Error('Error at update Pokémon');
    }

    return true;
  } catch (error) {
    console.error('Error at update Pokémon:', error);
    throw error;
  }
};