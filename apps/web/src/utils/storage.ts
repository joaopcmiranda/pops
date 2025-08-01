// Browser-specific storage utilities
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silent fail
    }
  },
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Silent fail
    }
  },
}