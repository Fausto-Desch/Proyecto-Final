import { Link, /*useParams*/ } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Trophy, /*DollarSign,*/ Clock } from "lucide-react";
import { useState } from "react";

export default function CanchasUsuario() {
    //const { clubId } = useParams();

    const [canchas] = useState([
        {
        id: "1",
        nombreCancha: "Cancha 1",
        deporte: "Futbol",
        tamanio: "11 vs 11",
        turno: { descripcionTurno: "Alquiler 1 Hora", costo: 3500 }
        },
        {
        id: "2",
        nombreCancha: "Cancha 2",
        deporte: "Futbol",
        tamanio: "5 vs 5",
        turno: { descripcionTurno: "Alquiler 1 Hora", costo: 1800 }
        }
    ]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar />

        <div className="flex-1 p-8 relative">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Canchas Disponibles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canchas.map((cancha) => (
                <div key={cancha.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{cancha.nombreCancha}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <Trophy size={14}/> {cancha.deporte} ({cancha.tamanio})
                    </p>
                </div>

                <div className="mt-auto bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Precio por turno</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${cancha.turno.costo}
                        </span>
                        <span className="text-xs bg-white dark:bg-gray-700 px-2 py-1 rounded shadow-sm text-gray-600 dark:text-gray-300">
                            {cancha.turno.descripcionTurno}
                        </span>
                    </div>
                </div>

                <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-green-600/20 transition flex items-center justify-center gap-2">
                    <Clock size={18}/>
                    Ver Disponibilidad
                </button>

                </div>
            ))}
            </div>

            <Link to="/clubes-usuario" className="mt-10 inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">
                <ArrowLeft size={18} /> Volver a Clubes
            </Link>
        </div>
        <Footer />
        </div>
    );
}