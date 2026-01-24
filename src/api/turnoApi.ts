import { apiClient } from "./apiClient";
import { type Horario, type Turno } from "./clubApi";

export const turnoApi = {

  addHorario: async (turnoId: string, horario: Horario): Promise<Turno> => {
    return apiClient(`/turno/${turnoId}/${horario.id}`, {
      method: 'PUT',
      body: JSON.stringify(horario),
    });
  },

  deleteHorario: async (turnoId: string, horarioId: string): Promise<Turno> => {
    return apiClient(`/turno/${turnoId}/${horarioId}`, {
      method: 'DELETE',
    });
  },
  
  getById: async (id: string): Promise<Turno> => {
      return apiClient(`/turno/${id}`);
  }
};