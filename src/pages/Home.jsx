import { useState } from 'react';
import PropTypes from 'prop-types';
import BtnAddPokemon from '../components/FloatingButton';
import AddPokemonModal from '../components/CreatePokemon';
import PokemonList from '../components/PokemonList';

const Home = ({user}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddPokemon = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div>
        <PokemonList userId={user.userId} />
        <BtnAddPokemon onClick={handleAddPokemon} />
        {showModal && (
          <AddPokemonModal userId={user.userId} onClose={handleModalClose} />
        )}
    </div>
  )
}

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;