import { eq, and, or, desc, asc, sql } from 'drizzle-orm'
import { db } from '../db/index.js'
import { wishlistItems, trips, tripCollaborators } from '../db/index.js'
import { createId } from '@paralleldrive/cuid2'

export interface WishlistItem {
  id: string
  title: string
  description?: string
  type: string
  category: string
  status: string
  priority: string
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
  createdAt: Date
  updatedAt: Date
  tripId: string
  userId: string
}

export interface CreateWishlistItemInput {
  title: string
  description?: string
  type: string
  category: string
  status?: string
  priority?: string
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
  tripId: string
}

export interface UpdateWishlistItemInput {
  id: string
  title?: string
  description?: string
  type?: string
  category?: string
  status?: string
  priority?: string
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
}

export interface WishlistFilters {
  type?: string[]
  category?: string[]
  status?: string[]
  priority?: string[]
  location?: string
  estimatedCostRange?: {
    min?: number
    max?: number
  }
}

export interface WishlistListInput {
  filters?: WishlistFilters
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'estimatedCost' | 'priority'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export class WishlistService {
  async list(
    tripId: string,
    userId: string,
    input: WishlistListInput = {}
  ): Promise<WishlistItem[]> {
    const { filters, sortBy = 'createdAt', sortOrder = 'desc', limit, offset } = input

    // Verify user has access to the trip
    await this.verifyTripAccess(tripId, userId)

    // Build base query
    const baseConditions = [eq(wishlistItems.tripId, tripId)]

    // Apply filters
    if (filters) {
      if (filters.type && filters.type.length > 0) {
        baseConditions.push(sql`${wishlistItems.type} = ANY(${filters.type})`)
      }

      if (filters.category && filters.category.length > 0) {
        baseConditions.push(sql`${wishlistItems.category} = ANY(${filters.category})`)
      }

      if (filters.status && filters.status.length > 0) {
        baseConditions.push(sql`${wishlistItems.status} = ANY(${filters.status})`)
      }

      if (filters.priority && filters.priority.length > 0) {
        baseConditions.push(sql`${wishlistItems.priority} = ANY(${filters.priority})`)
      }

      if (filters.estimatedCostRange) {
        if (filters.estimatedCostRange.min !== undefined) {
          baseConditions.push(
            sql`${wishlistItems.estimatedCost} >= ${filters.estimatedCostRange.min}`
          )
        }
        if (filters.estimatedCostRange.max !== undefined) {
          baseConditions.push(
            sql`${wishlistItems.estimatedCost} <= ${filters.estimatedCostRange.max}`
          )
        }
      }
    }

    // Build query with sorting
    const orderColumn = (() => {
      switch (sortBy) {
        case 'title':
          return wishlistItems.title
        case 'updatedAt':
          return wishlistItems.updatedAt
        case 'estimatedCost':
          return wishlistItems.estimatedCost
        case 'priority':
          return wishlistItems.priority
        default:
          return wishlistItems.createdAt
      }
    })()

    // Build query with sorting and pagination - use type assertion to work around Drizzle type issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let queryBuilder: any = db
      .select()
      .from(wishlistItems)
      .where(and(...baseConditions))

    if (sortOrder === 'desc') {
      queryBuilder = queryBuilder.orderBy(desc(orderColumn))
    } else {
      queryBuilder = queryBuilder.orderBy(asc(orderColumn))
    }

    if (limit !== undefined) {
      queryBuilder = queryBuilder.limit(limit)
    }
    if (offset !== undefined) {
      queryBuilder = queryBuilder.offset(offset)
    }

    const results = await queryBuilder

    return results.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      type: item.type,
      category: item.category,
      status: item.status,
      priority: item.priority,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      location: item.location || undefined,
      estimatedCost: item.estimatedCost ? Number(item.estimatedCost) : undefined,
      notes: item.notes || undefined,
      imageUrl: item.imageUrl || undefined,
      websiteUrl: item.websiteUrl || undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      tripId: item.tripId,
      userId: item.userId,
    }))
  }

  async get(id: string, userId: string): Promise<WishlistItem | null> {
    const result = await db.select().from(wishlistItems).where(eq(wishlistItems.id, id)).limit(1)

    if (result.length === 0) {
      return null
    }

    const item = result[0]!

    // Verify user has access to the trip
    await this.verifyTripAccess(item.tripId, userId)

    return {
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      type: item.type,
      category: item.category,
      status: item.status,
      priority: item.priority,
      tags: item.tags ? JSON.parse(item.tags) : undefined,
      location: item.location || undefined,
      estimatedCost: item.estimatedCost ? Number(item.estimatedCost) : undefined,
      notes: item.notes || undefined,
      imageUrl: item.imageUrl || undefined,
      websiteUrl: item.websiteUrl || undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      tripId: item.tripId,
      userId: item.userId,
    }
  }

  async create(input: CreateWishlistItemInput, userId: string): Promise<WishlistItem> {
    // Verify user has access to the trip
    await this.verifyTripAccess(input.tripId, userId)

    const itemData = {
      id: createId(),
      title: input.title,
      description: input.description || null,
      type: input.type,
      category: input.category,
      status: input.status || 'wishlist',
      priority: input.priority || 'medium',
      tags: input.tags ? JSON.stringify(input.tags) : null,
      location: input.location || null,
      estimatedCost: input.estimatedCost ? input.estimatedCost.toString() : null,
      notes: input.notes || null,
      imageUrl: input.imageUrl || null,
      websiteUrl: input.websiteUrl || null,
      tripId: input.tripId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.insert(wishlistItems).values(itemData).returning()
    const createdItem = result[0]!

    return {
      id: createdItem.id,
      title: createdItem.title,
      description: createdItem.description || undefined,
      type: createdItem.type,
      category: createdItem.category,
      status: createdItem.status,
      priority: createdItem.priority,
      tags: createdItem.tags ? JSON.parse(createdItem.tags) : undefined,
      location: createdItem.location || undefined,
      estimatedCost: createdItem.estimatedCost ? Number(createdItem.estimatedCost) : undefined,
      notes: createdItem.notes || undefined,
      imageUrl: createdItem.imageUrl || undefined,
      websiteUrl: createdItem.websiteUrl || undefined,
      createdAt: createdItem.createdAt,
      updatedAt: createdItem.updatedAt,
      tripId: createdItem.tripId,
      userId: createdItem.userId,
    }
  }

  async update(input: UpdateWishlistItemInput, userId: string): Promise<WishlistItem> {
    const { id, ...updates } = input

    // Get the existing item and verify access
    const existing = await this.get(id, userId)
    if (!existing) {
      throw new Error('Wishlist item not found or access denied')
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    // Handle each field that might be updated
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.type !== undefined) updateData.type = updates.type
    if (updates.category !== undefined) updateData.category = updates.category
    if (updates.status !== undefined) updateData.status = updates.status
    if (updates.priority !== undefined) updateData.priority = updates.priority
    if (updates.tags !== undefined) {
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    }
    if (updates.location !== undefined) updateData.location = updates.location
    if (updates.estimatedCost !== undefined) {
      updateData.estimatedCost = updates.estimatedCost ? updates.estimatedCost.toString() : null
    }
    if (updates.notes !== undefined) updateData.notes = updates.notes
    if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl
    if (updates.websiteUrl !== undefined) updateData.websiteUrl = updates.websiteUrl

    const result = await db
      .update(wishlistItems)
      .set(updateData)
      .where(eq(wishlistItems.id, id))
      .returning()
    const updatedItem = result[0]!

    return {
      id: updatedItem.id,
      title: updatedItem.title,
      description: updatedItem.description || undefined,
      type: updatedItem.type,
      category: updatedItem.category,
      status: updatedItem.status,
      priority: updatedItem.priority,
      tags: updatedItem.tags ? JSON.parse(updatedItem.tags) : undefined,
      location: updatedItem.location || undefined,
      estimatedCost: updatedItem.estimatedCost ? Number(updatedItem.estimatedCost) : undefined,
      notes: updatedItem.notes || undefined,
      imageUrl: updatedItem.imageUrl || undefined,
      websiteUrl: updatedItem.websiteUrl || undefined,
      createdAt: updatedItem.createdAt,
      updatedAt: updatedItem.updatedAt,
      tripId: updatedItem.tripId,
      userId: updatedItem.userId,
    }
  }

  async delete(id: string, userId: string): Promise<{ success: boolean }> {
    // Get the existing item and verify access
    const existing = await this.get(id, userId)
    if (!existing) {
      throw new Error('Wishlist item not found or access denied')
    }

    await db.delete(wishlistItems).where(eq(wishlistItems.id, id))

    return { success: true }
  }

  async getStats(
    tripId: string,
    userId: string
  ): Promise<{
    total: number
    byStatus: Record<string, number>
    byType: Record<string, number>
    byCategory: Record<string, number>
    byPriority: Record<string, number>
    totalEstimatedCost: number
  }> {
    // Verify user has access to the trip
    await this.verifyTripAccess(tripId, userId)

    const items = await db
      .select({
        status: wishlistItems.status,
        type: wishlistItems.type,
        category: wishlistItems.category,
        priority: wishlistItems.priority,
        estimatedCost: wishlistItems.estimatedCost,
      })
      .from(wishlistItems)
      .where(eq(wishlistItems.tripId, tripId))

    const byStatus: Record<string, number> = {}
    const byType: Record<string, number> = {}
    const byCategory: Record<string, number> = {}
    const byPriority: Record<string, number> = {}
    let totalEstimatedCost = 0

    items.forEach(item => {
      byStatus[item.status] = (byStatus[item.status] || 0) + 1
      byType[item.type] = (byType[item.type] || 0) + 1
      byCategory[item.category] = (byCategory[item.category] || 0) + 1
      byPriority[item.priority] = (byPriority[item.priority] || 0) + 1

      if (item.estimatedCost) {
        totalEstimatedCost += Number(item.estimatedCost)
      }
    })

    return {
      total: items.length,
      byStatus,
      byType,
      byCategory,
      byPriority,
      totalEstimatedCost,
    }
  }

  private async verifyTripAccess(tripId: string, userId: string): Promise<void> {
    const trip = await db
      .select()
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(trips.id, tripId),
          or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))
        )
      )
      .limit(1)

    if (trip.length === 0) {
      throw new Error('Trip not found or access denied')
    }
  }
}
