import { useEffect, useState, ReactNode, useCallback } from 'react'
import { TOKEN_KEY, USER_KEY, API_BASE_URL } from '@/lib/auth-config'
import {
  AuthContext,
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthContextType,
} from './AuthContextType'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const savedUser = localStorage.getItem(USER_KEY)

      if (token && savedUser) {
        // Verify token is still valid
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setUser({
              ...result.data,
              createdAt: new Date(result.data.createdAt),
              updatedAt: new Date(result.data.updatedAt),
            })
          } else {
            // Token invalid, clear storage
            clearAuthStorage()
          }
        } else {
          // Token invalid, clear storage
          clearAuthStorage()
        }
      }
    } catch (err) {
      console.error('Auth initialization failed:', err)
      clearAuthStorage()
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Login failed')
      }

      if (result.success) {
        const { user: userData, tokens } = result.data

        // Convert date strings to Date objects
        const userWithDates = {
          ...userData,
          createdAt: new Date(userData.createdAt),
          updatedAt: new Date(userData.updatedAt),
        }

        // Store in state and localStorage
        setUser(userWithDates)
        localStorage.setItem(TOKEN_KEY, tokens.accessToken)
        localStorage.setItem(USER_KEY, JSON.stringify(userWithDates))
      } else {
        throw new Error(result.error || 'Login failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      if (result.success) {
        const { user: userData, tokens } = result.data

        // Convert date strings to Date objects
        const userWithDates = {
          ...userData,
          createdAt: new Date(userData.createdAt),
          updatedAt: new Date(userData.updatedAt),
        }

        // Store in state and localStorage
        setUser(userWithDates)
        localStorage.setItem(TOKEN_KEY, tokens.accessToken)
        localStorage.setItem(USER_KEY, JSON.stringify(userWithDates))
      } else {
        throw new Error(result.error || 'Registration failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
    clearAuthStorage()
  }

  const clearError = () => {
    setError(null)
  }

  const clearAuthStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
