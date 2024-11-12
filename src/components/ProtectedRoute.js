import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas
const ProtectedRoute = ({ element, path }) => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    // Verifica si hay un usuario y rol en el localStorage
    if (!userId || !userRole) {
        return <Navigate to="/login" />;
    }

    // Verifica si el rol del usuario corresponde a la ruta solicitada
    if (path === '/student-dashboard' && userRole !== 'student') {
        return <Navigate to="/login" />;
    }

    if (path === '/admin-dashboard' && userRole !== 'admin') {
        return <Navigate to="/login" />;
    }

    // Si todo es correcto, renderiza el componente
    return element;
};

export default ProtectedRoute;
