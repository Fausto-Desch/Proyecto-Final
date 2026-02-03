import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../../pages/LoginPage'

// Mock de authApi
vi.mock('../../api/authApi', () => ({
  authApi: {
    login: vi.fn(),
    saveUserData: vi.fn(),
    getToken: vi.fn(() => null),
  }
}))

// Importar el mocked authApi
import { authApi } from '../../api/authApi'
import type { LoginResponse } from '../../api/authApi'

// Mock de useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock de localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería mostrar el formulario de login', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    // CORRECCIÓN: Usar placeholder en lugar de label
    expect(screen.getByPlaceholderText(/ejemplo@correo.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar al sistema/i })).toBeInTheDocument()
  })

  it('debería enviar el formulario con datos correctos', async () => {
    const mockResponse: LoginResponse = {
      ok: true,
      token: 'fake-jwt-token',
      message: 'Inicio de sesión correcto',
      usuario: { id: 1, email: 'test@test.com', rol: 'user', nombre: 'Test User' }
    }
    vi.mocked(authApi.login).mockResolvedValue(mockResponse)

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
      target: { value: 'user@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'user123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar al sistema/i }))

    await waitFor(() => {
      expect(vi.mocked(authApi.login)).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'user123'
      })
    })
  })

  it('debería mostrar error en credenciales incorrectas', async () => {
    vi.mocked(authApi.login).mockRejectedValue(new Error('Credenciales inválidas'))

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
      target: { value: 'wrong@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'wrong' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar al sistema/i }))

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument()
    })
  })

  it('debería guardar token y redirigir en login exitoso', async () => {
    const mockResponse: LoginResponse = {
      ok: true,
      token: 'fake-jwt-token',
      message: 'Inicio de sesión correcto',
      usuario: { id: 1, email: 'admin@test.com', rol: 'admin', nombre: 'Admin' }
    }
    vi.mocked(authApi.login).mockResolvedValue(mockResponse)

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
      target: { value: 'admin@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'admin123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar al sistema/i }))

    await waitFor(() => {
      expect(vi.mocked(authApi.saveUserData)).toHaveBeenCalledWith(mockResponse)
      expect(mockNavigate).toHaveBeenCalledWith('/home')
    })
  })
})