/**
 * @fileoverview Hook for real-time widget data updates
 *
 * This hook provides real-time data updates for widgets by subscribing
 * to WebSocket events from other POps applications.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { ApiClient, type PopsAppId, type CrossDomainEvent } from '@pops/api-client'

// Create a shared API client for real-time widget updates
const realtimeApiClient = new ApiClient({ baseUrl: 'http://localhost:4000' }) // Hub app for context

/**
 * Real-time widget hook options
 */
interface RealtimeWidgetOptions {
  /** Source POps application */
  app: PopsAppId
  /** Event types to subscribe to */
  events: string[]
  /** Initial data */
  initialData?: unknown
  /** Event handler */
  onEvent?: (event: { type: string; data: unknown }) => void
}

/**
 * Real-time widget data hook
 *
 * Subscribes to real-time updates from POps applications and maintains
 * widget data state with live updates.
 *
 * @param options - Hook configuration options
 * @returns Real-time data state and connection status
 *
 * @example
 * ```tsx
 * function LiveTripWidget() {
 *   const { data, connected, lastEvent } = useRealtimeWidget({
 *     app: 'travel',
 *     events: ['trip_updated', 'itinerary_changed'],
 *     initialData: { trips: [], status: 'idle' },
 *     onEvent: (event) => {
 *       console.log('Received event:', event.type, event.data)
 *     }
 *   })
 *
 *   return (
 *     <div>
 *       <div>Status: {connected ? 'Connected' : 'Disconnected'}</div>
 *       <div>Trips: {data?.trips?.length || 0}</div>
 *       {lastEvent && (
 *         <div>Last Update: {lastEvent.type} at {lastEvent.timestamp}</div>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export function useRealtimeWidget<T = unknown>(
  options: RealtimeWidgetOptions
): {
  data: T
  connected: boolean
  lastEvent: { type: string; data: unknown; timestamp: string } | null
  reconnect: () => void
} {
  const { app, events, initialData, onEvent } = options

  // State management
  const [data, setData] = useState<T>(initialData as T)
  const [connected, setConnected] = useState(false)
  const [lastEvent, setLastEvent] = useState<{
    type: string
    data: unknown
    timestamp: string
  } | null>(null)

  // Refs for cleanup and preventing memory leaks
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const mountedRef = useRef(true)

  /**
   * Handle incoming real-time events
   */
  const handleEvent = useCallback(
    (event: CrossDomainEvent) => {
      if (!mountedRef.current) return

      // Filter events by type
      if (events.includes(event.type)) {
        const eventData = {
          type: event.type,
          data: event.data,
          timestamp: event.timestamp,
        }

        setLastEvent(eventData)

        // Call custom event handler if provided
        if (onEvent) {
          try {
            onEvent(eventData)
          } catch (error) {
            console.error('Error in widget event handler:', error)
          }
        }

        // Update data based on event type
        handleDataUpdate(event.type, event.data)
      }
    },
    [events, onEvent]
  )

  /**
   * Handle data updates based on event types
   */
  const handleDataUpdate = useCallback((eventType: string, eventData: unknown) => {
    setData(prevData => {
      // Generic data update logic - can be overridden by custom onEvent handler
      switch (eventType) {
        case 'data_updated':
        case 'refresh':
          // Replace entire data
          return eventData as T

        case 'item_added':
        case 'item_created':
          // Add new item to array data
          if (Array.isArray(prevData)) {
            return [...prevData, eventData] as T
          }
          break

        case 'item_updated':
        case 'item_modified':
          // Update item in array data
          if (
            Array.isArray(prevData) &&
            eventData &&
            typeof eventData === 'object' &&
            'id' in eventData
          ) {
            return prevData.map(item =>
              item &&
              typeof item === 'object' &&
              'id' in item &&
              'id' in eventData &&
              item.id === eventData.id
                ? { ...item, ...eventData }
                : item
            ) as T
          }
          break

        case 'item_removed':
        case 'item_deleted':
          // Remove item from array data
          if (
            Array.isArray(prevData) &&
            eventData &&
            typeof eventData === 'object' &&
            'id' in eventData
          ) {
            return prevData.filter(
              item =>
                !(
                  item &&
                  typeof item === 'object' &&
                  'id' in item &&
                  'id' in eventData &&
                  item.id === eventData.id
                )
            ) as T
          }
          break

        default:
          // For unknown event types, merge data if possible
          if (
            prevData &&
            typeof prevData === 'object' &&
            eventData &&
            typeof eventData === 'object'
          ) {
            return { ...prevData, ...eventData } as T
          }
      }

      return prevData
    })
  }, [])

  /**
   * Connect to real-time updates
   */
  const connect = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
    }

    try {
      const unsubscribe = realtimeApiClient.subscribeToApp(
        app,
        event => {
          setConnected(true)
          handleEvent(event)
        },
        {
          maxReconnectAttempts: 5,
          reconnectDelay: 1000,
          heartbeatInterval: 30000,
        }
      )

      unsubscribeRef.current = unsubscribe

      // Set initial connection status
      setTimeout(() => {
        if (mountedRef.current) {
          setConnected(true)
        }
      }, 1000)
    } catch (error) {
      console.error('Failed to connect to real-time updates:', error)
      setConnected(false)
    }
  }, [app, handleEvent])

  /**
   * Reconnect function
   */
  const reconnect = useCallback(() => {
    setConnected(false)
    connect()
  }, [connect])

  /**
   * Set up real-time connection
   */
  useEffect(() => {
    connect()

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      setConnected(false)
    }
  }, [connect])

  /**
   * Handle connection status changes
   */
  useEffect(() => {
    const handleOnline = () => {
      if (mountedRef.current && !connected) {
        reconnect()
      }
    }

    const handleOffline = () => {
      if (mountedRef.current) {
        setConnected(false)
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [connected, reconnect])

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      mountedRef.current = false

      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [])

  return {
    data,
    connected,
    lastEvent,
    reconnect,
  }
}
