import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaContext"; 

export default function Presentacion() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/*cambio de tema*/}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full 
                   bg-white/20 dark:bg-black/20 backdrop-blur-md 
                   border border-gray-200 dark:border-white/20 
                   shadow-lg hover:scale-110 active:scale-95 
                   transition-all duration-300"
        title="Cambiar modo de color"
      >
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <span className="text-xl">☀️</span> 
          ) : (
            <span className="text-xl">🌙</span> 
          )}
        </motion.div>
      </button>

      <section className="relative px-6 py-36 text-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 text-white">
        
        {/* Efecto de luz de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Reserva tu cancha <br />
          <span className="text-indigo-200">en segundos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative max-w-2xl mx-auto text-lg opacity-90 mb-12"
        >
          Plataforma moderna para gestionar clubes, canchas y turnos deportivos
          desde cualquier dispositivo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative flex justify-center gap-6"
        >
          <PrimaryButton onClick={() => navigate("/login")}>
            Iniciar sesión
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate("/register")}>
            Crear cuenta
          </SecondaryButton>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-28 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Todo lo que necesitás en un solo lugar
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          <GlassCard
            title="Reservas rápidas"
            text="Elegí club, cancha y horario disponible en pocos pasos."
          />
          <GlassCard
            title="Gestión centralizada"
            text="Administrá clubes, canchas y turnos desde un panel intuitivo."
          />
          <GlassCard
            title="Roles inteligentes"
            text="Experiencias diferenciadas para usuarios y administradores."
          />
        </div>
      </section>

      {/* ESTADISTICAS */}
      <section className="px-6 py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-500">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <Stat value="+1200" label="Turnos reservados" />
          <Stat value="+40" label="Canchas activas" />
          <Stat value="100%" label="Gestión online" />
        </div>
      </section>

      {/* SECCIoN DE ROLES */}
      <section className="px-6 py-28 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Diseñado para cada rol
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <GlassCard
            title="Administrador"
            text="Gestioná clubes, canchas, horarios y reservas de forma eficiente."
          />
          <GlassCard
            title="Usuario"
            text="Buscá clubes, reservá turnos y administrá tus reservas fácilmente."
          />
        </div>
      </section>

      <section className="px-6 py-32 text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-6"
        >
          Empeza hoy mismo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 opacity-90 text-lg"
        >
          Simplifica la gestion deportiva con una plataforma moderna.
        </motion.p>

        <PrimaryButton onClick={() => navigate("/register")}>
          Crear cuenta gratis
        </PrimaryButton>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm opacity-60">
        Proyecto Final – Tecnicatura Universitaria en Programación
      </footer>
    </div>
  );
}

/* --- COMPONENTES AUXILIARES --- */

function PrimaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        px-10 py-3 rounded-2xl font-semibold
        bg-white text-indigo-700
        shadow-xl hover:shadow-2xl
        hover:scale-105 active:scale-95
        transition-all duration-300
      "
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        px-10 py-3 rounded-2xl font-semibold
        border border-white/40
        hover:bg-white hover:text-indigo-700
        active:scale-95
        transition-all duration-300
      "
    >
      {children}
    </button>
  );
}

function GlassCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6 }}
      className="
        p-10 rounded-3xl
        bg-gray-100/50 dark:bg-white/5
        backdrop-blur-xl
        border border-gray-200 dark:border-white/10
        shadow-sm hover:shadow-2xl
        transition-all duration-500
      "
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="opacity-70 dark:opacity-80 leading-relaxed">{text}</p>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="opacity-70 font-medium uppercase tracking-wider text-xs">
        {label}
      </div>
    </motion.div>
  );
}