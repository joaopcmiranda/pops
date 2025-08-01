import { Search, Bell, User, Menu } from 'lucide-react'
import { Button } from './ui/button'

interface AppHeaderProps {
  onMenuClick?: () => void
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className='app-header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button
          variant='ghost'
          onClick={onMenuClick}
          className='md:hidden'
          style={{ padding: '0.5rem' }}
        >
          <Menu style={{ width: '20px', height: '20px' }} />
        </Button>
        <h1 className='header-title'>Dashboard</h1>
      </div>

      <div className='header-actions'>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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
            }}
          />
        </div>

        <Button variant='ghost' style={{ padding: '0.5rem' }}>
          <Bell style={{ width: '20px', height: '20px' }} />
        </Button>

        <Button variant='ghost' style={{ padding: '0.5rem' }}>
          <User style={{ width: '20px', height: '20px' }} />
        </Button>
      </div>
    </header>
  )
}
