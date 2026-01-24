import {  useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { turnoApi, type Turno } from "../api/clubApi";

export default function HorariosUsuario() {
  const { turnoId } = useParams<{ turnoId: string }>();
  const [turno, setTurno] = useState<Turno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!turnoId) return;
    const cargar = async () => {
        try {
            const data = await turnoApi.getById(turnoId);
            setTurno(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    cargar();
  }, [turnoId]);

  const handleSolicitar = (horarioId: string) => {
    // Aquí iría la lógica para enviar la reserva al backend
    alert(`Solicitud enviada para el horario ${horarioId}.\n(Falta implementar endpoint POST /reserva)`);
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Cargando horarios...</div>;
  if (!turno) return <div className="p-10 text-center dark:text-white">Turno no encontrado</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Horarios Disponibles
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Reserva para: <span className="font-semibold text-blue-600">{turno.descripcionTurno}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(!turno.horarios || turno.horarios.length === 0) ? (
                <p className="col-span-full text-center text-gray-500 bg-white p-6 rounded shadow">
                    No hay horarios disponibles cargados para esta cancha.
                </p>
            ) : turno.horarios.map((horario) => (
              <div
                key={horario.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border transition-all ${
                  horario.disponibilidad
                    ? "border-blue-200 dark:border-blue-800 hover:shadow-lg"
                    : "border-gray-300 dark:border-gray-700 opacity-60 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {new Date(horario.diaHorario).toLocaleDateString("es-ES")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {horario.horario}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      horario.disponibilidad
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {horario.disponibilidad ? "Disponible" : "Ocupado"}
                  </span>

                  <button
                    onClick={() => handleSolicitar(horario.id)}
                    disabled={!horario.disponibilidad}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      horario.disponibilidad
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {horario.disponibilidad ? "Reservar" : "No disponible"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
              Volver
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}