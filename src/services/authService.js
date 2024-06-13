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