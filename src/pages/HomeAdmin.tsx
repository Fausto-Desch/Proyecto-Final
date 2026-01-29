import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { 
    Building2, 
    CalendarDays, 
    CheckCircle2, 
    ArrowRight,
    LayoutDashboard,
    Activity,
    ShieldCheck
} from 'lucide-react';

export function HomeAdmin() {
    const navigate = useNavigate();

    const fechaHoy = new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 lg:p-12">
                        <div className="max-w-6xl mx-auto">
                            
                            {/* HEADER DE CONTROL */}
                            <motion.header 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-blue-600 rounded-lg">
                                            <ShieldCheck className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em]">Panel de Control Central</span>
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none text-slate-800 dark:text-white uppercase">
                                        SPORT<span className="text-blue-600 dark:text-blue-500 not-italic">MANAGER</span>
                                    </h1>
                                </div>
                                <div className="bg-white dark:bg-[#0d121f] px-6 py-3 rounded-2xl border border-slate-200 dark:border-gray-800/60 shadow-sm">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1 text-right">Fecha de Operación</p>
                                    <p className="text-sm font-black text-slate-700 dark:text-blue-400 capitalize">{fechaHoy}</p>
                                </div>
                            </motion.header>

                            {/* INDICADORES CLAVE (KPIs) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                
                                {/* Card Resumen Principal */}
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 text-white"
                                >
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <h2 className="text-2xl font-black italic tracking-tight mb-2 uppercase">Estado de la Agenda</h2>
                                            <p className="text-blue-100 text-sm font-medium opacity-80 max-w-xs italic">Monitoreo de clubes activos y flujo de reservas entrantes.</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-12 mt-10">
                                            <div className="flex flex-col">
                                                <span className="text-5xl font-black tracking-tighter">01</span>
                                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-300">Sedes Activas</span>
                                            </div>
                                            <div className="w-px h-16 bg-white/10" />
                                            <div className="flex flex-col">
                                                <span className="text-5xl font-black tracking-tighter text-blue-400">00</span>
                                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-300">Turnos Hoy</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CalendarDays className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
                                </motion.div>

                                {/* Card Status de Conexión */}
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-[#0d121f] p-8 rounded-[2.5rem] border border-slate-200 dark:border-gray-800/60 flex flex-col justify-between shadow-sm relative overflow-hidden group"
                                >
                                    <div className="flex items-center gap-3 text-emerald-500">
                                        <div className="relative">
                                            <CheckCircle2 size={28} className="relative z-10" />
                                            <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-40 animate-pulse" />
                                        </div>
                                        <span className="font-black italic uppercase tracking-tight text-xl">Online</span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 font-bold text-[11px] uppercase tracking-tighter">
                                            <Activity size={14} className="animate-bounce" />
                                            Sincronización en tiempo real
                                        </div>
                                        <p className="text-[11px] text-slate-400 dark:text-gray-600 font-medium leading-relaxed italic">
                                            Conectado a la API central. Todos los cambios realizados se reflejarán inmediatamente en la App de usuarios.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* ACCIÓN PRINCIPAL DE GESTIÓN */}
                            <h2 className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-[0.3em] mb-6 ml-4">Infraestructura y Negocio</h2>
                            
                            <motion.div 
                                whileHover={{ scale: 0.99 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/clubes')}
                                className="group bg-white dark:bg-[#0d121f] p-10 rounded-[3rem] border border-slate-200 dark:border-gray-800/60 shadow-sm hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                    <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-inner">
                                        <Building2 size={48} />
                                    </div>
                                    
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-4xl font-black italic tracking-tighter text-slate-800 dark:text-white mb-3 uppercase">Administrar Clubes</h3>
                                        <p className="text-slate-500 dark:text-gray-500 text-lg max-w-2xl font-medium italic leading-snug">
                                            Configura canchas, define precios por franja horaria y genera el cronograma de turnos para los jugadores de Bahía Blanca.
                                        </p>
                                    </div>

                                    <div className="w-16 h-16 rounded-full border border-slate-200 dark:border-gray-800 flex items-center justify-center text-slate-300 dark:text-gray-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:translate-x-2 transition-all duration-500">
                                        <ArrowRight size={32} />
                                    </div>
                                </div>
                                
                                {/* Rayo decorativo de fondo */}
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000">
                                    <LayoutDashboard size={250} />
                                </div>
                            </motion.div>

                        </div>
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    );
}