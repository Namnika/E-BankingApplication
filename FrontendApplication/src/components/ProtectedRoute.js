// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (!auth || !auth.token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;