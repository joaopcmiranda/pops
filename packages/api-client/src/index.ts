// Main API client
export { ApiClient, type ApiClientConfig } from './api-client.js'

// HTTP client (for advanced usage)
export { HttpClient, HttpClientError, type HttpClientConfig } from './http-client.js'

// Individual clients (for modular usage)
export { TripClient } from './trip-client.js'
export { ItineraryClient } from './itinerary-client.js'
export { ContentClient } from './content-client.js'
export { UserClient } from './user-client.js'

// Re-export shared contracts for convenience
export * from '@pops/shared-contracts'
