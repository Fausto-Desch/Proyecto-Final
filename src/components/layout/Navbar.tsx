import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

export function Navbar() {
    const navigate = useNavigate();
    const userName = authApi.getUserName();

    const handleLogout = () => {
        authApi.logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-xl font-bold text-blue-900 tracking-tight">
            Gestionador de Canchas
            </span>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 hidden sm:block">
                {userName || 'Usuario'}
            </span>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                {userName?.[0]?.toUpperCase() || 'U'}
            </div>
            <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                title="Cerrar sesión"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
        </nav>
    )
}