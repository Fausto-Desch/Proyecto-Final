import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'

// Mock de localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

const MockComponent = () => <div>Contenido protegido</div>
const MockHome = () => <div>Página principal</div>

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería redirigir a /login si no hay token', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Página de login</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRole="user">
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('debería mostrar el contenido si el token y rol coinciden', () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'fake-token-123'
      if (key === 'role') return 'user'
      return null
    })

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRole="user">
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('debería redirigir si el rol no coincide', () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'fake-token-123'
      if (key === 'role') return 'user' // Rol user, pero se requiere admin
      return null
    })

    // IMPORTANTE: ProtectedRoute redirige a "/home-user" cuando el rol es user pero se requiere admin
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/home-user" element={<MockHome />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRole="admin">
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Página principal')).toBeInTheDocument()
  })

  it('debería manejar múltiples roles permitidos', () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'fake-token-123'
      if (key === 'role') return 'admin'
      return null
    })

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRole="admin">
                <MockComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})