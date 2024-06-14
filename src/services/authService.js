/**
 * Makes a login request to the server.
 * @param {string} username Username to log in with.
 * @param {string} password User's password.
 * @returns {Promise<Object>} JSON object with user data.
 * @throws {Error} If credentials are invalid or there's an error in the request.
 */

const login = async (username, password) => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    throw new Error(`Invalid credentials`);
  }
  
  return response.json();
};
  
export default { login };