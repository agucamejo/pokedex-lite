import PropTypes from 'prop-types'; 

const BtnAddPokemon = ({ onClick }) => {

  return (
    <button className="floating-button" onClick={onClick}>
      New
    </button>
  );
};

BtnAddPokemon.propTypes = {
  onClick: PropTypes.func.isRequired
};


export default BtnAddPokemon;