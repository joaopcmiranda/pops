import { Plus, MapPin } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button/button.tsx'

interface EmptyTripsStateProps {
  onCreateTrip: () => void
}

export function EmptyTripsState({ onCreateTrip }: EmptyTripsStateProps) {
  return (
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
        <Button onClick={onCreateTrip}>
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Create Your First Trip
        </Button>
      </CardContent>
    </Card>
  )
}
