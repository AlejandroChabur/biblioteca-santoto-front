// src/components/Catalogo.js
import React, { useEffect, useState } from 'react';
import './Catalogo.css';

const Catalogo = () => {
    const [books, setBooks] = useState([]); // Estado para los libros
    const [loading, setLoading] = useState(true); // Estado de carga

    // Simulación de búsqueda de libros
    useEffect(() => {
        const fetchBooks = async () => {
            // Simulación de libros
            const dummyBooks = [
                { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', description: 'Una novela clásica.' },
                { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', description: 'Un clásico de la literatura latinoamericana.' },
                { id: 3, title: '1984', author: 'George Orwell', description: 'Una novela distópica.' },
            ];
            setBooks(dummyBooks);
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const handleReadBook = (book) => {
        // Aquí podrías redirigir a una nueva página para leer el libro
        alert(`Leyendo "${book.title}"...`); // Simulación
    };

    const handleDeleteBook = (bookId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este libro del catálogo?');
        if (confirmDelete) {
            setBooks(books.filter((book) => book.id !== bookId));
        }
    };

    return (
        <div className="catalogo-container">
            <h1>Catálogo de Libros</h1>
            {loading ? (
                <p>Cargando libros...</p>
            ) : (
                <div className="book-list">
                    {books.length === 0 ? (
                        <p>No hay libros disponibles.</p>
                    ) : (
                        books.map((book) => (
                            <div key={book.id} className="book-item">
                                <h3>{book.title}</h3>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p>{book.description}</p>
                                <button className="read-button" onClick={() => handleReadBook(book)}>Leer</button>
                                <button className="delete-button" onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Catalogo;
