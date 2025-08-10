/**
 * @fileoverview Type definitions for POps navigation and cross-domain functionality
 */

// Re-export types from @pops/api-client for backward compatibility
export type {
  PopsAppId,
  CrossDomainResponse,
  CrossDomainEvent,
  AppStatus,
  PopsNotification,
} from '@pops/api-client'

// Import types for use in this file
import type { PopsAppId, AppStatus, PopsNotification } from '@pops/api-client'

/**
 * User information shared across POps applications
 */
export interface PopsUser {
  /** Unique user identifier */
  id: string
  /** User's email address */
  email: string
  /** User's display name */
  name: string
  /** User's avatar URL */
  avatar?: string
  /** User preferences and settings */
  preferences: UserPreferences
  /** Timestamp of last activity */
  lastActive: string
}

/**
 * User preferences that persist across all POps apps
 */
export interface UserPreferences {
  /** Preferred theme (light/dark) */
  theme: 'light' | 'dark' | 'system'
  /** Preferred language/locale */
  locale: string
  /** Timezone setting */
  timezone: string
  /** Notification preferences */
  notifications: NotificationPreferences
  /** Dashboard widget configuration */
  dashboard?: DashboardConfig
}

/**
 * Notification preferences across all POps apps
 */
export interface NotificationPreferences {
  /** Enable browser push notifications */
  push: boolean
  /** Enable email notifications */
  email: boolean
  /** Enable in-app notifications */
  inApp: boolean
  /** Notification frequency */
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}

/**
 * Dashboard widget configuration for Hub app
 */
export interface DashboardConfig {
  /** Enabled widgets */
  widgets: string[]
  /** Widget layout configuration */
  layout: WidgetLayout[]
  /** Refresh intervals for widgets */
  refreshIntervals: Record<string, number>
}

/**
 * Widget layout configuration
 */
export interface WidgetLayout {
  /** Widget identifier */
  id: string
  /** Grid position X */
  x: number
  /** Grid position Y */
  y: number
  /** Grid width */
  w: number
  /** Grid height */
  h: number
}

// PopsNotification is now defined in @pops/api-client

// AppStatus is now defined in @pops/api-client

// CrossDomainResponse is now defined in @pops/api-client

/**
 * Widget data structure for cross-domain widgets
 */
export interface WidgetData {
  /** Widget identifier */
  id: string
  /** Source app */
  app: PopsAppId
  /** Widget title */
  title: string
  /** Widget data payload */
  data: unknown
  /** Last update timestamp */
  lastUpdate: string
  /** Error state */
  error?: string
  /** Loading state */
  loading: boolean
}

/**
 * Navigation context state
 */
export interface NavigationState {
  /** Current app */
  currentApp: PopsAppId | null
  /** Current user */
  currentUser: PopsUser | null
  /** Unread notifications */
  notifications: PopsNotification[]
  /** App statuses */
  appStatuses: Partial<Record<PopsAppId, AppStatus>>
  /** Navigation history */
  history: NavigationHistoryItem[]
}

/**
 * Navigation history item
 */
export interface NavigationHistoryItem {
  /** Target app */
  app: PopsAppId
  /** Page path */
  path: string
  /** Page title */
  title: string
  /** Visit timestamp */
  timestamp: string
}

// CrossDomainEvent is now defined in @pops/api-client

/**
 * Authentication state shared across domains
 */
export interface AuthState {
  /** Whether user is authenticated */
  isAuthenticated: boolean
  /** Current user information */
  user: PopsUser | null
  /** JWT token */
  token: string | null
  /** Token expiration timestamp */
  expiresAt: string | null
  /** Refresh token */
  refreshToken: string | null
}

/**
 * Props for UnifiedHeader component
 */
export interface UnifiedHeaderProps {
  /** Current POps app identifier */
  currentApp: PopsAppId
  /** Page title to display */
  title?: string
  /** Whether to show the domain switcher */
  showDomainSwitcher?: boolean
  /** Whether to show notifications */
  showNotifications?: boolean
  /** Whether to show global search */
  showSearch?: boolean
  /** Custom action buttons */
  customActions?: React.ReactNode
  /** Additional CSS class names */
  className?: string
  /** Callback for mobile menu toggle */
  onMenuToggle?: () => void
}

/**
 * Props for DomainSwitcher component
 */
export interface DomainSwitcherProps {
  /** Current app */
  currentApp: PopsAppId
  /** Callback when app is selected */
  onAppSelect?: (app: PopsAppId) => void
  /** Whether to show app statuses */
  showStatus?: boolean
  /** Additional CSS class names */
  className?: string
}

/**
 * Props for NotificationCenter component
 */
export interface NotificationCenterProps {
  /** List of notifications */
  notifications: PopsNotification[]
  /** Callback when notification is read */
  onMarkAsRead?: (id: string) => void
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: PopsNotification) => void
  /** Maximum number of notifications to show */
  maxVisible?: number
  /** Additional CSS class names */
  className?: string
}
