import type { Trip } from '@/types/trip'
import { apiClient } from '@/utils/api-client'
import { TripType, TripStatus } from '@pops/types'

export class TripService {
  // Get all trips
  static async getAllTrips(): Promise<Trip[]> {
    const trips = await apiClient.trips.list()
    return trips.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  // Get trip by ID
  static async getTripById(id: string): Promise<Trip | null> {
    try {
      const trip = await apiClient.trips.getById(id)
      return trip
    } catch (error) {
      console.error('Failed to get trip by ID:', error)
      return null
    }
  }

  // Get trips by status
  static async getTripsByStatus(status: string): Promise<Trip[]> {
    const trips = await apiClient.trips.list({
      filters: { status: [status as TripStatus] },
    })
    return trips
  }

  // Get trips by type
  static async getTripsByType(type: string): Promise<Trip[]> {
    const trips = await apiClient.trips.list({
      filters: { type: [type as TripType] },
    })
    return trips
  }

  // Add new trip
  static async addTrip(trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    return await apiClient.trips.create(trip)
  }

  // Update trip
  static async updateTrip(
    id: string,
    updates: Partial<Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Trip> {
    return await apiClient.trips.update({ id, ...updates })
  }

  // Delete trip
  static async deleteTrip(id: string): Promise<void> {
    await apiClient.trips.delete(id)
  }

  // Get upcoming trips
  static async getUpcomingTrips(): Promise<Trip[]> {
    const trips = await apiClient.trips.list()
    const now = new Date()
    return trips
      .filter(trip => new Date(trip.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  // Get active trips
  static async getActiveTrips(): Promise<Trip[]> {
    const trips = await apiClient.trips.list()
    const now = new Date()
    return trips.filter(trip => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return start <= now && end >= now
    })
  }

  // Get trip statistics
  static async getTripStats() {
    const trips = await apiClient.trips.list()

    const byStatus = trips.reduce(
      (acc, trip) => {
        acc[trip.status] = (acc[trip.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const byType = trips.reduce(
      (acc, trip) => {
        acc[trip.type] = (acc[trip.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const upcoming = trips.filter(trip => new Date(trip.startDate) > new Date())
    const now = new Date()
    const active = trips.filter(trip => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return start <= now && end >= now
    })

    return {
      total: trips.length,
      byStatus,
      byType,
      upcoming: upcoming.length,
      active: active.length,
    }
  }

  // Search trips
  static async searchTrips(query: string): Promise<Trip[]> {
    // Note: The API client would need to support search functionality
    // For now, we'll get all trips and filter client-side
    const trips = await apiClient.trips.list()
    return trips.filter(
      trip =>
        trip.title.toLowerCase().includes(query.toLowerCase()) ||
        trip.destination.toLowerCase().includes(query.toLowerCase()) ||
        trip.country.toLowerCase().includes(query.toLowerCase())
    )
  }
}
