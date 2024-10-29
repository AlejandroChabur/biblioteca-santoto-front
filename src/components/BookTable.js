import React from 'react';

const BookTable = ({ books, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Edicion</th>
                        <th>Codigo</th>
                        <th>Fecha de Publicacion</th>
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
        </div>
    );
};

export default BookTable;