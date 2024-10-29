import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Make sure to link the CSS file here

function Home() {
    return (
        <div className="background">
            <div className="registration-form-container">
                
                <h1 className="form-title">Biblioteca Santo Tomás</h1>
               
                <nav>
                    <Link className="form-button" to="/login">Iniciar Sesión</Link>
                    <Link className="form-button" to="/register">Registrarse</Link>
                </nav>
            </div>
        </div>
    );
}

export default Home;
