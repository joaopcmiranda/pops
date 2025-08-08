/**
 * @fileoverview User Menu Component for POps Applications
 *
 * This component provides user profile management, settings, and logout functionality
 * that works consistently across all POps applications.
 */

import React, { useState } from 'react'
import { User, Settings, LogOut, Moon, Sun, Monitor, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from '@pops/ui'
import { cn } from '@pops/ui'
import { useAppSuite } from '../../contexts/AppSuiteContext'
import { navigateToApp } from '../../config/domains'

/**
 * User Menu Component
 *
 * Provides user profile access, theme switching, settings, and logout functionality.
 * Integrates with the global AppSuite context for consistent user management.
 *
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <UserMenu />
 * ```
 */
export function UserMenu() {
  const { authState, logout } = useAppSuite()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  const { user } = authState

  if (!user) {
    return null
  }

  /**
   * Get user initials for avatar fallback
   */
  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
    setIsOpen(false)
  }

  /**
   * Handle theme change
   */
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)

    // Apply theme immediately
    const root = document.documentElement

    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else if (newTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (mediaQuery.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    // Save preference (this would normally sync to user preferences)
    localStorage.setItem('pops-theme', newTheme)
  }

  /**
   * Navigate to profile/settings
   */
  const handleProfileClick = () => {
    navigateToApp('accounts', '/profile')
    setIsOpen(false)
  }

  const handleSettingsClick = () => {
    navigateToApp('accounts', '/settings')
    setIsOpen(false)
  }

  /**
   * Get theme icon
   */
  const getThemeIcon = (themeOption: 'light' | 'dark' | 'system') => {
    switch (themeOption) {
      case 'light':
        return <Sun className='h-4 w-4' />
      case 'dark':
        return <Moon className='h-4 w-4' />
      case 'system':
        return <Monitor className='h-4 w-4' />
      default:
        return <Monitor className='h-4 w-4' />
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            'flex items-center gap-2 px-2 py-1.5 h-auto',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          )}
          aria-label={`User menu for ${user.name}`}
          aria-expanded={isOpen}
          aria-haspopup='menu'
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
            <AvatarFallback className='text-sm font-medium'>
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className='hidden sm:block text-left min-w-0'>
            <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
              {user.name}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>{user.email}</p>
          </div>

          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200 hidden sm:block',
              isOpen && 'rotate-180'
            )}
            aria-hidden='true'
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' sideOffset={4}>
        {/* User info header */}
        <DropdownMenuLabel className='px-2 py-2'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
              <AvatarFallback className='text-sm font-medium'>
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                {user.name}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem onClick={handleProfileClick} className='cursor-pointer'>
          <User className='h-4 w-4 mr-3' />
          <span>Profile</span>
        </DropdownMenuItem>

        {/* Theme switcher */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='cursor-pointer'>
            {getThemeIcon(theme)}
            <span className='ml-3'>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => handleThemeChange('light')}
              className={cn('cursor-pointer', theme === 'light' && 'bg-gray-100 dark:bg-gray-800')}
            >
              <Sun className='h-4 w-4 mr-3' />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleThemeChange('dark')}
              className={cn('cursor-pointer', theme === 'dark' && 'bg-gray-100 dark:bg-gray-800')}
            >
              <Moon className='h-4 w-4 mr-3' />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleThemeChange('system')}
              className={cn('cursor-pointer', theme === 'system' && 'bg-gray-100 dark:bg-gray-800')}
            >
              <Monitor className='h-4 w-4 mr-3' />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Settings */}
        <DropdownMenuItem onClick={handleSettingsClick} className='cursor-pointer'>
          <Settings className='h-4 w-4 mr-3' />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className='cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400'
        >
          <LogOut className='h-4 w-4 mr-3' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
