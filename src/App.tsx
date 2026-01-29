import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; 

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeUser from './pages/HomeUser';
import { HomeAdmin } from './pages/HomeAdmin';
import { HomeOwner } from './pages/HomeOwner'; 
import { Clubes } from './pages/ClubesAdmin';
import ClubesUsuario from './pages/ClubesUsuario';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';

import Presentacion from './pages/Presentacion';

// Theme
import { SplashScreen } from './components/layout/SplashScreen';
import { ThemeProvider, useTheme } from "./context/ThemaContext"; 

import { CanchasAdmin } from './pages/CanchasAdmin'; 
import CanchasUsuario from './pages/CanchasUsuario';
import HorariosUsuario from './pages/HorariosUsuario';
import HorariosAdmin from './pages/HorariosAdmin';

function AppContent() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <BrowserRouter>
          <Routes>

            {/* presentacion */}
            <Route path="/" element={<Navigate to="/presentacion" replace />} />
            <Route path="/presentacion" element={<Presentacion />} />

            {/* auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* admin */}
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

            <Route
              path="/horarios-admin/:turnoId"
              element={
                <ProtectedRoute allowedRole="admin">
                  <HorariosAdmin />
                </ProtectedRoute>
              }
            />

            {/*dueño cancha/owner */}
            <Route
              path="/home-owner"
              element={
                <ProtectedRoute allowedRole="owner">
                  <HomeOwner />
                </ProtectedRoute>
              }
            />

            {/* usuario */}
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
                  <ClubesUsuario />
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

            <Route
              path="/horarios-usuario/:turnoId"
              element={
                <ProtectedRoute allowedRole="user">
                  <HorariosUsuario />
                </ProtectedRoute>
              }
            />

            {/* redireccion rol*/}
            <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <HomeRedirect />
                </AuthenticatedRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/presentacion" replace />} />

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
  if (role === 'owner') return <Navigate to="/home-owner" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}