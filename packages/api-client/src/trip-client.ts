import {
  type Trip,
  type TripTemplate,
  type CreateTripInput,
  type UpdateTripInput,
  type TripListInput,
  type TripTemplateListInput,
  tripSchema,
  tripTemplateSchema,
  createTripSchema,
  updateTripSchema,
  tripListInputSchema,
  tripTemplateListInputSchema,
} from '@pops/types'
import { HttpClient } from './http-client'
import { z } from 'zod'

export class TripClient {
  constructor(private httpClient: HttpClient) {}

  async list(input?: TripListInput): Promise<Trip[]> {
    const validatedInput = input ? tripListInputSchema.parse(input) : undefined
    const endpoint = validatedInput
      ? `/trips?${new URLSearchParams(this.serializeListInput(validatedInput)).toString()}`
      : '/trips'

    return this.httpClient.getValidated(endpoint, z.array(tripSchema))
  }

  async get(id: string): Promise<Trip | null> {
    try {
      return await this.httpClient.getValidated(`/trips/${id}`, tripSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async create(input: CreateTripInput): Promise<Trip> {
    return this.httpClient.postValidated('/trips', input, createTripSchema, tripSchema)
  }

  async update(input: UpdateTripInput): Promise<Trip> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/trips/${id}`,
      updateData,
      updateTripSchema.omit({ id: true }),
      tripSchema
    )
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/trips/${id}`)
  }

  async getTemplates(input?: TripTemplateListInput): Promise<TripTemplate[]> {
    const validatedInput = input ? tripTemplateListInputSchema.parse(input) : undefined
    const endpoint = validatedInput
      ? `/trips/templates?${new URLSearchParams(this.serializeTemplateInput(validatedInput)).toString()}`
      : '/trips/templates'

    return this.httpClient.getValidated(endpoint, z.array(tripTemplateSchema))
  }

  async getStats(): Promise<{
    totalTrips: number
    upcomingTrips: number
    activeTrips: number
    byStatus: Record<string, number>
    byType: Record<string, number>
    byCountry: Record<string, number>
  }> {
    return this.httpClient.get('/trips/stats')
  }

  private serializeListInput(input: TripListInput): Record<string, string> {
    const params: Record<string, string> = {}

    if (input.filters) {
      if (input.filters.status) {
        params.status = input.filters.status.join(',')
      }
      if (input.filters.type) {
        params.type = input.filters.type.join(',')
      }
      if (input.filters.destination) {
        params.destination = input.filters.destination
      }
      if (input.filters.country) {
        params.country = input.filters.country
      }
      if (input.filters.dateRange) {
        params.startDate = input.filters.dateRange.start
        params.endDate = input.filters.dateRange.end
      }
      if (input.filters.tags) {
        params.tags = input.filters.tags.join(',')
      }
      if (input.filters.collaborator !== undefined) {
        params.collaborator = input.filters.collaborator.toString()
      }
    }

    if (input.sortBy) {
      params.sortBy = input.sortBy
    }
    if (input.sortOrder) {
      params.sortOrder = input.sortOrder
    }
    if (input.limit !== undefined) {
      params.limit = input.limit.toString()
    }
    if (input.offset !== undefined) {
      params.offset = input.offset.toString()
    }

    return params
  }

  private serializeTemplateInput(input: TripTemplateListInput): Record<string, string> {
    const params: Record<string, string> = {}

    if (input.type) {
      params.type = input.type
    }
    if (input.destination) {
      params.destination = input.destination
    }
    if (input.limit !== undefined) {
      params.limit = input.limit.toString()
    }

    return params
  }
}
