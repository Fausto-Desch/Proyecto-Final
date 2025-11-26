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
