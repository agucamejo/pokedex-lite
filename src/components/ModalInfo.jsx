import PropTypes from 'prop-types'; 

const ImageModal = ({ show, onClose, pokemon }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{pokemon.name}</h2>
        <p>Nivel: {pokemon.lvl}</p>
        <p>Tipo: {pokemon.type}</p>
        <p>Habilidades:</p>
        <ul>
          {pokemon && pokemon.abilities && pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.name}: {ability.description}</li>
          ))}
        </ul>
        <img src={pokemon.imageSrc} alt={pokemon.altText} style={{ width: '300px', height: '300px' }} />
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lvl: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired
  }).isRequired
};

export default ImageModal;