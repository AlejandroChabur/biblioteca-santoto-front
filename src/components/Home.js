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
            <h1 className="home-title">Bienvenido al Colegio Santo Tom�s de Ch�a</h1>
            <p className="home-description">
                El Colegio Santo Tom�s de Ch�a se dedica a brindar una educaci�n de calidad,
                formando estudiantes �ntegros y competentes en un ambiente de respeto y solidaridad.
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
                    <h3>Inauguraci�n de Nuevas Instalaciones</h3>
                    <p>
                        Nos complace anunciar la inauguraci�n de nuestras nuevas instalaciones
                        deportivas, que estar�n disponibles para todos nuestros estudiantes a partir
                        del pr�ximo mes.
                    </p>
                </article>
                <article className="news-item">
                    <h3>Resultados del Concurso de Matem�ticas</h3>
                    <p>
                        Felicitamos a nuestros estudiantes por los excelentes resultados obtenidos
                        en el Concurso de Matem�ticas, donde obtuvimos varios premios en diferentes
                        categor�as.
                    </p>
                </article>
                <article className="news-item">
                    <h3>Jornada de Puertas Abiertas</h3>
                    <p>
                        El pr�ximo s�bado, realizaremos una jornada de puertas abiertas para que los
                        futuros estudiantes y sus familias puedan conocer nuestras instalaciones y
                        el modelo educativo que ofrecemos.
                    </p>
                </article>
            </section>
            <section className="info-section">
                <h2>Informaci�n General</h2>
                <p>
                    Nuestro compromiso es ofrecer una formaci�n integral que fomente el desarrollo
                    acad�mico, social y personal de nuestros estudiantes, contribuyendo as� a la
                    construcci�n de una sociedad m�s justa y equitativa.
                </p>
                <p>
                    Contamos con un equipo docente altamente calificado y un curr�culo adaptado a
                    las necesidades de cada uno de nuestros alumnos, garantizando as� una educaci�n
                    que promueva el pensamiento cr�tico y la creatividad.
                </p>
            </section>
        </div>
    );
};

export default Home;
