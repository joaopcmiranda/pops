import { Search, Bell, User, ChevronDown, MapPin } from 'lucide-react'
import { Button } from './ui/button/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { SidebarTrigger } from './ui/sidebar/sidebar.tsx'

interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  type: string
  status: string
}

interface AppHeaderProps {
  currentTrip?: Trip | null
  onTripSwitch?: () => void
}

export function AppHeader({ currentTrip, onTripSwitch }: AppHeaderProps) {
  return (
    <header className='app-header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
        <SidebarTrigger className='md:hidden' />

        {currentTrip ? (
          <div
            onClick={onTripSwitch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              minWidth: 0,
              flex: '0 1 auto',
              touchAction: 'manipulation',
            }}
            className='trip-selector-header'
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onTripSwitch?.()
              }
            }}
          >
            <MapPin style={{ width: '16px', height: '16px', color: '#3b82f6', flexShrink: 0 }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentTrip.title}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentTrip.destination}
              </div>
            </div>
            <ChevronDown
              style={{ width: '16px', height: '16px', color: '#64748b', flexShrink: 0 }}
            />
          </div>
        ) : (
          <h1
            className='header-title'
            style={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Trip Organizer
          </h1>
        )}
      </div>

      <div className='header-actions'>
        <div className='hidden sm:flex' style={{ position: 'relative', alignItems: 'center' }}>
          <Search
            style={{
              position: 'absolute',
              left: '12px',
              width: '16px',
              height: '16px',
              color: '#64748b',
            }}
          />
          <input
            type='text'
            placeholder='Search your trip...'
            style={{
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              backgroundColor: '#f8fafc',
              fontSize: '0.875rem',
              width: '240px',
              outline: 'none',
              transition: 'width 0.2s ease',
            }}
            onFocus={e => {
              if (window.innerWidth <= 768) {
                e.target.style.width = '200px'
              }
            }}
            onBlur={e => {
              if (window.innerWidth <= 768) {
                e.target.style.width = '160px'
              }
            }}
          />
        </div>

        <Button
          variant='ghost'
          className='sm:hidden'
          style={{
            padding: '0.5rem',
            minHeight: '40px',
            minWidth: '40px',
            touchAction: 'manipulation',
          }}
          aria-label='Search'
        >
          <Search style={{ width: '18px', height: '18px' }} />
        </Button>

        <Button
          variant='ghost'
          style={{
            padding: '0.5rem',
            minHeight: '40px',
            minWidth: '40px',
            touchAction: 'manipulation',
          }}
          aria-label='Notifications'
        >
          <Bell style={{ width: '20px', height: '20px' }} />
        </Button>

        <Avatar className='h-8 w-8 cursor-pointer'>
          <AvatarImage src='/api/placeholder/32/32' alt='User' />
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
