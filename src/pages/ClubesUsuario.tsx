import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Building2, MapPin, ArrowLeft, Phone, Mail, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { clubApi, type Club } from "../api/clubApi";

export default function ClubesUsuario() {
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Traemos los datos REALES del backend
  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const data = await clubApi.getAll();
        setClubes(data);
      } catch (error) {
        console.error("Error cargando clubes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />

      <div className="flex-1 p-10 relative">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Clubes Disponibles
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Selecciona un club para ver sus canchas disponibles.
        </p>

        {loading ? (
          <p className="text-center dark:text-white">Cargando clubes...</p>
        ) : clubes.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-500">No hay clubes registrados en el sistema por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubes.map((club) => (
              <div
                key={club.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="text-blue-500" size={26} />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {club.nombreClub}
                  </h2>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <div className="flex items-center gap-2"><MapPin size={16} /> {club.direccion}</div>
                  <div className="flex items-center gap-2"><Phone size={16} /> {club.telefono}</div>
                  <div className="flex items-center gap-2"><Mail size={16} /> {club.gmail}</div>
                  <div className="flex items-center gap-2 text-yellow-500 font-medium"><Star size={16} fill="currentColor"/> {club.valoracion}/5</div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  {club.canchas ? club.canchas.length : 0} canchas disponibles
                </p>

                <Link
                  to={`/clubes-usuario/${club.id}/canchas`}
                  className="w-full text-center bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition mt-auto"
                >
                  Ver Canchas
                </Link>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/home-user" // O home-admin si estás probando
          className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} /> Volver al Inicio
        </Link>
      </div>
      <Footer />
    </div>
  );
}