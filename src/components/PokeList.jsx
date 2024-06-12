import  { useState, useEffect } from 'react';
import pokemonData from '../services/openapi.json';
import ImageModal from './ModalInfo';

const PokemonList = () => {
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState({});
  const [modalData, setModalData] = useState({ show: false, pokemon: null });

  useEffect(() => {
    const defaultTypes = {};
    pokemonData.components.schemas.Pokemon.example.forEach(pokemon => {
      if (pokemon.types.length > 0) {
        defaultTypes[pokemon.name] = pokemon.types[0].name;
      }
    });
    setSelectedPokemonTypes(defaultTypes);
  }, []);

  const handleTypeChange = (pokemonName, e) => {
    setSelectedPokemonTypes({
      ...selectedPokemonTypes,
      [pokemonName]: e.target.value
    });
  };

  const handleCardClick = (pokemonName) => {
    const selectedType = selectedPokemonTypes[pokemonName];
    const pokemon = pokemonData.components.schemas.Pokemon.example.find(p => p.name === pokemonName);
    const typeData = pokemon.types.find(type => type.name === selectedType);
    const modalPokemon = {
      name: pokemon.name,
      lvl: pokemon.lvl,
      type: selectedType,
      abilities: pokemon.abilities,
      imageSrc: typeData.image,
      altText: selectedType
    };
    setModalData({ show: true, pokemon: modalPokemon });
  };

  const closeModal = () => {
    setModalData({ show: false, pokemon: null });
  };

  return (
    <div>
      <ul>
        {pokemonData.components.schemas.Pokemon.example.map((pokemon, index) => (
          <li key={index} onClick={() => handleCardClick(pokemon.name)}>
            <select value={selectedPokemonTypes[pokemon.name] || ''} onChange={(e) => handleTypeChange(pokemon.name, e)} onClick={(e) => e.stopPropagation()}>
              {pokemon.types.map((type, typeIndex) => (
                <option key={typeIndex} value={type.name}>{type.name}</option>
              ))}
            </select>
            <h2>{pokemon.name}</h2>
            <p>Nivel: {pokemon.lvl}</p>
          </li>
        ))}
      </ul>
      {modalData.show && <ImageModal 
        show={modalData.show} 
        onClose={closeModal} 
        pokemon={modalData.pokemon} 
      />}
    </div>
  );
};

export default PokemonList;