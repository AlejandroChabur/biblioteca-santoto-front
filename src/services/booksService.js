// booksService.js
import axios from 'axios';

const API_URL = 'http://www.bibliotecasanttotomas.somee.com/api/Books';

const booksService = {
    GetAllBooks: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    },

    GetBookById: async (Id) => {
        try {
            const response = await axios.get(`${API_URL}/${Id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching book by id", error);
            throw error;
        }
    },

    CreateBook: async (book) => {
        try {
            const response = await axios.post(API_URL, JSON.stringify(book), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating book:", error);
            throw error;
        }
    },

    UpdateBook: async (Id, bookData) => {
        try {
            const response = await axios.put(`${API_URL}/${Id}`, bookData);
            return response.data;
        } catch (error) {
            console.error("Error updating book:", error);
            throw error;
        }
    },

    DeleteBook: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error deleting book:", error);
            return false;
        }
    }
};

// Exporta el objeto completo como exportación por defecto
export default booksService;
