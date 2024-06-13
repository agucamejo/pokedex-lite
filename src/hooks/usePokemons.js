import { useState, useEffect } from 'react';
import { fetchPokemons } from '../services/pokemonServices';

const usePokemons = (userId) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonsData = async () => {
      try {
        const pokemonsData = await fetchPokemons(userId);
        setPokemons(pokemonsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonsData();
  }, [userId]);

  return [pokemons, setPokemons];
};

export default usePokemons;