import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ element }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await isAuthenticated();
        setIsAuth(auth);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    // Still checking authentication, you might want to show a loading spinner here
    return <div>Loading...</div>; // Or any loading component you prefer
  }

  return isAuth ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;