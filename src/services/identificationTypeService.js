import axios from 'axios';

const API_URL = 'http://www.bibliotecasanttotomas.somee.com/api/IdentificationType'; // Ajusta la URL según sea necesario

const identificationTypeService = {
    GetAllIdentificationTypes: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
};

export default identificationTypeService;