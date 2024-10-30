import React from 'react';

const PeopleTable = ({ people, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Número de Identificación</th>
                        <th>Nombre Completo</th>
                        <th>Dirección</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(person => (
                        <tr key={person.id}>
                            <td>{person.identificationNumber}</td>
                            <td>{`${person.firstName} ${person.middleName || ''} ${person.lastName} ${person.secondLastName || ''}`}</td>
                            <td>{person.address}</td>
                            <td>{new Date(person.borndate).toLocaleDateString()}</td>
                            <td className="button-container">
                                <button className="edit-button" onClick={() => onEdit(person)}>Editar</button>
                                <button className="delete-button" onClick={() => onDelete(person.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PeopleTable;
