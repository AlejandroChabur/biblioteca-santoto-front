import axios from 'axios';

const API_URL = 'https://www.bibliotecasanttotomas.somee.com/api/User';

const UserService = {
    createUser: async (newUser) => {
        try {
            const response = await axios.post(API_URL, newUser);
            return response.data;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw error;
        }
    }
};

export default UserService;
