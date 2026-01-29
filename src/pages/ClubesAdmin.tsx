import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { 
    Building2, MapPin, Edit, Trash2, Plus, 
    LayoutGrid, Phone, Mail, X, Save, Loader2, 
    ArrowLeft, Search, Trophy, Star,
    ExternalLink} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { clubApi, type Club } from "../api/clubApi";

interface ModalState {
    open: boolean;
    modo: "add" | "edit";
    data: Club;
}

const initialClubState: Club = {
    id: "",
    nombreClub: "",
    direccion: "",
    telefono: "",
    gmail: "",
    valoracion: 5,
    canchas: []
};

export function Clubes() {
    const [clubes, setClubes] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [modal, setModal] = useState<ModalState>({ 
        open: false, 
        modo: "add", 
        data: initialClubState 
    });

    const cargarClubes = async () => {
        try {
            const data = await clubApi.getAll();
            setClubes(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

useEffect(() => { cargarClubes(); }, []);

    const clubesFiltrados = useMemo(() => {
        return clubes.filter(c => 
            c.nombreClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.direccion.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clubes, searchTerm]);

    const stats = useMemo(() => ({
        totalSedes: clubes.length,
        totalCanchas: clubes.reduce((acc, c) => acc + (c.canchas?.length || 0), 0),
        ratingPromedio: (clubes.reduce((acc, c) => acc + (c.valoracion || 0), 0) / clubes.length || 0).toFixed(1)
    }), [clubes]);

    const guardarClub = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
        try {
            if (modal.modo === "add") await clubApi.create(modal.data);
            else await clubApi.update(modal.data.id, modal.data);
            await cargarClubes();
            setModal({ ...modal, open: false });
        } catch (error) { alert("Error: " + error); } 
            finally { setIsSubmitting(false); }
    };

    const eliminarClub = async (id: string) => {
        if (!window.confirm("¿Estás seguro? Esta acción eliminará permanentemente la sede y todas sus canchas asociadas.")) return;
        try {
        await clubApi.delete(id);
        await cargarClubes();
        } catch (error) { alert("Error al eliminar: " + error); }
    };

return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
            <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* titulo y acciones*/}
                <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                        <Building2 className="text-blue-600 w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">Infrastructure Manager</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-none">
                        MIS <span className="text-blue-600 dark:text-blue-500 not-italic">CLUBES</span>
                    </h1>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Buscar por nombre o dirección..."
                            className="pl-12 pr-6 py-4 bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-gray-800 rounded-2xl w-full sm:w-80 focus:ring-2 focus:ring-blue-500/50 outline-none shadow-sm transition-all font-medium text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setModal({ open: true, modo: "add", data: { ...initialClubState, id: crypto.randomUUID() } })} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest active:scale-95"
                    >
                        <Plus size={20} /> Nueva Sede
                    </button>
                </div>
                </header>

                {/* mini-stats  */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { label: 'Sedes Registradas', value: stats.totalSedes, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Canchas Totales', value: stats.totalCanchas, icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Rating General', value: stats.ratingPromedio, icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
                    ].map((stat, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-[#0d121f] p-8 rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 flex items-center gap-6 shadow-sm"
                        >
                            <div className={`p-5 ${stat.bg} dark:bg-opacity-5 rounded-[1.5rem] ${stat.color}`}>
                                <stat.icon size={32}/>
                            </div>
                            <div>
                                <p className="text-4xl font-black tracking-tighter text-slate-800 dark:text-white leading-none">{stat.value}</p>
                                <p className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest mt-2">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* grid clubes*/}
                <div className="min-h-[400px]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                        {[1,2,3].map(i => <div key={i} className="h-[450px] bg-slate-200 dark:bg-gray-900 rounded-[3rem] animate-pulse" />)}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {clubesFiltrados.map((club) => (
                            <motion.div 
                                layout key={club.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                                className="group bg-white dark:bg-[#0d121f] rounded-[3rem] border border-slate-200 dark:border-gray-800/60 transition-all duration-500 flex flex-col overflow-hidden hover:shadow-2xl hover:border-blue-500/30"
                            >
                                <div className="h-28 bg-gradient-to-br from-slate-900 to-blue-950 p-8 flex justify-between items-start">
                                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-white">
                                        <Building2 size={28} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setModal({ open: true, modo: "edit", data: { ...club } })} className="p-3 bg-white/10 hover:bg-white text-white hover:text-blue-900 rounded-xl transition-all shadow-lg">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => eliminarClub(club.id)} className="p-3 bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white rounded-xl transition-all shadow-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-10 pt-0 -mt-8 flex-1 flex flex-col">
                                    <div className="bg-white dark:bg-[#161b29] rounded-[2.5rem] p-8 shadow-xl mb-8 border border-slate-50 dark:border-gray-800">
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white mb-6 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {club.nombreClub}
                                        </h2>
                                        
                                        <div className="space-y-5">
                                            <div className="flex items-start gap-4 text-slate-500 dark:text-gray-400">
                                                <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg"><MapPin size={16} className="text-blue-500"/></div>
                                                <span className="text-sm font-bold leading-tight">{club.direccion}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-500 dark:text-gray-400">
                                                <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg"><Phone size={16} className="text-emerald-500"/></div>
                                                <span className="text-sm font-bold">{club.telefono}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-6">
                                        <div className="flex justify-between items-center px-4">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-500/10 rounded-full">
                                                <Star className="text-orange-500 fill-orange-500" size={14} />
                                                <span className="font-black text-orange-600 text-sm">{club.valoracion}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <LayoutGrid size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{club.canchas?.length || 0} Pistas</span>
                                            </div>
                                        </div>
                                        
                                        <Link 
                                            to={`/clubes/${club.id}/canchas`} 
                                            className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white py-5 rounded-2xl transition-all font-black uppercase text-[10px] tracking-[0.2em] shadow-lg active:scale-95"
                                        >
                                            GESTIONAR INFRAESTRUCTURA <ExternalLink size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    </AnimatePresence>
                )}
                </div>

 
                <footer className="pt-10 border-t border-slate-200 dark:border-gray-900 flex justify-center">
                <Link to="/home-admin" className="group flex items-center gap-4 text-slate-400 hover:text-blue-600 font-bold transition-all">
                    <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-gray-800 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-50 transition-all">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="uppercase text-xs tracking-widest">Volver al Dashboard</span>
                </Link>
                </footer>
            </div>
            </main>
        </div>

        <Footer />

        {/* Modal Agregar/Editar Club */}
        <AnimatePresence>
            {modal.open && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[100]">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setModal({ ...modal, open: false })}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white dark:bg-[#0d121f] rounded-[3.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/10 relative z-10"
                >
                <header className="p-10 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-800 dark:text-white">
                            {modal.modo === "add" ? "Registrar Sede" : "Actualizar Datos"}
                        </h2>
                        <p className="text-slate-500 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Configuración oficial del establecimiento</p>
                    </div>
                    <button onClick={() => setModal({ ...modal, open: false })} className="w-12 h-12 bg-slate-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 rounded-full transition-all flex items-center justify-center text-slate-400">
                        <X size={24} />
                    </button>
                </header>

                <form onSubmit={guardarClub} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest ml-2">Nombre del Club</label>
                            <div className="relative group">
                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input required className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-[#161b29] border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold italic" placeholder="Ej: Padel Master Center" value={modal.data.nombreClub} onChange={e => setModal({...modal, data: {...modal.data, nombreClub: e.target.value}})} />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest ml-2">Dirección Física</label>
                            <div className="relative group">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input required className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-[#161b29] border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold italic" placeholder="Calle y Nro, Bahía Blanca" value={modal.data.direccion} onChange={e => setModal({...modal, data: {...modal.data, direccion: e.target.value}})} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest ml-2">Teléfono / WhatsApp</label>
                            <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                <input className="w-full pl-12 pr-6 py-5 bg-slate-50 dark:bg-[#161b29] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white font-bold" placeholder="291 1234567" value={modal.data.telefono} onChange={e => setModal({...modal, data: {...modal.data, telefono: e.target.value}})} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest ml-2">Email de Contacto</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input type="email" className="w-full pl-12 pr-6 py-5 bg-slate-50 dark:bg-[#161b29] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white font-bold" placeholder="club@ejemplo.com" value={modal.data.gmail} onChange={e => setModal({...modal, data: {...modal.data, gmail: e.target.value}})} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button type="button" onClick={() => setModal({ ...modal, open: false })} className="flex-1 py-5 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 dark:hover:bg-gray-800 rounded-2xl transition-all">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Guardar Configuración
                        </button>
                    </div>
                </form>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
        </div>
    );
}