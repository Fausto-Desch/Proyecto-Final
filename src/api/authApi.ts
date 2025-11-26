const API_URL = 'http://localhost:3000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  message: string;
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: 'admin' | 'user';
  };
}

export const authApi = {
  register: async (payload: { nombre: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // intentar leer mensaje de error del backend
      try {
        const err = await response.json();
        throw new Error(err.message || 'Error en el registro');
      } catch {
        // si no hay JSON legible, lanzar error genérico
        throw new Error('Error en el registro');
      }
    }

    // Podemos devolver la respuesta cruda para que la página decida (ej: mensaje de éxito)
    const data = await response.json();
    return data;
  },
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data: LoginResponse = await response.json();

    if (!data.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  },

  saveUserData: (data: LoginResponse) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.usuario.rol);
    localStorage.setItem('userName', data.usuario.nombre);
    localStorage.setItem('userEmail', data.usuario.email);
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getRole: (): 'admin' | 'user' | null => {
    return localStorage.getItem('role') as 'admin' | 'user' | null;
  },

  getUserName: (): string | null => {
    return localStorage.getItem('userName');
  },

  getUserEmail: (): string | null => {
    return localStorage.getItem('userEmail');
  },
};
