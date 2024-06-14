import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

export const ProtectedRoute = ({
  isLoggedIn,
  redirectTo = "/landing",
  children,
}) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}