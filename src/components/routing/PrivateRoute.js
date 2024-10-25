import { Navigate } from 'react-router-dom';

const useAuth = () => {
    // Aquí deberías implementar la lógica para verificar si el usuario está autenticado
    // Esto podría ser una verificación de un token en localStorage o un contexto de autenticación
    const user = JSON.parse(localStorage.getItem('user')); // Ejemplo simple de autenticación
    return user && user.loggedIn; // Cambia esto según tu lógica de autenticación real
};

const PrivateRoute = ({ element }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;