import {
  type ItineraryItem,
  type ItineraryDay,
  type ItineraryFilters,
  type CreateItineraryItemInput,
  type UpdateItineraryItemInput,
  itineraryItemSchema,
  itineraryDaySchema,
  itineraryFiltersSchema,
  createItineraryItemSchema,
  updateItineraryItemSchema,
} from '@pops/types'
import { HttpClient } from './http-client'
import { z } from 'zod'

export class ItineraryClient {
  constructor(private httpClient: HttpClient) {}

  async list(tripId?: string, filters?: ItineraryFilters): Promise<ItineraryItem[]> {
    const validatedFilters = filters ? itineraryFiltersSchema.parse(filters) : undefined

    const params = new URLSearchParams()
    if (tripId) {
      params.append('tripId', tripId)
    }
    if (validatedFilters) {
      if (validatedFilters.types) {
        params.append('types', validatedFilters.types.join(','))
      }
      if (validatedFilters.dateRange) {
        params.append('startDate', validatedFilters.dateRange.start.toISOString())
        params.append('endDate', validatedFilters.dateRange.end.toISOString())
      }
      if (validatedFilters.location) {
        params.append('location', validatedFilters.location)
      }
      if (validatedFilters.attendees) {
        params.append('attendees', validatedFilters.attendees.join(','))
      }
      if (validatedFilters.status) {
        params.append('status', validatedFilters.status.join(','))
      }
      if (validatedFilters.tags) {
        params.append('tags', validatedFilters.tags.join(','))
      }
    }

    const endpoint = `/itinerary${params.toString() ? `?${params.toString()}` : ''}`
    return this.httpClient.getValidated(endpoint, z.array(itineraryItemSchema))
  }

  async get(id: string): Promise<ItineraryItem | null> {
    try {
      return await this.httpClient.getValidated(`/itinerary/${id}`, itineraryItemSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async create(input: CreateItineraryItemInput): Promise<ItineraryItem> {
    return this.httpClient.postValidated(
      '/itinerary',
      input,
      createItineraryItemSchema,
      itineraryItemSchema
    )
  }

  async update(input: UpdateItineraryItemInput): Promise<ItineraryItem> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/itinerary/${id}`,
      updateData,
      updateItineraryItemSchema.omit({ id: true }),
      itineraryItemSchema
    )
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/itinerary/${id}`)
  }

  async getByDay(tripId: string, startDate?: Date, endDate?: Date): Promise<ItineraryDay[]> {
    const params = new URLSearchParams({ tripId })
    if (startDate) {
      params.append('startDate', startDate.toISOString())
    }
    if (endDate) {
      params.append('endDate', endDate.toISOString())
    }

    return this.httpClient.getValidated(
      `/itinerary/by-day?${params.toString()}`,
      z.array(itineraryDaySchema)
    )
  }

  async getStats(tripId?: string): Promise<{
    totalItems: number
    byType: Record<string, number>
    byStatus: Record<string, number>
    totalBudget: number
    timeSpan: {
      start: Date
      end: Date
      totalDays: number
    }
  }> {
    const params = tripId ? `?tripId=${tripId}` : ''
    return this.httpClient.get(`/itinerary/stats${params}`)
  }
}
