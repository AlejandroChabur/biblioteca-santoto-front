import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookForm = ({ onSubmit, initialData, isEdit }) => {
    const [bookData, setBookData] = useState(initialData);

    useEffect(() => {
        setBookData(initialData);
    }, [initialData]);

    const handleDateChange = (date) => {
        setBookData({ ...bookData, publicationYear: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", bookData); // Verifica qu� datos se env�an
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
            <DatePicker
                selected={bookData.publicationYear ? new Date(bookData.publicationYear) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                placeholderText="Selecciona el a�o de publicaci�n"
            />
            <button type="submit">{isEdit ? 'Actualizar Libro' : 'Agregar Libro'}</button>
        </form>
    );
};

export default BookForm;