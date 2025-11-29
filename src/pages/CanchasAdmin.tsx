import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { LayoutGrid, Trophy, DollarSign, Edit, Trash2, Plus, ArrowLeft, Ruler, LandPlot } from "lucide-react";
import { useState } from "react";

interface Turno {
    id: string;
    descripcionTurno: string;
    costo: number;
}

interface Cancha {
    id: string;
    nombreCancha: string;
    deporte: string;
    tamanio: string;
    turno: Turno;
}

interface ModalState {
    open: boolean;
    modo: "add" | "edit";
    data: Cancha | null;
}

export function CanchasAdmin() {
    const { clubId } = useParams();

    const [canchas, setCanchas] = useState<Cancha[]>([
        {
            id: "1",
            nombreCancha: "Cancha 1 - Principal",
            deporte: "Futbol",
            tamanio: "11 vs 11",
            turno: { id: "t1", descripcionTurno: "Turno Estándar", costo: 3500 }
        },
        {
            id: "2",
            nombreCancha: "Cancha 2 - Auxiliar",
            deporte: "Futbol",
            tamanio: "5 vs 5",
            turno: { id: "t2", descripcionTurno: "Turno Reducido", costo: 1800 }
        }
    ]);

    const [modal, setModal] = useState<ModalState>({ open: false, modo: "add", data: null });

    const agregarCancha = () => {
        setModal({
            open: true,
            modo: "add",
            data: {
                id: "",
                nombreCancha: "",
                deporte: "",
                tamanio: "",
                turno: { id: "", descripcionTurno: "", costo: 0 }
            }
        });
    };

    const editarCancha = (cancha: Cancha) => {
        setModal({ open: true, modo: "edit", data: JSON.parse(JSON.stringify(cancha)) });
    };

    const guardarCancha = () => {
        if (!modal.data) return;

        if (modal.modo === "edit") {
            setCanchas(canchas.map((c) => (c.id === modal.data!.id ? modal.data! : c)));
        } else {
            const nuevaCancha = {
                ...modal.data,
                id: Date.now().toString(),
                turno: { ...modal.data.turno, id: Date.now().toString() + "t" }
            };
            setCanchas([...canchas, nuevaCancha]);
        }
        setModal({ open: false, modo: "add", data: null });
    };

    const eliminarCancha = (id: string) => {
        setCanchas(canchas.filter((c) => c.id !== id));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Navbar />

            <div className="flex-1 p-10 relative">

                {/* BOTÓN NUEVA CANCHA (AZUL DESTACADO — Opción B) */}
                <button
                    onClick={agregarCancha}
                    className="absolute top-10 right-10 bg-blue-700 text-white px-4 py-2 rounded-xl shadow 
                               hover:bg-blue-600 active:scale-95 transition flex items-center gap-2"
                >
                    <Plus size={18} /> Nueva Cancha
                </button>

                <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
                        Gestión de Canchas
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Administrando canchas y turnos para el Club ID: <b>{clubId}</b>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {canchas.map((cancha) => (
                        <div
                            key={cancha.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 
                                       dark:border-gray-700 p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                        {cancha.nombreCancha}
                                    </h2>

                                    <span className="inline-flex items-center gap-1 text-sm text-blue-600 
                                                     dark:text-blue-400 font-medium px-2 py-1 rounded">
                                        <Trophy size={14} /> {cancha.deporte}
                                    </span>
                                </div>

                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                    <LayoutGrid size={24} className="text-gray-500 dark:text-gray-300" />
                                </div>
                            </div>

                            <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 space-y-1">
                                <p className="flex items-center gap-2">
                                    <Ruler size={16} /> {cancha.tamanio}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl mb-4 border border-gray-200 dark:border-gray-600">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                                    Configuración del Turno
                                </p>

                                <p className="text-gray-800 dark:text-white font-medium text-sm">
                                    {cancha.turno.descripcionTurno}
                                </p>

                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold mt-1">
                                    <DollarSign size={16} /> {cancha.turno.costo}
                                </div>
                            </div>

                            {/* BOTONES — Estilo Clubes */}
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => editarCancha(cancha)}
                                    className="px-3 py-1 rounded-lg border border-blue-300 text-blue-600 
                                               dark:text-blue-400 dark:border-blue-600
                                               hover:bg-blue-50 dark:hover:bg-blue-900 
                                               flex items-center gap-1 transition"
                                >
                                    <Edit size={16} /> Editar
                                </button>

                                <button
                                    onClick={() => eliminarCancha(cancha.id)}
                                    className="px-3 py-1 rounded-lg border border-red-300 text-red-600 
                                               dark:text-red-400 dark:border-red-600
                                               hover:bg-red-50 dark:hover:bg-red-900 
                                               flex items-center gap-1 transition"
                                >
                                    <Trash2 size={16} /> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTÓN VOLVER — Estilo Clubes */}
                <div className="mt-10">
                    <Link
                        to="/clubes"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 
                                   border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 
                                   font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 
                                   transition-all active:scale-95 group"
                    >
                        <ArrowLeft
                            size={18}
                            className="group-hover:-translate-x-1 transition-transform duration-200"
                        />
                        Volver a Clubes
                    </Link>
                </div>
            </div>

            <Footer />

            {/* MODAL */}
            {modal.open && modal.data && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold dark:text-white mb-6">
                            {modal.modo === "edit" ? "Editar Cancha" : "Nueva Cancha"}
                        </h2>

                        {/* Datos cancha */}
                        <div className="space-y-4 mb-6">
                            <h3 className="text-sm font-bold text-gray-500 uppercase border-b border-gray-200 dark:border-gray-600 pb-1">
                                Datos de la Cancha
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs text-gray-500 dark:text-gray-400">
                                        Nombre de la Cancha
                                    </label>
                                    <input
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        value={modal.data.nombreCancha}
                                        onChange={(e) =>
                                            setModal({
                                                ...modal,
                                                data: { ...modal.data!, nombreCancha: e.target.value }
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400">Deporte</label>
                                    <input
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        value={modal.data.deporte}
                                        onChange={(e) =>
                                            setModal({
                                                ...modal,
                                                data: { ...modal.data!, deporte: e.target.value }
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 dark:text-gray-400">Tamaño</label>
                                    <input
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        value={modal.data.tamanio}
                                        onChange={(e) =>
                                            setModal({
                                                ...modal,
                                                data: { ...modal.data!, tamanio: e.target.value }
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Datos turno */}
                        <div className="space-y-4 mb-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                            <h3 className="text-sm font-bold text-blue-500 uppercase border-b border-blue-100 dark:border-gray-600 pb-1 flex items-center gap-2">
                                <LandPlot size={14} /> Datos del Turno
                            </h3>

                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400">
                                    Descripción del Turno
                                </label>
                                <input
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={modal.data.turno.descripcionTurno}
                                    onChange={(e) =>
                                        setModal({
                                            ...modal,
                                            data: {
                                                ...modal.data!,
                                                turno: { ...modal.data!.turno, descripcionTurno: e.target.value }
                                            }
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400">Costo Base</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={modal.data.turno.costo}
                                    onChange={(e) =>
                                        setModal({
                                            ...modal,
                                            data: {
                                                ...modal.data!,
                                                turno: { ...modal.data!.turno, costo: Number(e.target.value) }
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModal({ open: false, modo: "add", data: null })}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                           text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={guardarCancha}
                                className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 active:scale-95 transition"
                            >
                                Guardar Todo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
