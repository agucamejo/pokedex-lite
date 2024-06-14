import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService'; 

/**
 * Component for user login form.
 * @param {Object} props Component props.
 * @param {function} props.onLogin Function to call upon successful login.
 * @returns {JSX.Element} JSX element representing the login form.
 */

const LoginForm = ({ onLogin }) => {
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
      <h1 className="text-center text-3xl font-bold">Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className='relative my-4 w-full'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired, // Function to call upon successful login
};

export default LoginForm;