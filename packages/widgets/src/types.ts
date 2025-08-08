/**
 * @fileoverview Type definitions for POps widget system
 */

import type { PopsAppId } from '@pops/api-client'
import type { Layout } from 'react-grid-layout'

/**
 * Widget size configuration
 */
export interface WidgetSize {
  /** Grid width (columns) */
  w: number
  /** Grid height (rows) */
  h: number
  /** Minimum width */
  minW?: number
  /** Minimum height */
  minH?: number
  /** Maximum width */
  maxW?: number
  /** Maximum height */
  maxH?: number
}

/**
 * Widget position configuration
 */
export interface WidgetPosition {
  /** Grid X coordinate */
  x: number
  /** Grid Y coordinate */
  y: number
}

/**
 * Widget configuration
 */
export interface WidgetConfig {
  /** Unique widget identifier */
  id: string
  /** Widget type identifier */
  type: string
  /** Display title */
  title?: string
  /** Widget size */
  size: WidgetSize
  /** Widget position */
  position?: WidgetPosition
  /** Widget-specific properties */
  props?: Record<string, unknown>
  /** Data refresh interval in milliseconds */
  refreshInterval?: number
  /** Source POps application */
  app?: PopsAppId
  /** API endpoint for data fetching */
  endpoint?: string
  /** Whether widget can be removed */
  removable?: boolean
  /** Whether widget can be resized */
  resizable?: boolean
  /** Whether widget can be moved */
  draggable?: boolean
}

/**
 * Widget data state
 */
export interface WidgetData<T = unknown> {
  /** Widget data payload */
  data: T | null
  /** Loading state */
  loading: boolean
  /** Error state */
  error: string | null
  /** Last update timestamp */
  lastUpdate: string | null
  /** Data staleness indicator */
  stale: boolean
}

/**
 * Widget registry entry
 */
export interface WidgetRegistryEntry {
  /** Widget type identifier */
  type: string
  /** Display name */
  name: string
  /** Widget description */
  description: string
  /** Widget icon */
  icon?: string
  /** Widget category */
  category: 'travel' | 'money' | 'activity' | 'utility' | 'custom'
  /** Default widget configuration */
  defaultConfig: Partial<WidgetConfig>
  /** Widget component */
  component: React.ComponentType<WidgetProps>
  /** Preview component for widget gallery */
  preview?: React.ComponentType<{ config: WidgetConfig }>
}

/**
 * Props passed to widget components
 */
export interface WidgetProps {
  /** Widget configuration */
  config: WidgetConfig
  /** Widget data */
  data: WidgetData
  /** Refresh data function */
  onRefresh?: () => void
  /** Remove widget function */
  onRemove?: () => void
  /** Update widget config function */
  onUpdateConfig?: (config: Partial<WidgetConfig>) => void
  /** Whether widget is in edit mode */
  editMode?: boolean
}

/**
 * Widget container props
 */
export interface WidgetContainerProps {
  /** Widget title */
  title?: string
  /** Widget icon */
  icon?: React.ReactNode
  /** Loading state */
  loading?: boolean
  /** Error state */
  error?: string | null
  /** Widget status indicator */
  status?: 'connected' | 'disconnected' | 'syncing'
  /** Whether widget is refreshable */
  refreshable?: boolean
  /** Whether widget is removable */
  removable?: boolean
  /** Whether widget is configurable */
  configurable?: boolean
  /** Refresh handler */
  onRefresh?: () => void
  /** Remove handler */
  onRemove?: () => void
  /** Configure handler */
  onConfigure?: () => void
  /** Child content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Widget size for styling */
  size?: 'small' | 'medium' | 'large'
}

/**
 * Widget grid props
 */
export interface WidgetGridProps {
  /** Widget configurations */
  widgets: WidgetConfig[]
  /** Grid layout */
  layout?: Layout[]
  /** Whether grid is editable */
  editable?: boolean
  /** Whether to show widget gallery */
  showGallery?: boolean
  /** Grid columns */
  cols?: number
  /** Row height in pixels */
  rowHeight?: number
  /** Grid margin */
  margin?: [number, number]
  /** Container padding */
  containerPadding?: [number, number]
  /** Layout change handler */
  onLayoutChange?: (layout: Layout[]) => void
  /** Widget add handler */
  onAddWidget?: (config: WidgetConfig) => void
  /** Widget remove handler */
  onRemoveWidget?: (widgetId: string) => void
  /** Widget update handler */
  onUpdateWidget?: (widgetId: string, config: Partial<WidgetConfig>) => void
  /** Additional CSS classes */
  className?: string
}

// CrossDomainDataOptions is now defined in useCrossDomainData hook

/**
 * Real-time widget hook options
 */
export interface RealtimeWidgetOptions {
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
 * Widget layout hook options
 */
export interface WidgetLayoutOptions {
  /** Default widget layout */
  defaultLayout: WidgetConfig[]
  /** LocalStorage persistence key */
  persistKey?: string
  /** Whether to sync with user preferences */
  syncToPreferences?: boolean
  /** Grid columns */
  cols?: number
  /** Maximum widgets allowed */
  maxWidgets?: number
}

/**
 * Widget gallery filter
 */
export interface WidgetGalleryFilter {
  /** Filter by category */
  category?: string
  /** Search query */
  search?: string
  /** Filter by availability */
  available?: boolean
}

/**
 * Dashboard template
 */
export interface DashboardTemplate {
  /** Template identifier */
  id: string
  /** Template name */
  name: string
  /** Template description */
  description: string
  /** Template preview image */
  preview?: string
  /** Template widget configuration */
  widgets: WidgetConfig[]
  /** Template category */
  category: 'default' | 'travel' | 'finance' | 'productivity'
}
