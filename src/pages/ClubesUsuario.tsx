import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { 
    MapPin, ArrowLeft, Phone, Star, Search, 
    ArrowRight, Navigation, Heart, 
    LayoutDashboard, Calendar, Users
} from "lucide-react";
import { clubApi, type Club } from "../api/clubApi";

export default function ClubesUsuario() {
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const clubesFiltrados = useMemo(() => {
    return clubes.filter(c => 
        c.nombreClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clubes, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR ADAPTABLE */}
        <aside className="w-64 border-r border-slate-200 dark:border-gray-800/40 p-6 hidden lg:flex flex-col gap-4 bg-white dark:bg-[#05080f]">
          <h2 className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Estadísticas Reales</h2>
          
          <SidebarStat icon={<MapPin size={18} className="text-blue-500"/>} label="Clubes Registrados" value={clubes.length.toString()} />
          <SidebarStat icon={<LayoutDashboard size={18} className="text-green-500"/>} label="Canchas Activas" value="1" />
          <SidebarStat icon={<Users size={18} className="text-purple-500"/>} label="Usuarios Sistema" value="N/A" />
          <SidebarStat icon={<Calendar size={18} className="text-orange-500"/>} label="Reservas Ocupadas" value="0" />

          <div className="mt-auto p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
              <p className="text-[10px] text-blue-600 dark:text-blue-300 leading-relaxed font-medium italic">
                  Estas estadísticas se actualizan automáticamente con la base de datos.
              </p>
          </div>
        </aside>

        {/* PANEL CENTRAL */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white">
                ¿Dónde jugamos <span className="text-blue-600 dark:text-blue-500 not-italic">hoy?</span>
              </h1>
              <p className="text-slate-500 dark:text-gray-500 text-sm font-medium mt-2 italic">
                Explora las mejores canchas de la ciudad y reserva tu lugar en segundos.
              </p>
            </div>

            {/* Buscador adaptable */}
            <div className="relative w-full md:w-80 group">
              <div className="absolute -inset-0.5 bg-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-white dark:bg-[#111622] border border-slate-200 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm dark:shadow-inner">
                <Search className="text-slate-400 dark:text-gray-500 mr-2" size={18} />
                <input 
                  type="text"
                  placeholder="Buscar por nombre o zona..."
                  className="bg-transparent outline-none text-xs w-full placeholder:text-slate-400 dark:placeholder:text-gray-600 text-slate-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Grilla de Clubes */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-white dark:bg-[#0d121f] rounded-[2.5rem] animate-pulse border border-slate-200 dark:border-gray-800/50" />
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {clubesFiltrados.map((club) => (
                  <motion.div
                    key={club.id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-[#0d121f] rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 flex flex-col overflow-hidden group hover:border-blue-400 dark:hover:border-blue-500/40 transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-2xl"
                  >
                    {/* Visual superior */}
                    <div className="relative h-44 bg-slate-100 dark:bg-[#161b2a] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#0d121f] via-transparent to-transparent opacity-90" />
                      <button className="absolute top-5 right-5 p-2.5 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-xl border border-slate-200 dark:border-white/5 group/heart shadow-sm">
                        <Heart size={18} className="text-slate-400 dark:text-white/40 group-hover/heart:text-red-500 transition-colors" />
                      </button>
                      <div className="absolute bottom-4 left-6">
                        <div className="flex items-center gap-1.5 bg-[#f97316] text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase shadow-lg shadow-orange-500/20">
                          <Star size={12} fill="currentColor"/> {club.valoracion}
                        </div>
                      </div>
                    </div>

                    {/* Info Club */}
                    <div className="p-7 flex flex-col flex-1">
                      <h2 className="text-2xl font-extrabold mb-1 tracking-tight text-slate-800 dark:text-white">{club.nombreClub}</h2>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-gray-500 mb-6 italic">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="text-[13px] font-medium">{club.direccion}</span>
                      </div>

                      <div className="flex items-center justify-between mb-8 text-[11px] text-slate-400 dark:text-gray-500 font-bold border-t border-slate-100 dark:border-gray-800/40 pt-5">
                        <div className="flex items-center gap-2 uppercase tracking-tighter">
                          <Phone size={13} className="text-slate-300 dark:text-gray-600"/> {club.telefono}
                        </div>
                        <div className="text-blue-600 dark:text-blue-500 font-black">
                            • {club.canchas?.length || 0} CANCHAS
                        </div>
                      </div>

                      {/* Botones Adaptables */}
                      <div className="mt-auto flex gap-2">
                        <Link
                          to={`/clubes-usuario/${club.id}/canchas`}
                          className="flex-[4] bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                        >
                          Reservar Turno <ArrowRight size={16} />
                        </Link>
                        <button className="flex-1 p-4 bg-slate-100 dark:bg-gray-800/40 text-slate-500 dark:text-gray-400 rounded-2xl border border-slate-200 dark:border-gray-700/30 flex items-center justify-center hover:text-blue-600 dark:hover:text-white transition-colors">
                          <Navigation size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Botón Volver Adaptable */}
          <div className="mt-16 flex justify-center pb-6">
            <Link 
                to="/home-user" 
                className="flex items-center gap-3 bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-gray-800 px-8 py-3 rounded-2xl text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm dark:shadow-xl group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Volver al Inicio
            </Link>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function SidebarStat({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="bg-white dark:bg-[#0d121f] p-4 rounded-2xl border border-slate-200 dark:border-gray-800/40 flex items-center justify-between shadow-sm dark:shadow-none"
    >
      <div className="flex flex-col gap-1.5">
        <div className="p-2 bg-slate-50 dark:bg-gray-800/50 rounded-lg w-fit shadow-inner">{icon}</div>
        <span className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-1">{label}</span>
      </div>
      <span className="text-2xl font-black italic tracking-tighter text-slate-800 dark:text-white">{value}</span>
    </motion.div>
  );
}