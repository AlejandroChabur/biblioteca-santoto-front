import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure to link the CSS file here

function Home() {
    return (
        <div className="background">
            <div className="registration-form-container">
                <p className="form-title">Cat Biblio</p>
                <h2 className="form-title">Bienvenido a la Biblioteca Santo Tomás</h2>
                <p>siga a continuacion.</p>
                <nav>
                    <Link className="form-button" to="/login">Iniciar Sesión</Link>
                    <Link className="form-button" to="/register">Registrarse</Link>
                </nav>
            </div>
        </div>
    );
}

export default Home;
