import React, { useState } from 'react';
import axios from 'axios';  // Asegúrate de tener axios instalado
import './LoginForm.css';
function RegistrationForm() {
    const [name, setName] = useState('');  // Solicita solo el nombre
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userCode, setUserCode] = useState('');
    const [idUserType, setIdUserType] = useState('');  // Solicita solo el IdPerson
    const [idPerson, setIdPerson] = useState('');  // Solicita solo el IdPerson
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://www.bibliotecasanttotomas.somee.com/api/User', {
                id: 0,
                idPerson: idPerson,
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                userCode: userCode,
                idUserType: idUserType,
                userTypes: {
                    id: idUserType,
                    name: 'default',
                    isDelete: false
                },
                peoples: {
                    id: idPerson,
                    idIdentificationType: 0,
                    identificationNumber: '00000000',
                    firstName: name,
                    middleName: '',
                    lastName: '',
                    secondLastName: '',
                    address: 'default address',
                    borndate: '2000-01-01',
                    identificationTypes: {
                        id: 0,
                        name: 'default',
                        isDelete: false
                    },
                    isDelete: false
                },
                isDelete: false
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
                    placeholder="Nombre de Usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="UserCode"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="UserType"
                    value={idUserType}
                    onChange={(e) => setIdUserType(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="ID de Persona"
                    value={idPerson}
                    onChange={(e) => setIdPerson(e.target.value)}
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