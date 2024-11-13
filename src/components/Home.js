import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Asegúrate de vincular el archivo CSS aquí

function Home() {
    const [isAccepted, setIsAccepted] = useState(false);

    // Comprobar si ya se ha aceptado la política
    useEffect(() => {
        const accepted = localStorage.getItem('acceptedPolicy');
        if (accepted) {
            setIsAccepted(true);
        }
    }, []);

    const handleAccept = () => {
        // Guardar en localStorage que el usuario aceptó la política
        localStorage.setItem('acceptedPolicy', 'true');
        setIsAccepted(true); // Actualizar el estado para ocultar la ventana emergente
    };

    return (
        <div className="background">
            <div className="registration-form-container">

                <h1 className="form-title">Biblioteca Santo Tomás</h1>

                <nav>
                    <Link className="form-button" to="/login">Iniciar Sesión</Link>
                </nav>
            </div>

            {/* Pestaña flotante para aceptar la política */}
            {!isAccepted && (
                <div className="policy-popup">
                    <p className="policy-text">
                        Al continuar, aceptas nuestra <strong>Política de Tratamiento de Datos</strong>.
                    </p>
                    <button onClick={handleAccept} className="accept-policy-button">
                        Aceptar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
