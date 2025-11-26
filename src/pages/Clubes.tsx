import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function Clubes() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-700">Listado de Clubes</h1>
        <p className="mt-4 text-gray-600">Aquí se mostrarán los clubes disponibles (Próximamente).</p>
        <Link to="/home" className="mt-6 inline-block text-blue-500 hover:underline">
          ← Volver al Home
        </Link>
      </div>
      <Footer />
    </div>
  )
}