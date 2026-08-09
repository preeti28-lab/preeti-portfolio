import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const STORAGE_KEY = 'portfolio-theme'

/**
 * ThemeContext
 * ---------------------------------------------------------------------------
 * Holds the active theme ('light' | 'dark') and persists it to localStorage.
 * The initial value is resolved synchronously so React agrees with the inline
 * bootstrap script in index.html (which prevents a flash of the wrong theme).
 */
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
})

/** Reads the stored theme, falling back to the OS preference. */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can throw in private mode — ignore and use the OS setting.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  // Apply the theme to <html> and persist it whenever it changes.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    // Tells the browser to theme native UI (form controls, scrollbars).
    root.style.colorScheme = theme
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — the theme still works for this session */
    }
  }, [theme])

  // Follow the OS preference only while the user has not made an explicit
  // choice in this browser.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* ignore */
      }
      setThemeState(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setThemeState(event.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((next) => {
    if (next === 'light' || next === 'dark') setThemeState(next)
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme, isDark: theme === 'dark' }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
