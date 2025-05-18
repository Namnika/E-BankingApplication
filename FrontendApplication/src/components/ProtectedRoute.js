// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { auth } = useContext(AuthContext);

    if (!auth || !auth.token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // If role is required and user doesn't have it, redirect to home
    if (requiredRole && auth.user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;