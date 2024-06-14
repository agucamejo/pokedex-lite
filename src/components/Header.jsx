import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, handleLogout }) => (
  <div className='header-container'>
    <h1>Pokedex - Lite</h1>
    { isLoggedIn && <button className='btn-logout' onClick={handleLogout}>Logout</button> }
  </div>
);

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;