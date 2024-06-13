import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, user, handleLogin, handleLogout };
};

export default useAuth;