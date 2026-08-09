import { useCallback, useState } from 'react'

/**
 * useLocalStorage
 * ---------------------------------------------------------------------------
 * useState that survives a page reload. Fails silently when storage is
 * unavailable (Safari private mode, blocked cookies) so the UI keeps working.
 *
 * @param {string} key      storage key
 * @param {*} initialValue  value used when nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      setStoredValue((current) => {
        const next = value instanceof Function ? value(current) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* ignore quota / private-mode errors */
        }
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue]
}

export default useLocalStorage
