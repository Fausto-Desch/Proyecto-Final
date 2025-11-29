import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeUser from './pages/HomeUser';
import { HomeAdmin } from './pages/HomeAdmin';
import { Clubes } from './pages/ClubesAdmin';
import ClubesUsuarios from './pages/ClubesUsuarios';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';

// Componentes nuevos
import { SplashScreen } from './components/layout/SplashScreen';
import { ThemeProvider, useTheme } from "./context/ThemaContext"; 

import { CanchasAdmin } from './pages/CanchasAdmin'; 
import CanchasUsuario from './pages/CanchasUsuario';

function AppContent() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      
      {/* Mostramos el Splash Screen si el estado es true */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* RUTAS DE ADMINISTRADOR */}
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
            <Route
              path="/clubes/:clubId/canchas"
              element={
                <ProtectedRoute allowedRole="admin">
                  <CanchasAdmin />
                </ProtectedRoute>
              }
            />

            {/* RUTAS DE USUARIO */}
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
            <Route
              path="/clubes-usuario/:clubId/canchas"
              element={
                <ProtectedRoute allowedRole="user">
                  <CanchasUsuario />
                </ProtectedRoute>
              }
            />

            {/* RUTA DE REDIRECCIÓN */}
            <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <HomeRedirect />
                </AuthenticatedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

function HomeRedirect() {
  const role = localStorage.getItem('role');

  if (role === 'admin') return <Navigate to="/home-admin" replace />;
  if (role === 'user') return <Navigate to="/home-user" replace />;
  
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}