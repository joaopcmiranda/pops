import type { Trip } from '@/types/trip'
import { trpcClient } from '@/utils/trpc'
import type { TripType, TripStatus } from '@pops/shared-contracts'

export class TripService {
  // Get all trips
  static async getAllTrips(): Promise<Trip[]> {
    const trips = await trpcClient.trip.list.query()
    return trips.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  // Get trip by ID
  static async getTripById(id: string): Promise<Trip | null> {
    try {
      const trip = await trpcClient.trip.getById.query({ id })
      return trip
    } catch (error) {
      console.error('Failed to get trip by ID:', error)
      return null
    }
  }

  // Get trips by status
  static async getTripsByStatus(status: string): Promise<Trip[]> {
    const trips = await trpcClient.trip.list.query({ status: status as TripStatus })
    return trips
  }

  // Get trips by type
  static async getTripsByType(type: string): Promise<Trip[]> {
    const trips = await trpcClient.trip.list.query({ type: type as TripType })
    return trips
  }

  // Add new trip
  static async addTrip(trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    return await trpcClient.trip.create.mutate(trip)
  }

  // Update trip
  static async updateTrip(
    id: string,
    updates: Partial<Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Trip> {
    return await trpcClient.trip.update.mutate({ id, ...updates })
  }

  // Delete trip
  static async deleteTrip(id: string): Promise<void> {
    await trpcClient.trip.delete.mutate({ id })
  }

  // Get upcoming trips
  static async getUpcomingTrips(): Promise<Trip[]> {
    const trips = await trpcClient.trip.list.query()
    const now = new Date()
    return trips
      .filter(trip => new Date(trip.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  // Get active trips
  static async getActiveTrips(): Promise<Trip[]> {
    const trips = await trpcClient.trip.list.query()
    const now = new Date()
    return trips.filter(trip => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return start <= now && end >= now
    })
  }

  // Get trip statistics
  static async getTripStats() {
    const trips = await trpcClient.trip.list.query()

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
    const trips = await trpcClient.trip.list.query({ search: query })
    return trips
  }
}
