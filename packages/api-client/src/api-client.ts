import { HttpClient, type HttpClientConfig } from './http-client'
import { TripClient } from './trip-client'
import { ItineraryClient } from './itinerary-client'
import { ContentClient } from './content-client'
import { UserClient } from './user-client'
import { getAppUrl, type PopsAppId } from './domains'
import type {
  CrossDomainResponse,
  CrossDomainRequestOptions,
  CrossDomainEvent,
  AppStatus,
  PopsNotification,
  WebSocketConfig,
} from './cross-domain-types'
import type { HealthCheck } from '@pops/types'

export interface ApiClientConfig extends HttpClientConfig {
  userId?: string
  authToken?: string
}

export class ApiClient {
  private httpClient: HttpClient
  private wsConnections = new Map<PopsAppId, WebSocket>()
  private eventListeners = new Map<string, Set<(event: CrossDomainEvent) => void>>()
  private requestCache = new Map<string, { data: unknown; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

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

  // Cross-domain API methods

  /**
   * Fetches data from a specific POps application
   *
   * @param app - Target POps application
   * @param endpoint - API endpoint path (should start with /api)
   * @param options - Request configuration options
   * @returns Promise resolving to the API response
   */
  async fetchFromApp<T = unknown>(
    app: PopsAppId,
    endpoint: string,
    options: CrossDomainRequestOptions = {}
  ): Promise<CrossDomainResponse<T>> {
    const { method = 'GET', headers = {}, body, timeout = 10000, credentials = true } = options

    // Generate cache key for GET requests
    const cacheKey = method === 'GET' ? `${app}${endpoint}` : null

    // Check cache for GET requests
    if (cacheKey && this.requestCache.has(cacheKey)) {
      const cached = this.requestCache.get(cacheKey)!
      if (Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.data as CrossDomainResponse<T>
      }
    }

    const url = getAppUrl(app, endpoint)
    const controller = new AbortController()

    // Set up timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
        credentials: credentials ? 'include' : 'omit',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: CrossDomainResponse<T> = await response.json()

      // Cache successful GET responses
      if (cacheKey && data.success) {
        this.requestCache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        })
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request to ${app} timed out`)
        }
        throw new Error(`Failed to fetch from ${app}: ${error.message}`)
      }

      throw new Error(`Unknown error fetching from ${app}`)
    }
  }

  /**
   * Checks the health status of a specific POps app
   *
   * @param app - Target POps application
   * @returns Promise resolving to the app's health status
   */
  async checkAppHealth(app: PopsAppId): Promise<AppStatus> {
    const startTime = Date.now()

    try {
      const response = await this.fetchFromApp(app, '/api/health', {
        timeout: 5000,
      })

      const responseTime = Date.now() - startTime

      return {
        status: response.success ? 'online' : 'degraded',
        lastCheck: new Date().toISOString(),
        responseTime,
      }
    } catch {
      return {
        status: 'offline',
        lastCheck: new Date().toISOString(),
      }
    }
  }

  /**
   * Fetches notifications from all POps apps
   *
   * @param includeRead - Whether to include read notifications
   * @returns Promise resolving to array of notifications
   */
  async fetchAllNotifications(includeRead = false): Promise<PopsNotification[]> {
    const apps: PopsAppId[] = ['travel', 'money', 'events', 'documents']
    const allNotifications: PopsNotification[] = []

    await Promise.allSettled(
      apps.map(async app => {
        try {
          const response = await this.fetchFromApp<PopsNotification[]>(
            app,
            `/api/notifications${includeRead ? '?include_read=true' : ''}`,
            {
              timeout: 3000,
            }
          )

          if (response.success && response.data) {
            allNotifications.push(...response.data)
          }
        } catch (error) {
          console.warn(`Failed to fetch notifications from ${app}:`, error)
        }
      })
    )

    // Sort by timestamp (newest first)
    return allNotifications.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  /**
   * Subscribes to real-time updates from a specific POps app
   *
   * @param app - Target POps application
   * @param callback - Function to call when events are received
   * @param config - WebSocket configuration
   * @returns Function to unsubscribe
   */
  subscribeToApp(
    app: PopsAppId,
    callback: (event: CrossDomainEvent) => void,
    config: WebSocketConfig = {}
  ): () => void {
    // WebSocket configuration available for future reconnection logic
    const { maxReconnectAttempts = 5, reconnectDelay = 1000, heartbeatInterval = 30000 } = config

    // Avoid unused variable warnings
    void maxReconnectAttempts
    void reconnectDelay
    void heartbeatInterval

    if (!this.eventListeners.has(app)) {
      this.eventListeners.set(app, new Set())
    }
    this.eventListeners.get(app)!.add(callback)

    // Create WebSocket connection if not exists
    if (!this.wsConnections.has(app)) {
      const wsUrl = getAppUrl(app, '/api/ws').replace(/^http/, 'ws')
      const ws = new WebSocket(wsUrl)

      ws.onmessage = event => {
        try {
          const data: CrossDomainEvent = JSON.parse(event.data)
          const listeners = this.eventListeners.get(app)
          if (listeners) {
            listeners.forEach(listener => listener(data))
          }
        } catch (error) {
          console.error(`Error parsing WebSocket message from ${app}:`, error)
        }
      }

      ws.onerror = error => {
        console.error(`WebSocket error for ${app}:`, error)
      }

      ws.onclose = () => {
        this.wsConnections.delete(app)
        // Implement reconnection logic here if needed
      }

      this.wsConnections.set(app, ws)
    }

    // Return unsubscribe function
    return () => {
      const listeners = this.eventListeners.get(app)
      if (listeners) {
        listeners.delete(callback)
        if (listeners.size === 0) {
          // Close WebSocket if no more listeners
          const ws = this.wsConnections.get(app)
          if (ws) {
            ws.close()
            this.wsConnections.delete(app)
          }
          this.eventListeners.delete(app)
        }
      }
    }
  }

  /**
   * Clears the request cache
   */
  clearCache(): void {
    this.requestCache.clear()
  }

  /**
   * Cleanup all connections and listeners
   */
  destroy(): void {
    // Close all WebSocket connections
    this.wsConnections.forEach(ws => ws.close())
    this.wsConnections.clear()
    this.eventListeners.clear()
    this.requestCache.clear()
  }
}
