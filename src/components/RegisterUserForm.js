// JavaScript source code
// RegisterUserForm.js
import React, { useState } from 'react';
import UserService from "../services/UserService"; // Asume que tienes un servicio para manejar usuarios

const RegisterUserForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            await UserService.registerUser(userData);
            alert("Usuario registrado con éxito");
            setUserData({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            console.error("Error registrando el usuario:", error);
            alert("Error al registrar el usuario.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="Nombre de usuario" value={userData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" value={userData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" value={userData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={userData.confirmPassword} onChange={handleChange} required />
            <button type="submit">Registrar Usuario</button>
        </form>
    );
};

export default RegisterUserForm;
