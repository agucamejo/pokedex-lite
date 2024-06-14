const API_URL = 'http://localhost:4000';

export const fetchPokemons = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemons');
    }
    const data = await response.json();

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
    console.error('Error at update el Pokémon:', error);
    throw error;
  }
};