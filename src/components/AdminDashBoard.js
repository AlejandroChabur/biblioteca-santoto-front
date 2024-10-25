import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashBoard.css';

function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [newBook, setNewBook] = useState({ title: '', code: '', publicationYear: '', idEdition: 0, edition: { id: 0, editionName: '', isDelete: false }, isDelete: false });
    const [editBookId, setEditBookId] = useState(null);
    const [idEdition, setIdEdition]= useState(null);
    const [editBookData, setEditBookData] = useState({ title: '', code: '', publicationYear: '', idEdition: 0, edition: { id: 0, editionName: '', isDelete: false }, isDelete: false });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://www.bibliotecasanttotomas.somee.com/api/Books');
            setBooks(response.data);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los libros.');
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://www.bibliotecasanttotomas.somee.com/api/Books', newBook);
            fetchBooks();
            setNewBook({ title: '', code: '', publicationYear: '', idEdition: 0, edition: { id: 0, editionName: '', isDelete: false }, isDelete: false }); // Reset form
        } catch (err) {
            console.error(err);
            setError('Error al agregar el libro.');
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://www.bibliotecasanttotomas.somee.com/api/Books/${editBookId}`, editBookData);
            fetchBooks();
            setEditBookId(null);
            setEditBookData({ title: '', code: '', publicationYear: '', idEdition: 0, edition: { id: 0, editionName: '', isDelete: false }, isDelete: false }); // Reset form
        } catch (err) {
            console.error(err);
            setError('Error al editar el libro.');
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`http://www.bibliotecasanttotomas.somee.com/api/Books/${id}`);
            fetchBooks();
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el libro.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Gestión de Libros</h1>
            {error && <p className="error-message">{error}</p>}
            
            <h2>Agregar Nuevo Libro</h2>
            <form onSubmit={handleAddBook}>
                <input
                    type="text"
                    placeholder="Título"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Código"
                    value={newBook.code}
                    onChange={(e) => setNewBook({ ...newBook, code: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Año de Publicación"
                    value={newBook.publicationYear}
                    onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Id-Edicion"
                    value={idEdition}
                    onChange={(e) => setIdEdition(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit">Agregar Libro</button>
            </form>

            <h2>Lista de Libros</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Código</th>
                            <th>Año de Publicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.code}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>
                                        <button onClick={() => { 
                                            setEditBookId(book.id); 
                                            setEditBookData({ title: book.title, code: book.code, publicationYear: book.publicationYear, idEdition: book.idEdition || 0, edition: { id: book.edition?.id || 0, editionName: book.edition?.editionName || '', isDelete: book.edition?.isDelete || false }, isDelete: book.isDelete }); 
                                        }}>Editar</button>
                                        <button onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay libros disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {editBookId && (
                    <>
                        <h2>Editar Libro</h2>
                        <form onSubmit={handleEditBook}>
                            <input
                                type="text"
                                placeholder="Título"
                                value={editBookData.title}
                                onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Código"
                                value={editBookData.code}
                                onChange={(e) => setEditBookData({ ...editBookData, code: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Año de Publicación"
                                value={editBookData.publicationYear}
                                onChange={(e) => setEditBookData({ ...editBookData, publicationYear: e.target.value })}
                                required
                            />
                            {/* Puedes agregar campos adicionales si es necesario */}
                            <button type="submit">Actualizar Libro</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;