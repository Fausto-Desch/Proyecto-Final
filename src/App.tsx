import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import { HomeAdmin } from "./pages/HomeAdmin";
import  HomeUser  from "./pages/HomeUser";
import { Clubes } from "./pages/ClubesAdmin";
import  ClubesUsuario  from "./pages/ClubesUsuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path="/home-admin"
          element={
            <AuthenticatedRoute>
              <HomeAdmin />
            </AuthenticatedRoute>
          }
        />

        {/* Usuarios */}
        <Route
          path="/home-user"
          element={
            <AuthenticatedRoute>
              <HomeUser />
            </AuthenticatedRoute>
          }
        />

        {/* Clubes ADMIN */}
        <Route
          path="/clubes"
          element={
            <ProtectedRoute allowedRole="admin">
              <Clubes />
            </ProtectedRoute>
          }
        />

        {/* Clubes USUARIO */}
        <Route
          path="/clubes-usuario"
          element={
            <AuthenticatedRoute>
              <ClubesUsuario />
            </AuthenticatedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export default App