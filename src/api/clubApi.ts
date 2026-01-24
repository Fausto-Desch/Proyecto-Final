import { apiClient } from "./apiClient";


export interface Horario {
  id: string;
  disponibilidad: boolean;
  horario: string;
  diaHorario: string;
}

export interface Turno {
  id: string;
  descripcionTurno: string;
  costo: number;
  horarios: Horario[];
}

export interface Cancha {
  id: string;
  nombreCancha: string;
  deporte: string;
  tamanio: string;
  turno: Turno;
}

export interface Club {
  id: string;
  nombreClub: string;
  direccion: string;
  telefono: string;
  gmail: string;
  valoracion: number;
  canchas: Cancha[];
}

// --- Funciones para llamar al Backend ---
export const clubApi = {
  // CLUBES
  getAll: (): Promise<Club[]> => apiClient('/club'),
  
  getById: (id: string): Promise<Club> => apiClient(`/club/${id}`),

  create: (club: Club): Promise<Club> => apiClient('/club', {
    method: 'POST',
    body: JSON.stringify(club),
  }),

  update: (id: string, club: Partial<Club>): Promise<Club> => apiClient(`/club/${id}`, {
    method: 'PUT',
    body: JSON.stringify(club),
  }),

  delete: (id: string): Promise<void> => apiClient(`/club/${id}`, {
    method: 'DELETE',
  }),

  
  addCancha: (idClub: string, cancha: Cancha): Promise<Club> => 
    apiClient(`/club/${idClub}/${cancha.id}`, {
      method: 'PUT',
      body: JSON.stringify(cancha),
    }),

  deleteCancha: (idClub: string, idCancha: string): Promise<Club> => 
    apiClient(`/club/${idClub}/${idCancha}`, {
      method: 'DELETE',
    }),
};

// TURNOS Y HORARIOS
export const turnoApi = {
  getById: (id: string): Promise<Turno> => apiClient(`/turno/${id}`),

  addHorario: (idTurno: string, horario: Horario): Promise<Turno> => 
    apiClient(`/turno/${idTurno}/${horario.id}`, {
      method: 'PUT',
      body: JSON.stringify(horario),
    }),

  deleteHorario: (idTurno: string, idHorario: string): Promise<Turno> => 
    apiClient(`/turno/${idTurno}/${idHorario}`, {
      method: 'DELETE',
    }),
};