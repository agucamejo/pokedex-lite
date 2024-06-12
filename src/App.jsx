import { useState } from 'react';
import PokeList from './components/PokeList'
import PokeLogin from './components/PokeLogin'
import BtnAddPokemon from './components/BtnAddPokemon'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    //Agregar validaciones de credenciales y de autenticacion de usuario ya que ahora es siempre true.
    setUser(credentials.userId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Agregar confirmación con modal. Agregar correcto manejo de user
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <h1>Pokedex - Lite</h1>
      {isLoggedIn ? (
        <div>
          <PokeList />
          <BtnAddPokemon />
          <button className='btn-login' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <PokeLogin onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
