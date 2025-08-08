/**
 * @fileoverview Widget Container Component
 *
 * This component provides a standardized container for all POps widgets.
 * It handles loading states, errors, actions, and provides consistent styling.
 */

import React, { useState } from 'react'
import {
  RefreshCw,
  X,
  Settings,
  AlertCircle,
  Loader2,
  Wifi,
  WifiOff,
  MoreHorizontal,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@pops/ui'
import { cn } from '@pops/ui'
import type { WidgetContainerProps } from '../../types'

/**
 * Status indicator component
 */
function StatusIndicator({ status }: { status: 'connected' | 'disconnected' | 'syncing' }) {
  const statusConfig = {
    connected: {
      icon: Wifi,
      className: 'text-green-500',
      label: 'Connected',
    },
    disconnected: {
      icon: WifiOff,
      className: 'text-red-500',
      label: 'Disconnected',
    },
    syncing: {
      icon: RefreshCw,
      className: 'text-blue-500 animate-spin',
      label: 'Syncing',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className='flex items-center gap-1' title={config.label}>
      <Icon className={cn('h-3 w-3', config.className)} />
    </div>
  )
}

/**
 * Widget Container Component
 *
 * Provides a standardized container for all POps widgets with consistent
 * styling, actions, and state management.
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <WidgetContainer
 *   title="Travel Summary"
 *   loading={loading}
 *   error={error}
 *   refreshable={true}
 *   onRefresh={handleRefresh}
 * >
 *   <div>Widget content goes here</div>
 * </WidgetContainer>
 * ```
 */
export function WidgetContainer({
  title,
  icon,
  loading = false,
  error = null,
  status,
  refreshable = false,
  removable = false,
  configurable = false,
  onRefresh,
  onRemove,
  onConfigure,
  children,
  className,
  size = 'medium',
}: WidgetContainerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  /**
   * Handle refresh with loading state
   */
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return

    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  /**
   * Get size-specific classes
   */
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'min-h-[120px]'
      case 'large':
        return 'min-h-[280px]'
      default:
        return 'min-h-[200px]'
    }
  }

  const hasActions = refreshable || removable || configurable

  return (
    <Card className={cn('h-full flex flex-col', getSizeClasses(), className)}>
      <CardHeader
        className={cn('flex-shrink-0 pb-2', size === 'small' ? 'px-3 py-2' : 'px-4 py-3')}
      >
        <div className='flex items-center justify-between'>
          {/* Title and icon */}
          <div className='flex items-center gap-2 min-w-0 flex-1'>
            {icon && <span className='flex-shrink-0'>{icon}</span>}
            {title && (
              <h3
                className={cn(
                  'font-semibold text-gray-900 dark:text-gray-100 truncate',
                  size === 'small' ? 'text-sm' : 'text-base'
                )}
              >
                {title}
              </h3>
            )}
          </div>

          {/* Status and actions */}
          <div className='flex items-center gap-2 flex-shrink-0'>
            {status && <StatusIndicator status={status} />}

            {hasActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-6 w-6 p-0'
                    aria-label='Widget actions'
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-40'>
                  {refreshable && (
                    <DropdownMenuItem
                      onClick={handleRefresh}
                      disabled={loading || isRefreshing}
                      className='cursor-pointer'
                    >
                      <RefreshCw
                        className={cn('h-4 w-4 mr-2', (loading || isRefreshing) && 'animate-spin')}
                      />
                      Refresh
                    </DropdownMenuItem>
                  )}

                  {configurable && (
                    <DropdownMenuItem onClick={onConfigure} className='cursor-pointer'>
                      <Settings className='h-4 w-4 mr-2' />
                      Configure
                    </DropdownMenuItem>
                  )}

                  {removable && (
                    <DropdownMenuItem
                      onClick={onRemove}
                      className='cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400'
                    >
                      <X className='h-4 w-4 mr-2' />
                      Remove
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn('flex-1 flex flex-col', size === 'small' ? 'px-3 py-2' : 'px-4 py-3', 'pt-0')}
      >
        {error ? (
          /* Error state */
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <AlertCircle className='h-8 w-8 text-red-500 mx-auto mb-2' />
              <p className='text-sm font-medium text-red-600 dark:text-red-400 mb-1'>
                Widget Error
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-3'>{error}</p>
              {refreshable && (
                <Button variant='outline' size='sm' onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={cn('h-3 w-3 mr-1', isRefreshing && 'animate-spin')} />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        ) : loading ? (
          /* Loading state */
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <Loader2 className='h-8 w-8 text-blue-500 animate-spin mx-auto mb-2' />
              <p className='text-sm text-gray-500 dark:text-gray-400'>Loading...</p>
            </div>
          </div>
        ) : (
          /* Content */
          <div className='flex-1 flex flex-col'>{children}</div>
        )}
      </CardContent>
    </Card>
  )
}
