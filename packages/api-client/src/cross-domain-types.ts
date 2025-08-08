/**
 * @fileoverview Cross-domain types for unified API client
 */

import type { PopsAppId } from './domains'

/**
 * Response format for cross-domain API calls
 */
export interface CrossDomainResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  timestamp?: string
}

/**
 * Cross-domain event for real-time updates
 */
export interface CrossDomainEvent {
  type: string
  app: PopsAppId
  data: unknown
  timestamp: string
}

/**
 * App health status
 */
export interface AppStatus {
  status: 'online' | 'offline' | 'degraded' | 'maintenance'
  lastCheck: string
  responseTime?: number
}

/**
 * Cross-domain notification
 */
export interface PopsNotification {
  id: string
  app: PopsAppId
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

/**
 * Configuration options for cross-domain API requests
 */
export interface CrossDomainRequestOptions {
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
export interface WebSocketConfig {
  /** Reconnection attempts */
  maxReconnectAttempts?: number
  /** Reconnection delay in milliseconds */
  reconnectDelay?: number
  /** Heartbeat interval in milliseconds */
  heartbeatInterval?: number
}
