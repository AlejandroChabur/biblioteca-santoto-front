// src/components/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query'); // Obtiene el query de la URL

    return (
        <div>
            <h1>Resultados de B�squeda</h1>
            <p>Resultados para: <strong>{query}</strong></p>
            {/* Aqu� puedes agregar la l�gica para mostrar los resultados basados en el query */}
        </div>
    );
};

export default SearchResults;
