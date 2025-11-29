import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Clock, Calendar, /*MapPin*/ } from "lucide-react";
import { useState } from "react";

interface Horario {
  id: string;
  fecha: string;
  hora: string;
  disponible: boolean;
}

export default function HorariosUsuario() {
  const { turnoId } = useParams();
  
  // Datos mock de horarios - en memoria
  const [horarios] = useState<Horario[]>([
    { id: "1", fecha: "2024-12-01", hora: "10:00", disponible: true },
    { id: "2", fecha: "2024-12-01", hora: "12:00", disponible: true },
    { id: "3", fecha: "2024-12-01", hora: "14:00", disponible: false },
    { id: "4", fecha: "2024-12-02", hora: "16:00", disponible: true },
    { id: "5", fecha: "2024-12-02", hora: "18:00", disponible: true },
  ]);

  const handleReservar = (horarioId: string) => {
    // Lógica de reserva (a implementar en el futuro)
    alert(`Reservando horario ${horarioId} - Funcionalidad en desarrollo`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Horarios Disponibles
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Turno ID: <span className="font-semibold">{turnoId}</span>
            </p>
          </div>

          {/* Lista de Horarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {horarios.map((horario) => (
              <div
                key={horario.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border transition-all ${
                  horario.disponible 
                    ? "border-green-200 dark:border-green-800 hover:shadow-lg" 
                    : "border-gray-200 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {new Date(horario.fecha).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {horario.hora}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    horario.disponible
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}>
                    {horario.disponible ? "Disponible" : "Ocupado"}
                  </span>

                  <button
                    onClick={() => handleReservar(horario.id)}
                    disabled={!horario.disponible}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      horario.disponible
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Volver */}
          <div className="mt-10">
            <Link
              to="/clubes-usuario"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-all group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Volver a Canchas
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}