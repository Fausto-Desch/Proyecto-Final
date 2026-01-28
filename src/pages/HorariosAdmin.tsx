import { useState, useEffect, useMemo } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { 
    ArrowLeft, Calendar, Clock, Trash2, Zap, 
    Filter, X, Plus, CalendarDays, Info, 
    CheckCircle2, AlertCircle, Loader2, Save
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { turnoApi } from "../api/turnoApi";
import { type Turno, type Horario } from "../api/clubApi";

export default function HorariosAdmin() {
    const { turnoId } = useParams<{ turnoId: string }>();
    const navigate = useNavigate();
    const [turno, setTurno] = useState<Turno | null>(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const [filtroDia, setFiltroDia] = useState<string>(new Date().toISOString().split('T')[0]); 
    const [nuevo, setNuevo] = useState({ fecha: "", hora: "" });
    const [preConfig, setPreConfig] = useState({ dia: "", inicio: 8, fin: 22 });

    const fetchTurno = async () => {
        if (!turnoId) return;
        try {
            const data = await turnoApi.getById(turnoId);
            setTurno(data);
        } catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    useEffect(() => { fetchTurno(); }, [turnoId]);

    const horariosFiltrados = useMemo(() => {
        if (!turno?.horarios) return [];
        let filtrados = turno.horarios;
        if (filtroDia) {
            filtrados = filtrados.filter(h => 
                new Date(h.diaHorario).toISOString().split('T')[0] === filtroDia
            );
        }
        return filtrados.sort((a, b) => a.horario.localeCompare(b.horario));
    }, [turno, filtroDia]);

    const handlePreCrear = async () => {
        if (!preConfig.dia || !turnoId) return alert("Selecciona un día");
        setIsProcessing(true);
        try {
            for (let hora = preConfig.inicio; hora < preConfig.fin; hora++) {
                const horarioData: Horario = {
                    id: "0",
                    disponibilidad: true,
                    horario: `${hora.toString().padStart(2, '0')}:00`,
                    diaHorario: new Date(preConfig.dia + "T12:00:00").toISOString()
                };
                await turnoApi.addHorario(turnoId, horarioData);
            }
            await fetchTurno();
        } catch (error) { alert("Error en pre-creación"); }
        finally { setIsProcessing(false); }
    };

    const agregarHorario = async () => {
        if (!nuevo.fecha || !nuevo.hora || !turnoId) return;
        setIsProcessing(true);
        const horarioData: Horario = {
            id: "0", disponibilidad: true, horario: nuevo.hora,
            diaHorario: new Date(nuevo.fecha + "T12:00:00").toISOString() 
        };
        try {
            await turnoApi.addHorario(turnoId, horarioData);
            setNuevo({ fecha: "", hora: "" });
            await fetchTurno();
        } catch (error) { alert("Error: " + error); }
        finally { setIsProcessing(false); }
    };

    const eliminarHorario = async (horarioId: string) => {
        if(!turnoId) return;
        try {
            await turnoApi.deleteHorario(turnoId, horarioId);
            await fetchTurno();
        } catch (error) { alert("Error: " + error); }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950">
            <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
            <Navbar />
            
            <main className="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
                
                {/* 1. HEADER & CONTEXTO */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:gap-3 transition-all"
                        >
                            <ArrowLeft size={16} /> Volver a Canchas
                        </button>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Gestión de Horarios</h1>
                        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                            <Info size={18} className="text-blue-600" />
                            <p className="text-blue-700 dark:text-blue-300 font-bold text-sm">
                                {turno?.descripcionTurno} — <span className="opacity-70">${turno?.costo}</span>
                            </p>
                        </div>
                    </div>
                </header>

                {/* 2. TOOLS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Panel Individual */}
                    <section className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600"><Plus size={20}/></div>
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest">Crear Único</h3>
                        </div>
                        <div className="space-y-4">
                            <input type="date" value={nuevo.fecha} onChange={e => setNuevo({...nuevo, fecha: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" />
                            <input type="time" value={nuevo.hora} onChange={e => setNuevo({...nuevo, hora: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" />
                            <button onClick={agregarHorario} disabled={isProcessing} className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                                {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}
                                Generar Slot
                            </button>
                        </div>
                    </section>

                    {/* Panel de Creación Masiva */}
                    <section className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white"><Zap size={20}/></div>
                            <h3 className="font-black uppercase text-xs tracking-widest opacity-90">Generador Automático de Jornada</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase opacity-70 ml-2">Seleccionar Día</label>
                                <input type="date" value={preConfig.dia} onChange={e => setPreConfig({...preConfig, dia: e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold placeholder:text-white/50" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase opacity-70 ml-2">Rango de Horas (24hs)</label>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Desde" value={preConfig.inicio} onChange={e => setPreConfig({...preConfig, inicio: +e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold" />
                                    <input type="number" placeholder="Hasta" value={preConfig.fin} onChange={e => setPreConfig({...preConfig, fin: +e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold" />
                                </div>
                            </div>
                        </div>
                        
                        <button onClick={handlePreCrear} disabled={isProcessing} className="mt-8 w-full bg-white text-blue-700 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3">
                            {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <CalendarDays size={20}/>}
                            Pre-generar todos los horarios del día
                        </button>
                    </section>
                </div>

                {/* 3. LISTADO FILTRADO */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 dark:border-gray-800 pb-6">
                        <div className="flex items-center gap-3">
                            <Filter className="text-slate-400" size={24} />
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Horarios Existentes</h2>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 pl-4 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
                            <Calendar size={18} className="text-blue-500" />
                            <input type="date" value={filtroDia} onChange={e => setFiltroDia(e.target.value)} className="bg-transparent dark:text-white font-bold outline-none border-none focus:ring-0" />
                            {filtroDia && (
                                <button onClick={() => setFiltroDia("")} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg text-slate-400">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {horariosFiltrados.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-gray-800">
                            <Clock className="mx-auto text-slate-200 mb-4" size={64} />
                            <p className="text-xl font-bold text-slate-400">No hay horarios para esta fecha</p>
                            <p className="text-slate-400 text-sm">Utiliza el generador masivo para ahorrar tiempo.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {horariosFiltrados.map((h) => (
                                <div key={h.id} className="group relative bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="p-2 bg-slate-50 dark:bg-gray-800 rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors">
                                            <Clock size={16} />
                                        </span>
                                        <button onClick={() => eliminarHorario(h.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    
                                    <p className="text-2xl font-black text-slate-800 dark:text-white mb-3">{h.horario}</p>
                                    
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                        h.disponibilidad 
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                                        : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                                    }`}>
                                        {h.disponibilidad ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                                        {h.disponibilidad ? 'Libre' : 'Ocupado'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}