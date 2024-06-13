import { useState } from 'react';
import PokemonList from './components/PokemonList';
import LoginForm from './components/LoginForm';
import BtnAddPokemon from './components/BtnAddPokemon';
import AddPokemonModal from './components/CreatePokemon';
import useAuth from './hooks/useAuth';
import './App.css';

function App() {
  const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAddPokemon = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <h1>Pokedex - Lite</h1>
      {isLoggedIn ? (
        <div>
          <PokemonList userId={user.userId} />
          <BtnAddPokemon onClick={handleAddPokemon} />
          <button className='btn-login' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {showModal && (
        <AddPokemonModal userId={user.userId} onClose={handleModalClose} />
      )}
    </>
  );
}

export default App;