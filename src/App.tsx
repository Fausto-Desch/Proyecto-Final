import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeUser from './pages/HomeUser';
import { HomeAdmin } from './pages/HomeAdmin';
import { Clubes } from './pages/ClubesAdmin';
import ClubesUsuarios from './pages/ClubesUsuarios';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas para ADMIN */}
        <Route
          path="/home-admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <HomeAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubes"
          element={
            <ProtectedRoute allowedRole="admin">
              <Clubes />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para USER */}
        <Route
          path="/home-user"
          element={
            <ProtectedRoute allowedRole="user">
              <HomeUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubes-usuario"
          element={
            <ProtectedRoute allowedRole="user">
              <ClubesUsuarios />
            </ProtectedRoute>
          }
        />

        {/* Ruta genérica /home - redirige según rol */}
        <Route
          path="/home"
          element={
            <AuthenticatedRoute>
              <HomeRedirect />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente para redirigir /home según el rol
function HomeRedirect() {
  const role = localStorage.getItem('role');
  
  if (role === 'admin') {
    return <Navigate to="/home-admin" replace />;
  } else if (role === 'user') {
    return <Navigate to="/home-user" replace />;
  }
  
  return <Navigate to="/login" replace />;
}

export default App;