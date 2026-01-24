import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ArrowLeft, Calendar, Clock, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { turnoApi } from "../api/turnoApi";
import { type Turno, type Horario } from "../api/clubApi";

export default function HorariosAdmin() {
  const { turnoId } = useParams<{ turnoId: string }>();
  const [turno, setTurno] = useState<Turno | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [nuevo, setNuevo] = useState({ fecha: "", hora: "" });

  const fetchTurno = async () => {
    if (!turnoId) return;
    try {
        // Asumiendo que existe un endpoint para obtener el Turno con sus horarios
        // Si no existe getTurno en backend, habría que buscarlo dentro del Club->Cancha->Turno,
        // pero lo ideal es tener getById en Turno.
        const data = await turnoApi.getById(turnoId);
        setTurno(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurno();
  }, [turnoId]);

  const agregarHorario = async () => {
    if (!nuevo.fecha || !nuevo.hora || !turnoId) return;
    
    // Combinar fecha y hora para crear un Date object ISO si el backend lo requiere, 
    // pero tu modelo dice `diaHorario: Date` y `horario: string`.
    const horarioData: Horario = {
        id: crypto.randomUUID(),
        disponibilidad: true, // Disponible por defecto al crear
        horario: nuevo.hora,
        diaHorario: new Date(nuevo.fecha).toISOString() 
    };

    try {
        await turnoApi.addHorario(turnoId, horarioData);
        setNuevo({ fecha: "", hora: "" });
        fetchTurno();
    } catch (error) {
        alert("Error al agregar horario: " + error);
    }
  };

  const eliminarHorario = async (horarioId: string) => {
      if(!turnoId) return;
      try {
          await turnoApi.deleteHorario(turnoId, horarioId);
          fetchTurno();
      } catch (error) {
          alert("Error eliminando horario: " + error);
      }
  };

  if (loading) return <div className="p-10 text-center">Cargando horarios...</div>;
  if (!turno) return <div className="p-10 text-center">Turno no encontrado</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Horarios Disponibles
        </h1>
        <p className="text-gray-500 mb-8">Administrando: {turno.descripcionTurno} (${turno.costo})</p>

        {/* Formulario */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8 flex flex-wrap gap-4 items-end border dark:border-gray-700">
            <div>
                <label className="block text-sm text-gray-500 mb-1">Fecha</label>
                <input type="date" value={nuevo.fecha} onChange={e => setNuevo({...nuevo, fecha: e.target.value})} className="input-std" />
            </div>
            <div>
                <label className="block text-sm text-gray-500 mb-1">Hora Inicio</label>
                <input type="time" value={nuevo.hora} onChange={e => setNuevo({...nuevo, hora: e.target.value})} className="input-std" />
            </div>
            <button onClick={agregarHorario} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 h-10 mb-0.5">
                Generar Horario
            </button>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {turno.horarios?.map((h) => (
            <div key={h.id} className={`p-5 rounded-xl border flex flex-col gap-3 shadow-sm transition ${h.disponibilidad ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                        <Calendar size={18} className="text-blue-500"/>
                        {new Date(h.diaHorario).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={16} /> {h.horario}
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${h.disponibilidad ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {h.disponibilidad ? 'DISPONIBLE' : 'RESERVADO'}
                    </span>
                    <button onClick={() => eliminarHorario(h.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
          ))}
          {(!turno.horarios || turno.horarios.length === 0) && (
              <p className="col-span-full text-center text-gray-400 py-10">No hay horarios generados para este turno.</p>
          )}
        </div>

        <div className="mt-10">
            {/* Nota: Usamos window.history.back() o un Link genérico si no tenemos el ID del club a mano facilmente */}
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft size={18} /> Volver
            </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}