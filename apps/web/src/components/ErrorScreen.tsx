import type { ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Wifi, Search } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

export type ErrorType = 'network' | 'notFound' | 'generic' | 'loading' | 'permission'

interface ErrorScreenProps {
  type?: ErrorType
  title?: string
  description?: string
  children?: ReactNode
  onRetry?: () => void
  onGoHome?: () => void
  showRetry?: boolean
  showHome?: boolean
}

export function ErrorScreen({
  type = 'generic',
  title,
  description,
  children,
  onRetry,
  onGoHome,
  showRetry = true,
  showHome = true,
}: ErrorScreenProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <Wifi style={{ width: '64px', height: '64px', color: '#ef4444' }} />,
          defaultTitle: 'Connection Problem',
          defaultDescription:
            'Unable to connect to the server. Please check your internet connection and try again.',
        }
      case 'notFound':
        return {
          icon: <Search style={{ width: '64px', height: '64px', color: '#64748b' }} />,
          defaultTitle: 'Content Not Found',
          defaultDescription: "The content you're looking for doesn't exist or has been moved.",
        }
      case 'loading':
        return {
          icon: <RefreshCw style={{ width: '64px', height: '64px', color: '#3b82f6' }} />,
          defaultTitle: 'Loading Error',
          defaultDescription: 'There was a problem loading this content. This might be temporary.',
        }
      case 'permission':
        return {
          icon: <AlertTriangle style={{ width: '64px', height: '64px', color: '#f59e0b' }} />,
          defaultTitle: 'Access Denied',
          defaultDescription: "You don't have permission to access this content.",
        }
      default:
        return {
          icon: <AlertTriangle style={{ width: '64px', height: '64px', color: '#ef4444' }} />,
          defaultTitle: 'Something went wrong',
          defaultDescription: 'An unexpected error occurred. Please try again.',
        }
    }
  }

  const config = getErrorConfig()
  const displayTitle = title || config.defaultTitle
  const displayDescription = description || config.defaultDescription

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div
      style={{
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      className='animate-fade-in'
    >
      <Card style={{ maxWidth: '500px', width: '100%' }}>
        <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ margin: '0 auto 1.5rem' }}>{config.icon}</div>

          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {displayTitle}
          </h2>

          <p
            style={{
              color: '#64748b',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}
          >
            {displayDescription}
          </p>

          {children && <div style={{ marginBottom: '2rem' }}>{children}</div>}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {showRetry && (
              <Button onClick={handleRetry} className='button-hover focus-ring'>
                <RefreshCw style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                Try Again
              </Button>
            )}

            {showHome && (
              <Button variant='outline' onClick={handleGoHome} className='button-hover focus-ring'>
                <Home style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Specialized error screen components
export function NetworkErrorScreen(props: Omit<ErrorScreenProps, 'type'>) {
  return <ErrorScreen {...props} type='network' />
}

export function NotFoundErrorScreen(props: Omit<ErrorScreenProps, 'type'>) {
  return <ErrorScreen {...props} type='notFound' />
}

export function LoadingErrorScreen(props: Omit<ErrorScreenProps, 'type'>) {
  return <ErrorScreen {...props} type='loading' />
}

export function PermissionErrorScreen(props: Omit<ErrorScreenProps, 'type'>) {
  return <ErrorScreen {...props} type='permission' />
}
