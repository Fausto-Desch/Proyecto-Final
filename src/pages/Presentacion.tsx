import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">

     
      <section className="relative px-6 py-36 text-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 text-white">

       
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
            Iniciar sesion
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate("/register")}>
            Crear cuenta
          </SecondaryButton>
        </motion.div>
      </section>

      {/* FEATURES */}
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
            title="Reservas rapidas"
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

      {/* estadisticas */}
      <section className="px-6 py-24 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <Stat value="+1200" label="Turnos reservados" />
          <Stat value="+40" label="Canchas activas" />
          <Stat value="100%" label="Gestión online" />
        </div>
      </section>

      {/* roles */}
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
          className="mb-10 opacity-90"
        >
          Simplificá la gestión deportiva con una plataforma moderna.
        </motion.p>

        <PrimaryButton onClick={() => navigate("/register")}>
          Crear cuenta gratis
        </PrimaryButton>
      </section>

      {/* footer */}
      <footer className="py-6 text-center text-sm opacity-70">
        Proyecto Final – Tecnicatura Universitaria en Programación
      </footer>
    </div>
  );
}

/* componentes */

function PrimaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        px-10 py-3 rounded-2xl font-semibold
        bg-white text-indigo-700
        shadow-xl hover:shadow-2xl
        hover:scale-105
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
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-white/20
        shadow-lg hover:shadow-2xl
        transition
      "
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="opacity-80">{text}</p>
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
      <div className="opacity-80">{label}</div>
    </motion.div>
  );
}
