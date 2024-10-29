import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookForm = ({ onSubmit, initialData, isEdit }) => {
    const [bookData, setBookData] = useState(initialData);

    useEffect(() => {
        setBookData(initialData);
    }, [initialData]); // Actualiza el formulario si cambian los datos iniciales

    const handleDateChange = (date) => {
        setBookData({ ...bookData, publicationYear: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(bookData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="T�tulo"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="ID de Edici�n"
                value={bookData.idEdition}
                onChange={(e) => setBookData({ ...bookData, idEdition: Number(e.target.value) })}
                required
            />
            <input
                type="text"
                placeholder="C�digo"
                value={bookData.code}
                onChange={(e) => setBookData({ ...bookData, code: e.target.value })}
                required
            />

            {/* Date Picker para seleccionar la fecha de publicaci�n */}
            <DatePicker
                selected={bookData.publicationYear ? new Date(bookData.publicationYear) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                yearDropdownItemNumber={100}  // Rango de a�os
                scrollableYearDropdown       // Dropdown desplazable de a�os
                placeholderText="Selecciona el a�o de publicaci�n"
            />

            <button type="submit">{isEdit ? 'Actualizar Libro' : 'Agregar Libro'}</button>
        </form>
    );
};

export default BookForm;
