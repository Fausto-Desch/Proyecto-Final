import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AuthenticatedRoute from '../../components/AuthenticatedRoute'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

const MockComponent = () => <div>Contenido autenticado</div>

describe('AuthenticatedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería redirigir a /login si no está autenticado', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Página de login</div>} />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <MockComponent />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('debería mostrar el contenido si está autenticado', () => {
    mockLocalStorage.getItem.mockReturnValue('fake-token-123')

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <MockComponent />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Contenido autenticado')).toBeInTheDocument()
  })

  it('debería verificar el token en localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('fake-token-123')

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <MockComponent />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token')
  })
})