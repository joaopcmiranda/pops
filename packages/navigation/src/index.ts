// Main exports
export * from './components'
export * from './contexts/AppSuiteContext'
// Export domains but avoid PopsAppId conflict - it's re-exported from types
export {
  POPS_DOMAINS,
  DEV_PORTS,
  POPS_APP_META,
  getAppUrl,
  getAppPort,
  getCurrentApp,
  isProduction,
  getSharedCookieDomain,
  navigateToApp,
  getAllApps,
} from './config/domains'
// DEPRECATED: Use @pops/api-client for cross-domain functionality
export * from './api/cross-domain'
export * from './types'

// Re-export unified API client for convenience
export { ApiClient } from '@pops/api-client'
