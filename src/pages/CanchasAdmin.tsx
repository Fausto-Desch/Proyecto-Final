import { Link, useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { DollarSign, Trash2, Plus, ArrowLeft, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { clubApi, type Club, type Cancha } from "../api/clubApi";

interface ModalState {
  open: boolean;
  modo: "add";
  data: Cancha | null;
}

export function CanchasAdmin() {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [modal, setModal] = useState<ModalState>({ open: false, modo: "add", data: null });

  const cargarDatos = async () => {
    if (!clubId) return;
    try {
      const data = await clubApi.getById(clubId);
      setClub(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [clubId]);

  const guardarCancha = async () => {
    if (!clubId || !modal.data) return;
    try {
      await clubApi.addCancha(clubId, modal.data);
      await cargarDatos();
      setModal({ open: false, modo: "add", data: null });
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const eliminarCancha = async (canchaId: string) => {
    if (!clubId || !confirm("¿Eliminar cancha?")) return;
    try {
      await clubApi.deleteCancha(clubId, canchaId);
      await cargarDatos();
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const abrirModal = () => {
    setModal({
      open: true,
      modo: "add",
      data: {
        id: crypto.randomUUID(),
        nombreCancha: "",
        deporte: "Futbol",
        tamanio: "5vs5",
        turno: {
            id: crypto.randomUUID(),
            descripcionTurno: "Turno Estándar",
            costo: 0,
            horarios: []
        }
      }
    });
  };

  if (!club) return <div className="p-10 text-center">Cargando club...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex-1 p-10 relative">
        <button onClick={abrirModal} className="absolute top-10 right-10 bg-blue-700 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-500 flex gap-2">
            <Plus size={18} /> Nueva Cancha
        </button>

        <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Canchas de {club.nombreClub}</h1>
            <p className="text-gray-500">Gestión de pistas y turnos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.canchas?.map((cancha) => (
                <div key={cancha.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold dark:text-white">{cancha.nombreCancha}</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{cancha.deporte}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{cancha.tamanio}</p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase">Turno Base</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium dark:text-white">{cancha.turno?.descripcionTurno}</span>
                            <span className="text-green-600 font-bold flex items-center gap-1"><DollarSign size={14}/>{cancha.turno?.costo}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => navigate(`/horarios-admin/${cancha.turno.id}`)} className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-100">
                            <Clock size={16}/> Horarios
                        </button>
                        <button onClick={() => eliminarCancha(cancha.id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100">
                            <Trash2 size={16}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-10">
          <Link to="/home-admin" className="text-gray-500 hover:text-blue-500 flex items-center gap-2"><ArrowLeft size={18}/> Volver</Link>
        </div>
      </div>
      <Footer />

      {/* MODAL CANCHA */}
      {modal.open && modal.data && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Nueva Cancha</h2>
                <div className="space-y-3">
                    <input className="w-full p-2 border rounded" placeholder="Nombre Cancha" value={modal.data.nombreCancha} onChange={e => setModal({...modal, data: {...modal.data!, nombreCancha: e.target.value}})}/>
                    <div className="grid grid-cols-2 gap-2">
                        <input className="w-full p-2 border rounded" placeholder="Deporte" value={modal.data.deporte} onChange={e => setModal({...modal, data: {...modal.data!, deporte: e.target.value}})}/>
                        <input className="w-full p-2 border rounded" placeholder="Tamaño" value={modal.data.tamanio} onChange={e => setModal({...modal, data: {...modal.data!, tamanio: e.target.value}})}/>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <p className="text-sm font-bold text-blue-600 mb-2">Configuración de Turno</p>
                        <input className="w-full p-2 border rounded mb-2" placeholder="Descripción Turno" value={modal.data.turno.descripcionTurno} onChange={e => setModal({...modal, data: {...modal.data!, turno: {...modal.data!.turno, descripcionTurno: e.target.value}}})}/>
                        <input type="number" className="w-full p-2 border rounded" placeholder="Costo" value={modal.data.turno.costo} onChange={e => setModal({...modal, data: {...modal.data!, turno: {...modal.data!.turno, costo: Number(e.target.value)}}})}/>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setModal({open:false, modo:'add', data:null})} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                    <button onClick={guardarCancha} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}