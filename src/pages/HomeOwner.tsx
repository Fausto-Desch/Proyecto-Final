import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { 
    Building, MapPin, Phone, Save, 
    LayoutGrid, CalendarDays, Edit3, 
    CheckCircle2, Clock 
} from 'lucide-react';

interface MiClubData {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
}

export function HomeOwner() {
    const navigate = useNavigate();

    // Estado inicial simulado
    const [miClub, setMiClub] = useState<MiClubData>({
        id: 1,
        nombre: "Club Atlético Demo",
        direccion: "Calle Falsa 123, Buenos Aires",
        telefono: "5492923659973"
    });

    const [editando, setEditando] = useState(false);

    const guardarCambios = () => {
        setEditando(false);
        // Aquí iría tu: await clubApi.update(miClub.id, miClub);
        console.log("Datos actualizados", miClub);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] transition-colors duration-500">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> 

                <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-6xl mx-auto"
                    >
                        
                        {/* HEADER DE BIENVENIDA */}
                        <div className="mb-10">
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white">
                                Panel de <span className="text-indigo-600">Gestión</span>
                            </h1>
                            <p className="text-slate-500 dark:text-gray-400 font-medium italic">
                                Bienvenido de nuevo. Aquí tienes el resumen operativo de tu club.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* COLUMNA IZQUIERDA: PERFIL DEL CLUB */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white dark:bg-[#0d121f] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-200 dark:border-gray-800/60 relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-8 relative z-10">
                                        <h2 className="text-lg font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                            <Building size={18} className="text-indigo-600"/> Mi Club
                                        </h2>
                                        
                                        <button 
                                            onClick={() => editando ? guardarCambios() : setEditando(true)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                                                editando 
                                                ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                                                : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white"
                                            }`}
                                        >
                                            {editando ? <><Save size={14}/> Guardar</> : <><Edit3 size={14}/> Editar</>}
                                        </button>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <div className="group">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Nombre Comercial</label>
                                            <AnimatePresence mode="wait">
                                                {editando ? (
                                                    <motion.input 
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        className="w-full p-3 rounded-xl border-2 border-indigo-100 dark:border-gray-700 bg-transparent dark:text-white focus:border-indigo-500 outline-none transition-all font-bold"
                                                        value={miClub.nombre}
                                                        onChange={(e) => setMiClub({...miClub, nombre: e.target.value})}
                                                    />
                                                ) : (
                                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tight">
                                                        {miClub.nombre}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Ubicación Sede</label>
                                            {editando ? (
                                                <input 
                                                    className="w-full p-3 rounded-xl border-2 border-indigo-100 dark:border-gray-700 bg-transparent dark:text-white focus:border-indigo-500 outline-none transition-all font-medium"
                                                    value={miClub.direccion}
                                                    onChange={(e) => setMiClub({...miClub, direccion: e.target.value})}
                                                />
                                            ) : (
                                                <p className="text-slate-600 dark:text-gray-300 font-medium flex items-center gap-2">
                                                    <MapPin size={14} className="text-red-500"/> {miClub.direccion}
                                                </p>
                                            )}
                                        </div>

                                        <div className="p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/10">
                                            <label className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 block">WhatsApp de Reservas</label>
                                            {editando ? (
                                                <input 
                                                    className="w-full p-3 rounded-xl border-2 border-indigo-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white font-mono"
                                                    value={miClub.telefono}
                                                    onChange={(e) => setMiClub({...miClub, telefono: e.target.value})}
                                                />
                                            ) : (
                                                <p className="text-indigo-700 dark:text-indigo-300 font-black text-lg font-mono flex items-center gap-2">
                                                    <Phone size={16}/> {miClub.telefono}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Building className="absolute -right-10 -bottom-10 text-slate-100 dark:text-white/5 w-40 h-40 -rotate-12 z-0"/>
                                </div>
                            </div>

                            {/* COLUMNA DERECHA: ACCIONES Y ESTADOS */}
                            <div className="lg:col-span-2 space-y-8">
                                
                                {/* BANNER DE CANCHAS */}
                                <motion.div 
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => navigate(`/clubes/${miClub.id}/canchas`)}
                                    className="group relative bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-500/20 cursor-pointer overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white mb-3 flex items-center gap-3 italic uppercase">
                                            <LayoutGrid className="group-hover:rotate-90 transition-transform duration-500" size={32}/> 
                                            Gestionar Canchas
                                        </h3>
                                        <p className="text-indigo-100 max-w-sm font-medium leading-relaxed">
                                            Actualiza precios, habilita nuevos deportes o modifica la disponibilidad de tus canchas en tiempo real.
                                        </p>
                                        <button className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-2xl font-black uppercase text-xs shadow-xl hover:bg-indigo-50 transition-colors">
                                            Configurar ahora
                                        </button>
                                    </div>
                                    <LayoutGrid className="absolute -right-12 -bottom-12 text-white opacity-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700"/>
                                </motion.div>

                                {/* LISTA DE TURNOS RECIENTES */}
                                <div className="bg-white dark:bg-[#0d121f] rounded-[2.5rem] p-8 border border-slate-200 dark:border-gray-800/60 shadow-sm">
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-slate-800 dark:text-white mb-6 flex items-center gap-2 italic">
                                        <CalendarDays className="text-orange-500" size={20}/> Actividad Reciente
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <TurnoItem cancha="Cancha Central (F5)" hora="Hoy, 19:00hs" estado="confirmado" />
                                        <TurnoItem cancha="Pista 2 (Padel)" hora="Mañana, 21:00hs" estado="pendiente" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

// Sub-componente interno para limpieza del código
function TurnoItem({ cancha, hora, estado }: { cancha: string, hora: string, estado: 'confirmado' | 'pendiente' }) {
    return (
        <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] border border-slate-100 dark:border-gray-800 group hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${estado === 'confirmado' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {estado === 'confirmado' ? <CheckCircle2 size={20}/> : <Clock size={20}/>}
                </div>
                <div>
                    <p className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight">{cancha}</p>
                    <p className="text-xs text-slate-500 font-bold">{hora}</p>
                </div>
            </div>
            <span className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest ${
                estado === 'confirmado' 
                ? 'bg-green-500/10 text-green-600 border border-green-200 dark:border-green-900/50' 
                : 'bg-orange-500/10 text-orange-600 border border-orange-200 dark:border-orange-900/50'
            }`}>
                {estado}
            </span>
        </div>
    );
}