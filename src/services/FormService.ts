import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const FormService = {
    getOptions: async () => {
        try {
            const url = `${backendUrl}/get-options`;
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            console.error(`Error al obtener datos`);
            console.error(error);
            throw error;
        }
    },

    storeForm: async (data) => {
        try {
            const url = `${backendUrl}/save`;
            const response = await axios.post(url, data);
            return response.data;
        } catch (error: any) {
            console.error(`Error al obtener datos`);
            console.error(error);
            throw error;
        }
    }
};


export default FormService