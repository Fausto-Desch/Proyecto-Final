import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Building, MapPin, Phone, Save, LayoutGrid, CalendarDays } from 'lucide-react';

// Simulamos los datos del club logueado (esto vendría de tu login/API)
interface MiClubData {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string; // ¡Importante para el botón de WhatsApp!
}

export function HomeOwner() {
    const navigate = useNavigate();

    // Estado local para editar los datos del propio club
    const [miClub, setMiClub] = useState<MiClubData>({
        id: 1,
        nombre: "Club Atlético Demo",
        direccion: "Calle Falsa 123",
        telefono: "5492923659973"
    });

    const [editando, setEditando] = useState(false);

    const guardarCambios = () => {
        setEditando(false);
        // Aquí harías una llamada a la API: authApi.updateMyClub(miClub)...
        alert("Datos del club actualizados correctamente");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar /> {/* Puedes crear un Sidebar específico para Owner si quieres ocultar opciones */}

                <main className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto">
                        
                        {/* Cabecera de Bienvenida */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Panel de Gestión
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Administra tu club, tus canchas y tu información de contacto.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* TARJETA 1: DATOS DEL CLUB (Izquierda) */}
                            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-fit">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        <Building className="text-blue-600" size={20}/> Mi Club
                                    </h2>
                                    {!editando ? (
                                        <button 
                                            onClick={() => setEditando(true)}
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Editar
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={guardarCambios}
                                            className="text-sm text-green-600 dark:text-green-400 font-bold flex items-center gap-1"
                                        >
                                            <Save size={14}/> Guardar
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Nombre</label>
                                        {editando ? (
                                            <input 
                                                className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                value={miClub.nombre}
                                                onChange={(e) => setMiClub({...miClub, nombre: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-gray-800 dark:text-gray-200 font-medium">{miClub.nombre}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                                            <MapPin size={12}/> Dirección
                                        </label>
                                        {editando ? (
                                            <input 
                                                className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                                                value={miClub.direccion}
                                                onChange={(e) => setMiClub({...miClub, direccion: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-gray-800 dark:text-gray-200 font-medium">{miClub.direccion}</p>
                                        )}
                                    </div>

                                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/50">
                                        <label className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase flex items-center gap-1">
                                            <Phone size={12}/> WhatsApp Reservas
                                        </label>
                                        {editando ? (
                                            <input 
                                                className="w-full mt-1 p-2 border border-green-300 rounded dark:bg-gray-700 dark:text-white"
                                                value={miClub.telefono}
                                                onChange={(e) => setMiClub({...miClub, telefono: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-gray-800 dark:text-gray-200 font-medium font-mono">{miClub.telefono}</p>
                                        )}
                                        <p className="text-[10px] text-gray-500 mt-1">
                                            *Este número recibirá los mensajes de los usuarios.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* TARJETA 2: ACCIONES RÁPIDAS (Derecha) */}
                            <div className="lg:col-span-2 space-y-6">
                                
                                {/* Banner de Gestión de Canchas */}
                                <div 
                                    onClick={() => navigate(`/clubes/${miClub.id}/canchas`)}
                                    className="group bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-lg cursor-pointer transform hover:scale-[1.01] transition-all relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                            <LayoutGrid className="group-hover:rotate-180 transition-transform duration-500"/> 
                                            Gestionar mis Canchas
                                        </h3>
                                        <p className="text-blue-100 max-w-md">
                                            Agrega nuevas canchas, modifica los precios de los turnos o cambia la disponibilidad temporalmente.
                                        </p>
                                        <button className="mt-4 bg-white text-blue-700 px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-gray-100 transition">
                                            Ver Canchas
                                        </button>
                                    </div>
                                    {/* Elemento decorativo */}
                                    <LayoutGrid className="absolute -right-6 -bottom-6 text-white opacity-10 w-48 h-48 group-hover:scale-110 transition-transform"/>
                                </div>

                                {/* Estadísticas rápidas / Calendario (Placeholder) */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                        <CalendarDays className="text-orange-500"/> Próximos Turnos (Simulado)
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-gray-700 dark:text-white">Cancha 1 (F5)</p>
                                                <p className="text-xs text-gray-500">Hoy, 19:00hs</p>
                                            </div>
                                            <span className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded-full font-bold">
                                                Confirmado
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-gray-700 dark:text-white">Cancha 2 (F11)</p>
                                                <p className="text-xs text-gray-500">Mañana, 21:00hs</p>
                                            </div>
                                            <span className="text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 text-xs px-2 py-1 rounded-full font-bold">
                                                Pendiente
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}