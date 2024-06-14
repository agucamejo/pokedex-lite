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
        </ul>) : (<h4>No estamos localizando tus Pokemons. Intenta agregando el primero.</h4>)}
      {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} onClose={handleCloseModal} /> }
    </div>
  );
};

PokeList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default PokeList;