import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './LoginFormSesion.css';


function LoginFormSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza la solicitud de inicio de sesión
            const response = await axios.post('http://www.bibliotecasanttotomas.somee.com/api/User/Login', {
                email,
                password
            });
            
            console.log(response.data); // Para verificar la respuesta
            
            // Determina el tipo de usuario basado en el prefijo de la contraseña
            let userType;
            if (password.startsWith('admin')) {
                userType = 'admin'; // Tipo de usuario es admin
            } else if (password.startsWith('estudiante')) {
                userType = 'estudiante'; // Tipo de usuario es estudiante
            } else {
                setError('Tipo de usuario no reconocido.'); // Manejo adicional si no coincide
                return; // Salir si no se reconoce el tipo de usuario
            }

            // Redirige según el tipo de usuario
            if (userType === 'admin') {
                navigate('/admin-dashboard'); // Redirige al dashboard del administrador
            } else if (userType === 'estudiante') {
                navigate('/student-dashboard'); // Redirige al dashboard del estudiante
            }
        } catch (err) {
            console.error(err);
            setError('Credenciales incorrectas.');
        }
    };

    return (
        <div className="login-form-container">
            <h1 className="form-title">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-button">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default LoginFormSesion;