import { eq, and, gte, lte, asc, sql } from 'drizzle-orm'
import { db, itineraryItems, contentItems } from '../db/index.js'
import { createId } from '@paralleldrive/cuid2'

export interface ItineraryItem {
  id: string
  title: string
  description?: string
  type: string
  startDate: Date
  endDate?: Date
  isAllDay: boolean
  status: string
  priority: string
  tags?: string[]
  notes?: string
  typeData?: Record<string, unknown>
  tripId: string
  userId: string
  locationId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateItineraryItemInput {
  title: string
  description?: string
  type: string
  startDate: Date
  endDate?: Date
  isAllDay?: boolean
  status?: string
  priority?: string
  tags?: string[]
  notes?: string
  typeData?: Record<string, unknown>
  tripId: string
  locationId?: string
}

export interface UpdateItineraryItemInput {
  id: string
  title?: string
  description?: string
  type?: string
  startDate?: Date
  endDate?: Date
  isAllDay?: boolean
  status?: string
  priority?: string
  tags?: string[]
  notes?: string
  typeData?: Record<string, unknown>
  locationId?: string
}

export interface ContentItem {
  id: string
  category: string
  title: string
  content: string
  slug: string
  tags?: string[]
  tripId: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateContentItemInput {
  category: string
  title: string
  content: string
  slug: string
  tags?: string[]
  tripId: string
}

export interface UpdateContentItemInput {
  id: string
  category?: string
  title?: string
  content?: string
  slug?: string
  tags?: string[]
}

export class ItineraryService {
  // Note: In a microservices architecture, trip access verification would typically
  // be handled by the API gateway or by calling the trip service API
  // For now, we'll assume the caller has already verified access

