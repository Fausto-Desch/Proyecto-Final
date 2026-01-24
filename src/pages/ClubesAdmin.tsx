import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Building2, MapPin, Edit, Trash2, Plus, LayoutGrid, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { clubApi, type Club } from "../api/clubApi"; // Importamos la API

interface ModalState {
  open: boolean;
  modo: "add" | "edit";
  data: Club | null;
}

export function Clubes() {
  const [clubes, setClubes] = useState<Club[]>([]); // Array vacío al inicio
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ open: false, modo: "add", data: null });

  // 1. CARGAR DATOS REALES
  const cargarClubes = async () => {
    try {
      const data = await clubApi.getAll();
      setClubes(data);
    } catch (error) {
      console.error("Error cargando clubes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClubes();
  }, []);

  // 2. GUARDAR (CREAR O EDITAR)
  const guardarClub = async () => {
    if (!modal.data) return;
    try {
      if (modal.modo === "add") {
        await clubApi.create(modal.data);
      } else {
        await clubApi.update(modal.data.id, modal.data);
      }
      await cargarClubes(); // Recargar lista
      setModal({ open: false, modo: "add", data: null });
    } catch (error) {
      alert("Error al guardar: " + error);
    }
  };

  // 3. ELIMINAR
  const eliminarClub = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este club?")) return;
    try {
      await clubApi.delete(id);
      await cargarClubes();
    } catch (error) {
      alert("Error al eliminar: " + error);
    }
  };

  // Función auxiliar para abrir modal vacío
  const abrirModalNuevo = () => {
    setModal({
      open: true,
      modo: "add",
      data: {
        id: crypto.randomUUID(), // Generamos ID en frontend (requisito de tu backend mock)
        nombreClub: "",
        direccion: "",
        telefono: "",
        gmail: "",
        valoracion: 5,
        canchas: []
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex-1 p-10 relative">
        <button onClick={abrirModalNuevo} className="absolute top-10 right-10 bg-blue-700 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-500 transition flex items-center gap-2">
          <Plus size={18} /> Añadir Club
        </button>

        <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 mb-3">
            Mis Clubes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Administra tus sedes e información de contacto.
          </p>
        </div>

        {loading ? <p className="text-center dark:text-white">Cargando datos...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubes.map((club) => (
              <div key={club.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col border border-gray-200 dark:border-gray-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="text-blue-400" size={26} />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{club.nombreClub}</h2>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <p className="flex items-center gap-2"><MapPin size={16}/> {club.direccion}</p>
                  <p className="flex items-center gap-2"><Phone size={16}/> {club.telefono}</p>
                  <p className="flex items-center gap-2"><Mail size={16}/> {club.gmail}</p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 font-bold">
                  {club.canchas?.length || 0} canchas
                </p>

                <Link to={`/clubes/${club.id}/canchas`} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl shadow hover:bg-blue-700 transition mb-4">
                  <LayoutGrid size={18} /> Gestionar Canchas
                </Link>

                <div className="flex justify-between mt-auto">
                  <button onClick={() => setModal({ open: true, modo: "edit", data: { ...club } })} className="px-3 py-1 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center gap-1 transition">
                    <Edit size={16} /> Editar
                  </button>
                  <button onClick={() => eliminarClub(club.id)} className="px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1 transition">
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      {/* MODAL (Simplificado para brevedad, asegúrate de conectar los inputs a modal.data) */}
      {modal.open && modal.data && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{modal.modo === "add" ? "Nuevo Club" : "Editar Club"}</h2>
            <div className="space-y-3">
                <input className="w-full p-2 border rounded" placeholder="Nombre" value={modal.data.nombreClub} onChange={e => setModal({...modal, data: {...modal.data!, nombreClub: e.target.value}})} />
                <input className="w-full p-2 border rounded" placeholder="Dirección" value={modal.data.direccion} onChange={e => setModal({...modal, data: {...modal.data!, direccion: e.target.value}})} />
                <input className="w-full p-2 border rounded" placeholder="Teléfono" value={modal.data.telefono} onChange={e => setModal({...modal, data: {...modal.data!, telefono: e.target.value}})} />
                <input className="w-full p-2 border rounded" placeholder="Email" value={modal.data.gmail} onChange={e => setModal({...modal, data: {...modal.data!, gmail: e.target.value}})} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setModal({open:false, modo:'add', data:null})} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                <button onClick={guardarClub} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}