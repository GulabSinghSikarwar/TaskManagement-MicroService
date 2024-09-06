import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext)
console.log("IS AUTH : ",isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;