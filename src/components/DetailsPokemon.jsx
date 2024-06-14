import PropTypes from 'prop-types';
import { useState } from 'react';
import EditPokemon from './EditPokemon'; 

/**
 * Component for displaying details of a Pokemon.
 * Allows editing of Pokemon details through EditPokemon component.
 * @param {Object} props Component props.
 * @param {Object} props.pokemon The Pokemon object to display details of.
 * @param {function} props.onClose Function to call when closing the modal.
 * @returns {JSX.Element} JSX element representing Pokemon details.
 */

const PokemonDetails = ({ pokemon, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // If no pokemon data is provided, do not render anything
  if (!pokemon) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h3>{pokemon.name}</h3>
        <p>Level: {pokemon.lvl}</p>
        <p>Evolution: {pokemon.evolutionId}</p>
        <p>Types: {pokemon.types.join(', ')}</p>
        {!imageLoaded && (
          <div className="loader"></div>
        )}
        <img src={pokemon.urlImagen} alt={pokemon.name} onLoad={handleImageLoad} style={{ width: '200px', height: '200px' }}/>
        <h3>Abilities:</h3>
        {pokemon.abilities && pokemon.abilities.length > 0 ? (
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.id}>
                <strong>{ability.name}:</strong> {ability.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Este Pokémon no tiene habilidades.</p>
        )}
      <button onClick={handleEditClick} className='btn-edit'>Edit Pokemon</button>
      </div>
      {isEditing && (
        <EditPokemon pokemon={pokemon} onClose={handleEditClose}/>
      )}
    </div>
  );
};

PokemonDetails.propTypes = {
  pokemon: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PokemonDetails;