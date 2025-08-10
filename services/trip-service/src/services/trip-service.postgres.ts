import { eq, and, or, like, gte, lte, desc, asc, sql, inArray } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { db as defaultDb } from '../db/index.js'
import { trips, tripCollaborators } from '../db/index.js'
import type { Trip, TripListInput, CreateTripInput, UpdateTripInput } from '@pops/types'

type DatabaseSchema = Record<string, unknown>

export class TripService {
  private db: NodePgDatabase<DatabaseSchema>

  constructor(database?: NodePgDatabase<DatabaseSchema>) {
    this.db = database || defaultDb
  }
  async list(input: TripListInput = {}, userId: string): Promise<Trip[]> {
    const { filters, sortBy = 'startDate', sortOrder = 'asc', limit, offset } = input

    // Build base query conditions
    const baseConditions = [or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))]

    // Apply filters
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        baseConditions.push(inArray(trips.status, filters.status))
      }

      if (filters.type && filters.type.length > 0) {
        baseConditions.push(inArray(trips.type, filters.type))
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

    // Build query
    const baseQuery = this.db
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
      })
      .from(trips)
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
        trips.updatedAt
      )

    // Apply sorting
    const orderColumn = (() => {
      switch (sortBy) {
        case 'title':
          return trips.title
        case 'createdAt':
          return trips.createdAt
        case 'updatedAt':
          return trips.updatedAt
        default:
          return trips.startDate
      }
    })()

    // Build query with sorting and pagination - use type assertion to work around Drizzle type issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let queryBuilder: any = baseQuery

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

    // Transform results to match Trip interface
    return results.map(row => {
      const budget = row.budget ? JSON.parse(row.budget) : undefined
      const settings = row.settings
        ? JSON.parse(row.settings)
        : {
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            notifications: { email: true, push: false, reminders: true },
            privacy: 'private',
          }
      const tags = row.tags ? JSON.parse(row.tags) : undefined

      // Calculate total days (inclusive of start and end dates)
      const totalDays = Math.ceil(
        (row.endDate.getTime() - row.startDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      return {
        id: row.id,
        title: row.title,
        description: row.description || undefined,
        destination: row.destination,
        country: row.country,
        type: row.type as Trip['type'],
        status: row.status as Trip['status'],
        startDate: row.startDate,
        endDate: row.endDate,
        budget,
        settings,
        coverImage: row.coverImage || undefined,
        tags,
        isTemplate: row.isTemplate || undefined,
        templateId: row.templateId || undefined,
        userId: row.userId,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        stats: {
          totalItems: 0, // Will be populated by itinerary service
          itemsByType: {}, // Will be populated by itinerary service
          itemsByStatus: {}, // Will be populated by itinerary service
          totalDays,
          lastActivity: row.updatedAt,
        },
      }
    })
  }

  async get(id: string, userId: string): Promise<Trip | null> {
    const result = await this.db
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

    const tripData = result[0]!.trips

    const totalDays = Math.ceil(
      (tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return {
      id: tripData.id,
      title: tripData.title,
      description: tripData.description || undefined,
      destination: tripData.destination,
      country: tripData.country,
      type: tripData.type as Trip['type'],
      status: tripData.status as Trip['status'],
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      budget: tripData.budget ? JSON.parse(tripData.budget) : undefined,
      settings: JSON.parse(tripData.settings),
      coverImage: tripData.coverImage || undefined,
      tags: tripData.tags ? JSON.parse(tripData.tags) : undefined,
      isTemplate: tripData.isTemplate || undefined,
      templateId: tripData.templateId || undefined,
      userId: tripData.userId,
      createdAt: tripData.createdAt,
      updatedAt: tripData.updatedAt,
      stats: {
        totalItems: 0, // Will be populated by itinerary service
        itemsByType: {}, // Will be populated by itinerary service
        itemsByStatus: {}, // Will be populated by itinerary service
        totalDays,
        completionRate: 0, // Will be calculated when we have itinerary data
        lastActivity: tripData.updatedAt,
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
      description: input.description || null,
      destination: input.destination,
      country: input.country,
      type: input.type,
      status: input.status || 'planning',
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      budget: input.budget ? JSON.stringify(input.budget) : null,
      settings: JSON.stringify(defaultSettings),
      coverImage: input.coverImage || null,
      tags: input.tags ? JSON.stringify(input.tags) : null,
      isTemplate: input.isTemplate || false,
      templateId: input.templateId || null,
      userId,
    }

    const result = await this.db.insert(trips).values(tripData).returning()
    const createdTrip = result[0]!

    return {
      id: createdTrip.id,
      title: createdTrip.title,
      description: createdTrip.description || undefined,
      destination: createdTrip.destination,
      country: createdTrip.country,
      type: createdTrip.type as Trip['type'],
      status: createdTrip.status as Trip['status'],
      startDate: createdTrip.startDate,
      endDate: createdTrip.endDate,
      budget: createdTrip.budget ? JSON.parse(createdTrip.budget) : undefined,
      settings: JSON.parse(createdTrip.settings),
      coverImage: createdTrip.coverImage || undefined,
      tags: createdTrip.tags ? JSON.parse(createdTrip.tags) : undefined,
      isTemplate: createdTrip.isTemplate || undefined,
      templateId: createdTrip.templateId || undefined,
      userId: createdTrip.userId,
      createdAt: createdTrip.createdAt,
      updatedAt: createdTrip.updatedAt,
    }
  }

  async update(input: UpdateTripInput, userId: string): Promise<Trip> {
    const { id, ...updates } = input

    // Verify ownership or collaboration permission
    const existingTrip = await this.db
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
    if (updates.startDate !== undefined) {
      updateData.startDate =
        updates.startDate instanceof Date ? updates.startDate : new Date(updates.startDate)
    }
    if (updates.endDate !== undefined) {
      updateData.endDate =
        updates.endDate instanceof Date ? updates.endDate : new Date(updates.endDate)
    }
    if (updates.budget !== undefined) {
      updateData.budget = updates.budget ? JSON.stringify(updates.budget) : null
    }
    if (updates.settings !== undefined) updateData.settings = JSON.stringify(updates.settings)
    if (updates.coverImage !== undefined) updateData.coverImage = updates.coverImage
    if (updates.tags !== undefined) {
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    }
    if (updates.templateId !== undefined) updateData.templateId = updates.templateId

    updateData.updatedAt = new Date()

    const result = await this.db.update(trips).set(updateData).where(eq(trips.id, id)).returning()
    const updatedTrip = result[0]!

    return {
      id: updatedTrip.id,
      title: updatedTrip.title,
      description: updatedTrip.description || undefined,
      destination: updatedTrip.destination,
      country: updatedTrip.country,
      type: updatedTrip.type as Trip['type'],
      status: updatedTrip.status as Trip['status'],
      startDate: updatedTrip.startDate,
      endDate: updatedTrip.endDate,
      budget: updatedTrip.budget ? JSON.parse(updatedTrip.budget) : undefined,
      settings: JSON.parse(updatedTrip.settings),
      coverImage: updatedTrip.coverImage || undefined,
      tags: updatedTrip.tags ? JSON.parse(updatedTrip.tags) : undefined,
      isTemplate: updatedTrip.isTemplate || undefined,
      templateId: updatedTrip.templateId || undefined,
      userId: updatedTrip.userId,
      createdAt: updatedTrip.createdAt,
      updatedAt: updatedTrip.updatedAt,
    }
  }

  async delete(id: string, userId: string): Promise<{ success: boolean }> {
    // Verify ownership
    const existingTrip = await this.db
      .select()
      .from(trips)
      .where(and(eq(trips.id, id), eq(trips.userId, userId)))
      .limit(1)

    if (existingTrip.length === 0) {
      throw new Error('Trip not found or insufficient permissions')
    }

    await this.db.delete(trips).where(eq(trips.id, id))

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
    const userTrips = await this.db
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
