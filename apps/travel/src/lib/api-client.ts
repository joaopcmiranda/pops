import { ApiClient } from '@pops/api-client'
import { getAuthToken } from '@/lib/auth-config'

// API Configuration
const API_BASE_URLS = {
  users: 'http://localhost:8011',
  trips: 'http://localhost:8030',
  itinerary: 'http://localhost:8031',
}

// Create authenticated API client
export const createAuthenticatedApiClient = () => {
  const token = getAuthToken()

  return new ApiClient({
    baseUrl: API_BASE_URLS.itinerary, // Default to itinerary service
    timeout: 10000,
    authToken: token || undefined,
  })
}

// Service-specific API clients
export const userApiClient = () => {
  const token = getAuthToken()

  return new ApiClient({
    baseUrl: API_BASE_URLS.users,
    timeout: 10000,
    authToken: token || undefined,
  })
}

export const tripApiClient = () => {
  const token = getAuthToken()

  return new ApiClient({
    baseUrl: API_BASE_URLS.trips,
    timeout: 10000,
    authToken: token || undefined,
  })
}

export const itineraryApiClient = () => {
  const token = getAuthToken()

  return new ApiClient({
    baseUrl: API_BASE_URLS.itinerary,
    timeout: 10000,
    authToken: token || undefined,
  })
}

// Default export for convenience
export const apiClient = createAuthenticatedApiClient()
