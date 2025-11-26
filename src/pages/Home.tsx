import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Building2, Search } from 'lucide-react';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
        {/* 1. Header / Navbar */}
        <Navbar />

        <div className="flex flex-1">
            {/* 2. Sidebar con Estadísticas */}
            <Sidebar />

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col">
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido al Panel</h1>
                <p className="text-gray-600 mb-8">Selecciona una opción para comenzar a gestionar.</p>

                {/* 3. Los dos botones de acción */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Botón 1: Gestión */}
                    <div 
                    onClick={() => navigate('/clubes')}
                    className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition group"
                    >
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                        <Building2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Administrar Clubes</h3>
                    <p className="text-gray-500">Gestionar canchas, horarios y precios de los clubes adheridos.</p>
                    </div>

                    {/* Botón 2: Búsqueda/Reserva */}
                    <div 
                    onClick={() => navigate('/clubes')}
                    className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl hover:border-green-300 transition group"
                    >
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                        <Search className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Buscar Canchas</h3>
                    <p className="text-gray-500">Encontrar canchas disponibles para reservar turnos.</p>
                    </div>
                </div>
                </div>
            </div>

            {/* 4. Footer (Redes Sociales) */}
            <Footer />
            </main>
        </div>
        </div>
    )
}