/**
 * @fileoverview Hook for fetching cross-domain data for widgets
 *
 * This hook provides a standardized way for widgets to fetch data from
 * other POps applications with caching, error handling, and refresh capabilities.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { ApiClient, type PopsAppId } from '@pops/api-client'
import type { WidgetData } from '../types'

// Create a shared API client for cross-domain widget data
const widgetApiClient = new ApiClient({ baseUrl: 'http://localhost:4000' }) // Hub app for context

/**
 * Configuration options for cross-domain widget data
 */
export interface CrossDomainDataOptions {
  /** Source POps application */
  app: PopsAppId
  /** API endpoint */
  endpoint: string
  /** Refresh interval in milliseconds */
  refreshInterval?: number
  /** Initial data */
  initialData?: unknown
  /** Whether to fetch on mount */
  enabled?: boolean
  /** Request options */
  requestOptions?: {
    method?: 'GET' | 'POST'
    body?: unknown
    headers?: Record<string, string>
  }
}

/**
 * Hook for fetching cross-domain data for widgets
 *
 * Provides automatic data fetching, caching, error handling, and refresh
 * capabilities for widgets that need to display data from other POps apps.
 *
 * @param options - Hook configuration options
 * @returns Widget data state and control functions
 *
 * @example
 * ```tsx
 * function TravelSummaryWidget() {
 *   const { data, loading, error, refresh } = useCrossDomainData({
 *     app: 'travel',
 *     endpoint: '/api/trips/summary',
 *     refreshInterval: 300000, // 5 minutes
 *     enabled: true
 *   })
 *
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *
 *   return (
 *     <div>
 *       <p>Next Trip: {data?.nextTrip?.destination}</p>
 *       <button onClick={refresh}>Refresh</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useCrossDomainData<T = unknown>(
  options: CrossDomainDataOptions
): WidgetData<T> & {
  refresh: () => Promise<void>
  clearCache: () => void
} {
  const {
    app,
    endpoint,
    refreshInterval,
    initialData = null,
    enabled = true,
    requestOptions = {},
  } = options

  // State management
  const [data, setData] = useState<T | null>(initialData as T | null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [stale, setStale] = useState(false)

  // Refs for cleanup and preventing race conditions
  const abortControllerRef = useRef<AbortController | null>(null)
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  /**
   * Fetch data from the specified app and endpoint
   */
  const fetchData = useCallback(async (): Promise<void> => {
    if (!enabled || !mountedRef.current) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setLoading(true)
    setError(null)

    try {
      const response = await widgetApiClient.fetchFromApp<T>(app, endpoint, {
        method: requestOptions.method || 'GET',
        body: requestOptions.body,
        headers: requestOptions.headers,
        timeout: 10000, // 10 second timeout
      })

      if (!mountedRef.current) return

      if (response.success) {
        setData(response.data)
        setLastUpdate(new Date().toISOString())
        setStale(false)
      } else {
        throw new Error(response.error || 'Failed to fetch data')
      }
    } catch (err) {
      if (!mountedRef.current) return

      // Don't set error for aborted requests
      if (err instanceof Error && err.name === 'AbortError') return

      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error(`Widget data fetch error (${app}${endpoint}):`, err)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [app, endpoint, enabled, requestOptions])

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async (): Promise<void> => {
    await fetchData()
  }, [fetchData])

  /**
   * Clear cached data
   */
  const clearCache = useCallback((): void => {
    widgetApiClient.clearCache()
  }, [])

  /**
   * Mark data as stale when refresh interval is reached
   */
  const markStale = useCallback(() => {
    if (mountedRef.current) {
      setStale(true)
    }
  }, [])

  /**
   * Set up automatic refresh interval
   */
  useEffect(() => {
    if (!refreshInterval || !enabled) return

    refreshIntervalRef.current = setInterval(() => {
      if (mountedRef.current) {
        // Mark as stale first, then refresh
        markStale()
        fetchData()
      }
    }, refreshInterval)

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
        refreshIntervalRef.current = null
      }
    }
  }, [refreshInterval, enabled, fetchData, markStale])

  /**
   * Initial data fetch
   */
  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [fetchData, enabled])

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      mountedRef.current = false

      // Cancel any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Clear refresh interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  /**
   * Handle visibility change to refresh stale data
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && stale && enabled) {
        fetchData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [stale, enabled, fetchData])

  return {
    data,
    loading,
    error,
    lastUpdate,
    stale,
    refresh,
    clearCache,
  }
}
