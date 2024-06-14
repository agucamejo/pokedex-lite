import LoginForm from "../components/LoginForm";
import PropTypes from 'prop-types'

const Login = ({onLogin}) => {
  
  return (
    <div>
        <LoginForm onLogin={onLogin} />
    </div>
  )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;