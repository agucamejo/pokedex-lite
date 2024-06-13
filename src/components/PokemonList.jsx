import { useState } from 'react';
import PropTypes from 'prop-types';
import PokemonDetailsModal from './DetailsPokemon';
import usePokemons from '../hooks/usePokemons';

const PokeList = ({ userId }) => {
  const [pokemons, setPokemons] = usePokemons(userId);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleTypeChange = (event, pokemonId) => {
    const selectedType = event.target.value;
    setPokemons(prevPokemons => 
      prevPokemons.map(pokemon =>
        pokemon.id === pokemonId ? { ...pokemon, selectedType } : pokemon
      )
    );
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <h2>My Pokemons</h2>
      <ul>
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
      </ul>
      {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} onClose={handleCloseModal} /> }
    </div>
  );
};

PokeList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default PokeList;