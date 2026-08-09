import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.jsx'

/**
 * Convenience accessor for the theme context.
 * Throws a helpful error if used outside <ThemeProvider>.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a <ThemeProvider>')
  return context
}

export default useTheme
