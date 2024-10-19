import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Asegúrate de tener este archivo CSS

function RegistrationForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userType, setUserType] = useState('estudiante'); // Por defecto "estudiante"
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://bibliotecasantotomas.somee.com/api/User', {
                name: fullName,
                email,
                password,
                phoneNumber,
                idUserType: userType, // Asegúrate de enviar el tipo de usuario correctamente
                borndate: birthDate, // Añadir la fecha de nacimiento
            });
            alert('Usuario registrado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error en el proceso, verifica los datos.');
        }
    };

    return (
        <div className="registration-form-container">
            <h1 className="form-title">Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-input"
                />
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
                <input
                    type="tel"
                    placeholder="Número de Teléfono"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="form-input"
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="form-select"
                >
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="otro">Otro</option>
                </select>
                <input
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="form-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-button">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
