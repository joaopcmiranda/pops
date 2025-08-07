import { useState, useRef, useEffect } from 'react'
import { ChevronDown, MapPin, Check } from 'lucide-react'
import { Button } from '@pops/ui'
import type { Trip } from '@pops/types'

interface TripSelectorSidebarProps {
  currentTrip?: Trip | null
  availableTrips?: Trip[]
  onTripChange?: (trip: Trip) => void
  onCreateNew?: () => void
}

export function TripSelectorSidebar({
  currentTrip,
  availableTrips = [],
  onTripChange,
  onCreateNew,
}: TripSelectorSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (!dateObj || isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981'
      case 'upcoming':
        return '#3b82f6'
      case 'completed':
        return '#64748b'
      case 'planning':
        return '#f59e0b'
      case 'cancelled':
        return '#ef4444'
      default:
        return '#64748b'
    }
  }

  if (!currentTrip) {
    return (
      <div style={{ padding: '0.75rem' }}>
        <Button onClick={onCreateNew} className='w-full justify-start' variant='outline'>
          <MapPin style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Create Your First Trip
        </Button>
      </div>
    )
  }

  return (
    <div style={{ padding: '0.75rem', position: 'relative' }} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          cursor: 'pointer',
          border: '1px solid #e2e8f0',
          transition: 'all 0.2s ease',
          minHeight: '60px',
        }}
        className='hover:bg-gray-50 hover:border-gray-300'
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(currentTrip.status),
            flexShrink: 0,
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#0f172a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: '0.125rem',
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
            {currentTrip.destination} • {formatDate(currentTrip.startDate)}
          </div>
        </div>

        <ChevronDown
          style={{
            width: '16px',
            height: '16px',
            color: '#64748b',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0.75rem',
            right: '0.75rem',
            marginTop: '0.25rem',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 50,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          <div style={{ padding: '0.5rem' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#64748b',
                padding: '0.5rem',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: '0.5rem',
              }}
            >
              YOUR TRIPS
            </div>

            {availableTrips.map(trip => (
              <div
                key={trip.id}
                onClick={() => {
                  onTripChange?.(trip)
                  setIsOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: currentTrip.id === trip.id ? '#eff6ff' : 'transparent',
                }}
                className='hover:bg-gray-50'
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(trip.status),
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#0f172a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '0.125rem',
                    }}
                  >
                    {trip.title}
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
                    {trip.destination}
                  </div>
                </div>

                {currentTrip.id === trip.id && (
                  <Check style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
                )}
              </div>
            ))}

            <div
              style={{ borderTop: '1px solid #f1f5f9', marginTop: '0.5rem', paddingTop: '0.5rem' }}
            >
              <Button
                onClick={() => {
                  onCreateNew?.()
                  setIsOpen(false)
                }}
                variant='ghost'
                className='w-full justify-start text-sm'
              >
                <MapPin style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                Create New Trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
