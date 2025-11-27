//Home para admins
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Building2, Search, Megaphone } from 'lucide-react';

export function HomeAdmin() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 flex flex-col">
                    <div className="flex-1 p-8">
                        <div className="max-w-4xl mx-auto">

                            {/* Título con Megáfono */}
                            <div className="flex items-center gap-3 mb-2">
                                <Megaphone className="w-8 h-8 text-green-600" />
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Bienvenido al Panel
                                </h1>
                            </div>

                            <p className="text-gray-600 mb-8">
                                Selecciona una opción para comenzar a gestionar.
                            </p>

                            {/* BOTONES */}
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Administrar Clubes */}
                                <div
                                    onClick={() => navigate('/clubes')}
                                    className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl hover:border-blue-300 transition group"
                                >
                                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                                        <Building2 className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Administrar Clubes</h3>
                                    <p className="text-gray-500">
                                        Gestionar canchas, horarios y precios de los clubes adheridos.
                                    </p>
                                </div>

                                {/* Buscar Canchas */}
                                <div
                                    onClick={() => navigate('/clubes')}
                                    className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl hover:border-green-300 transition group"
                                >
                                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                                        <Search className="w-7 h-7 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Buscar Canchas</h3>
                                    <p className="text-gray-500">
                                        Encontrar canchas disponibles para reservar turnos.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    )
}
