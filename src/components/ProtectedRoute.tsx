import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: 'admin' | 'user';
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') as 'admin' | 'user' | null;

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no coincide, redirigir a la ruta correcta según el rol
  if (role !== allowedRole) {
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (role === 'user') {
      return <Navigate to="/user" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
