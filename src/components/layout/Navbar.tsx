import { Menu } from 'lucide-react';

export function Navbar() {
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
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                U
            </div>
        </div>
        </nav>
    )
}