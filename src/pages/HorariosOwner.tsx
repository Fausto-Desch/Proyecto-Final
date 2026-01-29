import { useState, useEffect, useMemo } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { 
    ArrowLeft, Calendar, Clock, Trash2, Zap, 
    Filter, X, Plus, CalendarDays, Info, 
    CheckCircle2, Loader2, Save,
    MessageSquare, RefreshCw
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { turnoApi } from "../api/turnoApi";
import { type Turno, type Horario } from "../api/clubApi";

export default function HorariosOwner() {
    const { turnoId } = useParams<{ turnoId: string }>(); // Recibe el ID del turno de la cancha
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
            const data = await turnoApi.getById(turnoId); //
            setTurno(data);
        } catch (error) { 
            console.error(error); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchTurno(); }, [turnoId]);

    // Lógica para marcar como "Reservado/Libre" manualmente
    const toggleDisponibilidad = async (h: Horario) => {
        if (!turnoId) return;
        setIsProcessing(true);
        try {
            const res = await fetch(`http://localhost:3000/horario/${h.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({
                    disponibilidad: !h.disponibilidad,
                    horario: h.horario,
                    diaHorario: h.diaHorario,
                    idTurno: turnoId
                })
            });

            if (!res.ok) throw new Error("Error al actualizar estado");
            await fetchTurno(); 
        } catch (error) {
            alert("Error al cambiar estado: " + error);
        } finally {
            setIsProcessing(false);
        }
    };

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
                    diaHorario: new Date(preConfig.dia + "T12:00:00").toISOString(),
                    idTurno: turnoId
                };
                await turnoApi.addHorario(turnoId, horarioData); //
            }
            await fetchTurno();
        } catch (error) { 
            alert("Error en pre-creación"); 
        } finally { 
            setIsProcessing(false); 
        }
    };

    const agregarHorario = async () => {
        if (!nuevo.fecha || !nuevo.hora || !turnoId) return;
        setIsProcessing(true);
        const horarioData: Horario = {
            id: "0", disponibilidad: true, horario: nuevo.hora,
            diaHorario: new Date(nuevo.fecha + "T12:00:00").toISOString(),
            idTurno: turnoId
        };
        try {
            await turnoApi.addHorario(turnoId, horarioData); //
            setNuevo({ fecha: "", hora: "" });
            await fetchTurno();
        } catch (error) { 
            alert("Error: " + error); 
        } finally { 
            setIsProcessing(false); 
        }
    };

    const eliminarHorario = async (horarioId: string) => {
        if(!window.confirm("¿Eliminar este horario?")) return;
        if(!turnoId) return;
        try {
            await turnoApi.deleteHorario(turnoId, horarioId); //
            await fetchTurno();
        } catch (error) { 
            alert("Error: " + error); 
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950">
            <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors font-sans">
            <Navbar />
            
            <main className="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
                
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <button 
                            onClick={() => navigate(-1)} // Vuelve a CanchasOwner
                            className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:gap-3 transition-all"
                        >
                            <ArrowLeft size={16} /> Volver a la Cancha
                        </button>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight italic uppercase">
                            Agenda: <span className="text-blue-600">Propietario</span>
                        </h1>
                        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800/50 w-fit">
                            <Info size={18} className="text-blue-600" />
                            <p className="text-blue-700 dark:text-blue-300 font-bold text-sm uppercase">
                                {turno?.descripcionTurno} — <span className="opacity-70">${turno?.costo}</span>
                            </p>
                        </div>
                    </div>
                    <button onClick={fetchTurno} className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
                        <RefreshCw size={20} className={isProcessing ? "animate-spin" : ""} />
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Crear Slot Único */}
                    <section className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600"><Plus size={20}/></div>
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest">Añadir Hora</h3>
                        </div>
                        <div className="space-y-4">
                            <input type="date" value={nuevo.fecha} onChange={e => setNuevo({...nuevo, fecha: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" />
                            <input type="time" value={nuevo.hora} onChange={e => setNuevo({...nuevo, hora: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" />
                            <button onClick={agregarHorario} disabled={isProcessing} className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                                {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}
                                Generar Slot
                            </button>
                        </div>
                    </section>

                    {/* Generador Masivo */}
                    <section className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] shadow-xl text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white"><Zap size={20}/></div>
                            <h3 className="font-black uppercase text-xs tracking-widest opacity-90">Pre-Cargar Jornada</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase opacity-70 ml-2">Día de la semana</label>
                                <input type="date" value={preConfig.dia} onChange={e => setPreConfig({...preConfig, dia: e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase opacity-70 ml-2">Rango Horario</label>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Inicio" value={preConfig.inicio} onChange={e => setPreConfig({...preConfig, inicio: +e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold" />
                                    <input type="number" placeholder="Fin" value={preConfig.fin} onChange={e => setPreConfig({...preConfig, fin: +e.target.value})} className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-white outline-none text-white font-bold" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handlePreCrear} disabled={isProcessing} className="mt-8 w-full bg-white text-indigo-700 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                            {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <CalendarDays size={20}/>}
                            Generar Horarios Automáticamente
                        </button>
                    </section>
                </div>

                {/* Listado de slots */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 dark:border-gray-800 pb-6">
                        <div className="flex items-center gap-3">
                            <Filter className="text-slate-400" size={24} />
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic">Vista <span className="text-blue-600">Agenda</span></h2>
                        </div>
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 pl-4 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
                            <Calendar size={18} className="text-blue-500" />
                            <input type="date" value={filtroDia} onChange={e => setFiltroDia(e.target.value)} className="bg-transparent dark:text-white font-bold outline-none border-none focus:ring-0 text-sm" />
                            {filtroDia && (
                                <button onClick={() => setFiltroDia("")} className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg text-slate-400">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {horariosFiltrados.map((h) => (
                            <div 
                                key={h.id} 
                                className={`group relative p-6 rounded-[2rem] border transition-all duration-300 ${
                                    h.disponibilidad ? "bg-white dark:bg-gray-900 border-slate-100 dark:border-gray-800 shadow-sm hover:border-blue-300" : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200"
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`p-2.5 rounded-xl ${h.disponibilidad ? "bg-slate-50 dark:bg-gray-800 text-slate-400" : "bg-blue-600 text-white"}`}>
                                        {h.disponibilidad ? <Clock size={16} /> : <MessageSquare size={16} />}
                                    </span>
                                    <button onClick={() => eliminarHorario(h.id)} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className={`text-2xl font-black mb-4 italic ${h.disponibilidad ? "text-slate-800 dark:text-white" : "text-blue-700 dark:text-blue-400"}`}>
                                    {h.horario}
                                </p>
                                <button 
                                    disabled={isProcessing}
                                    onClick={() => toggleDisponibilidad(h)}
                                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                                        h.disponibilidad 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                                        : 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30'
                                    }`}
                                >
                                    {h.disponibilidad ? <><CheckCircle2 size={12}/> Libre</> : <><RefreshCw size={12}/> Liberar</>}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}