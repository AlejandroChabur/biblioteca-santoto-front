import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [titleFilter, setTitleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeSection, setActiveSection] = useState('catalogo'); // Estado para la sección activa
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Estado para el menú de usuario

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://www.bibliotecasanttotomas.somee.com/api/Books');
                setBooks(response.data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los libros.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const dateMatch = dateFilter === '' || book.publicationYear.toString() === dateFilter;
        return titleMatch && dateMatch;
    });

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirige a la página de inicio
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev); // Cambia el estado del menú de usuario
    };

    return (
        <div className={`student-dashboard ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
            <header>
                <div className="nav-left">
                    <button onClick={() => setActiveSection('inicio')}>Inicio</button>
                    <button onClick={() => setActiveSection('catalogo')}>Catálogo</button>
                    <button onClick={() => setActiveSection('grupos')}>Grupos</button>
                    <button onClick={() => setActiveSection('acerca')}>Acerca de</button>
                </div>
                <div className="nav-right">
                    <button onClick={toggleTheme}>Tema</button>
                    <button onClick={toggleUserMenu}>Usuario</button>
                    {isUserMenuOpen && (
                        <div className="user-menu">
                            <button onClick={() => setActiveSection('perfil')}>Perfil</button>
                            <button onClick={toggleTheme}>
                                Cambiar a {isDarkTheme ? 'Tema Claro' : 'Tema Oscuro'}
                            </button>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                            <button onClick={() => alert('Aquí va la ayuda.')}>Ayuda</button>
                        </div>
                    )}
                </div>
            </header>

            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
            {loading && <p>Cargando libros...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Contenido por sección */}
            {activeSection === 'catalogo' && (
                <>
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Filtrar por título"
                            value={titleFilter}
                            onChange={e => setTitleFilter(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Filtrar por fecha"
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                        />
                    </div>

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
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map(book => (
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
                </>
            )}

            {activeSection === 'inicio' && (
                <div>
                    <h2>Bienvenido a la Biblioteca Santo Tomás</h2>
                    <p>Aquí podrás encontrar toda la información que necesitas.</p>
                </div>
            )}

            {activeSection === 'grupos' && (
                <div>
                    <h2>Grupos de Estudio</h2>
                    <p>Participa en nuestros grupos de estudio para mejorar tu aprendizaje.</p>
                </div>
            )}

            {activeSection === 'acerca' && (
                <div>
                    <h2>Acerca de la Biblioteca</h2>
                    <p>Conoce más sobre nuestra historia y servicios.</p>
                </div>
            )}

            {activeSection === 'perfil' && (
                <div>
                    <h2>Perfil de Usuario</h2>
                    <p>Aquí puedes ver y editar tu información de perfil.</p>
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
