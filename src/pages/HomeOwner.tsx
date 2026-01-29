import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { 
    Building2, MapPin, Phone, 
    LayoutGrid, Star, Trophy, 
    ExternalLink, Loader2, Search 
} from 'lucide-react';
import { clubApi, type Club } from '../api/clubApi';

export function HomeOwner() {
    const navigate = useNavigate();
    const [clubes, setClubes] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Carga inicial de todos los clubes para el propietario
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const data = await clubApi.getAll(); // Traemos todos los clubes
                setClubes(data);
            } catch (error) {
                console.error("Error al cargar sedes:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    // Filtro de búsqueda para comodidad del dueño
    const clubesFiltrados = useMemo(() => {
        return clubes.filter(c => 
            c.nombreClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.direccion.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clubes, searchTerm]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#05080f]">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] transition-colors duration-500 font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> 

                <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-10">
                        
                        {/* Header y Buscador */}
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <h1 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white">
                                    Mis <span className="text-indigo-600">Establecimientos</span>
                                </h1>
                                <p className="text-slate-500 dark:text-gray-400 font-medium italic mt-2">
                                    Selecciona una sede para gestionar sus canchas y horarios.
                                </p>
                            </motion.div>

                            <div className="relative group w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                <input 
                                    type="text"
                                    placeholder="Buscar sede..."
                                    className="pl-12 pr-6 py-4 bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-gray-800 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500/50 outline-none shadow-sm transition-all font-medium text-sm dark:text-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </header>

                        {/* Grid de Clubes (Vista restringida de dueño) */}
                        <div className="min-h-[400px]">
                            {clubesFiltrados.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-[#0d121f] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-gray-800">
                                    <Building2 className="mx-auto text-slate-200 dark:text-gray-800 mb-4" size={64} />
                                    <p className="text-xl font-bold text-slate-400">No se encontraron sedes registradas</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {clubesFiltrados.map((club) => (
                                        <motion.div 
                                            key={club.id} layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                            className="group bg-white dark:bg-[#0d121f] rounded-[3rem] border border-slate-200 dark:border-gray-800/60 transition-all duration-500 flex flex-col overflow-hidden hover:shadow-2xl hover:border-indigo-500/30"
                                        >
                                            {/* Banner superior estético */}
                                            <div className="h-24 bg-gradient-to-br from-slate-900 to-indigo-950 p-8 flex justify-between items-start">
                                                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-white">
                                                    <Building2 size={24} />
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                                    <Star className="text-orange-400 fill-orange-400" size={12} />
                                                    <span className="font-black text-white text-xs">{club.valoracion}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-10 pt-0 -mt-8 flex-1 flex flex-col">
                                                <div className="bg-white dark:bg-[#161b29] rounded-[2.5rem] p-8 shadow-xl mb-8 border border-slate-50 dark:border-gray-800">
                                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white mb-6 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                        {club.nombreClub}
                                                    </h2>
                                                    
                                                    <div className="space-y-4">
                                                        <div className="flex items-start gap-4 text-slate-500 dark:text-gray-400">
                                                            <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg flex-shrink-0"><MapPin size={16} className="text-indigo-500"/></div>
                                                            <span className="text-sm font-bold leading-tight">{club.direccion}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-slate-500 dark:text-gray-400">
                                                            <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg flex-shrink-0"><Phone size={16} className="text-emerald-500"/></div>
                                                            <span className="text-sm font-bold">{club.telefono}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto">
                                                    <button 
                                                        onClick={() => navigate(`/clubes-owner/${club.id}/canchas`)} // Redirige a la gestión de este club
                                                        className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-5 rounded-2xl transition-all font-black uppercase text-[10px] tracking-[0.2em] shadow-lg active:scale-95"
                                                    >
                                                        GESTIONAR CANCHAS <ExternalLink size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}