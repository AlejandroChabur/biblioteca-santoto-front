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

            // Verifica si la respuesta contiene un mensaje de éxito y un userId
            if (response.data.message === 'Inicio de sesión exitoso' && response.data.userId) {
                // Almacena el userId en localStorage
                localStorage.setItem('userId', response.data.userId);

                // Determina el tipo de usuario basado en la contraseña
                if (password.startsWith('estudiante')) {
                    navigate('/student-dashboard'); // Redirige al dashboard del estudiante
                } else if (password.startsWith('admin')) {
                    navigate('/admin-dashboard'); // Redirige al dashboard del administrador
                } else {
                    setError('Tipo de usuario no reconocido.'); // Manejo adicional si no coincide
                }
            } else {
                setError('Credenciales incorrectas.'); // Mensaje si las credenciales son incorrectas
            }
        } catch (err) {
            console.error(err);
            setError('Error en el proceso de inicio de sesión.');
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
