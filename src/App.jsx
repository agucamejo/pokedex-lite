import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import Header from './components/Header';
import useAuth from './hooks/useAuth';

function App() {
  const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes> 
        <Route path="/" element={ isLoggedIn ?
            <Home user={user}/> : <Navigate to="/login" />
        } />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />   
        <Route path="*" element={<Error />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;