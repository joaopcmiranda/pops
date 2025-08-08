/**
 * @fileoverview Main entry point for POps Hub application
 *
 * This is the central dashboard for the POps Personal Operations Suite.
 * It provides app navigation, unified search, and cross-domain widgets.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppSuiteProvider } from '@pops/navigation'
import { App } from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create and render the application
createRoot(rootElement).render(
  <StrictMode>
    <AppSuiteProvider currentApp='hub'>
      <App />
    </AppSuiteProvider>
  </StrictMode>
)
