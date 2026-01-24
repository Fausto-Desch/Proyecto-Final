import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Trophy, Clock, DollarSign, Ruler } from "lucide-react";
import { useState, useEffect } from "react";
import { clubApi, type Club } from "../api/clubApi";

export default function CanchasUsuario() {
    const { clubId } = useParams<{ clubId: string }>();
    const navigate = useNavigate();
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clubId) return;
        const cargarDatos = async () => {
            try {
                const data = await clubApi.getById(clubId);
                setClub(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [clubId]);

    const handleVerDisponibilidad = (turnoId: string) => {
        navigate(`/horarios-usuario/${turnoId}`);
    };

    if (loading) return <div className="p-10 text-center dark:text-white">Cargando datos...</div>;
    if (!club) return <div className="p-10 text-center dark:text-white">Club no encontrado</div>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Navbar />

            <div className="flex-1 p-8 relative">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {club.nombreClub}
                </h1>
                <p className="text-gray-500 mb-6">Listado de canchas para alquilar</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(!club.canchas || club.canchas.length === 0) ? (
                        <p className="col-span-full text-gray-500">Este club no tiene canchas habilitadas.</p>
                    ) : club.canchas.map((cancha) => (
                        <div key={cancha.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                            
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{cancha.nombreCancha}</h2>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                                        <Trophy size={12}/> {cancha.deporte}
                                    </span>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                                        <Ruler size={12}/> {cancha.tamanio}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Turno: {cancha.turno?.descripcionTurno}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                                        <DollarSign size={20}/>{cancha.turno?.costo}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleVerDisponibilidad(cancha.turno.id)}
                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                            >
                                <Clock size={18}/>
                                Ver Disponibilidad
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link
                        to="/clubes-usuario"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                    >
                        <ArrowLeft size={18} /> Volver a Clubes
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}