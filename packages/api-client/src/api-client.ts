import { HttpClient, type HttpClientConfig } from './http-client.js'
import { TripClient } from './trip-client.js'
import { ItineraryClient } from './itinerary-client.js'
import { ContentClient } from './content-client.js'
import { UserClient } from './user-client.js'
import type { HealthCheck } from '@pops/shared-contracts'

export interface ApiClientConfig extends HttpClientConfig {
  userId?: string
  authToken?: string
}

export class ApiClient {
  private httpClient: HttpClient

  public readonly trips: TripClient
  public readonly itinerary: ItineraryClient
  public readonly content: ContentClient
  public readonly users: UserClient

  constructor(config: ApiClientConfig) {
    this.httpClient = new HttpClient(config)

    // Set initial auth if provided
    if (config.authToken) {
      this.httpClient.setAuthToken(config.authToken)
    }
    if (config.userId) {
      this.httpClient.setUserId(config.userId)
    }

    // Initialize clients
    this.trips = new TripClient(this.httpClient)
    this.itinerary = new ItineraryClient(this.httpClient)
    this.content = new ContentClient(this.httpClient)
    this.users = new UserClient(this.httpClient)
  }

  // Authentication methods
  setAuthToken(token: string): void {
    this.httpClient.setAuthToken(token)
  }

  setUserId(userId: string): void {
    this.httpClient.setUserId(userId)
  }

  clearAuth(): void {
    this.httpClient.clearAuth()
  }

  // Health check
  async health(): Promise<HealthCheck> {
    return this.httpClient.get('/health')
  }

  // Get direct access to HTTP client for custom requests
  getHttpClient(): HttpClient {
    return this.httpClient
  }
}
