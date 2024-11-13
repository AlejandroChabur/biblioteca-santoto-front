import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);  // Nuevo estado para mostrar el modal
    const navigate = useNavigate();

    // Comprobar si ya se ha aceptado la política
    useEffect(() => {
        const accepted = localStorage.getItem('acceptedPolicy');
        if (accepted) {
            setIsAccepted(true);
        }
    }, []);

    const handleAcceptPolicy = () => {
        setShowModal(true); // Mostrar el modal con la política
    };

    const handleConfirmAccept = () => {
        // Guardar en localStorage que el usuario aceptó la política
        localStorage.setItem('acceptedPolicy', 'true');
        setIsAccepted(true);  // Actualizar el estado
        setShowModal(false);  // Cerrar el modal
        navigate('/login');  // Redirigir a la página de login
    };

    return (
        <div className="background">
            <div className="registration-form-container">
                <h1 className="form-title">Biblioteca Santo Tomás</h1>
                <nav>
                    <button onClick={handleAcceptPolicy} className="form-button">
                        Aceptar Política y Continuar
                    </button>
                </nav>
            </div>

            {/* Modal con la política de tratamiento de datos */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Política de Tratamiento de Datos</h2>
                        <p>
                            Al continuar, aceptas nuestra Política de Tratamiento de Datos.
                            Esta política describe cómo recopilamos, utilizamos y protegemos tu información personal.
                            Al hacer clic en "Aceptar", confirmas que has leído y aceptas los términos y condiciones.
                        </p>
                        <button onClick={handleConfirmAccept} className="accept-policy-button">
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
