import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { 
    ArrowLeft, Trophy, Clock, Ruler, 
    ChevronRight, MapPin, LayoutDashboard, 
    Activity, AlertCircle, Filter
} from "lucide-react";
import { clubApi, type Club } from "../api/clubApi";

// --- Interfaces para un mejor control de TypeScript ---
interface SidebarInfoProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export default function CanchasUsuario() {
    const { clubId } = useParams<{ clubId: string }>();
    const navigate = useNavigate();
    
    // Estados
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtroDeporte, setFiltroDeporte] = useState<string>("Todos");

    useEffect(() => {
        if (!clubId) return;
        
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const data = await clubApi.getById(clubId);
                setClub(data);
                setError(null);
            } catch (err) {
                console.error("Error cargando club:", err);
                setError("No pudimos conectar con el servidor. Revisa tu conexión.");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [clubId]);

    // Filtrado lógico de canchas
    const canchasFiltradas = useMemo(() => {
        if (!club?.canchas) return [];
        if (filtroDeporte === "Todos") return club.canchas;
        return club.canchas.filter(c => c.deporte === filtroDeporte);
    }, [club, filtroDeporte]);

    // Obtener lista de deportes únicos para el filtro
    const deportesUnicos = useMemo(() => {
        const deportes = club?.canchas?.map(c => c.deporte) || [];
        return ["Todos", ...new Set(deportes)];
    }, [club]);

    const handleVerDisponibilidad = (turnoId: string) => {
        navigate(`/horarios-usuario/${turnoId}`);
    };

    // --- Variantes de Animación ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // --- Estado: Cargando ---
    if (loading) return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#05080f] flex flex-col items-center justify-center gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Activity className="text-blue-500" size={48} />
            </motion.div>
            <p className="text-slate-400 font-medium animate-pulse">Buscando las mejores canchas...</p>
        </div>
    );

    // --- Estado: Error ---
    if (error) return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#05080f] flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="text-red-500 mb-4" size={56} />
            <h2 className="text-2xl font-bold mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-slate-500 mb-6 max-w-md">{error}</p>
            <Link to="/clubes-usuario" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">
                Volver a la lista de clubes
            </Link>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR PERSISTENTE */}
                <aside className="w-64 border-r border-slate-200 dark:border-gray-800/40 p-6 hidden lg:flex flex-col gap-4 bg-white dark:bg-[#05080f]">
                    <h2 className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Resumen del Club</h2>
                    <SidebarInfo icon={<Trophy size={18} className="text-blue-500"/>} label="Deportes" value={club?.canchas?.[0]?.deporte || "Varios"} />
                    <SidebarInfo icon={<LayoutDashboard size={18} className="text-green-500"/>} label="Canchas" value={club?.canchas?.length.toString() || "0"} />
                    <SidebarInfo icon={<MapPin size={18} className="text-orange-500"/>} label="Ubicación" value="Sede Central" />

                    <div className="mt-auto p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
                        <p className="text-[10px] text-blue-600 dark:text-blue-300 leading-relaxed font-medium italic">
                            Selecciona una cancha para ver los turnos disponibles esta semana. El costo se ajusta según el horario.
                        </p>
                    </div>
                </aside>

                {/* CONTENIDO PRINCIPAL */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-12">
                    {/* Breadcrumbs & Header */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                        <nav className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-4">
                            <Link to="/clubes-usuario" className="hover:underline">Clubes</Link>
                            <ChevronRight size={12} />
                            <span className="text-slate-400 dark:text-gray-500">{club?.nombreClub}</span>
                        </nav>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none uppercase">
                                    Canchas <span className="text-blue-600 dark:text-blue-500 not-italic">disponibles</span>
                                </h1>
                                <p className="text-slate-500 dark:text-gray-500 text-sm font-medium mt-2 italic">
                                    {club?.nombreClub} • {club?.direccion}
                                </p>
                            </div>

                            {/* Filtros rápidos */}
                            <div className="flex items-center gap-3">
                                <Filter size={16} className="text-slate-400" />
                                <div className="flex bg-white dark:bg-[#0d121f] p-1 rounded-xl border border-slate-200 dark:border-gray-800">
                                    {deportesUnicos.map((dep) => (
                                        <button
                                            key={dep}
                                            onClick={() => setFiltroDeporte(dep)}
                                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                                                filtroDeporte === dep 
                                                ? "bg-blue-600 text-white shadow-md" 
                                                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-gray-800"
                                            }`}
                                        >
                                            {dep}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grilla de Canchas */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {canchasFiltradas.length === 0 ? (
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-[2.5rem]">
                                    <p className="text-slate-400 font-medium">No se encontraron canchas con este filtro.</p>
                                </motion.div>
                            ) : (
                                canchasFiltradas.map((cancha) => (
                                    <motion.div
                                        key={cancha.id}
                                        layout
                                        variants={itemVariants}
                                        whileHover={{ y: -8 }}
                                        className="bg-white dark:bg-[#0d121f] rounded-[2.2rem] border border-slate-200 dark:border-gray-800/60 flex flex-col overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="p-7">
                                            <div className="flex justify-between items-start mb-4">
                                                <h2 className="text-2xl font-bold tracking-tight">{cancha.nombreCancha}</h2>
                                                <span className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                                    <Trophy size={20} />
                                                </span>
                                            </div>

                                            <div className="flex gap-3 mb-8">
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-gray-800/50 rounded-full text-[10px] font-black uppercase text-slate-500 dark:text-gray-400">
                                                    <Activity size={12} className="text-blue-500" /> {cancha.deporte}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-gray-800/50 rounded-full text-[10px] font-black uppercase text-slate-500 dark:text-gray-400">
                                                    <Ruler size={12} className="text-green-500" /> {cancha.tamanio}
                                                </div>
                                            </div>

                                            {/* Box de Precio */}
                                            <div className="bg-slate-50 dark:bg-[#161b2a] p-5 rounded-2xl border border-slate-100 dark:border-gray-800/50 mb-6 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors">
                                                <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase mb-1 tracking-tight">Costo base por Turno</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-black text-blue-600 dark:text-blue-400">${cancha.turno?.costo}</span>
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">/ {cancha.turno?.descripcionTurno}</span>
                                                </div>
                                            </div>

<button
  onClick={() => handleVerDisponibilidad(cancha.id)}
  disabled={!cancha.turno}
  className={`w-full text-[11px] font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all
    ${
      cancha.turno
        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
        : "bg-slate-300 dark:bg-gray-700 text-slate-500 cursor-not-allowed"
    }
  `}
>
  <Clock size={16} />
  VER DISPONIBILIDAD
</button>

                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Botón Volver Footer */}
                    <div className="mt-16 flex justify-center pb-10">
                        <Link 
                            to="/clubes-usuario" 
                            className="flex items-center gap-3 bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-gray-800 px-10 py-4 rounded-2xl text-[11px] font-bold text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                            VOLVER A LA SELECCIÓN DE CLUBES
                        </Link>
                    </div>
                </main>
            </div>
            
            <Footer />
        </div>
    );
}

// --- Sub-componente SidebarInfo con Tipado Estricto ---
function SidebarInfo({ icon, label, value }: SidebarInfoProps) {
    return (
        <motion.div 
            whileHover={{ x: 5 }}
            className="bg-white dark:bg-[#0d121f] p-4 rounded-2xl border border-slate-200 dark:border-gray-800/40 flex items-center justify-between shadow-sm dark:shadow-none"
        >
            <div className="flex flex-col gap-1.5">
                <div className="p-2.5 bg-slate-50 dark:bg-gray-800/50 rounded-xl w-fit">{icon}</div>
                <span className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-1">{label}</span>
            </div>
            <span className="text-xl font-black italic tracking-tighter text-slate-800 dark:text-white">{value}</span>
        </motion.div>
    );
}