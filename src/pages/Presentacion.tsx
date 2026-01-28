import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaContext"; 
import React from "react";

// Interfaces para Props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

interface CardProps {
  title: string;
  text: string;
}

export default function Presentacion() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#05080f] text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/* Botón de cambio de tema */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
        title="Cambiar modo de color"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.div>
      </button>

      {/* HERO SECTION */}
      <section className="relative px-6 py-36 text-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_70%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic"
        >
          Reserva tu cancha <br />
          <span className="text-indigo-200 not-italic">en segundos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative max-w-2xl mx-auto text-lg opacity-90 mb-12 font-medium"
        >
          Plataforma moderna para gestionar clubes, canchas y turnos deportivos
          desde cualquier dispositivo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative flex flex-wrap justify-center gap-4"
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
      <section className="px-6 py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard
            title="Reservas rápidas"
            text="Elegí club, cancha y horario disponible en pocos pasos con confirmación instantánea."
          />
          <GlassCard
            title="Gestión centralizada"
            text="Administrá múltiples sedes, tipos de canchas y precios desde un solo panel de control."
          />
          <GlassCard
            title="Roles inteligentes"
            text="Accesos personalizados según tu perfil: Dueño, Administrador o Jugador."
          />
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="px-6 py-24 bg-gray-50 dark:bg-white/5 transition-colors duration-500">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <Stat value="Centralizado" label="Todo tu club en un panel" />
          <Stat value="Tiempo Real" label="Sincronización de turnos" />
          <Stat value="100% Digital" label="Gestión online sin papeles" />
        </div>
      </section>

      {/* SECCIÓN FINAL CALL TO ACTION */}
      <section className="px-6 py-32 text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
        <h2 className="text-4xl font-black mb-6 uppercase italic">Empieza hoy mismo</h2>
        <p className="mb-10 opacity-90 text-lg max-w-xl mx-auto">
          Simplifica la gestión deportiva y mejora la experiencia de tus clientes con nuestra tecnología.
        </p>
        <PrimaryButton onClick={() => navigate("/register")}>
          Crear cuenta gratis
        </PrimaryButton>
      </section>

      <footer className="py-12 text-center text-xs opacity-50 font-bold tracking-widest uppercase">
        Proyecto Final – Tecnicatura Universitaria en Programación
      </footer>
    </div>
  );
}

/* --- COMPONENTES AUXILIARES CON TIPADO --- */

function PrimaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-4 rounded-2xl font-black uppercase text-sm bg-white text-indigo-700 shadow-xl hover:shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-4 rounded-2xl font-black uppercase text-sm border-2 border-white/40 hover:bg-white hover:text-indigo-700 active:scale-95 transition-all duration-300"
    >
      {children}
    </button>
  );
}

function GlassCard({ title, text }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="p-10 rounded-[2.5rem] bg-gray-100/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <h3 className="text-xl font-black mb-4 uppercase italic text-indigo-600 dark:text-indigo-400">
        {title}
      </h3>
      <p className="opacity-70 dark:opacity-80 leading-relaxed font-medium">{text}</p>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent mb-2 italic uppercase">
        {value}
      </div>
      <div className="opacity-50 font-bold uppercase tracking-widest text-[10px]">
        {label}
      </div>
    </motion.div>
  );
}