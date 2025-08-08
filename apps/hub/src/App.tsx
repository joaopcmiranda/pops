/**
 * @fileoverview Main POps Hub Application Component
 *
 * This is the central dashboard application that provides navigation to all
 * POps applications and displays cross-domain widgets for quick insights.
 */

import { useState } from 'react'
import { UnifiedHeader, useAppSuite } from '@pops/navigation'
import { Dashboard } from './components/Dashboard'
import { AppLauncher } from './components/AppLauncher/AppLauncher'
import { WelcomeScreen } from './components/WelcomeScreen'
import { ErrorBoundary } from './components/ErrorBoundary'

/**
 * Main application view types
 */
type AppView = 'welcome' | 'dashboard' | 'apps'

/**
 * POps Hub Application Component
 *
 * The main application component that manages the overall layout and routing
 * for the POps Hub. Provides navigation between dashboard and app launcher.
 *
 * @returns JSX element
 */
export function App() {
  const { authState, isLoading, error } = useAppSuite()
  const [currentView, setCurrentView] = useState<AppView>(
    authState.isAuthenticated ? 'dashboard' : 'welcome'
  )

  /**
   * Handle view navigation
   */
  const handleViewChange = (view: AppView) => {
    setCurrentView(view)
  }

  /**
   * Render current view content
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => handleViewChange('dashboard')} />

      case 'dashboard':
        return <Dashboard onShowApps={() => handleViewChange('apps')} />

      case 'apps':
        return <AppLauncher onBackToDashboard={() => handleViewChange('dashboard')} />

      default:
        return <Dashboard onShowApps={() => handleViewChange('apps')} />
    }
  }

  /**
   * Get current page title
   */
  const getPageTitle = (view: AppView): string => {
    const titles = {
      welcome: 'Welcome to POps',
      dashboard: 'Dashboard',
      apps: 'Applications',
    }
    return titles[view]
  }

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className='app-layout'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='loading-spinner mx-auto mb-4'></div>
            <p className='text-gray-600 dark:text-gray-400'>Initializing POps Hub...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error screen if initialization failed
  if (error) {
    return (
      <div className='app-layout'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='error-state max-w-md'>
            <h2 className='text-lg font-semibold mb-2'>Failed to Initialize</h2>
            <p className='text-sm mb-4'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              Reload Application
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='app-layout'>
      {/* Header - shown for authenticated users */}
      {authState.isAuthenticated && currentView !== 'welcome' && (
        <ErrorBoundary
          fallback={
            <div className='app-header bg-red-100 p-4 text-red-700'>Header error occurred</div>
          }
        >
          <UnifiedHeader
            currentApp='hub'
            title={getPageTitle(currentView)}
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
            customActions={
              <div className='flex items-center gap-2'>
                {currentView === 'dashboard' && (
                  <button
                    onClick={() => handleViewChange('apps')}
                    className='px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
                  >
                    Apps
                  </button>
                )}
                {currentView === 'apps' && (
                  <button
                    onClick={() => handleViewChange('dashboard')}
                    className='px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors'
                  >
                    Dashboard
                  </button>
                )}
              </div>
            }
          />
        </ErrorBoundary>
      )}

      {/* Main content */}
      <main className='app-content'>
        <ErrorBoundary
          fallback={
            <div className='flex-1 flex items-center justify-center'>
              <div className='error-state'>
                <h2 className='text-lg font-semibold mb-2'>Something went wrong</h2>
                <p className='text-sm mb-4'>Please refresh the page to try again.</p>
                <button
                  onClick={() => window.location.reload()}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                  Reload Page
                </button>
              </div>
            </div>
          }
        >
          {renderCurrentView()}
        </ErrorBoundary>
      </main>
    </div>
  )
}
