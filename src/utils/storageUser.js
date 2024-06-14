/**
 * Retrieves the user stored in localStorage.
 * @returns {Object|null} The stored user object or null if none exists.
 */

export const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error reading user from localStorage", error.message);
    return null;
  }
};

/**
 * Saves the user object to localStorage.
 * @param {Object} user The user object to store.
 */
export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage", error.message);
  }
};

/**
 * Removes the stored user object from localStorage.
 */
export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error("Error removing user from localStorage:", error.message);
  }
};
