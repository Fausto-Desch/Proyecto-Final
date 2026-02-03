import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle
      </button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería proporcionar tema por defecto (light)', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('debería cambiar de tema al hacer toggle', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const themeElement = screen.getByTestId('theme')
    const toggleButton = screen.getByTestId('toggle-theme')

    expect(themeElement).toHaveTextContent('light')
    
    fireEvent.click(toggleButton)
    expect(themeElement).toHaveTextContent('dark')
    
    fireEvent.click(toggleButton)
    expect(themeElement).toHaveTextContent('light')
  })

  it('debería mantener el estado del tema entre renders', () => {
    const { rerender } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const themeElement = screen.getByTestId('theme')
    const toggleButton = screen.getByTestId('toggle-theme')

    fireEvent.click(toggleButton)
    expect(themeElement).toHaveTextContent('dark')

    // Simular re-render
    rerender(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(themeElement).toHaveTextContent('dark')
  })
})