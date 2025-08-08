import { useState } from 'react'
import { Plane } from 'lucide-react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

type AuthMode = 'login' | 'register'

export function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <Plane
              size={32}
              style={{
                color: '#3b82f6',
                transform: 'rotate(-45deg)',
              }}
            />
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Trip Organizer
            </h1>
          </div>
          <p
            style={{
              color: '#64748b',
              fontSize: '1rem',
              margin: 0,
            }}
          >
            Your personal travel planning companion
          </p>
        </div>

        {/* Auth Forms */}
        {authMode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    </div>
  )
}
