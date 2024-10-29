import React from 'react';

const BookTable = ({ books, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>T�tulo</th>
                    <th>Edici�n</th>
                    <th>C�digo</th>
                    <th>A�o de Publicaci�n</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.edition?.editionName || 'N/A'}</td>
                        <td>{book.code}</td>
                        <td>{book.publicationYear}</td>
                        <td className="button-container">
                            <button className="edit-button" onClick={() => onEdit(book)}>Editar</button>
                            <button className="delete-button" onClick={() => onDelete(book.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;