import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { Home } from './pages/Home';
import { Clubes } from './pages/Clubes';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;