import { TripCard } from './TripCard'
import { NewTripCard } from './NewTripCard'

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

interface TripGridProps {
  trips: Trip[]
  selectedTripId?: string | null
  onTripSelect: (tripId: string) => void
  onNewTrip: () => void
  onTripSettings?: (tripId: string) => void
  showNewTripCard?: boolean
}

export function TripGrid({
  trips,
  selectedTripId,
  onTripSelect,
  onNewTrip,
  onTripSettings,
  showNewTripCard = true,
}: TripGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {showNewTripCard && <NewTripCard onClick={onNewTrip} />}

      {trips.map(trip => (
        <TripCard
          key={trip.id}
          trip={trip}
          isSelected={selectedTripId === trip.id}
          onSelect={onTripSelect}
          onSettings={onTripSettings}
        />
      ))}
    </div>
  )
}
