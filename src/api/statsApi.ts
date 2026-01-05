const API_URL = 'http://localhost:3000'; 

export interface DashboardStats {
  clubes: number;
  canchas: number;
  usuarios: number;
  reservas: number;
}

export const statsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
        // Retornamos ceros si falla para no romper la UI
        return { clubes: 0, canchas: 0, usuarios: 0, reservas: 0 };
    }

    return await response.json();
  },
};