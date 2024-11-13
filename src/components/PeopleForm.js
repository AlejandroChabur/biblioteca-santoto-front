import React, { useState, useEffect } from 'react';

const PeopleForm = () => {
    const [selectedIdentificationType, setSelectedIdentificationType] = useState(0);
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondLastName, setSecondLastName] = useState('');
    const [address, setAddress] = useState('');
    const [borndate, setBorndate] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);

    useEffect(() => {
        const fetchIdentificationTypes = async () => {
            const response = await fetch('/api/identification-types'); // Cambia la URL según tu API
            const data = await response.json();
            setIdentificationTypes(data);
        };

        fetchIdentificationTypes();
    }, []);

    const handlePeopleSubmit = async (event) => {
        event.preventDefault();

        if (selectedIdentificationType === 0) {
            alert('Por favor, seleccione un tipo de identificación.');
            return;
        }

        const personData = {
            id: 0,
            idIdentificationType: selectedIdentificationType,
            identificationNumber: identificationNumber,
            firstName: firstName || '',
            middleName: middleName || '',
            lastName: lastName || '',
            secondLastName: secondLastName || '',
            address: address || '',
            borndate: borndate || '',
            isDelete: false,
        };

        try {
            const response = await fetch('/api/people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personData),
            });

            if (!response.ok) {
                throw new Error('Error en la creación de la persona');
            }

            const newPerson = await response.json();
            // Manejar la actualización de la lista de personas aquí
            clearPeopleForm();
        } catch (error) {
            console.error('Error al crear la persona:', error);
        }
    };

    const clearPeopleForm = () => {
        setSelectedIdentificationType(0);
        setIdentificationNumber('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setSecondLastName('');
        setAddress('');
        setBorndate('');
    };

    return (
        <form onSubmit={handlePeopleSubmit}>
            <select onChange={(e) => setSelectedIdentificationType(Number(e.target.value))}>
                <option value={0}>Seleccione Tipo de Identificación</option>
                {identificationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>
            <input type="text" value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} placeholder="Número de identificación" required />
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Primer Nombre" required />
            <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="Segundo Nombre (opcional)" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" required />
            <input type="text" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} placeholder="Segundo Apellido (opcional)" />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" required />
            <input type="date" value={borndate} onChange={(e) => setBorndate(e.target.value)} />
            <button type="submit">Agregar Persona</button>
        </form>
    );
};

export default PeopleForm;
