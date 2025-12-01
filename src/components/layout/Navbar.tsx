import { Menu, LogOut, Trophy, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useTheme } from "../../context/ThemaContext";

export function Navbar() {
    const navigate = useNavigate();
    const userName = authApi.getUserName();

    // ThemeContext (única fuente de verdad)
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        authApi.logout();
        navigate('/login');
    };

    const goHome = () => {
        const role = authApi.getRole();
        navigate(role === 'admin' ? '/home-admin' : '/home-user');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 dark:border-gray-700 border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 transition-colors">
            {/* LOGO + BOTÓN MENÚ */}
            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg lg:hidden transition-colors">
                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>

                {/* LOGO */}
                <div 
                    className="flex items-center gap-2.5 cursor-pointer group" 
                    onClick={goHome}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                        <Trophy className="text-white w-5 h-5" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex flex-col select-none">
                        <span className="text-lg font-extrabold text-gray-800 dark:text-gray-100 leading-none tracking-tight group-hover:text-blue-700 transition-colors">
                            Sport<span className="text-blue-600">Manager</span>
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-tight">
                            Gestión de Canchas
                        </span>
                    </div>
                </div>
            </div>

            {/* ICONOS DERECHA */}
            <div className="flex items-center gap-4">

                {/* MODO OSCURO */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    title="Cambiar tema"
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-600" />
                    )}
                </button>

                {/* NOMBRE DE USUARIO */}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                    {userName || 'Usuario'}
                </span>
                
                {/* CÍRCULO CON INICIAL */}
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold shadow-sm">
                    {userName?.[0]?.toUpperCase() || 'U'}
                </div>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-all duration-200 text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 group"
                    title="Cerrar sesión"
                >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </nav>
    );
}
