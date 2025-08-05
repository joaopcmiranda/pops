import type { Trip } from '@/types/trip'

// Sample trip data for development
const sampleTrips: Trip[] = [
  {
    id: 'rio-2024',
    title: 'Rio de Janeiro Adventure',
    destination: 'Rio de Janeiro, Brazil',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    type: 'leisure',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
  },
  {
    id: 'tokyo-business',
    title: 'Tokyo Business Trip',
    destination: 'Tokyo, Japan',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    type: 'business',
    status: 'active',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=240&fit=crop',
  },
  {
    id: 'london-family',
    title: 'London Family Vacation',
    destination: 'London, UK',
    startDate: '2024-07-20',
    endDate: '2024-07-30',
    type: 'family',
    status: 'planning',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=240&fit=crop',
  },
  {
    id: 'paris-honeymoon',
    title: 'Paris Honeymoon',
    destination: 'Paris, France',
    startDate: '2023-10-05',
    endDate: '2023-10-15',
    type: 'honeymoon',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=240&fit=crop',
  },
  {
    id: 'iceland-adventure',
    title: 'Iceland Northern Lights',
    destination: 'Reykjavik, Iceland',
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    type: 'adventure',
    status: 'planning',
    coverImage: 'https://images.unsplash.com/photo-1539066319756-03b4bbb67163?w=400&h=240&fit=crop',
  },
  {
    id: 'nyc-cultural',
    title: 'NYC Cultural Weekend',
    destination: 'New York, USA',
    startDate: '2024-05-03',
    endDate: '2024-05-06',
    type: 'cultural',
    status: 'confirmed',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=240&fit=crop',
  },
]

export class TripService {
  private static trips: Trip[] = [...sampleTrips]

  // Get all trips
  static getAllTrips(): Trip[] {
    return [...this.trips].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  }

  // Get trip by ID
  static getTripById(id: string): Trip | null {
    return this.trips.find(trip => trip.id === id) || null
  }

  // Get trips by status
  static getTripsByStatus(status: string): Trip[] {
    return this.trips.filter(trip => trip.status === status)
  }

  // Get trips by type
  static getTripsByType(type: string): Trip[] {
    return this.trips.filter(trip => trip.type === type)
  }

  // Add new trip
  static addTrip(trip: Trip): void {
    this.trips.push(trip)
  }

  // Update trip
  static updateTrip(id: string, updates: Partial<Trip>): boolean {
    const index = this.trips.findIndex(trip => trip.id === id)
    if (index === -1) return false

    this.trips[index] = { ...this.trips[index], ...updates }
    return true
  }

  // Delete trip
  static deleteTrip(id: string): boolean {
    const index = this.trips.findIndex(trip => trip.id === id)
    if (index === -1) return false

    this.trips.splice(index, 1)
    return true
  }

  // Get upcoming trips
  static getUpcomingTrips(): Trip[] {
    const now = new Date()
    return this.trips
      .filter(trip => new Date(trip.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  // Get active trips
  static getActiveTrips(): Trip[] {
    const now = new Date()
    return this.trips.filter(trip => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return start <= now && end >= now
    })
  }

  // Get trip statistics
  static getTripStats() {
    const byStatus = this.trips.reduce(
      (acc, trip) => {
        acc[trip.status] = (acc[trip.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const byType = this.trips.reduce(
      (acc, trip) => {
        acc[trip.type] = (acc[trip.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return {
      total: this.trips.length,
      byStatus,
      byType,
      upcoming: this.getUpcomingTrips().length,
      active: this.getActiveTrips().length,
    }
  }

  // Search trips
  static searchTrips(query: string): Trip[] {
    const searchQuery = query.toLowerCase()
    return this.trips.filter(
      trip =>
        trip.title.toLowerCase().includes(searchQuery) ||
        trip.destination.toLowerCase().includes(searchQuery) ||
        trip.type.toLowerCase().includes(searchQuery)
    )
  }
}
