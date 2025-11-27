// Listado de clubes para usuarios
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Building2, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ClubesUsuarios() {
  const [clubes] = useState([
    { id: 1, nombre: "Club Atletico Union", direccion: "Av. Alem 1250", canchas: 3 },
    { id: 2, nombre: "Club Deportivo Bahiense", direccion: "Zapiola 350", canchas: 2 },
    { id: 3, nombre: "Club Estudiantes", direccion: "Colon 75", canchas: 4 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />

      <div className="flex-1 p-10 relative">

        <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-300 mb-4">
          Clubes Disponibles
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Selecciona un club para ver sus canchas disponibles.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubes.map((club) => (
            <div
              key={club.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow 
                         p-6 flex flex-col border border-gray-200 
                         dark:border-gray-700 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="text-blue-400 dark:text-blue-300" size={26} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {club.nombre}
                </h2>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400 gap-2 mb-1">
                <MapPin size={16} /> {club.direccion}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-bold">{club.canchas}</span> canchas disponibles
              </p>

              <Link
                to={`/club/${club.id}/canchas`}
                className="w-full text-center bg-blue-500 dark:bg-blue-600 
                           text-white py-2 rounded-lg shadow 
                           hover:bg-blue-600 dark:hover:bg-blue-500 transition"
              >
                Ver Canchas
              </Link>
            </div>
          ))}
        </div>

        {/* BOTÓN VOLVER */}
        <Link
          to="/home-admin"
          className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                     bg-white dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700
                     text-gray-600 dark:text-gray-300 font-medium shadow-sm
                     hover:bg-gray-50 dark:hover:bg-gray-700
                     hover:text-blue-600 dark:hover:text-blue-400
                     hover:border-blue-200 dark:hover:border-blue-500
                     transition-all active:scale-95 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          Volver al Panel de Control
        </Link>

      </div>

      <Footer />
    </div>
  );
}
