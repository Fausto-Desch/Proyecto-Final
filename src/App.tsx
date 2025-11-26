import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Clubes } from './pages/Clubes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir automáticamente la raíz al Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Tus rutas actuales */}
        <Route path="/home" element={<Home />} />
        <Route path="/clubes" element={<Clubes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;