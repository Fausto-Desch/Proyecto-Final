// Listado de clubes para usuarios
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Building2, MapPin } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ClubesUsuarios() {
  const [clubes] = useState([
    { id: 1, nombre: "Club Atletico Union", direccion: "Av. Alem 1250", canchas: 3 },
    { id: 2, nombre: "Club Deportivo Bahiense", direccion: "Zapiola 350", canchas: 2 },
    { id: 3, nombre: "Club Estudiantes", direccion: "Colon 75", canchas: 4 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 p-10 relative">

        <h1 className="text-3xl font-bold text-blue-500 mb-4">Clubes Disponibles</h1>
        <p className="text-gray-600 mb-8">
          Selecciona un club para ver sus canchas disponibles.
        </p>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubes.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-2xl shadow p-6 flex flex-col border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="text-blue-400" size={26} />
                <h2 className="text-xl font-semibold text-gray-800">{club.nombre}</h2>
              </div>

              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <MapPin size={16} /> {club.direccion}
              </div>

              <p className="text-gray-700 mb-4">
                <span className="font-bold">{club.canchas}</span> canchas disponibles
              </p>

              <Link
                to={`/club/${club.id}/canchas`}
                className="w-full text-center bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Ver Canchas
              </Link>
            </div>
          ))}
        </div>
          <Link
            to="/home-admin"
            className=" mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium shadow-sm hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 group"
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
