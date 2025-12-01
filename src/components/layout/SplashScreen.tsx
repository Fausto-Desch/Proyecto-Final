import { Trophy, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void; // Función para avisar que terminó la animación
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
const [isFading, setIsFading] = useState(false);

useEffect(() => {
    // 1. Mostrar el logo por 2 segundos
    const timer = setTimeout(() => {
      setIsFading(true); // Comenzar a desvanecer
    }, 2000);

    // 2. Esperar a que termine la transición (0.5s) y desmontar
    const cleanup = setTimeout(() => {
    onFinish();
    }, 2500);

    return () => {
    clearTimeout(timer);
    clearTimeout(cleanup);
    };
}, [onFinish]);

return (
    <div
    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}
    >
      {/* Contenedor del Logo (Estilo similar al Navbar pero más grande) */}
    <div className="relative animate-slide-up">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-6 animate-bounce-slow">
        <Trophy className="text-white w-12 h-12" strokeWidth={2} />
        </div>
        
        {/* Efecto de brillo/pulso detrás */}
        <div className="absolute -z-10 top-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-xl opacity-30 animate-pulse-fast"></div>
    </div>

      {/* Texto de la Marca */}
    <div className="text-center animate-fade-in space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
        Sport<span className="text-blue-600">Manager</span>
        </h1>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.3em]">
        Gestión de Canchas
        </p>
    </div>

      {/* Spinner sutil abajo */}
    <div className="absolute bottom-10">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin opacity-50" />
    </div>
    </div>
);
}