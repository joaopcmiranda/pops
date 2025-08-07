import { Search, Bell, User } from 'lucide-react'
import { Button, Avatar, AvatarFallback } from '@pops/ui'
import { SidebarTrigger } from '@pops/ui'

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title = 'Trip Organizer' }: AppHeaderProps) {
  return (
    <header className='app-header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
        <SidebarTrigger className="md:hidden" />
        
        <h1
          className='header-title'
          style={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b'
          }}
        >
          {title}
        </h1>
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
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
