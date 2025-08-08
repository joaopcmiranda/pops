/**
 * @fileoverview Domain configuration for POps cross-app communication
 *
 * This module provides domain utilities for the unified API client to handle
 * both direct service calls and cross-domain app communication.
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
  hub: 4000,
  accounts: 4001,
  money: 4002,
  travel: 4003,
  events: 4004,
  documents: 4005,
  recipes: 4006,
  home: 4007,
  health: 4008,
  admin: 4009,
} as const

export type PopsAppId = keyof typeof POPS_DOMAINS

/**
 * Gets the appropriate URL for a POps application
 *
 * @param app - The POps application identifier
 * @param path - Optional path to append (defaults to '/')
 * @returns Complete URL for the specified app and path
 */
export function getAppUrl(app: PopsAppId, path = '/'): string {
  const domain = POPS_DOMAINS[app]
  const isProduction = isProductionEnvironment()

  if (isProduction) {
    return `https://${domain}${path}`
  } else {
    const port = DEV_PORTS[app]
    return `http://localhost:${port}${path}`
  }
}

/**
 * Checks if the current environment is production
 * Uses both process.env (Node.js) and window location (browser) detection
 */
export function isProductionEnvironment(): boolean {
  // Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production'
  }

  // Browser environment - check if we're on a .mypops.io domain
  if (typeof window !== 'undefined') {
    return (
      window.location.hostname.endsWith('.mypops.io') || window.location.hostname === 'mypops.io'
    )
  }

  // Default to development
  return false
}

/**
 * @deprecated Use isProductionEnvironment instead
 */
export function isProduction(): boolean {
  return isProductionEnvironment()
}
