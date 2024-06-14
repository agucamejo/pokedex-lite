import { useState } from 'react';
import PropTypes from 'prop-types';
import PokemonDetailsModal from './DetailsPokemon';
import usePokemons from '../hooks/usePokemons';

/**
 * Component to display a list of user's pokemons.
 * @param {Object} props Component props.
 * @param {number} props.userId User ID to fetch pokemons.
 * @returns {JSX.Element} JSX element representing the list of pokemons.
 */

const PokeList = ({ userId }) => {
  const [pokemons, setPokemons] = usePokemons(userId);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  //Handles type change for a specific pokemon where pokemonId is the ID of the pokemon being edited.
  const handleTypeChange = (event, pokemonId) => {
    const selectedType = event.target.value;
    setPokemons(prevPokemons => 
      prevPokemons.map(pokemon =>
        pokemon.id === pokemonId ? { ...pokemon, selectedType } : pokemon
      )
    );
  };

  const handlePokemonClick = (pokemon) => {
    if (event.target.tagName.toLowerCase() !== 'select') {
      setSelectedPokemon(pokemon);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <h2>My Pokemons</h2>
      { pokemons ? (
        <ul className='list-container'>
          {pokemons.map(({  id, name, lvl, evolutionId, types, selectedType, urlImagen, abilities }) => (
            <li key={id} onClick={() => handlePokemonClick({  id, name, lvl, evolutionId, types, selectedType, urlImagen, abilities })}>
              <select value={selectedType} onChange={(event) => handleTypeChange(event, id)}>
                {types.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              <strong>{name}</strong> Level: {lvl}  
            </li>
          ))}
        </ul>) : (<h4>No pokemons found. Try adding your first one.</h4>)}
      {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} onClose={handleCloseModal} /> }
    </div>
  );
};

PokeList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default PokeList;