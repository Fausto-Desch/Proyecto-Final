import { apiClient } from "./apiClient";
import { type Horario, type Turno } from "./clubApi";

export const turnoApi = {

  addHorario: async (turnoId: string, horario: Horario): Promise<Turno> => {
    return apiClient(`/turno/${turnoId}/horario`, { 
      method: 'PUT',
      body: JSON.stringify(horario),
    });
  },

  preCrearHorarios: async (turnoId: string, config: { horaInicio: number, horaFin: number, dia: string }): Promise<any> => {
    return apiClient(`/turno/${turnoId}/pre-crear`, {
      method: 'POST',
      body: JSON.stringify(config),
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