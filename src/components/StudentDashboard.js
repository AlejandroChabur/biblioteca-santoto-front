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
    const [activeSection, setActiveSection] = useState('catalogo');
    const [userMenuVisible, setUserMenuVisible] = useState(false); // Estado para el menú de usuario

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
        navigate('/');
    };

    const handleNavigation = (section) => {
        setActiveSection(section);
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(prev => !prev); // Alternar la visibilidad del menú de usuario
    };

    return (
        <div className={`student-dashboard ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
            <header>
                <div className="nav-left">
                    <button onClick={() => handleNavigation('inicio')}>Inicio</button>
                    <button onClick={() => handleNavigation('catalogo')}>Catálogo</button>
                    <button onClick={() => handleNavigation('grupos')}>Grupos</button>
                    <button onClick={() => handleNavigation('acerca')}>Acerca de</button>
                </div>
                <div className="nav-right">
                    <button onClick={toggleTheme}>Tema</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                    <button onClick={toggleUserMenu}>Usuario</button>
                    {/* Menú de usuario */}
                    {userMenuVisible && (
                        <div className="user-menu">
                            <button onClick={() => navigate('/perfil')}>Ver Perfil</button>
                            <button onClick={() => navigate('/configuraciones')}>Configuraciones</button>
                            <button onClick={() => navigate('/ayuda')}>Ayuda</button>
                        </div>
                    )}
                </div>
            </header>

            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
            {loading && <p>Cargando libros...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Contenido según la sección activa */}
            {activeSection === 'catalogo' && (
                <>
                    {/* Filtros */}
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

                    {/* Tabla */}
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

            {/* Sección Inicio */}
            {activeSection === 'inicio' && (
                <div className="inicio-content">
                    <h2>Bienvenido a la Biblioteca Santo Tomás</h2>
                    <p>Estamos aquí para ayudarte a encontrar los recursos que necesitas para tu estudio.</p>
                    <h3>Novedades</h3>
                    <p>Se estima que más del 38.5% de las personas en el mundo no leen.</p>
                    <p>Asegúrate de explorar nuestro catálogo para descubrir nuevos libros y recursos.</p>
                </div>
            )}

            {/* Sección Grupos */}
            {activeSection === 'grupos' && (
                <div className="grupos-content">
                    <h2>Grupos de Estudio</h2>
                    <p>Únete a uno de nuestros grupos de estudio para mejorar tu aprendizaje y socializar con otros estudiantes.</p>
                    <p>Ofrecemos sesiones en línea y presenciales.</p>
                </div>
            )}

            {/* Sección Acerca de */}
            {activeSection === 'acerca' && (
                <div className="acerca-content">
                    <h2>Acerca de la Biblioteca</h2>
                    <p>La Biblioteca Santo Tomás se dedica a proporcionar a los estudiantes recursos y apoyo para sus estudios.</p>
                    <p>Ofrecemos una amplia colección de libros, revistas y recursos digitales.</p>
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
