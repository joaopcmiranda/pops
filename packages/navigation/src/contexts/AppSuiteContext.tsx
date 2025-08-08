/**
 * @fileoverview App Suite Context for managing shared state across POps applications
 *
 * This context provides shared state management for authentication, notifications,
 * app statuses, and cross-domain communication across all POps applications.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getCurrentApp, navigateToApp, type PopsAppId } from '../config/domains'
import {
  ApiClient,
  type CrossDomainEvent,
  type AppStatus,
  type PopsNotification,
} from '@pops/api-client'
import type { PopsUser, NavigationState, AuthState } from '../types'

// Create a shared API client for navigation context
const navigationApiClient = new ApiClient({ baseUrl: 'http://localhost:4000' }) // Hub app for context

/**
 * App Suite Context value interface
 */
interface AppSuiteContextValue {
  // Navigation state
  navigationState: NavigationState

  // Authentication
  authState: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>

  // App navigation
  switchToApp: (app: PopsAppId, path?: string) => void
  getCurrentApp: () => PopsAppId | null

  // Notifications
  notifications: PopsNotification[]
  unreadCount: number
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  refreshNotifications: () => Promise<void>

  // App health monitoring
  appStatuses: Partial<Record<PopsAppId, AppStatus>>
  refreshAppStatuses: () => Promise<void>
  isAppOnline: (app: PopsAppId) => boolean

  // Real-time updates
  subscribeToUpdates: (callback: (event: CrossDomainEvent) => void) => () => void

  // Utility functions
  isLoading: boolean
  error: string | null
  clearError: () => void
}

/**
 * Props for AppSuiteProvider component
 */
interface AppSuiteProviderProps {
  /** Child components */
  children: React.ReactNode
  /** Current POps application */
  currentApp: PopsAppId
  /** Initial authentication state */
  initialAuthState?: Partial<AuthState>
}

const AppSuiteContext = createContext<AppSuiteContextValue | null>(null)

/**
 * App Suite Context Provider
 *
 * Provides shared state management across all POps applications.
 * Handles authentication, notifications, app health, and cross-domain communication.
 *
 * @param props - Provider props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AppSuiteProvider currentApp="travel">
 *       <TravelApp />
 *     </AppSuiteProvider>
 *   )
 * }
 * ```
 */
