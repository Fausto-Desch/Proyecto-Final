import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Calendar, Clock, Trash2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Horario {
  id: string;
  fecha: string;
  hora: string;
  reservado: boolean;
}

export default function HorariosAdmin() {
  const [horarios, setHorarios] = useState<Horario[]>([
    { id: "1", fecha: "2024-12-01", hora: "10:00", reservado: false },
    { id: "2", fecha: "2024-12-01", hora: "12:00", reservado: true },
    { id: "3", fecha: "2024-12-02", hora: "16:00", reservado: false },
  ]);

  const [nuevoHorario, setNuevoHorario] = useState({
    fecha: "",
    hora: "",
  });

  const agregarHorario = () => {
    if (!nuevoHorario.fecha || !nuevoHorario.hora) return;

    const nuevo: Horario = {
      id: crypto.randomUUID(),
      fecha: nuevoHorario.fecha,
      hora: nuevoHorario.hora,
      reservado: false,
    };

    setHorarios([...horarios, nuevo]);
    setNuevoHorario({ fecha: "", hora: "" });
  };

  const eliminarHorario = (id: string) => {
    setHorarios(horarios.filter((h) => h.id !== id));
  };

  const confirmarReserva = (id: string) => {
    setHorarios(
      horarios.map((h) =>
        h.id === id ? { ...h, reservado: !h.reservado } : h
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-10 tracking-tight">
          Administración de Horarios
        </h1>

        {/* Formulario */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-14">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Añadir nuevo horario
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <input
              type="date"
              value={nuevoHorario.fecha}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, fecha: e.target.value })
              }
              className="px-4 py-3 rounded-xl w-full md:w-auto border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="time"
              value={nuevoHorario.hora}
              onChange={(e) =>
                setNuevoHorario({ ...nuevoHorario, hora: e.target.value })
              }
              className="px-4 py-3 rounded-xl w-full md:w-auto border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={agregarHorario}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
            >
              Agregar horario
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {horarios.map((horario) => (
            <div
              key={horario.id}
              className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-5 hover:shadow-xl transition"
            >
              {/* Fecha y hora */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  <span className="text-gray-800 dark:text-white font-semibold text-lg">
                    {new Date(horario.fecha).toLocaleDateString("es-ES")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                    {horario.hora}
                  </span>
                </div>
              </div>

              {/* Badge */}
              <span
                className={`self-start px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide
                ${
                  horario.reservado
                    ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
                }`}
              >
                {horario.reservado ? "Reservado" : "Disponible"}
              </span>

              {/* Botones */}
              <div className="flex gap-4 mt-auto">
                {/* Confirmar */}
                <button
                  onClick={() => confirmarReserva(horario.id)}
                  className={`flex-1 py-3 rounded-xl border font-semibold flex items-center justify-center gap-2 transition text-base
                  ${
                    horario.reservado
                      ? "border-yellow-500 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-300 dark:bg-yellow-900/20"
                      : "border-green-600 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:bg-green-900/20"
                  }`}
                >
                  <CheckCircle size={20} />
                  {horario.reservado ? "Quitar reserva" : "Confirmar"}
                </button>

                {/* Eliminar */}
                <button
                  onClick={() => eliminarHorario(horario.id)}
                  className="flex-1 py-3 rounded-xl border border-red-500 text-red-600 bg-red-50 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:bg-red-900/20 font-semibold flex items-center justify-center gap-2 transition text-base"
                >
                  <Trash2 size={20} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Volver */}
        <div className="mt-14">
          <Link
            to="/home-admin"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition group"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            Volver al Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
