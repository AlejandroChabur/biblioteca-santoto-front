import React, { useEffect, useState } from 'react';
import booksService from "../services/booksService"; // Asegúrate de que la ruta sea correcta
import './AdminDashBoard.css'; 

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ 
        title: '', 
        code: '', 
        publicationYear: '', 
        idEdition: 0,
        edition: { id: 0, editionName: '', isDelete: false } // Inicializa la edición aquí
    });
    const [editBookId, setEditBookId] = useState(null);
    const [editBookData, setEditBookData] = useState({ 
        id: null,
        title: '', 
        code: '', 
        publicationYear: '', 
        idEdition: 0, 
        edition: { id: 0, editionName: '', isDelete: false } 
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await booksService.GetAllBooks(); // Usando booksService
            setBooks(fetchedBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("Error al obtener los libros.");
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await booksService.CreateBook(newBook); // Usando booksService
            fetchBooks(); 
            setNewBook({ 
                title: '', 
                code: '', 
                publicationYear: '', 
                idEdition: 0,
                edition: { id: 0, editionName: '', isDelete: false } // Resetea también la edición
            });
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Error al agregar el libro.");
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();

        const bookData = {
            id: editBookId,
            idEdition: editBookData.idEdition,
            title: editBookData.title,
            code: editBookData.code,
            publicationYear: editBookData.publicationYear,
            edition: {
                id: editBookData.edition.id,
                editionName: editBookData.edition.editionName,
                isDelete: editBookData.edition.isDelete,
            },
            isDelete: false 
        };

        try {
            await booksService.UpdateBook(editBookId, bookData); // Usando booksService
            fetchBooks();
            setEditBookId(null);
            setEditBookData({ 
                id: null,
                title: '', 
                code: '', 
                publicationYear: '', 
                idEdition: 0, 
                edition: { id: 0, editionName: '', isDelete: false } 
            });
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error al actualizar el libro.");
        }
    };

    const handleDeleteBook = async (id) => {
        if (window.confirm('¿Estás seguro que deseas eliminar este libro?')) {
            try {
                await booksService.DeleteBook(id); // Usando booksService
                fetchBooks(); 
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Error al eliminar el libro.");
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Gestión de Libros</h1>

            {/* Formulario para agregar nuevos libros */}
            <form onSubmit={handleAddBook}>
                <input type="text" placeholder="Título" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
                
                <input
                    type="number" // Cambiado a number para el ID de la edición
                    placeholder="ID de Edición"
                    value={newBook.idEdition}
                    onChange={(e) => setNewBook({ ...newBook, idEdition: Number(e.target.value) })} // Asegúrate de convertir a número
                    required
                />

                
                
                <input type="text" placeholder="Código" value={newBook.code} onChange={(e) => setNewBook({ ...newBook, code: e.target.value })} required />
                
                <input type="text" placeholder="Año de Publicación" value={newBook.publicationYear} onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })} required />
                
                <button type="submit">Agregar Libro</button>
            </form>

            {/* Tabla para mostrar los libros */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Edición</th>
                            <th>Código</th>
                            <th>Año de Publicación</th>
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
                                    <button onClick={() => { 
                                        setEditBookId(book.id); 
                                        setEditBookData({ 
                                            id: book.id,
                                            title: book.title, 
                                            code: book.code, 
                                            publicationYear: book.publicationYear,
                                            idEdition: book.idEdition || 0,
                                            edition: {
                                                id: book.edition?.id || 0,
                                                editionName: book.edition?.editionName || '',
                                                isDelete: book.edition?.isDelete || false,
                                            }
                                        }); 
                                    }}>Editar</button>
                                    <button onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Formulario para editar libros */}
            {editBookId && (
                <form onSubmit={handleEditBook}>
                    <input type="text" placeholder="Título" value={editBookData.title} onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })} required />
                    <input type="text" placeholder="Código" value={editBookData.code} onChange={(e) => setEditBookData({ ...editBookData, code: e.target.value })} required />
                    <input type="text" placeholder="Año de Publicación" value={editBookData.publicationYear} onChange={(e) => setEditBookData({ ...editBookData, publicationYear: e.target.value })} required />
                    <button type="submit">Actualizar Libro</button>
                </form>
            )}
        </div>
    );
};

export default AdminDashboard;