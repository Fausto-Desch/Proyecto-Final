import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { 
    Trash2, Plus, ArrowLeft, Loader2, Save, X, 
    Trophy, Banknote, Users, 
    Activity, ChevronRight, CircleDot
} from "lucide-react";
import { useState, useEffect } from "react";
import { clubApi, type Club, type Cancha } from "../api/clubApi";

interface ModalState {
    open: boolean;
    modo: "add";
    data: Cancha;
}

const initialCanchaState: Cancha = {
    id: "",
    nombreCancha: "",
    deporte: "Fútbol",
    tamanio: "",
    turno: { id: "", descripcionTurno: "Alquiler 60 min", costo: 0, horarios: [] }
};

export function CanchasAdmin() {
const { clubId } = useParams<{ clubId: string }>();
const navigate = useNavigate();
const [club, setClub] = useState<Club | null>(null);
const [loading, setLoading] = useState(true);
const [isSubmitting, setIsSubmitting] = useState(false);
const [modal, setModal] = useState<ModalState>({ open: false, modo: "add", data: initialCanchaState });

const cargarDatos = async () => {
    if (!clubId) return;
        try {
            const data = await clubApi.getById(clubId);
            setClub(data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

useEffect(() => { cargarDatos(); }, [clubId]);

const guardarCancha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubId) return;
        setIsSubmitting(true);
    try {
        const payload = {
        nombreCancha: modal.data.nombreCancha,
        deporte: modal.data.deporte,
        tamanio: modal.data.tamanio,
        descripcionTurno: modal.data.turno.descripcionTurno,
        costo: modal.data.turno.costo,
        };
        await clubApi.addCanchaConTurno(clubId, modal.data.id, payload);
        await cargarDatos();
        setModal({ open: false, modo: "add", data: initialCanchaState });
    } catch (error) { alert("Error: " + error); } finally { setIsSubmitting(false); }
};

const eliminarCancha = async (id: string) => {
    if (!window.confirm("¿Eliminar esta cancha y todos sus horarios?")) return;
    try {
        await clubApi.deleteCancha(clubId!, id);
        await cargarDatos();
    } catch (error) { alert("Error: " + error); }
};


const getSportIcon = (deporte: string) => {
    switch(deporte.toLowerCase()){
        case 'tenis': return <CircleDot className="text-yellow-500" />;
        case 'padel': return <Activity className="text-emerald-500" />;
        default: return <Trophy className="text-blue-500" />;
    }
};

return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 flex flex-col gap-8">
            
            {/* header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <button 
                        onClick={() => navigate('/clubes')}
                        className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={16} /> Volver a Clubes
                    </button>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white">
                        {loading ? "..." : club?.nombreClub}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Panel de administración de canchas e infraestructura.</p>
                </div>
                <button 
                    onClick={() => setModal({ open: true, modo: "add", data: { ...initialCanchaState, id: crypto.randomUUID() } })}
                    className="bg-slate-900 dark:bg-blue-600 hover:scale-105 active:scale-95 text-white px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center gap-3 font-bold"
                >
                    <Plus size={24} /> Nueva Cancha
                </button>
            </header>

            {/*  stats bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600"><Trophy size={24}/></div>
                    <div>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">{club?.canchas?.length || 0}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">Total Canchas</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600"><Activity size={24}/></div>
                    <div>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">Activas</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">Estado Operativo</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-orange-600"><Users size={24}/></div>
                    <div>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">Varios</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">Tipos de Deporte</p>
                    </div>
                </div>
            </div>

            {/* grid canchas*/}
            <div className="flex-1">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
                        {[1,2,3].map(i => <div key={i} className="h-72 bg-slate-200 dark:bg-gray-800 rounded-3xl" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {club?.canchas?.map((cancha) => (
                            <div key={cancha.id} className="group bg-white dark:bg-gray-900 rounded-[2.5rem] border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                            {getSportIcon(cancha.deporte)}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => eliminarCancha(cancha.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{cancha.nombreCancha}</h3>
                                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                                        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            {cancha.deporte}
                                        </span>
                                        <span className="flex items-center gap-1.5 italic">
                                            <Users size={14}/> {cancha.tamanio}
                                        </span>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-gray-800/50 rounded-3xl p-5 border border-slate-100 dark:border-gray-700/50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Precio Base</p>
                                                <p className="font-bold text-slate-700 dark:text-slate-200">{cancha.turno?.descripcionTurno}</p>
                                            </div>
                                            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">${cancha.turno?.costo}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/horarios-admin/${cancha.turno.id}`)}
                                    className="m-4 mt-0 py-4 bg-slate-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 rounded-[1.8rem] flex items-center justify-center gap-3 font-bold transition-all group/btn"
                                >
                                    Configurar Horarios
                                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    </div>

    {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
                <div className="p-8 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center bg-slate-50/50 dark:bg-gray-800/50">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Nueva Cancha</h2>
                        <p className="text-slate-500 text-sm font-medium">Completa los datos técnicos de la pista.</p>
                    </div>
                    <button onClick={() => setModal({ ...modal, open: false })} className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={guardarCancha} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">Identificación</label>
                            <div className="relative">
                                <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input required className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" placeholder="Ej: Cancha Central" value={modal.data.nombreCancha} onChange={e => setModal({...modal, data: {...modal.data, nombreCancha: e.target.value}})} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">Deporte</label>
                                <select className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" value={modal.data.deporte} onChange={e => setModal({...modal, data: {...modal.data, deporte: e.target.value}})}>
                                    <option value="Fútbol"> Fútbol</option>
                                    <option value="Tenis"> Tenis</option>
                                    <option value="Padel"> Padel</option>
                                    <option value="Voley"> Voley</option>
                                    <option value="Basquet"> Basquet</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-1 block">Medidas / Superficie</label>
                                <input className="w-full p-4 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" placeholder="Ej: 5 vs 5 / Sintético" value={modal.data.tamanio} onChange={e => setModal({...modal, data: {...modal.data, tamanio: e.target.value}})} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest"><Banknote size={16}/> Configuración de Precios</div>
                        <input required className="w-full p-4 bg-white dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-bold" placeholder="Descripción (Ej: Turno Noche)" value={modal.data.turno.descripcionTurno} onChange={e => setModal({...modal, data: {...modal.data, turno: {...modal.data.turno, descripcionTurno: e.target.value}}})}/>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                            <input type="number" required className="w-full pl-10 pr-4 py-4 bg-white dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-black text-xl" placeholder="0.00" value={modal.data.turno.costo} onChange={e => setModal({...modal, data: {...modal.data, turno: {...modal.data.turno, costo: Number(e.target.value)}}})}/>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setModal({ ...modal, open: false })} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-gray-800 rounded-2xl transition-colors">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            Finalizar Registro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )}
    </div>
);
}