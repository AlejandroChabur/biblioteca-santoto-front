// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Bienvenido al Colegio Santo Tomás de Chía</h1>
            <p className="home-description">
                El Colegio Santo Tomás de Chía se dedica a brindar una educación de calidad,
                formando estudiantes íntegros y competentes en un ambiente de respeto y solidaridad.
            </p>
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            <section className="news-section">
                <h2>Noticias Recientes</h2>
                <article className="news-item">
                    <h3>Inauguración de Nuevas Instalaciones</h3>
                    <p>
                        Nos complace anunciar la inauguración de nuestras nuevas instalaciones
                        deportivas, que estarán disponibles para todos nuestros estudiantes a partir
                        del próximo mes.
                    </p>
                </article>
                <article className="news-item">
                    <h3>Resultados del Concurso de Matemáticas</h3>
                    <p>
                        Felicitamos a nuestros estudiantes por los excelentes resultados obtenidos
                        en el Concurso de Matemáticas, donde obtuvimos varios premios en diferentes
                        categorías.
                    </p>
                </article>
                <article className="news-item">
                    <h3>Jornada de Puertas Abiertas</h3>
                    <p>
                        El próximo sábado, realizaremos una jornada de puertas abiertas para que los
                        futuros estudiantes y sus familias puedan conocer nuestras instalaciones y
                        el modelo educativo que ofrecemos.
                    </p>
                </article>
            </section>
            <section className="info-section">
                <h2>Información General</h2>
                <p>
                    Nuestro compromiso es ofrecer una formación integral que fomente el desarrollo
                    académico, social y personal de nuestros estudiantes, contribuyendo así a la
                    construcción de una sociedad más justa y equitativa.
                </p>
                <p>
                    Contamos con un equipo docente altamente calificado y un currículo adaptado a
                    las necesidades de cada uno de nuestros alumnos, garantizando así una educación
                    que promueva el pensamiento crítico y la creatividad.
                </p>
            </section>
        </div>
    );
};

export default Home;
