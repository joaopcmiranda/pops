import { useEffect, useState, ReactNode, useCallback, createContext } from 'react'
import { TOKEN_KEY, USER_KEY } from '@/lib/auth-config'
import { userApiClient } from '@/lib/api-client'

// Storage key for refresh token
const REFRESH_TOKEN_KEY = 'auth_refresh_token'

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

export interface AuthResponse {
  user: User
  tokens: AuthTokens
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

  // Create stable logout callback
  const logoutCallback = useCallback(() => {
    logout()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()

    // Listen for token refresh failures
    const handleTokenRefreshFailed = () => {
      console.log('Token refresh failed, logging out user')
      logoutCallback()
    }

    window.addEventListener('auth:token-refresh-failed', handleTokenRefreshFailed)
    return () => {
      window.removeEventListener('auth:token-refresh-failed', handleTokenRefreshFailed)
    }
  }, [initializeAuth, logoutCallback])

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null)
      setIsLoading(true)

      // Use real authentication API
      const apiClient = userApiClient()
      const response = await apiClient.post<{
        success: boolean
        data: AuthResponse
      }>('/auth/login', credentials)

      if (!response.data?.success) {
        throw new Error('Login failed')
      }

      const { user, tokens } = response.data.data

      // Store in state and localStorage
      setUser(user)
      localStorage.setItem(TOKEN_KEY, tokens.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (err: unknown) {
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

      // Use real authentication API
      const apiClient = userApiClient()
      const response = await apiClient.post<{
        success: boolean
        data: AuthResponse
      }>('/auth/register', credentials)

      if (!response.data?.success) {
        throw new Error('Registration failed')
      }

      const { user, tokens } = response.data.data

      // Store in state and localStorage
      setUser(user)
      localStorage.setItem(TOKEN_KEY, tokens.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (err: unknown) {
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
    localStorage.removeItem(REFRESH_TOKEN_KEY)
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
