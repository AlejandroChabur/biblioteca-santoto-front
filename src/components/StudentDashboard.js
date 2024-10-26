import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css'; // Asegúrate de importar el archivo CSS

function StudentDashboard() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://www.bibliotecasanttotomas.somee.com/api/Books');
                setBooks(response.data); // Asume que la respuesta es un array de libros
            } catch (err) {
                console.error(err);
                setError('Error al cargar los libros.');
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="student-dashboard">
            <h1>Lista de Libros</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Código</th>
                            <th>Año de Publicación</th>
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay libros disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentDashboard;