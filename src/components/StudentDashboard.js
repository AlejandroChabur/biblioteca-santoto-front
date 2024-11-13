import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard() {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState(null); // Estado para almacenar información del usuario
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [titleFilter, setTitleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');;
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

        const fetchUserInfo = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                console.log("User Info:", userInfo); // Verifica qué hay en userInfo
                setUser(userInfo); // Establece el usuario en el estado

                try {
                    // Llama a la API para obtener la información del usuario usando userId
                    const response = await axios.get(`http://www.bibliotecasanttotomas.somee.com/api/User/${userInfo.userId}`);
                    setUser(prevUser => ({ ...prevUser, details: response.data })); // Almacena la información del usuario
                    console.log("User Info from API:", response.data); // Verifica la respuesta de la API
                } catch (err) {
                    console.error("Error en la API:", err.response ? err.response.data : err.message);
                    setError('Error al cargar la información del usuario.');
                }
            }
        };

        fetchBooks();
        fetchUserInfo(); // Llama a la función para obtener la información del usuario
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
        localStorage.removeItem('userInfo'); // Elimina la información del usuario al cerrar sesión
        navigate('/'); // Redirige a la página de inicio
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
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
                    <button onClick={toggleUserMenu}>
                        {user ? user.firstName : 'Usuario'} {/* Muestra el nombre del usuario */}
                    </button>
                    {isUserMenuOpen && (
                        <div className="user-menu">
                            {user && <p>Bienvenido, {user.firstName}!</p>} {/* Información del usuario */}
                            <button onClick={() => setActiveSection('perfil')}>Perfil</button>
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Bienvenido a la Biblioteca Santo Tomás</h2>

                    <section style={{ maxWidth: '800px', textAlign: 'left', margin: '20px 0' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Historia del Colegio</h3>
                        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                            El Colegio Santo Tomás de Chía tiene una rica historia que se remonta a su fundación en 1970. A lo largo de los años, el colegio ha crecido y evolucionado, manteniéndose fiel a su misión de brindar una educación integral basada en valores cristianos y en el desarrollo personal de cada estudiante.
                        </p>
                    </section>

                    <section style={{ maxWidth: '800px', textAlign: 'left', margin: '20px 0' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Misión</h3>
                        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                            La misión del Colegio Santo Tomás de Chía es formar personas integrales, comprometidas con el desarrollo humano, espiritual, y académico. A través de una educación de alta calidad, el colegio busca inspirar en sus estudiantes el amor por el aprendizaje y la preparación para afrontar los retos de la vida.
                        </p>
                    </section>

                    <section style={{ maxWidth: '800px', textAlign: 'left', margin: '20px 0' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Visión</h3>
                        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                            La visión del colegio es ser un referente de educación en la región, conocido por su enfoque en el desarrollo integral y su compromiso con la formación de ciudadanos éticos y responsables. El Colegio Santo Tomás de Chía se proyecta como una institución que fomenta la innovación educativa y el compromiso con la comunidad.
                        </p>
                    </section>

                    <section style={{ maxWidth: '800px', textAlign: 'left', margin: '20px 0' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C3E50' }}>Valores Institucionales</h3>
                        <ul style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                            <li><strong>Respeto:</strong> Promover el respeto en todas las interacciones entre estudiantes, docentes y personal, reconociendo la dignidad de cada persona.</li>
                            <li><strong>Responsabilidad:</strong> Fomentar una cultura de responsabilidad en el cumplimiento de los deberes académicos y en la vida diaria.</li>
                            <li><strong>Solidaridad:</strong> Incentivar la ayuda mutua y la empatía en toda la comunidad educativa.</li>
                            <li><strong>Honestidad:</strong> Valorar y practicar la integridad en cada acción y decisión.</li>
                        </ul>
                    </section>

                    <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#333' }}>
                        <p>"Un libro es un sueño que puedes sostener en tus manos." – Neil Gaiman</p>
                        <p>"La lectura es para la mente lo que el ejercicio es para el cuerpo." – Joseph Addison</p>
                    </div>
                </div>
            )}


            {activeSection === 'grupos' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Grupos y Actividades</h2>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '600px', marginBottom: '15px' }}>
                        <img
                            src="/assets/Santoto.jpeg"
                            alt="Grupo de Estudio"
                            style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '15px' }}
                        />
                        <div style={{ textAlign: 'left' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Grupos de Estudio</h3>
                            <p style={{ fontSize: '16px', color: '#666' }}>
                                Únete a nuestros grupos de estudio para fortalecer tus habilidades académicas en un entorno colaborativo.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '600px', marginBottom: '15px' }}>
                        <img
                            src="/ruta-a-la-imagen-juego.jpg"
                            alt="Grupo de Juego"
                            style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '15px' }}
                        />
                        <div style={{ textAlign: 'left' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Grupos de Juego</h3>
                            <p style={{ fontSize: '16px', color: '#666' }}>
                                Participa en actividades de juegos y rompe el hielo con otros estudiantes mientras mejoras tus habilidades de trabajo en equipo.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '600px', marginBottom: '15px' }}>
                        <img
                            src="/ruta-a-la-imagen-lectura.jpg"
                            alt="Grupo de Lectura"
                            style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '15px' }}
                        />
                        <div style={{ textAlign: 'left' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Grupos de Lectura</h3>
                            <p style={{ fontSize: '16px', color: '#666' }}>
                                Disfruta de la lectura en compañía y debate sobre libros y temas literarios de interés común.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'acerca' && (
                <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ color: '#2C3E50', fontSize: '2.5rem', marginBottom: '1rem' }}>Acerca de la Biblioteca</h2>
                    <p style={{ color: '#7F8C8D', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        Nuestra biblioteca es un lugar donde la historia, el conocimiento y la comunidad se unen. Con años de dedicación a ofrecer recursos de calidad, estamos comprometidos en fomentar el amor por la lectura y el aprendizaje en todas las edades.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ width: '300px', margin: '1rem', textAlign: 'left' }}>

                            <h3 style={{ color: '#34495E', fontSize: '1.5rem', marginTop: '0.5rem' }}>Nuestra Historia</h3>
                            <p style={{ color: '#95A5A6', fontSize: '1rem' }}>
                                Desde nuestros comienzos, hemos crecido junto con la comunidad, adaptándonos a sus necesidades. Aquí encontrarás cómo evolucionamos y nuestras metas a futuro.
                            </p>
                        </div>

                        <div style={{ width: '300px', margin: '1rem', textAlign: 'left' }}>


                            <h3 style={{ color: '#34495E', fontSize: '1.5rem', marginTop: '0.5rem' }}>Nuestros Servicios</h3>
                            <p style={{ color: '#95A5A6', fontSize: '1rem' }}>
                                Ofrecemos una amplia variedad de servicios, desde préstamos de libros hasta espacios de estudio y talleres educativos. Conoce más sobre cómo te apoyamos en tu aprendizaje.
                            </p>
                        </div>

                        <div style={{ width: '300px', margin: '1rem', textAlign: 'left' }}>

                            <h3 style={{ color: '#34495E', fontSize: '1.5rem', marginTop: '0.5rem' }}>Misión y Visión</h3>
                            <p style={{ color: '#95A5A6', fontSize: '1rem' }}>
                                Inspirar a cada visitante a descubrir y aprender es nuestra misión. Con un futuro orientado hacia la innovación y accesibilidad, buscamos impactar positivamente a todos.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', color: '#34495E' }}>
                        <h3 style={{ fontSize: '2rem' }}>¿Por qué visitarnos?</h3>
                        <p style={{ color: '#7F8C8D', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Al visitarnos, te sumerges en un ambiente dedicado al saber. Nuestro espacio no solo ofrece libros, sino también un lugar para reflexionar, investigar y conectarte con otros apasionados por el conocimiento. ¡Esperamos verte pronto!
                        </p>

                    </div>
                </div>
            )}

            {activeSection === 'perfil' && (
                <div>
                    <h2>Perfil de Usuario</h2>
                    {user ? (
                        <div>
                            <p>ID: {user.userId}</p>
                            <p>Nombre: {user.details.firstName}</p>
                            <p>Apellido: {user.details.lastName}</p>
                            <p>Email: {user.details.email}</p>

                        </div>
                    ) : (
                        <p>No se encontró información del usuario.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
