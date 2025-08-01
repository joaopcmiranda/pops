import { Search, Bell, User, Menu, ChevronDown, MapPin } from 'lucide-react'
import { Button } from './ui/button'

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
  onMenuClick?: () => void
  currentTrip?: Trip | null
  onTripSwitch?: () => void
}

export function AppHeader({ onMenuClick, currentTrip, onTripSwitch }: AppHeaderProps) {
  return (
    <header className='app-header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <Button
          variant='ghost'
          onClick={onMenuClick}
          className='md:hidden'
          style={{ padding: '0.5rem' }}
        >
          <Menu style={{ width: '20px', height: '20px' }} />
        </Button>
        
        {currentTrip ? (
          <div 
            onClick={onTripSwitch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease'
            }}
            className="trip-selector-header"
          >
            <MapPin style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
                {currentTrip.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {currentTrip.destination}
              </div>
            </div>
            <ChevronDown style={{ width: '16px', height: '16px', color: '#64748b' }} />
          </div>
        ) : (
          <h1 className='header-title'>Trip Organizer</h1>
        )}
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
