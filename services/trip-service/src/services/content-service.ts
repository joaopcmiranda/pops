import { eq, and, like, or, desc, count } from 'drizzle-orm'
import { db } from '../db/index.js'
import { contentItems, trips } from '../db/index.js'
// Import types directly from PostgreSQL schema to avoid conflicts
import type { ContentItem } from '../db/schema.postgres.js'

// Define manual type for inserts to handle PostgreSQL-specific fields
type NewContentItemInsert = {
  tripId: string
  userId: string
  title: string
  content: string
  category: string
  slug: string
  tags?: string | null
}

export interface GetContentItemsParams {
  tripId: string
  userId: string
  category?: string
  limit?: number
  offset?: number
}

export interface GetContentItemsResult {
  items: ContentItem[]
  total: number
}

export interface GetContentItemParams {
  tripId: string
  userId: string
  contentId: string
}

export interface GetContentByCategoryParams {
  tripId: string
  userId: string
  category: string
}

export interface CreateContentItemParams {
  tripId: string
  userId: string
  title: string
  content: string
  category: string
  slug: string
  tags?: string[]
}

export interface UpdateContentItemParams {
  tripId: string
  userId: string
  contentId: string
  title: string
  content: string
  category: string
  slug: string
  tags?: string[]
}

export interface DeleteContentItemParams {
  tripId: string
  userId: string
  contentId: string
}

export interface SearchContentParams {
  tripId: string
  userId: string
  query: string
  category?: string
  limit?: number
  offset?: number
}

export interface SearchContentResult {
  items: ContentItem[]
  total: number
}

export class ContentService {
  /**
   * Get all content items for a trip with optional category filtering
   */
  async getContentItems(params: GetContentItemsParams): Promise<GetContentItemsResult> {
    const { tripId, userId, category, limit = 50, offset = 0 } = params

    // First verify the user has access to this trip
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }

    // Build query conditions
    const conditions = [eq(contentItems.tripId, tripId), eq(contentItems.userId, userId)]

    if (category) {
      conditions.push(eq(contentItems.category, category))
    }

    // Get total count
    const totalQuery = await db
      .select({ count: count() })
      .from(contentItems)
      .where(and(...conditions))

    const total = totalQuery[0]?.count || 0

    // Get items with pagination
    const items = await db
      .select()
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(desc(contentItems.updatedAt))
      .limit(limit)
      .offset(offset)

    return {
      items,
      total,
    }
  }

  /**
   * Get all content items in a specific category for a trip
   */
  async getContentByCategory(params: GetContentByCategoryParams): Promise<ContentItem[]> {
    const { tripId, userId, category } = params

    // First verify the user has access to this trip
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }

    const items = await db
      .select()
      .from(contentItems)
      .where(
        and(
          eq(contentItems.tripId, tripId),
          eq(contentItems.userId, userId),
          eq(contentItems.category, category)
        )
      )
      .orderBy(desc(contentItems.updatedAt))

    return items
  }

  /**
   * Get a specific content item by ID
   */
  async getContentItem(params: GetContentItemParams): Promise<ContentItem | null> {
    const { tripId, userId, contentId } = params

    const items = await db
      .select()
      .from(contentItems)
      .where(
        and(
          eq(contentItems.id, contentId),
          eq(contentItems.tripId, tripId),
          eq(contentItems.userId, userId)
        )
      )
      .limit(1)

    return items[0] || null
  }

  /**
   * Create a new content item
   */
  async createContentItem(params: CreateContentItemParams): Promise<ContentItem> {
    const { tripId, userId, title, content, category, slug, tags } = params

    // First verify the user has access to this trip
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }

    const newContentItem: NewContentItemInsert = {
      tripId,
      userId,
      title,
      content,
      category,
      slug,
      tags: tags ? JSON.stringify(tags) : null,
    }

    const result = await db.insert(contentItems).values(newContentItem).returning()

    if (!result.length) {
      throw new Error('Failed to create content item')
    }

    return result[0]
  }

  /**
   * Update an existing content item
   */
  async updateContentItem(params: UpdateContentItemParams): Promise<ContentItem | null> {
    const { tripId, userId, contentId, title, content, category, slug, tags } = params

    const updateData = {
      title,
      content,
      category,
      slug,
      tags: tags ? JSON.stringify(tags) : null,
      updatedAt: new Date(),
    }

    const result = await db
      .update(contentItems)
      .set(updateData)
      .where(
        and(
          eq(contentItems.id, contentId),
          eq(contentItems.tripId, tripId),
          eq(contentItems.userId, userId)
        )
      )
      .returning()

    return result[0] || null
  }

  /**
   * Delete a content item
   */
  async deleteContentItem(params: DeleteContentItemParams): Promise<boolean> {
    const { tripId, userId, contentId } = params

    const result = await db
      .delete(contentItems)
      .where(
        and(
          eq(contentItems.id, contentId),
          eq(contentItems.tripId, tripId),
          eq(contentItems.userId, userId)
        )
      )
      .returning()

    return result.length > 0
  }

  /**
   * Search content items by title and content
   */
  async searchContent(params: SearchContentParams): Promise<SearchContentResult> {
    const { tripId, userId, query, category, limit = 50, offset = 0 } = params

    // First verify the user has access to this trip
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }

    // Build search conditions
    const searchConditions = [
      eq(contentItems.tripId, tripId),
      eq(contentItems.userId, userId),
      or(like(contentItems.title, `%${query}%`), like(contentItems.content, `%${query}%`)),
    ]

    if (category) {
      searchConditions.push(eq(contentItems.category, category))
    }

    // Get total count
    const totalQuery = await db
      .select({ count: count() })
      .from(contentItems)
      .where(and(...searchConditions))

    const total = totalQuery[0]?.count || 0

    // Get items with pagination
    const items = await db
      .select()
      .from(contentItems)
      .where(and(...searchConditions))
      .orderBy(desc(contentItems.updatedAt))
      .limit(limit)
      .offset(offset)

    return {
      items,
      total,
    }
  }

  /**
   * Get category summary (count of items per category)
   */
  async getCategorySummary(tripId: string, userId: string): Promise<Record<string, number>> {
    // First verify the user has access to this trip
    const trip = await db
      .select({ id: trips.id })
      .from(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .limit(1)

    if (!trip.length) {
      throw new Error('Trip not found or access denied')
    }

    const results = await db
      .select({
        category: contentItems.category,
        count: count(),
      })
      .from(contentItems)
      .where(and(eq(contentItems.tripId, tripId), eq(contentItems.userId, userId)))
      .groupBy(contentItems.category)

    const summary: Record<string, number> = {}
    results.forEach(row => {
      summary[row.category] = row.count as number
    })

    return summary
  }
}
