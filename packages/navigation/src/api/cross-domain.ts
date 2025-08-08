/**
 * @fileoverview Cross-domain API client for POps applications
 *
 * This module provides utilities for secure communication between different POps apps
 * running on separate subdomains. It handles authentication, request routing, and
 * real-time updates across the POps suite.
 */

import { getAppUrl, type PopsAppId } from '../config/domains'
import type { CrossDomainResponse, CrossDomainEvent, AppStatus, PopsNotification } from '../types'

/**
 * Configuration options for cross-domain API requests
 */
interface RequestOptions {
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** Request headers */
  headers?: Record<string, string>
  /** Request body */
  body?: unknown
  /** Request timeout in milliseconds */
  timeout?: number
  /** Whether to include credentials (cookies) */
  credentials?: boolean
}

/**
 * WebSocket connection configuration
 */
interface WebSocketConfig {
  /** Reconnection attempts */
  maxReconnectAttempts?: number
  /** Reconnection delay in milliseconds */
  reconnectDelay?: number
  /** Heartbeat interval in milliseconds */
  heartbeatInterval?: number
}

/**
 * Cross-domain API client for POps applications
 *
 * Provides secure communication between different POps apps running on subdomains.
 * Handles authentication, request routing, caching, and real-time updates.
 *
 * @example
 * ```typescript
 * const api = new CrossDomainAPI()
 *
 * // Fetch data from travel app
 * const trips = await api.fetchFromApp('travel', '/api/trips')
 *
 * // Subscribe to real-time updates
 * api.subscribeToApp('travel', (event) => {
 *   console.log('Travel app update:', event)
 * })
 * ```
 */
