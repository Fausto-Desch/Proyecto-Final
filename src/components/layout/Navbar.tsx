import { Menu, LogOut, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

export function Navbar() {
    const navigate = useNavigate();
    const userName = authApi.getUserName();

    const handleLogout = () => {
        authApi.logout();
        navigate('/login');
    };

    // Función para ir al home correcto al hacer click en el logo
    const goHome = () => {
        const role = authApi.getRole();
        navigate(role === 'admin' ? '/home-admin' : '/home-user');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
                {/* Botón menú hamburguesa (móvil) */}
                <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors">
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>

                {/* --- LOGO TIPO APP --- */}
                <div 
                    className="flex items-center gap-2.5 cursor-pointer group" 
                    onClick={goHome}
                >
                    {/* Icono con fondo degradado */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                        <Trophy className="text-white w-5 h-5" strokeWidth={2.5} />
                    </div>
                    
                    {/* Texto con jerarquía */}
                    <div className="flex flex-col select-none">
                        <span className="text-lg font-extrabold text-gray-800 leading-none tracking-tight group-hover:text-blue-700 transition-colors">
                            Sport<span className="text-blue-600">Manager</span>
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">
                            Gestión de Canchas
                        </span>
                    </div>
                </div>
                {/* --------------------------- */}
            </div>

            {/* Parte derecha: Usuario y Logout */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {userName || 'Usuario'}
                </span>
                
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold shadow-sm">
                    {userName?.[0]?.toUpperCase() || 'U'}
                </div>

                <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 text-gray-400 hover:text-red-600 group"
                    title="Cerrar sesión"
                >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </nav>
    )
}