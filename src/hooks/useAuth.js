import { useState, useEffect } from 'react';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from '../utils/storageUser';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data) => {
    saveUserToStorage(data);
    setUser(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeUserFromStorage();
    setUser(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, user, handleLogin, handleLogout };
};

export default useAuth;