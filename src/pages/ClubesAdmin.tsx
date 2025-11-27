// Listado de clubes para admins
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Building2, MapPin, Edit, Trash2, Plus } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Club {
  id: number;
  nombre: string;
  direccion: string;
  canchas: number;
}

interface ModalState {
  open: boolean;
  modo: "add" | "edit";
  data: Club | null;
}

export function Clubes() {
  const [clubes, setClubes] = useState<Club[]>([
    { id: 1, nombre: "Club Atletico Union", direccion: "Av. Alem 1250", canchas: 3 },
    { id: 2, nombre: "Club Deportivo Bahiense", direccion: "Zapiola 350", canchas: 2 },
    { id: 3, nombre: "Club Estudiantes", direccion: "Colon 75", canchas: 4 },
  ]);

  const [modal, setModal] = useState<ModalState>({
    open: false,
    modo: "add",
    data: null
  });

  const editarClub = (club: Club) => {
    setModal({
      open: true,
      modo: "edit",
      data: { ...club },
    });
  };

  const agregarClub = () => {
    setModal({
      open: true,
      modo: "add",
      data: { id: 0, nombre: "", direccion: "", canchas: 0 },
    });
  };

  const guardarClub = () => {
    if (!modal.data) return;

    if (modal.modo === "edit") {
      setClubes(
        clubes.map((c) => (c.id === modal.data!.id ? modal.data! : c))
      );
    } else {
      setClubes([
        ...clubes,
        { ...modal.data, id: Date.now() },
      ]);
    }

    setModal({ open: false, modo: "add", data: null });
  };

  const eliminarClub = (id: number) => {
    setClubes(clubes.filter((club) => club.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />

      <div className="flex-1 p-10 relative">

        {/* BOTÓN AÑADIR */}
        <button
          onClick={agregarClub}
          className="absolute top-10 right-10 bg-blue-700 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-500 transition flex items-center gap-2"
        >
          <Plus size={18} /> Añadir Club
        </button>

        {/* TÍTULO */}
        <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 mb-3">
            Listado de Clubes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Aquí puedes ver los clubes registrados y la cantidad de canchas disponibles actualmente.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubes.map((club) => (
            <div
              key={club.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col border border-gray-200 dark:border-gray-700 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="text-blue-400" size={26} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {club.nombre}
                </h2>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300 gap-2 mb-1">
                <MapPin size={16} /> {club.direccion}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-bold">{club.canchas}</span> canchas disponibles
              </p>

              <Link
                to={`/club/${club.id}/canchas`}
                className="w-full text-center bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Ver Canchas
              </Link>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editarClub(club)}
                  className="px-3 py-1 rounded-lg border border-blue-300 text-blue-600 dark:text-blue-400 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 flex items-center gap-1 transition"
                >
                  <Edit size={16} /> Editar
                </button>

                <button
                  onClick={() => eliminarClub(club.id)}
                  className="px-3 py-1 rounded-lg border border-red-300 text-red-600 dark:text-red-400 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900 flex items-center gap-1 transition"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN VOLVER */}
        <div className="mt-10">
          <Link
            to="/home-admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all active:scale-95 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Volver al Panel de Control
          </Link>
        </div>
      </div>

      <Footer />

      {/* MODAL */}
      {modal.open && modal.data && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md border dark:border-gray-700">

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
              {modal.modo === "edit" ? "Editar Club" : "Añadir Club"}
            </h2>

            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Nombre del club"
                className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2"
                value={modal.data.nombre}
                onChange={(e) =>
                  setModal({ ...modal, data: { ...modal.data!, nombre: e.target.value } })
                }
              />

              <input
                type="text"
                placeholder="Dirección"
                className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2"
                value={modal.data.direccion}
                onChange={(e) =>
                  setModal({ ...modal, data: { ...modal.data!, direccion: e.target.value } })
                }
              />

              <input
                type="number"
                placeholder="Cantidad de canchas"
                className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2"
                value={modal.data.canchas}
                onChange={(e) =>
                  setModal({ ...modal, data: { ...modal.data!, canchas: Number(e.target.value) } })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModal({ open: false, modo: "add", data: null })}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancelar
              </button>

              <button
                onClick={guardarClub}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
