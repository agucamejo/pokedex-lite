import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService'; 

const PokeLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(form.username, form.password);
      setMessage('Successful login');
      onLogin(data);
    } catch (error) {
      setMessage(error.message || 'External error');
    }
  }, [form, onLogin]);

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

PokeLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default PokeLogin;