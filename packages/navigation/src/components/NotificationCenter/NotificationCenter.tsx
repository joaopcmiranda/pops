/**
 * @fileoverview Notification Center Component for POps Applications
 *
 * This component displays notifications from across all POps applications
 * in a unified interface. Supports marking as read, navigation to source,
 * and real-time updates.
 */

import React from 'react'
import {
  X,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  ExternalLink,
  MoreHorizontal,
} from 'lucide-react'
import { Card, CardContent, CardHeader, Button, ScrollArea, Separator } from '@pops/ui'
import { cn } from '@pops/ui'
import { useAppSuite } from '../../contexts/AppSuiteContext'
import { POPS_APP_META, navigateToApp } from '../../config/domains'
import type { NotificationCenterProps, PopsNotification } from '../../types'

/**
 * Get notification type icon and styling
 */
function getNotificationTypeConfig(type: PopsNotification['type']) {
  const configs = {
    info: {
      icon: Info,
      iconClass: 'text-blue-500',
      bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    },
    success: {
      icon: CheckCircle,
      iconClass: 'text-green-500',
      bgClass: 'bg-green-50 dark:bg-green-900/20',
    },
    warning: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-500',
      bgClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    error: {
      icon: XCircle,
      iconClass: 'text-red-500',
      bgClass: 'bg-red-50 dark:bg-red-900/20',
    },
  }

  return configs[type] || configs.info
}

/**
 * Format relative time for notifications
 */
function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const notificationTime = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  }
}

/**
 * Individual notification item component
 */
function NotificationItem({
  notification,
  onMarkAsRead,
  onNotificationClick,
}: {
  notification: PopsNotification
  onMarkAsRead?: (id: string) => void
  onNotificationClick?: (notification: PopsNotification) => void
}) {
  const config = getNotificationTypeConfig(notification.type)
  const Icon = config.icon
  const appMeta = POPS_APP_META[notification.app]

  /**
   * Handle notification click
   */
  const handleClick = () => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }

    if (onNotificationClick) {
      onNotificationClick(notification)
    } else if (notification.actionUrl) {
      // If it's a POps app URL, navigate within the app
      try {
        const url = new URL(notification.actionUrl)
        const path = url.pathname + url.search
        navigateToApp(notification.app, path)
      } catch {
        // Fallback to direct navigation
        window.open(notification.actionUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  /**
   * Handle mark as read button
   */
  const handleMarkAsRead = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (onMarkAsRead) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <div
      className={cn(
        'flex gap-3 p-3 rounded-lg cursor-pointer transition-colors',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        !notification.read && config.bgClass,
        notification.actionUrl && 'cursor-pointer'
      )}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`Notification from ${appMeta?.name}: ${notification.title}`}
    >
      {/* App icon and notification type */}
      <div className='flex flex-col items-center gap-1 shrink-0'>
        <span className='text-sm' role='img' aria-label={appMeta?.name}>
          {appMeta?.icon}
        </span>
        <Icon className={cn('h-3 w-3', config.iconClass)} aria-hidden='true' />
      </div>

      {/* Notification content */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <h4
              className={cn(
                'text-sm font-medium truncate',
                !notification.read
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {notification.title}
            </h4>

            <p
              className={cn(
                'text-sm mt-1 line-clamp-2',
                !notification.read
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-gray-500 dark:text-gray-500'
              )}
            >
              {notification.message}
            </p>

            <div className='flex items-center gap-2 mt-2'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {formatRelativeTime(notification.timestamp)}
              </span>

              {notification.actionUrl && (
                <ExternalLink className='h-3 w-3 text-gray-400' aria-hidden='true' />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-1 shrink-0'>
            {!notification.read && (
              <>
                <div className='w-2 h-2 bg-blue-500 rounded-full' aria-label='Unread' />
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 w-6 p-0'
                  onClick={handleMarkAsRead}
                  aria-label='Mark as read'
                >
                  <CheckCircle className='h-3 w-3' />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Notification Center Component
 *
 * Displays notifications from all POps applications in a unified interface.
 * Supports real-time updates, marking as read, and navigation to sources.
 *
 * @param props - Component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={notifications}
 *   onMarkAsRead={(id) => markAsRead(id)}
 *   onClose={() => setShowNotifications(false)}
 * />
 * ```
 */
export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onNotificationClick,
  maxVisible = 10,
  className,
  onClose,
}: NotificationCenterProps & { onClose?: () => void }) {
  const { markNotificationAsRead, clearAllNotifications, refreshNotifications } = useAppSuite()

  // Use provided callbacks or fall back to context methods
  const handleMarkAsRead = onMarkAsRead || markNotificationAsRead

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...notifications]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxVisible)

  const unreadCount = notifications.filter(n => !n.read).length

  /**
   * Handle clear all notifications
   */
  const handleClearAll = () => {
    clearAllNotifications()
  }

  /**
   * Handle refresh notifications
   */
  const handleRefresh = async () => {
    await refreshNotifications()
  }

  return (
    <Card className={cn('w-96 max-w-[calc(100vw-2rem)] shadow-lg', className)}>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Bell className='h-4 w-4' />
            <h3 className='font-semibold text-sm'>Notifications</h3>
            {unreadCount > 0 && (
              <span className='bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full'>
                {unreadCount}
              </span>
            )}
          </div>

          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='sm'
              className='h-6 w-6 p-0'
              onClick={handleRefresh}
              aria-label='Refresh notifications'
            >
              <MoreHorizontal className='h-3 w-3' />
            </Button>

            {onClose && (
              <Button
                variant='ghost'
                size='sm'
                className='h-6 w-6 p-0'
                onClick={onClose}
                aria-label='Close notifications'
              >
                <X className='h-3 w-3' />
              </Button>
            )}
          </div>
        </div>

        {notifications.length > 0 && (
          <div className='flex items-center gap-2 pt-2'>
            <Button variant='ghost' size='sm' className='h-6 text-xs' onClick={handleClearAll}>
              Clear all
            </Button>
            <Button variant='ghost' size='sm' className='h-6 text-xs' onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className='p-0'>
        {sortedNotifications.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <Bell className='h-8 w-8 text-gray-300 dark:text-gray-600 mb-2' />
            <p className='text-sm text-gray-500 dark:text-gray-400'>No notifications</p>
            <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>You're all caught up!</p>
          </div>
        ) : (
          <ScrollArea className='max-h-96'>
            <div className='px-3 pb-3'>
              {sortedNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onNotificationClick={onNotificationClick}
                  />
                  {index < sortedNotifications.length - 1 && <Separator className='my-2' />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
