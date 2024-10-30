import React, { useEffect, useState } from 'react';
import booksService from "../services/booksService"; 
import peopleService from "../services/peopleService"; 
import BookForm from './BookForm';
import BookTable from './BookTable';
import PeopleForm from './PeopleForm';
import PeopleTable from './PeopleTable';
import LoginForm from './LoginScreens/LoginForm';

import './AdminDashBoard.css';


const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [people, setPeople] = useState([]);
    const [activeTab, setActiveTab] = useState('books'); 
   
    const [newBook, setNewBook] = useState({
        title: '',
        code: '',
        publicationYear: '',
        idEdition: 0,
        edition: { id: 0, editionName: '', isDelete: false }
    });
    const [editBookId, setEditBookId] = useState(null);
    const [editBookData, setEditBookData] = useState({
        id: null,
        title: '',
        code: '',
        publicationYear: '',
        idEdition: 0,
        edition: { id: 0, editionName: '', isDelete: false }
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [newPerson, setNewPerson] = useState({
        idIdentificationType: 0,
        identificationNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        address: '',
        borndate: '' 
    });
    const [editPersonId, setEditPersonId] = useState(null);
    const [editPersonData, setEditPersonData] = useState({
        id: null,
        idIdentificationType: 0, 
        identificationNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        address: '',
        borndate: '' 
    });
    const [isEditPersonModalOpen, setIsEditPersonModalOpen] = useState(false);

    useEffect(() => {
        fetchBooks();
        fetchPeople();
    }, []);

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await booksService.GetAllBooks();
            setBooks(fetchedBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("Error al obtener los libros.");
        }
    };

    const fetchPeople = async () => {
        try {
            const fetchedPeople = await peopleService.GetAllPeople();
            setPeople(fetchedPeople);
        } catch (error) {
            console.error("Error fetching people:", error);
            alert("Error al obtener las personas.");
        }
    };

    // Funciones para libros
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await booksService.CreateBook(newBook);
            fetchBooks();
            setNewBook({
                title: '',
                code: '',
                publicationYear: '',
                idEdition: 0,
                edition: { id: 0, editionName: '', isDelete: false }
            });
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Error al agregar el libro.");
        }
    };

    const openEditModal = (book) => {
        setEditBookId(book.id);
        setEditBookData(book);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        const bookData = { ...editBookData, isDelete: false };
        try {
            await booksService.UpdateBook(editBookId, bookData);
            fetchBooks();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error al actualizar el libro.");
        }
    };

    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (confirmDelete) {
            try {
                await booksService.DeleteBook(bookId);
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Error al eliminar el libro.");
            }
        }
    };

    const handleAddPerson = async (e) => {
        e.preventDefault();

        const personData = {
            id: 0,
            idIdentificationType: Number(newPerson.idIdentificationType), 
            identificationNumber: newPerson.identificationNumber,
            firstName: newPerson.firstName,
            middleName: newPerson.middleName,
            lastName: newPerson.lastName,
            secondLastName: newPerson.secondLastName,
            address: newPerson.address,
            borndate: newPerson.borndate, 
            identificationTypes: {
                id: Number(newPerson.idIdentificationType), 
                name: "Cedula", 
                isDelete: false 
            },
            isDelete: false 
        };

        console.log("Datos a enviar:", personData); 
        try {
            await peopleService.CreatePerson(personData);
            fetchPeople(); 
            setNewPerson({
                idIdentificationType: 0,
                identificationNumber: '',
                firstName: '',
                middleName: '',
                lastName: '',
                secondLastName: '',
                address: '',
                borndate: ''
            });
        } catch (error) {
            console.error("Error adding person:", error.response?.data || error.message);
            alert("Error al agregar la persona.");
        }
    };


    const openEditPersonModal = (person) => {
        setEditPersonId(person.id);
        setEditPersonData(person);
        setIsEditPersonModalOpen(true);
    };

    const closeEditPersonModal = () => {
        setIsEditPersonModalOpen(false);
    };

    const handleEditPerson = async (e) => {
        e.preventDefault();
        try {
            await peopleService.UpdatePerson(editPersonId, editPersonData);
            fetchPeople();
            setIsEditPersonModalOpen(false);
        } catch (error) {
            console.error("Error updating person:", error);
            alert("Error al actualizar la persona.");
        }
    };

    const handleDeletePerson = async (personId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta persona?");
        if (confirmDelete) {
            try {
                await peopleService.DeletePerson(personId);
                fetchPeople();
            } catch (error) {
                console.error("Error deleting person:", error);
                alert("Error al eliminar la persona.");
            }
        }
    };
    const AdminDashboard = () => {
        const [activeSection, setActiveSection] = useState('books');

        return (
            <div className="admin-dashboard">
                <header>
                    <h1>Panel de Administración</h1>
                    <nav>
                        <button onClick={() => setActiveSection('books')}>Libros</button>
                        <button onClick={() => setActiveSection('people')}>Personas</button>
                        <button onClick={() => setActiveSection('register')}>Registrar Usuario</button>
                    </nav>
                </header>

                {activeSection === 'books' && <BookTable />} 
                {activeSection === 'people' && <PeopleTable />}
                {activeSection === 'register' && <LoginForm />} 
            </div>
        );
    };


    return (
        <div className="admin-dashboard">
            <h1>Gestión Administrativa</h1>

           
            <div className="tabs">
                <button onClick={() => setActiveTab('books')} className={activeTab === 'books' ? 'active' : ''}>Libros</button>
                <button onClick={() => setActiveTab('people')} className={activeTab === 'people' ? 'active' : ''}>Personas</button>
            </div>

            {activeTab === 'books' && (
                <div>
                    <h2>Gestión de Libros</h2>
                    <form onSubmit={handleAddBook}>
                        <input type="text" placeholder="Título" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
                        <input type="number" placeholder="ID de Edición" value={newBook.idEdition} onChange={(e) => setNewBook({ ...newBook, idEdition: Number(e.target.value) })} required />
                        <input type="text" placeholder="Código" value={newBook.code} onChange={(e) => setNewBook({ ...newBook, code: e.target.value })} required />
                        <input type="text" placeholder="Año de Publicación" value={newBook.publicationYear} onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })} required />
                        <button type="submit">Agregar Libro</button>
                    </form>

                    <BookTable books={books} onEdit={openEditModal} onDelete={handleDeleteBook} />

                    {isEditModalOpen && (
                        <div className="modal" style={{ display: 'block' }}>
                            <div className="modal-content">
                                <span className="close" onClick={closeEditModal}>&times;</span>
                                <h2>Editar Libro</h2>
                                <form onSubmit={handleEditBook}>
                                    <input type="text" placeholder="Título" value={editBookData.title} onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })} required />
                                    <input type="text" placeholder="Código" value={editBookData.code} onChange={(e) => setEditBookData({ ...editBookData, code: e.target.value })} required />
                                    <input type="text" placeholder="Año de Publicación" value={editBookData.publicationYear} onChange={(e) => setEditBookData({ ...editBookData, publicationYear: e.target.value })} required />
                                    <input type="number" placeholder="ID de Edición" value={editBookData.idEdition} onChange={(e) => setEditBookData({ ...editBookData, idEdition: Number(e.target.value) })} required />
                                    <button type="submit">Actualizar Libro</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'people' && (
                <div>
                    <h2>Gestión de Personas</h2>
                    <form onSubmit={handleAddPerson}>
                        <input type="number" placeholder="Tipo de Identificación" value={newPerson.idIdentificationType} onChange={(e) => setNewPerson({ ...newPerson, idIdentificationType: Number(e.target.value) })} required />
                        <input type="text" placeholder="Número de Identificación" value={newPerson.identificationNumber} onChange={(e) => setNewPerson({ ...newPerson, identificationNumber: e.target.value })} required />
                        <input type="text" placeholder="Nombre" value={newPerson.firstName} onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })} required />
                        <input type="text" placeholder="Segundo Nombre" value={newPerson.middleName} onChange={(e) => setNewPerson({ ...newPerson, middleName: e.target.value })} />
                        <input type="text" placeholder="Apellido" value={newPerson.lastName} onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })} required />
                        <input type="text" placeholder="Segundo Apellido" value={newPerson.secondLastName} onChange={(e) => setNewPerson({ ...newPerson, secondLastName: e.target.value })} />
                        <input type="text" placeholder="Dirección" value={newPerson.address} onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })} required />
                        <input type="date" placeholder="Fecha de Nacimiento" value={newPerson.borndate} onChange={(e) => setNewPerson({ ...newPerson, borndate: e.target.value })} required />
                        <button type="submit">Agregar Persona</button>
                    </form>

                    <PeopleTable people={people} onEdit={openEditPersonModal} onDelete={handleDeletePerson} />

                    {isEditPersonModalOpen && (
                        <div className="modal" style={{ display: 'block' }}>
                            <div className="modal-content">
                                <span className="close" onClick={closeEditPersonModal}>&times;</span>
                                <h2>Editar Persona</h2>
                                <form onSubmit={handleEditPerson}>
                                    <input type="number" placeholder="Tipo de Identificación" value={editPersonData.idIdentificationType} onChange={(e) => setEditPersonData({ ...editPersonData, idIdentificationType: Number(e.target.value) })} required />
                                    <input type="text" placeholder="Número de Identificación" value={editPersonData.identificationNumber} onChange={(e) => setEditPersonData({ ...editPersonData, identificationNumber: e.target.value })} required />
                                    <input type="text" placeholder="Nombre" value={editPersonData.firstName} onChange={(e) => setEditPersonData({ ...editPersonData, firstName: e.target.value })} required />
                                    <input type="text" placeholder="Segundo Nombre" value={editPersonData.middleName} onChange={(e) => setEditPersonData({ ...editPersonData, middleName: e.target.value })} />
                                    <input type="text" placeholder="Apellido" value={editPersonData.lastName} onChange={(e) => setEditPersonData({ ...editPersonData, lastName: e.target.value })} required />
                                    <input type="text" placeholder="Segundo Apellido" value={editPersonData.secondLastName} onChange={(e) => setEditPersonData({ ...editPersonData, secondLastName: e.target.value })} />
                                    <input type="text" placeholder="Dirección" value={editPersonData.address} onChange={(e) => setEditPersonData({ ...editPersonData, address: e.target.value })} required />
                                    <input type="date" placeholder="Fecha de Nacimiento" value={editPersonData.borndate} onChange={(e) => setEditPersonData({ ...editPersonData, borndate: e.target.value })} required />
                                    <button type="submit">Actualizar Persona</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;