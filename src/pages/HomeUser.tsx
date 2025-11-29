// Home para usuarios
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Search, Goal } from "lucide-react";
import { authApi } from "../api/authApi";

export default function HomeUser() {
  const navigate = useNavigate();
  const userName = authApi.getUserName();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Título */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Goal className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Bienvenido, {userName || "Usuario"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gestor de Canchas – Usuario
                  </p>
                </div>
              </div>

              {/* Botón para ver canchas */}
              <div className="grid md:grid-cols-1 gap-6">
                <div
                  onClick={() => navigate("/clubes-usuario")}
                  className="bg-white dark:bg-gray-800 
                             p-8 rounded-2xl shadow-md 
                             border border-gray-200 dark:border-gray-700 
                             cursor-pointer 
                             hover:shadow-xl 
                             hover:border-green-300 dark:hover:border-green-500 
                             transition group"
                >
                  <div className="w-14 h-14 
                                  bg-green-50 dark:bg-green-900 
                                  rounded-full flex items-center justify-center 
                                  mb-4 
                                  group-hover:bg-green-100 dark:group-hover:bg-green-700 
                                  transition">
                    <Search className="w-7 h-7 text-green-600 dark:text-green-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Ver Canchas Disponibles
                  </h3>

                  <p className="text-gray-500 dark:text-gray-300">
                    Explora clubes y canchas para reservar turnos fácilmente.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