export class CrossDomainAPI {
  private wsConnections = new Map<PopsAppId, WebSocket>()
  private eventListeners = new Map<string, Set<(event: CrossDomainEvent) => void>>()
  private requestCache = new Map<string, { data: unknown; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  /**
   * Fetches data from a specific POps application
   *
   * @param app - Target POps application
   * @param endpoint - API endpoint path (should start with /api)
   * @param options - Request configuration options
   * @returns Promise resolving to the API response
   *
   * @throws {Error} When the request fails or returns an error response
   *
   * @example
   * ```typescript
   * const api = new CrossDomainAPI()
   * const trips = await api.fetchFromApp('travel', '/api/trips', {
   *   method: 'GET',
   *   credentials: true
   * })
   * ```
   */
  async fetchFromApp<T = unknown>(
    app: PopsAppId,
    endpoint: string,
    options: RequestOptions = {}
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
        body: body ? JSON.stringify(body) : undefined,
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
   * Subscribes to real-time updates from a specific POps application
   *
   * @param app - Target POps application
   * @param callback - Function to call when events are received
   * @param config - WebSocket configuration options
   * @returns Cleanup function to unsubscribe
   *
   * @example
   * ```typescript
   * const api = new CrossDomainAPI()
   * const unsubscribe = api.subscribeToApp('travel', (event) => {
   *   if (event.type === 'trip_updated') {
   *     console.log('Trip was updated:', event.data)
   *   }
   * })
   *
   * // Later, clean up the subscription
   * unsubscribe()
   * ```
   */
  subscribeToApp(
    app: PopsAppId,
    callback: (event: CrossDomainEvent) => void,
    config: WebSocketConfig = {}
  ): () => void {
    const { maxReconnectAttempts = 5, reconnectDelay = 1000, heartbeatInterval = 30000 } = config

    const eventKey = `${app}:*`

    // Add callback to listeners
    if (!this.eventListeners.has(eventKey)) {
      this.eventListeners.set(eventKey, new Set())
    }
    this.eventListeners.get(eventKey)!.add(callback)

    // Create WebSocket connection if it doesn't exist
    if (!this.wsConnections.has(app)) {
      this.createWebSocketConnection(app, maxReconnectAttempts, reconnectDelay, heartbeatInterval)
    }

    // Return cleanup function
    return () => {
      this.eventListeners.get(eventKey)?.delete(callback)
      if (this.eventListeners.get(eventKey)?.size === 0) {
        this.eventListeners.delete(eventKey)
        this.closeWebSocketConnection(app)
      }
    }
  }

  /**
   * Checks the health status of a specific POps application
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
   * Fetches notifications from all POps applications
   *
   * @param includeRead - Whether to include read notifications
   * @returns Promise resolving to array of notifications
   */
  async fetchAllNotifications(includeRead = false): Promise<PopsNotification[]> {
    // For now, just fetch from a few key apps that might have notifications
    const notificationApps: PopsAppId[] = ['travel', 'money', 'events']
    const notifications: PopsNotification[] = []

    await Promise.allSettled(
      notificationApps.map(async app => {
        try {
          const response = await this.fetchFromApp<PopsNotification[]>(
            app,
            `/api/notifications${includeRead ? '?include_read=true' : ''}`
          )
          if (response.success) {
            notifications.push(...response.data)
          }
        } catch (error) {
          // Silently continue if an app is not available
          console.warn(`Failed to fetch notifications from ${app}:`, error)
        }
      })
    )

    // Sort by timestamp (newest first)
    return notifications.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  /**
   * Clears the request cache
   */
  clearCache(): void {
    this.requestCache.clear()
  }

  /**
   * Gets current cache size and statistics
   */
  getCacheStats() {
    return {
      size: this.requestCache.size,
      entries: Array.from(this.requestCache.entries()).map(([key, value]) => ({
        key,
        age: Date.now() - value.timestamp,
        expired: Date.now() - value.timestamp > this.CACHE_TTL,
      })),
    }
  }

  /**
   * Creates a WebSocket connection to an app for real-time updates
   */
  private createWebSocketConnection(
    app: PopsAppId,
    maxReconnectAttempts: number,
    reconnectDelay: number,
    heartbeatInterval: number
  ): void {
    let reconnectAttempts = 0
    let heartbeatTimer: NodeJS.Timeout | null = null

    const connect = () => {
      const wsUrl = getAppUrl(app, '/ws').replace(/^http/, 'ws')
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log(`WebSocket connected to ${app}`)
        reconnectAttempts = 0

        // Set up heartbeat
        heartbeatTimer = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }))
          }
        }, heartbeatInterval)
      }

      ws.onmessage = event => {
        try {
          const data: CrossDomainEvent = JSON.parse(event.data)
          this.broadcastEvent(app, data)
        } catch (error) {
          console.error(`Error parsing WebSocket message from ${app}:`, error)
        }
      }

      ws.onclose = () => {
        console.log(`WebSocket connection to ${app} closed`)
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer)
          heartbeatTimer = null
        }

        // Attempt reconnection
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++
          setTimeout(connect, reconnectDelay * reconnectAttempts)
        }
      }

      ws.onerror = error => {
        console.error(`WebSocket error for ${app}:`, error)
      }

      this.wsConnections.set(app, ws)
    }

    connect()
  }

  /**
   * Closes WebSocket connection to an app
   */
  private closeWebSocketConnection(app: PopsAppId): void {
    const ws = this.wsConnections.get(app)
    if (ws) {
      ws.close()
      this.wsConnections.delete(app)
    }
  }

  /**
   * Broadcasts an event to all registered listeners
   */
  private broadcastEvent(app: PopsAppId, event: CrossDomainEvent): void {
    const eventKey = `${app}:*`
    const listeners = this.eventListeners.get(eventKey)

    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event)
        } catch (error) {
          console.error('Error in event listener:', error)
        }
      })
    }
  }

  /**
   * Cleanup method to close all connections
   */
  destroy(): void {
    // Close all WebSocket connections
    this.wsConnections.forEach(ws => ws.close())
    this.wsConnections.clear()

    // Clear all listeners
    this.eventListeners.clear()

    // Clear cache
    this.requestCache.clear()
  }
}

/**
 * Singleton instance for global use
 */
export const crossDomainAPI = new CrossDomainAPI()

/**
 * Utility function to quickly fetch data from any POps app
 *
 * @param app - Target POps application
 * @param endpoint - API endpoint path
 * @param options - Request options
 * @returns Promise resolving to the response data
 */
export async function fetchFromApp<T = unknown>(
  app: PopsAppId,
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const response = await crossDomainAPI.fetchFromApp<T>(app, endpoint, options)
  if (!response.success) {
    throw new Error(response.error || 'Request failed')
  }
  return response.data
}

/**
 * Utility function to check if an app is online
 *
 * @param app - POps application to check
 * @returns Promise resolving to boolean indicating if app is online
 */
export async function isAppOnline(app: PopsAppId): Promise<boolean> {
  try {
    const status = await crossDomainAPI.checkAppHealth(app)
    return status.status === 'online'
  } catch {
    return false
  }
}
