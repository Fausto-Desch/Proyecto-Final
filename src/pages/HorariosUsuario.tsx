import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Clock, Calendar, ArrowLeft, MessageCircle, Filter, X } from "lucide-react";
import { clubApi } from "../api/clubApi";

interface Horario {
  id: string;
  disponibilidad: boolean;
  horario: string;
  diaHorario: string;
  idTurno: string;
}

export default function HorariosUsuario() {
  const navigate = useNavigate();
  const {turnoId} = useParams<{ turnoId: string;}>()
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving] = useState(false);
  const [modalHorario, setModalHorario] = useState<Horario | null>(null);

  const [filtroFecha, setFiltroFecha] = useState<string>(new Date().toISOString().split('T')[0]);

  const obtenerTelefonoClub = (idTurno: string) => {
    const clubEncontrado = clubs.find((c: { canchas: any[]; }) => 
      c.canchas?.some(cancha => 
        (cancha.idTurno === idTurno) || (cancha.turno?.id === idTurno)
      )
    );
    return clubEncontrado?.telefono.replace(/\D/g, ''); 
  }; 

  const enviarMensajeWhatsApp = (h: Horario) => {
    const fechaFormateada = new Date(h.diaHorario).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long'
    });

  const WHATSAPP_NUMBER = obtenerTelefonoClub(h.idTurno);  

    const mensaje = `¡Hola! Acabo de reservar un turno mediante la App.%0A%0A` +
                    `*Detalles de la reserva:*%0A` +
                    ` *Fecha:* ${fechaFormateada}%0A` +
                    ` *Horario:* ${h.horario}%0A%0A` +
                    `¡Muchas gracias!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long' 
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [resHorarios, resClubs] = await Promise.all([
          fetch("http://localhost:3000/horario"),
          clubApi.getAll()
        ]);

        if (!resHorarios.ok) throw new Error("Error en horarios");
        
        const dataHorarios = await resHorarios.json();
        const sincronizados = dataHorarios.map((h: any) => ({
          ...h,
          idTurno: h.id_turno || h.idTurno || "0"
        }));

        setHorarios(sincronizados);
        setClubs(resClubs);

      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // logica filtrado
  const horariosFiltrados = useMemo(() => {
    let filtrados = horarios;

    // NUEVO: Filtramos para que solo aparezcan los horarios de este turno
    if (turnoId) {
      filtrados = filtrados.filter(h => h.idTurno === turnoId);
    }

    if (filtroFecha) {
      filtrados = filtrados.filter(h => 
        new Date(h.diaHorario).toISOString().split('T')[0] === filtroFecha
      );
    }

    // Ordenar por hora
    return filtrados.sort((a, b) => a.horario.localeCompare(b.horario));
  }, [horarios, filtroFecha, turnoId]);

  const confirmarInteres = (h: Horario) => {
    enviarMensajeWhatsApp(h);
    setModalHorario(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#05080f] transition-colors duration-500 font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">
              Agenda de <span className="text-blue-600">Turnos</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium mt-2 italic">
              Asegura tu lugar y te redirigiremos a WhatsApp para confirmar.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* filtro*/}
              <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-2 pl-4 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm w-full sm:w-auto">
                <Calendar size={18} className="text-blue-500" />
                <input 
                  type="date" 
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 dark:text-white font-bold text-sm focus:ring-0"
                />
                {filtroFecha && (
                    <button onClick={() => setFiltroFecha("")} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400">
                      <X size={14} />
                    </button>
                )}
              </div>

            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center justify-center gap-2 font-black text-[11px] tracking-widest text-slate-400 hover:text-blue-600 transition-all uppercase bg-white dark:bg-white/5 px-6 py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 w-full sm:w-auto"
            >
              <ArrowLeft size={16} /> Volver
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-gray-800 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <>
            {horariosFiltrados.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-gray-800"
              >
                <Filter className="mx-auto text-slate-300 dark:text-gray-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">No hay turnos para esta fecha</h3>
                <p className="text-slate-500 dark:text-gray-400">Intenta seleccionando otro día en el calendario.</p>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {horariosFiltrados.map((h, index) => (
                    <motion.div 
                      key={h.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
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
                        {!h.disponibilidad && <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-200 dark:bg-white/10 rounded-full">Ocupado</span>}
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
                          No disponible
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}

        {/* modal */}
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
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle size={32} />
                </div>
                <h2 className="text-3xl font-black dark:text-white mb-2 italic uppercase tracking-tighter">¡Casi listo!</h2>
                <p className="text-slate-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                  Al confirmar, se reservará tu lugar y te enviaremos al **WhatsApp** de la cancha para finalizar.
                </p>      
                <div className="space-y-3">
                  <button onClick={() => confirmarInteres(modalHorario)} className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all">
                    Abrir WhatsApp
                  </button>
                  <button onClick={() => setModalHorario(null)} className="w-full py-5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest">
                    Cerrar
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
