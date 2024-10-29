import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookForm = ({ onSubmit, initialData }) => {
    const [bookData, setBookData] = React.useState(initialData);

    React.useEffect(() => {
        setBookData(initialData);
    }, [initialData]);

    const handleDateChange = (date) => {
        // Almacena la fecha como una cadena en formato YYYY-MM-DD
        const formattedDate = date ? date.toISOString().split('T')[0] : '';
        setBookData({ ...bookData, publicationYear: formattedDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir el objeto a enviar
        const dataToSubmit = {
            code: bookData.code,
            edition: {
                id: bookData.idEdition,
                editionName: bookData.edition?.editionName || '',
                isDelete: false
            },
            idEdition: bookData.idEdition,
            isDelete: false,
            publicationYear: bookData.publicationYear,
            title: bookData.title
        };

        console.log("Datos a enviar:", dataToSubmit); // Verifica qu� datos se env�an
        onSubmit(dataToSubmit);
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

            {/* Date Picker para seleccionar solo la fecha */}
            <DatePicker
                selected={bookData.publicationYear ? new Date(bookData.publicationYear) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Selecciona la fecha"
            />

            <button type="submit">Guardar</button>
        </form>
    );
};

export default BookForm;