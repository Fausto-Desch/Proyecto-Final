import { authApi } from "./authApi";

const API_URL = 'http://localhost:3000'; // Asegúrate que este sea el puerto de tu backend

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = authApi.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  // Si la respuesta no tiene contenido (ej: borrar), retornamos null
  if (response.status === 204) return null;
  
  return response.json();
};