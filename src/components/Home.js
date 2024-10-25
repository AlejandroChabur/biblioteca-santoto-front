import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h2>Bienvenido a la Biblioteca Santo Tomás</h2>
            <p>Esta es la página principal.</p>
            <nav>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/register">Registrarse</Link>
            </nav>
        </div>
    );
}

export default Home;