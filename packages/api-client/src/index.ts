// Main API client
export { ApiClient, type ApiClientConfig } from './api-client'

// HTTP client (for advanced usage)
export { HttpClient, HttpClientError, type HttpClientConfig } from './http-client'

// Individual clients (for modular usage)
export { TripClient } from './trip-client'
export { ItineraryClient } from './itinerary-client'
export { ContentClient } from './content-client'
export { UserClient } from './user-client'

// Re-export types for convenience
export * from '@pops/types'
