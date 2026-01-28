import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Clock, Calendar, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Horario {
  id: string;
  disponibilidad: boolean;
  horario: string;
  diaHorario: string;
  idTurno: string;
}

export default function HorariosUsuario() {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [modalHorario, setModalHorario] = useState<Horario | null>(null);

  // Formateador de fecha profesional
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long' 
    });
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/horario");
        if (!res.ok) throw new Error("Error al conectar con el servidor");
        const data = await res.json();
        
        const sincronizados = data.map((h: any) => ({
          ...h,
          idTurno: h.id_turno || h.idTurno || "0"
        }));

        setHorarios(sincronizados);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHorarios();
  }, []);

  const handleReservar = async (h: Horario) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión para reservar");

    try {
      setReserving(true);
      const res = await fetch(`http://localhost:3000/horario/${h.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          disponibilidad: false,
          horario: h.horario,
          diaHorario: h.diaHorario,
          idTurno: h.idTurno
        })
      });

      if (!res.ok) throw new Error("El turno ya no está disponible");

      setHorarios(prev => prev.map(item => item.id === h.id ? { ...item, disponibilidad: false } : item));
      setModalHorario(null);
      // Aquí podrías usar una librería como Sonner o React-Toastify
      alert("🏆 ¡Turno reservado con éxito!");

    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#05080f] transition-colors duration-500 font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">
              Agenda de <span className="text-blue-600">Turnos</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium mt-2 italic">
              Visualiza los horarios disponibles y asegura tu lugar en la cancha.
            </p>
          </motion.div>

          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 font-black text-[11px] tracking-widest text-slate-400 hover:text-blue-600 transition-all uppercase bg-white dark:bg-white/5 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10"
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-gray-800 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {horarios.map((h, index) => (
                <motion.div 
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                    h.disponibilidad 
                    ? "bg-white dark:bg-[#0d121f] border-slate-100 dark:border-gray-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-2" 
                    : "bg-slate-100 dark:bg-white/5 border-transparent grayscale"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className={`p-4 rounded-2xl ${h.disponibilidad ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "bg-slate-200 text-slate-500"}`}>
                      <Clock size={28} />
                    </div>
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter ${
                      h.disponibilidad ? "bg-green-100 text-green-700" : "bg-slate-300 text-slate-700"
                    }`}>
                      {h.disponibilidad ? "• Disponible" : "Ocupado"}
                    </span>
                  </div>

                  <div className="text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight italic">
                    {h.horario}
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 font-bold text-xs mb-8 uppercase tracking-widest">
                    <Calendar size={14} className="text-blue-500" />
                    {formatDate(h.diaHorario)}
                  </div>

                  {h.disponibilidad ? (
                    <button 
                      onClick={() => setModalHorario(h)}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-blue-600/20 uppercase text-xs tracking-widest"
                    >
                      Reservar ahora
                    </button>
                  ) : (
                    <div className="w-full py-4 bg-slate-200 dark:bg-gray-700 text-slate-500 dark:text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2">
                      <CheckCircle size={16} /> No disponible
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {horarios.length === 0 && !loading && (
          <div className="text-center py-20 bg-white dark:bg-[#0d121f] rounded-[3rem] border border-dashed border-slate-200 dark:border-gray-800">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-bold italic">No hay horarios cargados para esta cancha todavía.</p>
          </div>
        )}

        {/* MODAL DE CONFIRMACIÓN */}
        <AnimatePresence>
          {modalHorario && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => !reserving && setModalHorario(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white dark:bg-[#0d121f] rounded-[3rem] p-10 max-w-sm w-full shadow-2xl relative z-10 border border-white/10"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar size={32} />
                </div>
                <h2 className="text-3xl font-black dark:text-white mb-2 italic uppercase tracking-tighter">¿Confirmamos?</h2>
                <p className="text-slate-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                  Vas a reservar el turno de las <span className="text-blue-600 font-black italic">{modalHorario.horario}</span> el día <span className="text-slate-900 dark:text-white font-bold">{new Date(modalHorario.diaHorario).toLocaleDateString()}</span>.
                </p>
                
                <div className="space-y-3">
                  <button 
                    disabled={reserving}
                    onClick={() => handleReservar(modalHorario)}
                    className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {reserving ? (
                      <><Loader2 className="animate-spin" size={18} /> Procesando...</>
                    ) : (
                      "Si, confirmar reserva"
                    )}
                  </button>
                  <button 
                    disabled={reserving}
                    onClick={() => setModalHorario(null)} 
                    className="w-full py-5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest"
                  >
                    Volver atrás
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}