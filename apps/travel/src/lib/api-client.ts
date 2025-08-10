import { ApiClient } from '@pops/api-client'
import { getAuthToken } from '@/lib/auth-config'

// Environment-based API Configuration
const getApiBaseUrls = () => {
  // Check if running in production or with environment variables
  const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost'

  if (isDevelopment) {
    return {
      users: import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:8011',
      trips: import.meta.env.VITE_TRIP_SERVICE_URL || 'http://localhost:8030',
      itinerary: import.meta.env.VITE_ITINERARY_SERVICE_URL || 'http://localhost:8031',
    }
  }

  // Production URLs (will be set by deployment pipeline)
  return {
    users: import.meta.env.VITE_USER_SERVICE_URL || '/api/users',
    trips: import.meta.env.VITE_TRIP_SERVICE_URL || '/api/trips',
    itinerary: import.meta.env.VITE_ITINERARY_SERVICE_URL || '/api/itinerary',
  }
}

const API_BASE_URLS = getApiBaseUrls()

// Helper to get current user ID from auth context
const getCurrentUserId = (): string | null => {
  try {
    const userData = localStorage.getItem('auth_user')
    if (userData) {
      const user = JSON.parse(userData)
      return user.id || null
    }
  } catch (error) {
    console.error('Error getting user ID from auth:', error)
  }
  return null
}

// Helper to get refresh token
const getRefreshToken = (): string | null => {
  return localStorage.getItem('auth_refresh_token')
}

// Helper to refresh access token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      return null
    }

    const response = await fetch(`${API_BASE_URLS.users}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      // Refresh token is invalid, clear storage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_refresh_token')
      localStorage.removeItem('auth_user')

      // Dispatch event for AuthContext to handle logout
      window.dispatchEvent(new CustomEvent('auth:token-refresh-failed'))
      return null
    }

    const data = await response.json()
    if (data.success && data.data?.tokens) {
      // Update stored tokens
      localStorage.setItem('auth_token', data.data.tokens.accessToken)
      localStorage.setItem('auth_refresh_token', data.data.tokens.refreshToken)
      return data.data.tokens.accessToken
    }

    return null
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

// Enhanced error handling and retry logic
const createClientWithRetry = (baseUrl: string, retries = 3, delay = 1000) => {
  const token = getAuthToken()
  const userId = getCurrentUserId()

  const client = new ApiClient({
    baseUrl,
    timeout: 15000, // Increased timeout
    authToken: token || undefined,
    userId: userId || undefined,
  })

  // Add retry wrapper for failed requests
  const originalGet = client.getHttpClient().get.bind(client.getHttpClient())
  const originalPost = client.getHttpClient().post.bind(client.getHttpClient())
  const originalPut = client.getHttpClient().put.bind(client.getHttpClient())
  const originalDelete = client.getHttpClient().delete.bind(client.getHttpClient())

  const withRetry = async <T>(operation: () => Promise<T>, attemptCount = 0): Promise<T> => {
    try {
      return await operation()
    } catch (error: unknown) {
      const err = error as { status?: number }
      // Handle 401 errors (expired tokens) by attempting token refresh
      if (err.status === 401 && attemptCount === 0) {
        console.log('Access token expired, attempting refresh...')
        const newToken = await refreshAccessToken()

        if (newToken) {
          // Token refreshed successfully, retry the operation
          console.log('Token refreshed, retrying operation')

          // Update the current client's token
          client.getHttpClient().setAuthToken(newToken)

          // Retry the operation with new token
          return withRetry(operation, attemptCount + 1)
        }
      }

      // Only retry on certain error conditions (excluding 401 after refresh attempt)
      const shouldRetry =
        attemptCount < retries &&
        error.status !== 401 && // Don't retry 401 after refresh attempt
        (error.status === 0 || // Network error
          error.status === 408 || // Timeout
          error.status === 429 || // Rate limit
          error.status >= 500) // Server errors

      if (shouldRetry) {
        console.warn(
          `Request failed (attempt ${attemptCount + 1}/${retries + 1}), retrying in ${delay}ms...`,
          error.message
        )
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attemptCount))) // Exponential backoff
        return withRetry(operation, attemptCount + 1)
      }

      throw error
    }
  }

  // Override HTTP methods with retry logic
  client.getHttpClient().get = <T>(endpoint: string, headers?: Record<string, string>) =>
    withRetry(() => originalGet<T>(endpoint, headers))

  client.getHttpClient().post = <T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => withRetry(() => originalPost<T>(endpoint, data, headers))

  client.getHttpClient().put = <T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => withRetry(() => originalPut<T>(endpoint, data, headers))

  client.getHttpClient().delete = <T>(endpoint: string, headers?: Record<string, string>) =>
    withRetry(() => originalDelete<T>(endpoint, headers))

  return client
}

// Service-specific API clients with retry logic
export const userApiClient = () => createClientWithRetry(API_BASE_URLS.users)

export const tripApiClient = () => createClientWithRetry(API_BASE_URLS.trips)

export const itineraryApiClient = () => createClientWithRetry(API_BASE_URLS.itinerary)

// Create authenticated API client (defaults to itinerary service)
export const createAuthenticatedApiClient = () => createClientWithRetry(API_BASE_URLS.itinerary)

// Default export for convenience
export const apiClient = createAuthenticatedApiClient()
