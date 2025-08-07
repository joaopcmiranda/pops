import {
  type ContentItem,
  type ContentFilters,
  type CreateContentItemInput,
  type UpdateContentItemInput,
  contentItemSchema,
  contentFiltersSchema,
  createContentItemSchema,
  updateContentItemSchema,
} from '@pops/types'
import { HttpClient } from './http-client'
import { z } from 'zod'

export class ContentClient {
  constructor(private httpClient: HttpClient) {}

  async list(tripId?: string, filters?: ContentFilters): Promise<ContentItem[]> {
    const validatedFilters = filters ? contentFiltersSchema.parse(filters) : undefined

    const params = new URLSearchParams()
    if (tripId) {
      params.append('tripId', tripId)
    }
    if (validatedFilters) {
      if (validatedFilters.category) {
        params.append('category', validatedFilters.category)
      }
      if (validatedFilters.tags) {
        params.append('tags', validatedFilters.tags.join(','))
      }
      if (validatedFilters.search) {
        params.append('search', validatedFilters.search)
      }
    }

    const endpoint = `/content${params.toString() ? `?${params.toString()}` : ''}`
    return this.httpClient.getValidated(endpoint, z.array(contentItemSchema))
  }

  async get(id: string): Promise<ContentItem | null> {
    try {
      return await this.httpClient.getValidated(`/content/${id}`, contentItemSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async getBySlug(slug: string, tripId: string): Promise<ContentItem | null> {
    try {
      return await this.httpClient.getValidated(
        `/content/slug/${slug}?tripId=${tripId}`,
        contentItemSchema
      )
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async create(input: CreateContentItemInput): Promise<ContentItem> {
    return this.httpClient.postValidated(
      '/content',
      input,
      createContentItemSchema,
      contentItemSchema
    )
  }

  async update(input: UpdateContentItemInput): Promise<ContentItem> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/content/${id}`,
      updateData,
      updateContentItemSchema.omit({ id: true }),
      contentItemSchema
    )
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/content/${id}`)
  }
}
