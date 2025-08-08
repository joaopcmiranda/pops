import { useState } from 'react'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@pops/ui'

export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant='outline'
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a' }}>
            {user.name}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</span>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: '#64748b',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'transparent',
              zIndex: 40,
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              zIndex: 50,
              minWidth: '200px',
              padding: '0.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <User size={16} style={{ color: '#64748b' }} />
              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#0f172a',
                    margin: 0,
                  }}
                >
                  {user.name}
                </p>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    margin: 0,
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#dc2626',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#fef2f2')}
              onMouseLeave={e => (e.target.style.backgroundColor = 'transparent')}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
