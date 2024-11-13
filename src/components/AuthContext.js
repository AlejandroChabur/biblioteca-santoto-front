// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Al iniciar la aplicación, carga el rol del localStorage
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) setUser(storedRole);
    }, []);

    const login = (role) => setUser(role);
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
