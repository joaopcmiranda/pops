/**
 * @fileoverview Domain Switcher Component for POps Applications
 *
 * This component provides a dropdown interface for switching between different
 * POps applications (subdomains). It shows app status indicators and provides
 * quick navigation across the entire POps suite.
 */

import React, { useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Button,
} from '@pops/ui'
import { cn } from '@pops/ui'
import { useAppSuite } from '../../contexts/AppSuiteContext'
import { getAllApps, type PopsAppId } from '../../config/domains'
import type { DomainSwitcherProps } from '../../types'

/**
 * Status indicator component for apps
 */
function AppStatusIndicator({
  status,
}: {
  status: 'online' | 'offline' | 'degraded' | 'maintenance'
}) {
  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    degraded: { color: 'bg-yellow-500', label: 'Degraded' },
    offline: { color: 'bg-red-500', label: 'Offline' },
    maintenance: { color: 'bg-blue-500', label: 'Maintenance' },
  }

  const config = statusConfig[status]

  return (
    <div
      className={cn('w-2 h-2 rounded-full', config.color)}
      title={config.label}
      aria-label={`Status: ${config.label}`}
    />
  )
}

/**
 * Domain Switcher Component
 *
 * Provides a dropdown interface for navigating between POps applications.
 * Shows current app, available apps, and their health status.
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <DomainSwitcher
 *   currentApp="travel"
 *   showStatus={true}
 *   onAppSelect={(app) => console.log('Selected:', app)}
 * />
 * ```
 */
export function DomainSwitcher({
  currentApp,
  onAppSelect,
  showStatus = true,
  className,
}: DomainSwitcherProps) {
  const { switchToApp, appStatuses, isAppOnline } = useAppSuite()
  const [isOpen, setIsOpen] = useState(false)

  // Get all available apps
  const allApps = getAllApps()
  const currentAppData = allApps.find(app => app.id === currentApp)

  /**
   * Handle app selection
   */
  const handleAppSelect = (appId: PopsAppId) => {
    setIsOpen(false)

    if (onAppSelect) {
      onAppSelect(appId)
    } else {
      switchToApp(appId)
    }
  }

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (event: React.KeyboardEvent, appId: PopsAppId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleAppSelect(appId)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={cn('flex items-center gap-2 px-3 py-2 text-sm font-medium', className)}
          aria-label={`Switch from ${currentAppData?.meta.name || currentApp} to another POps app`}
          aria-expanded={isOpen}
          aria-haspopup='menu'
        >
          <div className='flex items-center gap-2 min-w-0'>
            {currentAppData?.meta.icon && (
              <span className='text-base shrink-0' role='img' aria-label={currentAppData.meta.name}>
                {currentAppData.meta.icon}
              </span>
            )}
            <span className='font-medium truncate'>{currentAppData?.meta.name || currentApp}</span>
            {showStatus && (
              <AppStatusIndicator status={appStatuses[currentApp]?.status || 'offline'} />
            )}
          </div>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
            aria-hidden='true'
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-64' align='start' sideOffset={4}>
        <DropdownMenuLabel className='text-xs font-semibold text-muted-foreground'>
          POps Applications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {allApps.map(app => {
          const isCurrentApp = app.id === currentApp
          const appStatus = appStatuses[app.id]
          const online = isAppOnline(app.id)

          return (
            <DropdownMenuItem
              key={app.id}
              className={cn(
                'flex items-center justify-between px-2 py-2 cursor-pointer',
                isCurrentApp && 'bg-accent text-accent-foreground'
              )}
              onClick={() => !isCurrentApp && handleAppSelect(app.id)}
              onKeyDown={e => !isCurrentApp && handleKeyDown(e, app.id)}
              disabled={isCurrentApp}
              role='menuitem'
              aria-label={`Switch to ${app.meta.name}${!online ? ' (offline)' : ''}`}
            >
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <span className='text-lg shrink-0' role='img' aria-label={app.meta.name}>
                  {app.meta.icon}
                </span>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium truncate'>{app.meta.name}</span>
                    {isCurrentApp && (
                      <span className='text-xs font-medium opacity-70'>Current</span>
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground truncate mt-0.5'>
                    {app.meta.description}
                  </p>
                </div>

                <div className='flex items-center gap-2 shrink-0'>
                  {showStatus && appStatus && <AppStatusIndicator status={appStatus.status} />}

                  {!isCurrentApp && (
                    <ExternalLink
                      className='h-3 w-3 text-muted-foreground opacity-50'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='px-2 py-2 text-xs text-muted-foreground cursor-default'
          disabled
        >
          <div className='flex items-center justify-between w-full'>
            <span>POps Suite</span>
            <span>{allApps.length} apps</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
