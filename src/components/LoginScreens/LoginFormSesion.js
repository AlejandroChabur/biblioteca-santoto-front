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

            // Realizar la solicitud de inicio de sesión
            const response = await axios.post('http://www.bibliotecasanttotomas.somee.com/api/User/Login'
                email,
                password
            });

            console.log('Respuesta del servidor:', response);

            // Verificar si el inicio de sesión fue exitoso
            if (response.data.message === 'Inicio de sesión exitoso' && response.data.userId) {
                // Almacenar el userId en localStorage
                localStorage.setItem('userId', response.data.userId);

                // Comprobar el rol con el valor de la contraseña
                if (password.startsWith('estudiante')) {
                    console.log('Rol identificado como estudiante');
                    localStorage.setItem('userRole', 'student');
                    navigate('/student-dashboard');  // Navegar al dashboard de estudiante
                } else if (password.startsWith('admin')) {
                    console.log('Rol identificado como administrador');
                    localStorage.setItem('userRole', 'admin');
                    navigate('/admin-dashboard');  // Navegar al dashboard de administrador
                } else {
                    setError('Tipo de usuario no reconocido.');
                    console.log('Error: Tipo de usuario no reconocido.');
                }
            } else {
                setError('Credenciales incorrectas.');
                console.log('Error: Credenciales incorrectas.');
            }
        } catch (err) {
            console.error('Error en la solicitud de inicio de sesión:', err);
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
