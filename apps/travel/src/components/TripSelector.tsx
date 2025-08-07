import { useState, useEffect } from 'react'
import { Plus, MapPin, Calendar, Settings } from 'lucide-react'
import { Card, CardContent, Button } from '@pops/ui'
import { TripService } from '@/services/tripService'
import { useTripContext } from '@/hooks/useTripContext'
import type { Trip } from '@pops/types'

interface TripSelectorProps {
  onTripSelect: (tripId: string) => void
  onNewTrip: () => void
}

export function TripSelector({ onTripSelect, onNewTrip }: TripSelectorProps) {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const { setShowNewTripModal } = useTripContext()

  // Load trips on mount
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const allTrips = await TripService.getAllTrips()
        setTrips(allTrips)
      } catch (error) {
        console.error('Failed to load trips:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const handleTripSelect = (tripId: string) => {
    setSelectedTrip(tripId)
    onTripSelect(tripId)
  }

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

  if (loading) {
    return (
      <div className='trip-selector animate-fade-in'>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ color: '#64748b' }}>Loading your trips...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='trip-selector animate-fade-in mobile-scroll'
      style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          className='mobile-title'
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '0.5rem',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Your Trips ✈️
        </h1>
        <p
          className='mobile-subtitle'
          style={{ color: '#64748b', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}
        >
          Select a trip to manage, or create a new adventure
        </p>
      </div>

      {/* New Trip Button */}
      <div
        className='card-hover cursor-pointer touch-target btn-mobile'
        onClick={() => {
          console.log('Create New Trip clicked!') // Debug log
          setShowNewTripModal(true)
          onNewTrip()
        }}
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setShowNewTripModal(true)
            onNewTrip()
          }
        }}
        style={{
          marginBottom: '2rem',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: 'clamp(1rem, 4vw, 2rem)',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          touchAction: 'manipulation',
        }}
      >
        <Plus style={{ width: '48px', height: '48px', color: '#3b82f6', margin: '0 auto 1rem' }} />
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '0.5rem',
          }}
        >
          Create New Trip
        </h3>
        <p style={{ color: '#64748b' }}>Start planning your next adventure</p>
      </div>

      {/* Trips Grid */}
      {trips.length === 0 ? (
        <Card>
          <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
            <MapPin
              style={{ width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 1rem' }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '0.5rem',
              }}
            >
              No trips yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Create your first trip to get started with planning your adventure
            </p>
            <Button onClick={onNewTrip}>
              <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className='app-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {trips.map((trip: Trip) => (
            <Card
              key={trip.id}
              className={`card-hover cursor-pointer ${selectedTrip === trip.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleTripSelect(trip.id)}
              style={{
                transition: 'all 0.2s ease',
                transform: selectedTrip === trip.id ? 'translateY(-2px)' : 'none',
              }}
            >
              <CardContent style={{ padding: '1.5rem' }}>
                {/* Cover Image */}
                {trip.coverImage && (
                  <div
                    style={{
                      height: '120px',
                      backgroundImage: `url(${trip.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                    }}
                  />
                )}

                {/* Trip Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '0.25rem',
                        lineHeight: '1.3',
                      }}
                    >
                      {trip.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#64748b',
                        fontSize: '0.875rem',
                      }}
                    >
                      <MapPin style={{ width: '14px', height: '14px', marginRight: '0.25rem' }} />
                      {trip.destination}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    style={{
                      backgroundColor: getStatusColor(trip.status) + '20',
                      color: getStatusColor(trip.status),
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                    }}
                  >
                    {trip.status}
                  </div>
                </div>

                {/* Trip Details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}
                >
                  <Calendar style={{ width: '14px', height: '14px', marginRight: '0.25rem' }} />
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </div>

                {/* Trip Type */}
                <div
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    display: 'inline-block',
                  }}
                >
                  {trip.type} trip
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0',
                  }}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={e => {
                      e.stopPropagation()
                      handleTripSelect(trip.id)
                    }}
                  >
                    Open Trip
                  </Button>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        cursor: 'pointer',
                      }}
                      onClick={e => {
                        e.stopPropagation()
                        // TODO: Open trip settings
                      }}
                    >
                      <Settings style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
