/**
 * @fileoverview Domain configuration for POps Personal Operations Suite
 *
 * This module defines the domain structure for all POps applications and provides
 * utilities for URL generation, port mapping, and cross-domain navigation.
 *
 * Production domains follow the pattern: app.mypops.io
 * Development uses localhost with specific ports for each app
 */

/**
 * Production domains for all POps applications
 */
export const POPS_DOMAINS = {
  hub: 'mypops.io',
  accounts: 'accounts.mypops.io',
  money: 'money.mypops.io',
  travel: 'travel.mypops.io',
  events: 'events.mypops.io',
  documents: 'documents.mypops.io',
  recipes: 'recipes.mypops.io',
  home: 'home.mypops.io',
  health: 'health.mypops.io',
  admin: 'admin.mypops.io',
} as const

/**
 * Development port mappings for local development
 */
export const DEV_PORTS = {
  hub: 4000, // mypops.io
  accounts: 4001, // accounts.mypops.io
  money: 4002, // money.mypops.io
  travel: 4003, // travel.mypops.io (existing)
  events: 4004, // events.mypops.io
  documents: 4005, // documents.mypops.io
  recipes: 4006, // recipes.mypops.io
  home: 4007, // home.mypops.io
  health: 4008, // health.mypops.io
  admin: 4009, // admin.mypops.io
} as const

/**
 * App metadata for display and navigation
 */
export const POPS_APP_META = {
  hub: {
    name: 'POps Hub',
    description: 'Central dashboard for all personal operations',
    icon: '🏠',
    color: '#3b82f6',
  },
  accounts: {
    name: 'Accounts',
    description: 'User management and authentication',
    icon: '👤',
    color: '#10b981',
  },
  money: {
    name: 'Money Manager',
    description: 'Budget tracking and expense management',
    icon: '💰',
    color: '#f59e0b',
  },
  travel: {
    name: 'Travel Organizer',
    description: 'Trip planning and itinerary management',
    icon: '✈️',
    color: '#8b5cf6',
  },
  events: {
    name: 'Event Manager',
    description: 'Event planning and guest management',
    icon: '🎉',
    color: '#ef4444',
  },
  documents: {
    name: 'Document Manager',
    description: 'Document storage and organization',
    icon: '📄',
    color: '#6b7280',
  },
  recipes: {
    name: 'Recipe Manager',
    description: 'Recipe collection and meal planning',
    icon: '🍳',
    color: '#f97316',
  },
  home: {
    name: 'Home Inventory',
    description: 'Home inventory and maintenance tracking',
    icon: '🏡',
    color: '#84cc16',
  },
  health: {
    name: 'Health & Fitness',
    description: 'Health tracking and fitness management',
    icon: '❤️',
    color: '#ec4899',
  },
  admin: {
    name: 'Admin Dashboard',
    description: 'System administration and monitoring',
    icon: '⚙️',
    color: '#64748b',
  },
} as const

export type PopsAppId = keyof typeof POPS_DOMAINS

/**
 * Gets the appropriate URL for a POps application
 *
 * @param app - The POps application identifier
 * @param path - Optional path to append (defaults to '/')
 * @returns Complete URL for the specified app and path
 *
 * @example
 * ```typescript
 * // Production: https://travel.mypops.io/dashboard
 * // Development: http://localhost:4003/dashboard
 * const travelUrl = getAppUrl('travel', '/dashboard')
 * ```
 */
export function getAppUrl(app: PopsAppId, path = '/'): string {
  const domain = POPS_DOMAINS[app]
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    return `https://${domain}${path}`
  } else {
    const port = DEV_PORTS[app]
    return `http://localhost:${port}${path}`
  }
}

/**
 * Gets the development port for a specific POps app
 *
 * @param app - The POps application identifier
 * @returns Port number for development
 */
export function getAppPort(app: PopsAppId): number {
  return DEV_PORTS[app]
}

/**
 * Detects the current POps app based on the current domain/port
 *
 * @returns The current app identifier or null if not detected
 */
export function getCurrentApp(): PopsAppId | null {
  if (typeof window === 'undefined') return null

  const { hostname, port } = window.location

  // Production domain detection
  for (const [appId, domain] of Object.entries(POPS_DOMAINS)) {
    if (hostname === domain) {
      return appId as PopsAppId
    }
  }

  // Development port detection
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const currentPort = parseInt(port) || 3000
    for (const [appId, appPort] of Object.entries(DEV_PORTS)) {
      if (currentPort === appPort) {
        return appId as PopsAppId
      }
    }
  }

  return null
}

/**
 * Checks if the current environment is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Gets the shared cookie domain for cross-app authentication
 *
 * @returns Cookie domain string
 */
export function getSharedCookieDomain(): string {
  return isProduction() ? '.mypops.io' : 'localhost'
}

/**
 * Navigates to a different POps application
 *
 * @param app - Target POps application
 * @param path - Optional path within the target app
 * @param newTab - Whether to open in a new tab (defaults to false)
 */
export function navigateToApp(app: PopsAppId, path = '/', newTab = false): void {
  const url = getAppUrl(app, path)

  if (newTab) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    window.location.href = url
  }
}

/**
 * Gets all available POps applications with their metadata
 *
 * @returns Array of app configurations with metadata
 */
export function getAllApps() {
  return Object.entries(POPS_DOMAINS).map(([id, domain]) => ({
    id: id as PopsAppId,
    domain,
    port: DEV_PORTS[id as PopsAppId],
    meta: POPS_APP_META[id as PopsAppId],
    url: getAppUrl(id as PopsAppId),
  }))
}