  async listItineraryItems(
    tripId: string,
    userId: string,
    filters: {
      startDate?: string
      endDate?: string
      types?: string[]
      status?: string[]
      limit?: number
      offset?: number
    } = {}
  ): Promise<ItineraryItem[]> {
    // Build conditions
    const conditions = [
      eq(itineraryItems.tripId, tripId),
      eq(itineraryItems.userId, userId), // User can only see their own items
    ]

    if (filters.startDate) {
      conditions.push(gte(itineraryItems.startDate, new Date(filters.startDate)))
    }
    if (filters.endDate) {
      conditions.push(lte(itineraryItems.startDate, new Date(filters.endDate)))
    }
    if (filters.types && filters.types.length > 0) {
      conditions.push(sql`${itineraryItems.type} = ANY(${filters.types})`)
    }
    if (filters.status && filters.status.length > 0) {
      conditions.push(sql`${itineraryItems.status} = ANY(${filters.status})`)
    }

    // Build query with type assertion to work around Drizzle type issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let queryBuilder: any = db
      .select()
      .from(itineraryItems)
      .where(and(...conditions))
      .orderBy(asc(itineraryItems.startDate))

    if (filters.limit !== undefined) {
      queryBuilder = queryBuilder.limit(filters.limit)
    }
    if (filters.offset !== undefined) {
      queryBuilder = queryBuilder.offset(filters.offset)
    }

    const results = await queryBuilder

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return results.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate || undefined,
      isAllDay: item.isAllDay || false,
      status: item.status,
      priority: item.priority,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      notes: item.notes || undefined,
      typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
      tripId: item.tripId,
      userId: item.userId,
      locationId: item.locationId || undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }))
  }

  async getItineraryItem(id: string, userId: string): Promise<ItineraryItem | null> {
    const result = await db
      .select()
      .from(itineraryItems)
      .where(and(eq(itineraryItems.id, id), eq(itineraryItems.userId, userId)))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const item = result[0]!
    return {
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate || undefined,
      isAllDay: item.isAllDay || false,
      status: item.status,
      priority: item.priority,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      notes: item.notes || undefined,
      typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
      tripId: item.tripId,
      userId: item.userId,
      locationId: item.locationId || undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }

  async createItineraryItem(
    input: CreateItineraryItemInput,
    userId: string
  ): Promise<ItineraryItem> {
    const itemData = {
      id: createId(),
      title: input.title,
      description: input.description || null,
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate || null,
      isAllDay: input.isAllDay || false,
      status: input.status || 'planned',
      priority: input.priority || 'medium',
      tags: input.tags ? JSON.stringify(input.tags) : null,
      notes: input.notes || null,
      typeData: input.typeData ? JSON.stringify(input.typeData) : null,
      tripId: input.tripId,
      userId,
      locationId: input.locationId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.insert(itineraryItems).values(itemData).returning()
    const createdItem = result[0]!

    return {
      id: createdItem.id,
      title: createdItem.title,
      description: createdItem.description || undefined,
      type: createdItem.type,
      startDate: createdItem.startDate,
      endDate: createdItem.endDate || undefined,
      isAllDay: createdItem.isAllDay || false,
      status: createdItem.status,
      priority: createdItem.priority,
      tags: createdItem.tags ? JSON.parse(createdItem.tags) : undefined,
      notes: createdItem.notes || undefined,
      typeData: createdItem.typeData ? JSON.parse(createdItem.typeData) : undefined,
      tripId: createdItem.tripId,
      userId: createdItem.userId,
      locationId: createdItem.locationId || undefined,
      createdAt: createdItem.createdAt,
      updatedAt: createdItem.updatedAt,
    }
  }

  async updateItineraryItem(
    input: UpdateItineraryItemInput,
    userId: string
  ): Promise<ItineraryItem> {
    const { id, ...updates } = input

    // Check if item exists and belongs to user
    const existing = await this.getItineraryItem(id, userId)
    if (!existing) {
      throw new Error('Itinerary item not found or access denied')
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    // Handle each field that might be updated
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.type !== undefined) updateData.type = updates.type
    if (updates.startDate !== undefined) updateData.startDate = updates.startDate
    if (updates.endDate !== undefined) updateData.endDate = updates.endDate
    if (updates.isAllDay !== undefined) updateData.isAllDay = updates.isAllDay
    if (updates.status !== undefined) updateData.status = updates.status
    if (updates.priority !== undefined) updateData.priority = updates.priority
    if (updates.tags !== undefined) {
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    }
    if (updates.notes !== undefined) updateData.notes = updates.notes
    if (updates.typeData !== undefined) {
      updateData.typeData = updates.typeData ? JSON.stringify(updates.typeData) : null
    }
    if (updates.locationId !== undefined) updateData.locationId = updates.locationId

    const result = await db
      .update(itineraryItems)
      .set(updateData)
      .where(and(eq(itineraryItems.id, id), eq(itineraryItems.userId, userId)))
      .returning()

    const updatedItem = result[0]!

    return {
      id: updatedItem.id,
      title: updatedItem.title,
      description: updatedItem.description || undefined,
      type: updatedItem.type,
      startDate: updatedItem.startDate,
      endDate: updatedItem.endDate || undefined,
      isAllDay: updatedItem.isAllDay || false,
      status: updatedItem.status,
      priority: updatedItem.priority,
      tags: updatedItem.tags ? JSON.parse(updatedItem.tags) : undefined,
      notes: updatedItem.notes || undefined,
      typeData: updatedItem.typeData ? JSON.parse(updatedItem.typeData) : undefined,
      tripId: updatedItem.tripId,
      userId: updatedItem.userId,
      locationId: updatedItem.locationId || undefined,
      createdAt: updatedItem.createdAt,
      updatedAt: updatedItem.updatedAt,
    }
  }

  async deleteItineraryItem(id: string, userId: string): Promise<{ success: boolean }> {
    // Check if item exists and belongs to user
    const existing = await this.getItineraryItem(id, userId)
    if (!existing) {
      throw new Error('Itinerary item not found or access denied')
    }

    await db
      .delete(itineraryItems)
      .where(and(eq(itineraryItems.id, id), eq(itineraryItems.userId, userId)))

    return { success: true }
  }

  // Content Items management
  async listContentItems(
    tripId: string,
    userId: string,
    category?: string
  ): Promise<ContentItem[]> {
    const conditions = [eq(contentItems.tripId, tripId), eq(contentItems.userId, userId)]

    if (category) {
      conditions.push(eq(contentItems.category, category))
    }

    const results = await db
      .select()
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(asc(contentItems.category), asc(contentItems.title))

    return results.map(item => ({
      id: item.id,
      category: item.category,
      title: item.title,
      content: item.content,
      slug: item.slug,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      tripId: item.tripId,
      userId: item.userId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }))
  }

  async getContentItem(id: string, userId: string): Promise<ContentItem | null> {
    const result = await db
      .select()
      .from(contentItems)
      .where(and(eq(contentItems.id, id), eq(contentItems.userId, userId)))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const item = result[0]!
    return {
      id: item.id,
      category: item.category,
      title: item.title,
      content: item.content,
      slug: item.slug,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      tripId: item.tripId,
      userId: item.userId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }

  async createContentItem(input: CreateContentItemInput, userId: string): Promise<ContentItem> {
    const itemData = {
      id: createId(),
      category: input.category,
      title: input.title,
      content: input.content,
      slug: input.slug,
      tags: input.tags ? JSON.stringify(input.tags) : null,
      tripId: input.tripId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.insert(contentItems).values(itemData).returning()
    const createdItem = result[0]!

    return {
      id: createdItem.id,
      category: createdItem.category,
      title: createdItem.title,
      content: createdItem.content,
      slug: createdItem.slug,
      tags: createdItem.tags ? JSON.parse(createdItem.tags) : undefined,
      tripId: createdItem.tripId,
      userId: createdItem.userId,
      createdAt: createdItem.createdAt,
      updatedAt: createdItem.updatedAt,
    }
  }

  async updateContentItem(input: UpdateContentItemInput, userId: string): Promise<ContentItem> {
    const { id, ...updates } = input

    // Check if item exists and belongs to user
    const existing = await this.getContentItem(id, userId)
    if (!existing) {
      throw new Error('Content item not found or access denied')
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    // Handle each field that might be updated
    if (updates.category !== undefined) updateData.category = updates.category
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.content !== undefined) updateData.content = updates.content
    if (updates.slug !== undefined) updateData.slug = updates.slug
    if (updates.tags !== undefined) {
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    }

    const result = await db
      .update(contentItems)
      .set(updateData)
      .where(and(eq(contentItems.id, id), eq(contentItems.userId, userId)))
      .returning()

    const updatedItem = result[0]!

    return {
      id: updatedItem.id,
      category: updatedItem.category,
      title: updatedItem.title,
      content: updatedItem.content,
      slug: updatedItem.slug,
      tags: updatedItem.tags ? JSON.parse(updatedItem.tags) : undefined,
      tripId: updatedItem.tripId,
      userId: updatedItem.userId,
      createdAt: updatedItem.createdAt,
      updatedAt: updatedItem.updatedAt,
    }
  }

  async deleteContentItem(id: string, userId: string): Promise<{ success: boolean }> {
    // Check if item exists and belongs to user
    const existing = await this.getContentItem(id, userId)
    if (!existing) {
      throw new Error('Content item not found or access denied')
    }

    await db
      .delete(contentItems)
      .where(and(eq(contentItems.id, id), eq(contentItems.userId, userId)))

    return { success: true }
  }
}
