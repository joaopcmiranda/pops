import { useEffect, useState, ReactNode, useCallback, createContext } from 'react'
import { TOKEN_KEY, USER_KEY } from '@/lib/auth-config'
import { userApiClient } from '@/lib/api-client'

// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const savedUser = localStorage.getItem(USER_KEY)

      if (token && savedUser) {
        try {
          // Verify token is still valid using api-client
          const apiClient = userApiClient()
          const healthCheck = await apiClient.health()

          if (healthCheck.status === 'healthy') {
            // Token is valid, restore user from localStorage
            setUser(JSON.parse(savedUser))
          } else {
            // Service unavailable, clear storage
            clearAuthStorage()
          }
        } catch (err) {
          // Token invalid or service error, clear storage
          console.error('Token validation failed:', err)
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

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null)
      setIsLoading(true)

      // TODO: Implement login through @pops/api-client when auth endpoints are available
      // For now, we'll use a mock implementation

      // Mock successful login - replace with actual api-client call
      const mockUserData = {
        id: 'user-1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const mockToken = 'mock-jwt-token'

      // Store in state and localStorage
      setUser(mockUserData)
      localStorage.setItem(TOKEN_KEY, mockToken)
      localStorage.setItem(USER_KEY, JSON.stringify(mockUserData))
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

      // TODO: Implement registration through @pops/api-client when auth endpoints are available
      // For now, we'll use a mock implementation

      // Mock successful registration - replace with actual api-client call
      const mockUserData = {
        id: 'user-' + Date.now(),
        email: credentials.email,
        name: credentials.name || credentials.email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const mockToken = 'mock-jwt-token-' + Date.now()

      // Store in state and localStorage
      setUser(mockUserData)
      localStorage.setItem(TOKEN_KEY, mockToken)
      localStorage.setItem(USER_KEY, JSON.stringify(mockUserData))
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
