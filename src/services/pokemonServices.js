const API_URL = 'http://localhost:4000';

export const fetchPokemons = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/pokemons/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemons porque la respuesta no es ok');
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
    const response = await fetch(`${API_URL}/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el Pokémon');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al agregar el Pokémon:', error);
    throw error;
  }
};

export const updatePokemon = async (pokemon) => {
  try {
    const response = await fetch(`${API_URL}/pokemons/${pokemon.id}`, {
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
      throw new Error('Error al actualizar el Pokémon');
    }

    return true;
  } catch (error) {
    console.error('Error al actualizar el Pokémon:', error);
    throw error;
  }
};