/**
 * @fileoverview Unified Header Component for POps Applications
 *
 * This component provides a consistent header experience across all POps applications.
 * It includes app switching, global search, notifications, and user management.
 */

import React from 'react'
import { Search, Bell } from 'lucide-react'
import { Button } from '@pops/ui'
import { cn } from '@pops/ui'
import { DomainSwitcher } from '../DomainSwitcher'
import { UserMenu } from '../UserMenu'
import { NotificationCenter } from '../NotificationCenter'
import { useAppSuite } from '../../contexts/AppSuiteContext'
import { POPS_APP_META } from '../../config/domains'
import type { UnifiedHeaderProps } from '../../types'

/**
 * Unified Header Component
 *
 * Provides consistent navigation and functionality across all POps applications.
 * Includes app switching, search, notifications, and user menu.
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <UnifiedHeader
 *   currentApp="travel"
 *   title="Trip Organizer"
 *   showDomainSwitcher={true}
 *   showNotifications={true}
 *   showSearch={true}
 * />
 * ```
 */
export function UnifiedHeader({
  currentApp,
  title,
  showDomainSwitcher = true,
  showNotifications = true,
  showSearch = true,
  customActions,
  className,
}: UnifiedHeaderProps) {
  const { authState, unreadCount } = useAppSuite()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showNotificationCenter, setShowNotificationCenter] = React.useState(false)

  // Get app metadata for display
  const appMeta = POPS_APP_META[currentApp]
  const displayTitle = title || appMeta?.name || 'POps'

  /**
   * Handle global search
   */
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement global search across POps apps
      console.log('Global search:', searchQuery)
    }
  }

  /**
   * Handle search input changes
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  /**
   * Toggle notification center
   */
  const toggleNotifications = () => {
    setShowNotificationCenter(!showNotificationCenter)
  }

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800',
        'sticky top-0 z-50',
        className
      )}
      role='banner'
      aria-label='Main navigation'
    >
      {/* Left section: App switcher and title */}
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        {showDomainSwitcher && <DomainSwitcher currentApp={currentApp} className='shrink-0' />}

        <div className='flex items-center gap-2 min-w-0'>
          {appMeta?.icon && (
            <span className='text-xl shrink-0' role='img' aria-label={appMeta.name}>
              {appMeta.icon}
            </span>
          )}
          <h1
            className='text-lg font-semibold text-gray-900 dark:text-gray-100 truncate'
            title={displayTitle}
          >
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* Center section: Search (on larger screens) */}
      {showSearch && (
        <div className='hidden md:flex flex-1 max-w-md mx-8'>
          <form onSubmit={handleSearch} className='relative w-full'>
            <div className='relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400'
                aria-hidden='true'
              />
              <input
                type='text'
                placeholder='Search across POps...'
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  'w-full pl-10 pr-4 py-2 text-sm',
                  'bg-gray-50 border border-gray-200 rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
                  'placeholder:text-gray-500 dark:placeholder:text-gray-400'
                )}
                aria-label='Global search'
              />
            </div>
          </form>
        </div>
      )}

      {/* Right section: Actions and user menu */}
      <div className='flex items-center gap-2 shrink-0'>
        {/* Mobile search button */}
        {showSearch && (
          <Button variant='ghost' size='sm' className='md:hidden' aria-label='Search'>
            <Search className='h-5 w-5' />
          </Button>
        )}

        {/* Custom actions */}
        {customActions}

        {/* Notifications */}
        {showNotifications && authState.isAuthenticated && (
          <div className='relative'>
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleNotifications}
              className='relative'
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Bell className='h-5 w-5' />
              {unreadCount > 0 && (
                <span
                  className={cn(
                    'absolute -top-1 -right-1 h-4 w-4 text-xs font-medium',
                    'bg-red-500 text-white rounded-full flex items-center justify-center',
                    'animate-pulse'
                  )}
                  aria-hidden='true'
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>

            {showNotificationCenter && (
              <div className='absolute right-0 top-full mt-2 z-50'>
                <NotificationCenter
                  notifications={[]}
                  onClose={() => setShowNotificationCenter(false)}
                />
              </div>
            )}
          </div>
        )}

        {/* User menu */}
        {authState.isAuthenticated ? (
          <UserMenu />
        ) : (
          <Button variant='default' size='sm' onClick={() => (window.location.href = '/login')}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
