import React, { useEffect, useState } from 'react';
import booksService from "../services/booksService"; // Asegúrate de que la ruta sea correcta
import BookForm from './BookForm';
import BookTable from './BookTable';
import './AdminDashBoard.css';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        code: '',
        publicationYear: '',
        idEdition: 0,
        edition: { id: 0, editionName: '', isDelete: false }
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await booksService.CreateBook(newBook);
            fetchBooks();
            setNewBook({
                title: '',
                code: '',
                publicationYear: '',
                idEdition: 0,
                edition: { id: 0, editionName: '', isDelete: false }
            });
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Error al agregar el libro.");
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        const bookData = { ...editBookData, isDelete: false };
        try {
            await booksService.UpdateBook(editBookId, bookData);
            fetchBooks();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error al actualizar el libro.");
        }
    };

    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (confirmDelete) {
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
        setEditBookId(book.id);
        setEditBookData(book);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="admin-dashboard">
            <h1>Gestión de Libros</h1>

            <form onSubmit={handleAddBook}>
                <input type="text" placeholder="Título" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
                <input type="number" placeholder="ID de Edición" value={newBook.idEdition} onChange={(e) => setNewBook({ ...newBook, idEdition: Number(e.target.value) })} required />
                <input type="text" placeholder="Código" value={newBook.code} onChange={(e) => setNewBook({ ...newBook, code: e.target.value })} required />
                <input type="text" placeholder="Año de Publicación" value={newBook.publicationYear} onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })} required />
                <button type="submit">Agregar Libro</button>
            </form>

            <div className="table-container">
                <BookTable books={books} onEdit={openEditModal} onDelete={handleDeleteBook} />
            </div>

            {isEditModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Editar Libro</h2>
                        <form onSubmit={handleEditBook}>
                            <input type="text" placeholder="Título" value={editBookData.title} onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })} required />
                            <input type="text" placeholder="Código" value={editBookData.code} onChange={(e) => setEditBookData({ ...editBookData, code: e.target.value })} required />
                            <input type="text" placeholder="Año de Publicación" value={editBookData.publicationYear} onChange={(e) => setEditBookData({ ...editBookData, publicationYear: e.target.value })} required />
                            <button type="submit">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;