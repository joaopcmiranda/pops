import { MapPin, Calendar, Settings } from 'lucide-react'
import { Card, CardContent, Button, Badge } from '@pops/ui'

interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  type: string
  status: string
  coverImage?: string
}

interface TripCardProps {
  trip: Trip
  isSelected?: boolean
  onSelect: (tripId: string) => void
  onSettings?: (tripId: string) => void
}

export function TripCard({ trip, isSelected = false, onSelect, onSettings }: TripCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getStatusVariant = (
    status: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'active':
      case 'confirmed':
        return 'default'
      case 'upcoming':
      case 'planning':
        return 'secondary'
      case 'completed':
        return 'outline'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getTypeVariant = (type: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (type) {
      case 'business':
        return 'default'
      case 'adventure':
      case 'backpacking':
        return 'secondary'
      case 'family':
      case 'leisure':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <Card
      className={`card-hover cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onSelect(trip.id)}
      style={{
        transition: 'all 0.2s ease',
        transform: isSelected ? 'translateY(-2px)' : 'none',
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
          <Badge variant={getStatusVariant(trip.status)}>{trip.status}</Badge>
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
        <Badge variant={getTypeVariant(trip.type)}>{trip.type} trip</Badge>

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
              onSelect(trip.id)
            }}
          >
            Open Trip
          </Button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onSettings && (
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
                  onSettings(trip.id)
                }}
              >
                <Settings style={{ width: '16px', height: '16px' }} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
