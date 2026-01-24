import { TrendingUp, Users, MapPin, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clubApi } from '../../api/clubApi';

export function Sidebar() {
    const [stats, setStats] = useState({
        clubes: 0,
        canchas: 0,
        reservas: 0,
        usuarios: 0 // Este dato requeriría un endpoint de usuarios, lo dejamos en 0 o estático por ahora
    });

    useEffect(() => {
        const cargarEstadisticas = async () => {
            try {
                // 1. Pedimos todos los clubes al backend
                const data = await clubApi.getAll();

                // 2. Calculamos los totales reales
                const totalClubes = data.length;
                
                // Sumamos todas las canchas de todos los clubes
                const totalCanchas = data.reduce((acc, club) => acc + (club.canchas?.length || 0), 0);

                // (Opcional) Intentamos calcular reservas ocupadas si la estructura lo permite
                // Iteramos Club -> Canchas -> Turno -> Horarios ocupados
                let totalReservas = 0;
                data.forEach(club => {
                    club.canchas?.forEach(cancha => {
                        if (cancha.turno && cancha.turno.horarios) {
                            const ocupados = cancha.turno.horarios.filter(h => !h.disponibilidad).length;
                            totalReservas += ocupados;
                        }
                    });
                });

                setStats({
                    clubes: totalClubes,
                    canchas: totalCanchas,
                    reservas: totalReservas,
                    usuarios: 1 // Dato simulado ya que no tenemos acceso a la tabla de usuarios desde el frontend todavía
                });

            } catch (error) {
                console.error("Error cargando stats del sidebar:", error);
            }
        };

        cargarEstadisticas();
    }, []);

    const statItems = [
        { label: 'Clubes Registrados', value: stats.clubes.toString(), icon: MapPin, color: 'text-blue-600' },
        { label: 'Canchas Activas', value: stats.canchas.toString(), icon: TrendingUp, color: 'text-green-600' },
        // Mantenemos usuarios mockeado o lo mostramos como dato informativo estático
        { label: 'Usuarios Sistema', value: 'N/A', icon: Users, color: 'text-purple-600' }, 
        { label: 'Reservas Ocupadas', value: stats.reservas.toString(), icon: Calendar, color: 'text-orange-600' },
    ];

    return (
        <aside
            className="
                w-64 
                bg-gray-50 
                dark:bg-gray-900
                border-r 
                border-gray-200 
                dark:border-gray-700
                min-h-[calc(100vh-73px)] 
                hidden lg:block 
                p-6 
                transition-colors
            "
        >
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                Estadísticas Reales
            </h2>

            <div className="space-y-4">
                {statItems.map((stat, index) => (
                    <div
                        key={index}
                        className="
                            bg-white 
                            dark:bg-gray-800 
                            p-4 
                            rounded-xl 
                            shadow-sm 
                            border 
                            border-gray-100 
                            dark:border-gray-700
                            transition-colors
                        "
                    >
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {stat.value}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Nota informativa opcional */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-300">
                    Estas estadísticas se actualizan automáticamente con la base de datos.
                </p>
            </div>
        </aside>
    );
}