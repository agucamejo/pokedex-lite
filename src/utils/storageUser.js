export const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error reading user from localStorage", error);
    return null;
  }
};

export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage", error);
  }
};

export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error("Error removing user from localStorage", error);
  }
};
