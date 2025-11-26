import { Link } from 'react-router-dom';

export function Clubes() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700">Listado de Clubes</h1>
      <p className="mt-4 text-gray-600">Aquí se mostrarán los clubes disponibles (Próximamente).</p>
      <Link to="/home" className="mt-6 inline-block text-blue-500 hover:underline">
        ← Volver al Home
      </Link>
    </div>
  )
}