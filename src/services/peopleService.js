 import axios from 'axios';

const API_URL = 'http://www.bibliotecasanttotomas.somee.com/api/People'; // Ajusta la URL según sea necesario

const peopleService = {
    GetAllPeople: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    CreatePerson: async (newPerson) => {
        const response = await axios.post(API_URL, newPerson);
        return response.data;
    },

    UpdatePerson: async (id, updatedPerson) => {
        const response = await axios.put(`${API_URL}/${id}`, updatedPerson);
        return response.data;
    },

    DeletePerson: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};

export default peopleService;