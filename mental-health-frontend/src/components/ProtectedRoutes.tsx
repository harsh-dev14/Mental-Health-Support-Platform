import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/signin' }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
