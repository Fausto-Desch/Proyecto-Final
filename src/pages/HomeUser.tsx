import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Search, Goal, ArrowRight, Trophy, Star, Activity } from "lucide-react";
import { authApi } from "../api/authApi";

export default function HomeUser() {
  const navigate = useNavigate();
  const userName = authApi.getUserName();
  
  const [isVisible, setIsVisible] = useState(true);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const lastScrollY = useRef(0);
  const footerRef = useRef(null);

  const whatsappNumber = "5491133344455"; 
  const whatsappMessage = `Hola! Soy ${userName || "un jugador"}, quiero hacer una consulta sobre las canchas.`;

  // Logica de scroll 
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) { 
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // Detector de Footer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsOverFooter(entry.isIntersecting);
    }, { threshold: 0.1 });
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10 lg:p-14">
            <div className="max-w-6xl mx-auto">
              
              {/* Saludo de Bienvenida */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <Goal className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white">
                      ¡HOLA, <span className="text-emerald-600 dark:text-emerald-500 not-italic uppercase">{userName || "Jugador"}</span>!
                    </h1>
                    <p className="text-slate-500 dark:text-gray-500 font-medium italic mt-1">
                      Tu próximo partido está a un clic de distancia.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* grilla de acciones */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Buscar canchas (Sección Principal) */}
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => navigate("/clubes-usuario")}
                  className="lg:col-span-2 relative group overflow-hidden bg-white dark:bg-[#0d121f] p-10 rounded-[3rem] border border-slate-200 dark:border-gray-800/60 cursor-pointer shadow-sm hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner text-emerald-600 dark:text-emerald-400">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-black italic tracking-tighter mb-4 text-slate-800 dark:text-white">
                      BUSCAR CANCHAS
                    </h3>
                    <p className="text-slate-500 dark:text-gray-500 text-lg max-w-sm mb-8 leading-relaxed font-medium italic">
                      Explorá los mejores clubes de Bahía Blanca y reservá tu lugar en tiempo real.
                    </p>
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500 font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                      Ver clubes disponibles <ArrowRight size={18} />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity rotate-12">
                    <Trophy size={300} />
                  </div>
                </motion.div>

                {/*  rendimiento / estadisticas */}
                <div className="flex flex-col gap-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#111827] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group flex-1 border border-gray-800"
                  >
                    <Activity className="w-12 h-12 mb-6 text-emerald-500 opacity-80" />
                    <h4 className="text-xl font-black italic tracking-tight mb-4 uppercase">Tu Rendimiento</h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Partidos Jugados</span>
                        <span className="text-2xl font-black text-emerald-400 italic">12</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[65%]" />
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <div className="flex-1 bg-gray-900/50 p-3 rounded-2xl border border-gray-800">
                           <Star className="w-4 h-4 text-yellow-500 mb-1" />
                           <p className="text-[10px] font-bold uppercase text-gray-400">Nivel</p>
                           <p className="text-sm font-black italic uppercase">Amateur</p>
                        </div>
                        <div className="flex-1 bg-gray-900/50 p-3 rounded-2xl border border-gray-800">
                           <Trophy className="w-4 h-4 text-emerald-500 mb-1" />
                           <p className="text-[10px] font-bold uppercase text-gray-400">Logros</p>
                           <p className="text-sm font-black italic uppercase">3 MVP</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl" />
                  </motion.div>
                </div>

              </div>

              {/* tip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-[1.5rem] border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center gap-3"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-black uppercase tracking-widest">
                  Tip: Completá tu perfil para aparecer en el ranking de jugadores de la semana.
                </p>
              </motion.div>
            </div>
          </div>
          
          <div ref={footerRef}>
            <Footer />
          </div>
        </main>
      </div>

      {/* boton de whatsap */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: isOverFooter ? -90 : 0 
            }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 group"
          >
            {!isOverFooter && (
              <motion.div className="bg-white dark:bg-[#0d121f] text-slate-800 dark:text-white px-4 py-2 rounded-2xl shadow-xl border border-slate-200 dark:border-emerald-500/30 text-[10px] font-black uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                ¿Necesitás ayuda?
              </motion.div>
            )}

            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 8, boxShadow: "0px 0px 30px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="relative flex items-center justify-center bg-[#25D366] text-white p-5 rounded-[2.2rem] shadow-2xl transition-colors duration-300"
            >
              <span className="absolute inset-0 rounded-[2.2rem] bg-emerald-400 animate-ping opacity-20 group-hover:hidden"></span>
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}