export function AppSuiteProvider({
  children,
  currentApp: _currentApp,
  initialAuthState = {},
}: AppSuiteProviderProps) {
  // Core state
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    expiresAt: null,
    refreshToken: null,
    ...initialAuthState,
  })

  // Navigation state
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentApp: getCurrentApp(),
    currentUser: authState.user,
    notifications: [],
    appStatuses: {},
    history: [],
  })

  // Notifications
  const [notifications, setNotifications] = useState<PopsNotification[]>([])

  // App statuses
  const [appStatuses, setAppStatuses] = useState<Partial<Record<PopsAppId, AppStatus>>>({})

  /**
   * Initialize the context on mount
   */
  useEffect(() => {
    const initializeContext = async () => {
      try {
        setIsLoading(true)

        // Check authentication status
        await refreshAuth()

        // Skip notifications and health checks if in development without backend services
        const isDevelopment = process.env.NODE_ENV === 'development'
        if (!isDevelopment) {
          // Load initial notifications
          await refreshNotifications()

          // Check app health statuses
          await refreshAppStatuses()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Initialization failed')
      } finally {
        setIsLoading(false)
      }
    }

    initializeContext()
  }, [])

  /**
   * Update navigation state when auth or other state changes
   */
  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      currentApp: getCurrentApp(),
      currentUser: authState.user,
      notifications,
      appStatuses,
    }))
  }, [authState.user, notifications, appStatuses])

  /**
   * Login function
   */
  const login = useCallback(async (email: string, _password: string): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      // For now, use mock authentication
      // In production, this would make a request to accounts.mypops.io
      const mockUser: PopsUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        preferences: {
          theme: 'system',
          locale: 'en-US',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          notifications: {
            push: true,
            email: true,
            inApp: true,
            frequency: 'immediate',
          },
        },
        lastActive: new Date().toISOString(),
      }

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        refreshToken: 'mock-refresh-token',
      })

      // Store in localStorage for persistence
      localStorage.setItem(
        'pops_auth',
        JSON.stringify({
          user: mockUser,
          token: 'mock-jwt-token',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        })
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Logout function
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)

      // Clear local storage
      localStorage.removeItem('pops_auth')

      // Reset auth state
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        expiresAt: null,
        refreshToken: null,
      })

      // Clear notifications
      setNotifications([])

      // Navigate to accounts app for re-authentication
      navigateToApp('accounts', '/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Refresh authentication from stored state
   */
  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      const stored = localStorage.getItem('pops_auth')
      if (!stored) return

      const parsed = JSON.parse(stored)
      const expiresAt = new Date(parsed.expiresAt)

      // Check if token is still valid
      if (expiresAt > new Date()) {
        setAuthState({
          isAuthenticated: true,
          user: parsed.user,
          token: parsed.token,
          expiresAt: parsed.expiresAt,
          refreshToken: null,
        })
      } else {
        // Token expired, clear storage
        localStorage.removeItem('pops_auth')
      }
    } catch (err) {
      console.error('Error refreshing auth:', err)
      localStorage.removeItem('pops_auth')
    }
  }, [])

  /**
   * Switch to a different POps application
   */
  const switchToApp = useCallback((app: PopsAppId, path = '/'): void => {
    // Add to navigation history
    setNavigationState(prev => ({
      ...prev,
      history: [
        {
          app,
          path,
          title: `${app} - ${path}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.history.slice(0, 9), // Keep last 10 items
      ],
    }))

    // Navigate to the app
    navigateToApp(app, path)
  }, [])

  /**
   * Refresh notifications from all apps
   */
  const refreshNotifications = useCallback(async (): Promise<void> => {
    try {
      const allNotifications = await navigationApiClient.fetchAllNotifications(false)
      setNotifications(allNotifications)
    } catch (err) {
      console.error('Error refreshing notifications:', err)
    }
  }, [])

  /**
   * Mark notification as read
   */
  const markNotificationAsRead = useCallback((id: string): void => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }, [])

  /**
   * Clear all notifications
   */
  const clearAllNotifications = useCallback((): void => {
    setNotifications([])
  }, [])

  /**
   * Refresh app health statuses
   */
  const refreshAppStatuses = useCallback(async (): Promise<void> => {
    try {
      const apps: PopsAppId[] = ['hub', 'travel', 'money', 'accounts']
      const statusChecks = await Promise.allSettled(
        apps.map(app => navigationApiClient.checkAppHealth(app))
      )

      const newStatuses: Partial<Record<PopsAppId, AppStatus>> = {}
      statusChecks.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          newStatuses[apps[index]] = result.value
        } else {
          newStatuses[apps[index]] = {
            status: 'offline',
            lastCheck: new Date().toISOString(),
          }
        }
      })

      setAppStatuses(newStatuses)
    } catch (err) {
      console.error('Error refreshing app statuses:', err)
    }
  }, [])

  /**
   * Check if a specific app is online
   */
  const isAppOnline = useCallback(
    (app: PopsAppId): boolean => {
      return appStatuses[app]?.status === 'online'
    },
    [appStatuses]
  )

  /**
   * Subscribe to real-time updates
   */
  const subscribeToUpdates = useCallback(
    (callback: (event: CrossDomainEvent) => void): (() => void) => {
      // Subscribe to updates from key apps
      const unsubscribeCallbacks: (() => void)[] = []

      const keyApps: PopsAppId[] = ['travel', 'money', 'events']
      keyApps.forEach(app => {
        const unsubscribe = navigationApiClient.subscribeToApp(app, callback)
        unsubscribeCallbacks.push(unsubscribe)
      })

      return () => {
        unsubscribeCallbacks.forEach(unsubscribe => unsubscribe())
      }
    },
    []
  )

  /**
   * Clear error state
   */
  const clearError = useCallback((): void => {
    setError(null)
  }, [])

  /**
   * Calculated unread notification count
   */
  const unreadCount = notifications.filter(n => !n.read).length

  const contextValue: AppSuiteContextValue = {
    navigationState,
    authState,
    login,
    logout,
    refreshAuth,
    switchToApp,
    getCurrentApp,
    notifications,
    unreadCount,
    markNotificationAsRead,
    clearAllNotifications,
    refreshNotifications,
    appStatuses,
    refreshAppStatuses,
    isAppOnline,
    subscribeToUpdates,
    isLoading,
    error,
    clearError,
  }

  return <AppSuiteContext.Provider value={contextValue}>{children}</AppSuiteContext.Provider>
}

/**
 * Hook to access App Suite Context
 *
 * @returns App Suite context value
 * @throws Error if used outside AppSuiteProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentUser, switchToApp, notifications } = useAppSuite()
 *
 *   return (
 *     <div>
 *       <p>Welcome {currentUser?.name}</p>
 *       <p>You have {notifications.length} notifications</p>
 *       <button onClick={() => switchToApp('money')}>
 *         Go to Money Manager
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useAppSuite(): AppSuiteContextValue {
  const context = useContext(AppSuiteContext)
  if (!context) {
    throw new Error('useAppSuite must be used within an AppSuiteProvider')
  }
  return context
}
