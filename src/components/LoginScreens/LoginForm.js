import React, { useState } from 'react';
import axios from 'axios';  // Asegúrate de tener axios instalado

function RegistrationForm() {
    const [name, setName] = useState('');  // Solicita solo el nombre
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [phoneNumber,setPhoneNumber]= useState('');
    const [userCode, setUserCode]=useState('');
    const [idUserType, setIdUserType] = useState('');  // Solicita solo el IdPerson
    const [idPerson, setIdPerson] = useState('');  // Solicita solo el IdPerson
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://www.bibliotecasanttotomas.somee.com/api/User', {
                id: 0,  // Valor por defecto para `id`
                idPerson: idPerson,  // Envía `idPerson` recibido del formulario
                name: name,  // Envía el nombre recibido del formulario
                email: email,  // Campo predeterminado o no solicitado
                password: password,  // Campo predeterminado o no solicitado
                phoneNumber: phoneNumber,  // Campo predeterminado o no solicitado
                userCode: userCode,  // Campo predeterminado o no solicitado
                idUserType: idUserType,  // Tipo de usuario por defecto
                userTypes: {
                    id: idUserType,  // Relación con el tipo de usuario por defecto
                    name: 'default',  // Ajusta el nombre según lo requerido
                    isDelete: false  // Campo por defecto
                },
                peoples: {
                    id: idPerson,  // Usa el `idPerson` del formulario
                    idIdentificationType: 0,  // Valor predeterminado
                    identificationNumber: '00000000',  // Valor predeterminado
                    firstName: name,  // Usa el nombre recibido del formulario
                    middleName: '',  // Campo predeterminado o no solicitado
                    lastName: '',  // Campo predeterminado o no solicitado
                    secondLastName: '',  // Campo predeterminado o no solicitado
                    address: 'default address',  // Campo predeterminado o no solicitado
                    borndate: '2000-01-01',  // Valor por defecto o no solicitado
                    identificationTypes: {
                        id: 0,  // Valor predeterminado
                        name: 'default',  // Ajusta el tipo de identificación
                        isDelete: false  // Campo por defecto
                    },
                    isDelete: false  // Valor por defecto
                },
                isDelete: false  // Valor por defecto
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
