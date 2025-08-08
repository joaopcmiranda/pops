/**
 * @fileoverview App Launcher Component
 *
 * Displays all available POps applications in a grid format with
 * status indicators and quick access links.
 */

import { ExternalLink, ArrowLeft } from 'lucide-react'
import { Button } from '@pops/ui'
import { getAllApps, navigateToApp, useAppSuite, type PopsAppId } from '@pops/navigation'
import { cn } from '@pops/ui'

interface AppLauncherProps {
  onBackToDashboard: () => void
}

export function AppLauncher({ onBackToDashboard }: AppLauncherProps) {
  const { appStatuses, isAppOnline } = useAppSuite()
  const allApps = getAllApps()

  const handleAppClick = (appId: string) => {
    navigateToApp(appId as PopsAppId)
  }

  const getStatusIndicator = (appId: string) => {
    const status = appStatuses[appId as keyof typeof appStatuses]?.status || 'offline'
    const statusClasses = {
      online: 'bg-green-500',
      offline: 'bg-red-500',
      degraded: 'bg-yellow-500',
      maintenance: 'bg-blue-500',
    }

    return <div className={cn('status-indicator', statusClasses[status])} />
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center gap-4 mb-6'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onBackToDashboard}
          className='flex items-center gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Dashboard
        </Button>

        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>POps Applications</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Access all your personal operations tools
          </p>
        </div>
      </div>

      {/* App Grid */}
      <div className='app-launcher-grid'>
        {allApps.map(app => {
          const isOnline = isAppOnline(app.id)
          const status = appStatuses[app.id]

          return (
            <div
              key={app.id}
              className='app-launcher-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              onClick={() => handleAppClick(app.id)}
            >
              <div className='p-6'>
                {/* Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='text-3xl'>{app.meta.icon}</div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                        {app.meta.name}
                      </h3>
                      <div className='flex items-center gap-2 mt-1'>
                        {getStatusIndicator(app.id)}
                        <span className='text-xs text-gray-500 dark:text-gray-400'>
                          {status?.status || 'offline'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ExternalLink className='h-4 w-4 text-gray-400' />
                </div>

                {/* Description */}
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                  {app.meta.description}
                </p>

                {/* Footer */}
                <div className='flex items-center justify-between'>
                  <div className='text-xs text-gray-500 dark:text-gray-400'>{app.domain}</div>

                  {isOnline ? (
                    <span className='text-xs font-medium text-green-600 dark:text-green-400'>
                      Available
                    </span>
                  ) : (
                    <span className='text-xs font-medium text-red-600 dark:text-red-400'>
                      Offline
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
