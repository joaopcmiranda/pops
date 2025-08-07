import { ApiClient } from '@pops/api-client'

// Create API client for direct service communication
export const apiClient = new ApiClient({
  // TODO: Make these configurable via environment variables
  baseUrl: 'http://localhost:8030', // Direct to trip service for now
  userId: 'user-demo-1', // TODO: Get from auth context
})

// Service-specific clients for direct access
export const createServiceClients = () => {
  return {
    trips: apiClient.trips,
    itinerary: apiClient.itinerary,
    content: apiClient.content,
    users: apiClient.users,
  }
}

// Export individual clients for modular usage
export const serviceClients = createServiceClients()
