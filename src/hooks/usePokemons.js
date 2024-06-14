import { useState, useEffect } from 'react';
import { fetchPokemons } from '../services/pokemonServices';

/**
 * This file is a custom hook for fetching and managing pokemons data associated with a specific user.
 * @param {string} userId The ID of the user whose pokemons are to be fetched.
 * @returns {[Array, Function]} An array containing the fetched pokemons array and a function to update it.
 */

const usePokemons = (userId) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Function to fetch pokemons data asynchronously and update state.
    const fetchPokemonsData = async () => {
      try {
        const pokemonsData = await fetchPokemons(userId);
        setPokemons(pokemonsData);
      } catch (error) {
        console.error(error);
      }
    };

     // Fetch pokemons data when userId changes
    fetchPokemonsData();
  }, [userId]);

  return [pokemons, setPokemons];
};

export default usePokemons;