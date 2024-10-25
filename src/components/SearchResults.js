// src/components/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query'); // Obtiene el query de la URL

    return (
        <div>
            <h1>Resultados de Búsqueda</h1>
            <p>Resultados para: <strong>{query}</strong></p>
            {/* Aquí puedes agregar la lógica para mostrar los resultados basados en el query */}
        </div>
    );
};

export default SearchResults;
