import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthPage } from './AuthPage'
import { Plane } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ position: 'relative' }}>
            <Plane
              size={48}
              style={{
                color: '#3b82f6',
                transform: 'rotate(-45deg)',
                animation: 'pulse 2s infinite',
              }}
            />
          </div>
          <p
            style={{
              color: '#64748b',
              fontSize: '1rem',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Loading your trip organizer...
          </p>
        </div>
      </div>
    )
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />
  }

  // Show protected content if authenticated
  return <>{children}</>
}
