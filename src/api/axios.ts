import axios from 'axios';

// Vite usa 'import.meta.env' para las variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
});

export default api;