import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookForm = ({ onSubmit, initialData }) => {
    // Inicializa bookData con un objeto por defecto si initialData es null
    const [bookData, setBookData] = React.useState(initialData || {
        title: '',
        idEdition: '',
        code: '',
        publicationYear: ''
    });

    React.useEffect(() => {
        setBookData(initialData || {
            title: '',
            idEdition: '',
            code: '',
            publicationYear: ''
        });
    }, [initialData]);

    const handleDateChange = (date) => {
        const formattedDate = date ? date.toISOString().split('T')[0] : '';
        setBookData({ ...bookData, publicationYear: formattedDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

        console.log("Datos a enviar:", dataToSubmit); // Verifica qué datos se envían
        onSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="ID de Edición"
                value={bookData.idEdition}
                onChange={(e) => setBookData({ ...bookData, idEdition: Number(e.target.value) })}
                required
            />
            <input
                type="text"
                placeholder="Código"
                value={bookData.code}
                onChange={(e) => setBookData({ ...bookData, code: e.target.value })}
                required
            />
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
