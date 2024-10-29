import React, { useEffect, useState } from 'react';
import booksService from "../services/booksService"; // Asegúrate de que la ruta sea correcta
import BookForm from './BookForm';
import BookTable from './BookTable';
import './AdminDashBoard.css';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null); // Cambiado de editBookId a editBook para almacenar el libro completo

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await booksService.GetAllBooks();
            setBooks(fetchedBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("Error al obtener los libros.");
        }
    };

    const handleAddBook = async (newBook) => {
        try {
            await booksService.CreateBook(newBook);
            fetchBooks();
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Error al agregar el libro.");
        }
    };

    const handleEditBook = async (updatedBook) => {
        try {
            await booksService.UpdateBook(editBook.id, updatedBook);
            fetchBooks();
            setEditBook(null); // Cierra el modal al terminar de editar
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error al actualizar el libro.");
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este libro?")) {
            try {
                await booksService.DeleteBook(bookId);
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Error al eliminar el libro.");
            }
        }
    };

    const openEditModal = (book) => {
        setEditBook(book); // Establece el libro a editar
    };

    return (
        <div className="admin-dashboard">
            <h1>Gestión de Libros</h1>

            {/* Formulario para agregar nuevos libros */}
            <BookForm onSubmit={handleAddBook} initialData={{ title: '', code: '', publicationYear: '', idEdition: 0 }} />

            {/* Tabla para mostrar los libros */}
            <BookTable books={books} onEdit={openEditModal} onDelete={handleDeleteBook} />

            {/* Modal o formulario para editar libros */}
            {editBook && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Libro</h2>
                        <BookForm
                            onSubmit={handleEditBook}
                            initialData={editBook}
                            isEdit
                        />
                        <button onClick={() => setEditBook(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;