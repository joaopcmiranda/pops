import { eq, and, or, like, gte, lte, desc, asc, count, sql } from 'drizzle-orm'
import { db } from '../db/index.js'
import { trips, users, tripCollaborators, itineraryItems, contentItems } from '../db/schema.js'
import type { Trip, TripListInput, CreateTripInput, UpdateTripInput } from '@pops/types'

export class TripService {
  async list(input: TripListInput = {}, userId: string): Promise<Trip[]> {
    const { filters, sortBy = 'startDate', sortOrder = 'asc', limit, offset } = input

    // Build base query with proper conditions
    const baseConditions = [or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))]

    // Apply filters
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        baseConditions.push(sql`${trips.status} IN ${filters.status}`)
      }

      if (filters.type && filters.type.length > 0) {
        baseConditions.push(sql`${trips.type} IN ${filters.type}`)
      }

      if (filters.destination) {
        baseConditions.push(like(trips.destination, `%${filters.destination}%`))
      }

      if (filters.country) {
        baseConditions.push(like(trips.country, `%${filters.country}%`))
      }

      if (filters.dateRange) {
        baseConditions.push(
          and(
            gte(trips.startDate, new Date(filters.dateRange.start)),
            lte(trips.startDate, new Date(filters.dateRange.end))
          )
        )
      }
    }

    // Build base query
    const baseQuery = db
      .select({
        id: trips.id,
        title: trips.title,
        description: trips.description,
        destination: trips.destination,
        country: trips.country,
        type: trips.type,
        status: trips.status,
        startDate: trips.startDate,
        endDate: trips.endDate,
        budget: trips.budget,
        settings: trips.settings,
        coverImage: trips.coverImage,
        tags: trips.tags,
        isTemplate: trips.isTemplate,
        templateId: trips.templateId,
        userId: trips.userId,
        createdAt: trips.createdAt,
        updatedAt: trips.updatedAt,
        // User info
        userName: users.name,
        userAvatar: users.avatar,
        // Counts
        itineraryCount: sql<number>`count(distinct ${itineraryItems.id})`,
        contentCount: sql<number>`count(distinct ${contentItems.id})`,
      })
      .from(trips)
      .leftJoin(users, eq(trips.userId, users.id))
      .leftJoin(itineraryItems, eq(trips.id, itineraryItems.tripId))
      .leftJoin(contentItems, eq(trips.id, contentItems.tripId))
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(and(...baseConditions))
      .groupBy(
        trips.id,
        trips.title,
        trips.description,
        trips.destination,
        trips.country,
        trips.type,
        trips.status,
        trips.startDate,
        trips.endDate,
        trips.budget,
        trips.settings,
        trips.coverImage,
        trips.tags,
        trips.isTemplate,
        trips.templateId,
        trips.userId,
        trips.createdAt,
        trips.updatedAt,
        users.name,
        users.avatar
      )

    // Apply sorting
    const orderColumn =
      sortBy === 'title'
        ? trips.title
        : sortBy === 'createdAt'
          ? trips.createdAt
          : sortBy === 'updatedAt'
            ? trips.updatedAt
            : trips.startDate

    const queryWithOrder =
      sortOrder === 'desc'
        ? baseQuery.orderBy(desc(orderColumn))
        : baseQuery.orderBy(asc(orderColumn))

    // Apply pagination and execute query
    const results = await (() => {
      const query = queryWithOrder
      if (limit !== undefined && offset !== undefined) {
        return query.limit(limit).offset(offset)
      } else if (limit !== undefined) {
        return query.limit(limit)
      } else if (offset !== undefined) {
        return query.offset(offset)
      } else {
        return query
      }
    })()

    // Transform results to match Trip interface
    return results.map(row => {
      const startDate = row.startDate as Date
      const endDate = row.endDate as Date
      const budget = row.budget as string | null
      const settings = row.settings as string | null
      const tags = row.tags as string | null
      const coverImage = row.coverImage as string | null
      const description = row.description as string | null

      return {
        id: row.id as string,
        title: row.title as string,
        description: description || undefined,
        destination: row.destination as string,
        country: row.country as string,
        type: row.type as Trip['type'],
        status: row.status as Trip['status'],
        startDate,
        endDate,
        budget: budget ? JSON.parse(budget) : undefined,
        settings: settings
          ? JSON.parse(settings)
          : {
              currency: 'USD',
              timezone: 'UTC',
              dateFormat: 'US',
              notifications: { email: true, push: false, reminders: true },
              privacy: 'private',
            },
        coverImage: coverImage || undefined,
        tags: tags ? JSON.parse(tags) : undefined,
        isTemplate: (row.isTemplate as boolean | null) || undefined,
        templateId: (row.templateId as string | null) || undefined,
        userId: row.userId as string,
        createdAt: row.createdAt as Date,
        updatedAt: row.updatedAt as Date,
        stats: {
          totalItems: row.itineraryCount as number,
          itemsByType: {}, // TODO: Implement detailed stats
          itemsByStatus: {}, // TODO: Implement detailed stats
          totalDays:
            Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
          lastActivity: row.updatedAt as Date,
        },
      }
    })
  }

  async get(id: string, userId: string): Promise<Trip | null> {
    const result = await db
      .select()
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(eq(trips.id, id), or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId)))
      )
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const trip = result[0]!.trips

    // Get detailed stats
    const itineraryStats = await db
      .select({
        type: itineraryItems.type,
        status: itineraryItems.status,
        count: count(),
      })
      .from(itineraryItems)
      .where(eq(itineraryItems.tripId, id))
      .groupBy(itineraryItems.type, itineraryItems.status)

    const itemsByType: Record<string, number> = {}
    const itemsByStatus: Record<string, number> = {}
    let totalItems = 0

    itineraryStats.forEach(stat => {
      itemsByType[stat.type] = (itemsByType[stat.type] || 0) + stat.count
      itemsByStatus[stat.status] = (itemsByStatus[stat.status] || 0) + stat.count
      totalItems += stat.count
    })

    await db.select({ count: count() }).from(contentItems).where(eq(contentItems.tripId, id))

    const totalDays =
      Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const completionRate = totalItems > 0 ? ((itemsByStatus.completed || 0) / totalItems) * 100 : 0

    return {
      id: trip.id,
      title: trip.title,
      description: trip.description || undefined,
      destination: trip.destination,
      country: trip.country,
      type: trip.type as Trip['type'],
      status: trip.status as Trip['status'],
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget ? JSON.parse(trip.budget as string) : undefined,
      settings: JSON.parse(trip.settings as string),
      coverImage: trip.coverImage || undefined,
      tags: trip.tags ? JSON.parse(trip.tags as string) : undefined,
      isTemplate: trip.isTemplate || undefined,
      templateId: trip.templateId || undefined,
      userId: trip.userId,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
      stats: {
        totalItems,
        // contentItems: contentItemsCount[0]?.count || 0, // Removed - not in interface
        itemsByType,
        itemsByStatus,
        totalDays,
        completionRate,
        lastActivity: trip.updatedAt,
      },
    }
  }

  async create(input: CreateTripInput, userId: string): Promise<Trip> {
    const defaultSettings = {
      timezone: 'UTC',
      dateFormat: 'US' as const,
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        reminders: true,
      },
      privacy: 'private' as const,
      ...input.settings,
    }

    const tripData = {
      title: input.title,
      description: input.description || undefined,
      destination: input.destination,
      country: input.country,
      type: input.type,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      budget: input.budget ? JSON.stringify(input.budget) : undefined,
      settings: JSON.stringify(defaultSettings),
      coverImage: input.coverImage || undefined,
      tags: input.tags ? JSON.stringify(input.tags) : undefined,
      templateId: input.templateId || undefined,
      userId,
    }

    await db.insert(trips).values(tripData)

    // Get the inserted trip using the title and userId (since we don't have RETURNING support)
    const trip = await db
      .select()
      .from(trips)
      .where(
        and(
          eq(trips.title, input.title),
          eq(trips.userId, userId),
          eq(trips.destination, input.destination)
        )
      )
      .orderBy(desc(trips.createdAt))
      .limit(1)

    console.log('Found trip after insert:', trip.length > 0 ? 'YES' : 'NO')
    const tripRecord = trip[0]

    if (!tripRecord) {
      throw new Error('Failed to retrieve created trip')
    }

    return {
      id: tripRecord.id,
      title: tripRecord.title,
      description: tripRecord.description || undefined,
      destination: tripRecord.destination,
      country: tripRecord.country,
      type: tripRecord.type as Trip['type'],
      status: tripRecord.status as Trip['status'],
      startDate: tripRecord.startDate,
      endDate: tripRecord.endDate,
      budget: tripRecord.budget ? JSON.parse(tripRecord.budget) : undefined,
      settings: tripRecord.settings ? JSON.parse(tripRecord.settings) : defaultSettings,
      coverImage: tripRecord.coverImage || undefined,
      tags: tripRecord.tags ? JSON.parse(tripRecord.tags) : undefined,
      isTemplate: tripRecord.isTemplate || undefined,
      templateId: tripRecord.templateId || undefined,
      userId: tripRecord.userId,
      createdAt: tripRecord.createdAt,
      updatedAt: tripRecord.updatedAt,
    }
  }

  async update(input: UpdateTripInput, userId: string): Promise<Trip> {
    const { id, ...updates } = input

    // Verify ownership or admin collaboration
    const existingTrip = await db
      .select()
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(trips.id, id),
          or(
            eq(trips.userId, userId),
            and(
              eq(tripCollaborators.userId, userId),
              sql`${tripCollaborators.role} IN ('admin', 'editor')`
            )
          )
        )
      )
      .limit(1)

    if (existingTrip.length === 0) {
      throw new Error('Trip not found or insufficient permissions')
    }

    const updateData: Record<string, unknown> = {}

    // Handle each field that might be updated
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.destination !== undefined) updateData.destination = updates.destination
    if (updates.country !== undefined) updateData.country = updates.country
    if (updates.type !== undefined) updateData.type = updates.type
    if (updates.status !== undefined) updateData.status = updates.status
    if (updates.startDate !== undefined) updateData.startDate = new Date(updates.startDate)
    if (updates.endDate !== undefined) updateData.endDate = new Date(updates.endDate)
    if (updates.budget !== undefined)
      updateData.budget = updates.budget ? JSON.stringify(updates.budget) : null
    if (updates.settings !== undefined) updateData.settings = JSON.stringify(updates.settings)
    if (updates.coverImage !== undefined) updateData.coverImage = updates.coverImage
    if (updates.tags !== undefined)
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    if (updates.templateId !== undefined) updateData.templateId = updates.templateId

    updateData.updatedAt = new Date()

    const result = await db.update(trips).set(updateData).where(eq(trips.id, id)).returning()

    const trip = result[0]!

    return {
      id: trip.id,
      title: trip.title,
      description: trip.description || undefined,
      destination: trip.destination,
      country: trip.country,
      type: trip.type as Trip['type'],
      status: trip.status as Trip['status'],
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget ? JSON.parse(trip.budget as string) : undefined,
      settings: JSON.parse(trip.settings as string),
      coverImage: trip.coverImage || undefined,
      tags: trip.tags ? JSON.parse(trip.tags as string) : undefined,
      isTemplate: trip.isTemplate || undefined,
      templateId: trip.templateId || undefined,
      userId: trip.userId,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
    }
  }

  async delete(id: string, userId: string): Promise<{ success: boolean }> {
    // Verify ownership
    const existingTrip = await db
      .select()
      .from(trips)
      .where(and(eq(trips.id, id), eq(trips.userId, userId)))
      .limit(1)

    if (existingTrip.length === 0) {
      throw new Error('Trip not found or insufficient permissions')
    }

    await db.delete(trips).where(eq(trips.id, id))

    return { success: true }
  }

  async getStats(userId: string): Promise<{
    totalTrips: number
    upcomingTrips: number
    activeTrips: number
    byStatus: Record<string, number>
    byType: Record<string, number>
    byCountry: Record<string, number>
  }> {
    const userTrips = await db
      .select({
        status: trips.status,
        type: trips.type,
        country: trips.country,
        startDate: trips.startDate,
        endDate: trips.endDate,
      })
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId)))

    const byStatus: Record<string, number> = {}
    const byType: Record<string, number> = {}
    const byCountry: Record<string, number> = {}

    const currentDate = new Date()
    let upcomingTrips = 0
    let activeTrips = 0

    userTrips.forEach(trip => {
      byStatus[trip.status] = (byStatus[trip.status] || 0) + 1
      byType[trip.type] = (byType[trip.type] || 0) + 1
      byCountry[trip.country] = (byCountry[trip.country] || 0) + 1

      if (trip.startDate > currentDate && trip.status !== 'cancelled') {
        upcomingTrips++
      }

      if (
        trip.startDate <= currentDate &&
        trip.endDate >= currentDate &&
        trip.status === 'active'
      ) {
        activeTrips++
      }
    })

    return {
      totalTrips: userTrips.length,
      upcomingTrips,
      activeTrips,
      byStatus,
      byType,
      byCountry,
    }
  }
}
