//Solo para Administradores
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

export default function AdminPage() {
  const navigate = useNavigate();
  const userName = authApi.getUserName();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administrador</h1>
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Bienvenido, {userName || 'Administrador'}
          </h2>
        </div>
      </div>
    </div>
  );
}

