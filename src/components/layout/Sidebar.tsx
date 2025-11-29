import { TrendingUp, Users, MapPin, Calendar } from 'lucide-react';

export function Sidebar() {
    // Datos mockeados basados en tu modelo de negocio
    const stats = [
        { label: 'Clubes Registrados', value: '12', icon: MapPin, color: 'text-blue-600' },
        { label: 'Canchas Activas', value: '45', icon: TrendingUp, color: 'text-green-600' },
        { label: 'Usuarios Totales', value: '1,240', icon: Users, color: 'text-purple-600' },
        { label: 'Reservas Hoy', value: '8', icon: Calendar, color: 'text-orange-600' },
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
                Estadísticas Rápidas
            </h2>

            <div className="space-y-4">
                {stats.map((stat, index) => (
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
        </aside>
    );
}
