import { useState, useEffect } from 'react';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from '../utils/storageUser';

/**
 * This file is a custom hook for handling authentication state and user information.
 * Uses localStorage to persist user authentication status.
 * @returns {Object} An object containing isLoggedIn state, user object, and login/logout functions.
 */

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if there's a stored user on component mount
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  /**
   * Handles the login process.
   * Saves the user to localStorage and updates state.
   * @param {Object} data The user data to save.
   */
  const handleLogin = (data) => {
    saveUserToStorage(data);
    setUser(data);
    setIsLoggedIn(true);
  };

  /**
   * Handles the logout process.
   * Removes the user from localStorage and updates state.
   */
  const handleLogout = () => {
    removeUserFromStorage();
    setUser(null);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, user, handleLogin, handleLogout };
};

export default useAuth;