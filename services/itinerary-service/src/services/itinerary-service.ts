import { eq, and, or, gte, lte, desc, asc, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import {
  itineraryItems,
  trips,
  tripCollaborators,
  locations,
  people,
  itineraryItemAttendees,
} from '../db/schema.js'
import type { ItineraryItem, CreateItineraryItemInput, UpdateItineraryItemInput } from '@pops/types'
import { ItemType, ItemStatus } from '@pops/types'

export class ItineraryService {
  async list(
    tripId: string,
    userId: string,
    filters: {
      startDate?: string
      endDate?: string
      types?: ItemType[]
      status?: ItemStatus[]
      limit?: number
      offset?: number
    } = {}
  ): Promise<ItineraryItem[]> {
    // Verify trip access
    const tripAccess = await db
      .select({ id: trips.id })
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(trips.id, tripId),
          or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))
        )
      )
      .limit(1)

    if (tripAccess.length === 0) {
      throw new Error('Trip not found or access denied')
    }

    // Build conditions
    const conditions = [eq(itineraryItems.tripId, tripId)]

    if (filters.startDate || filters.endDate) {
      if (filters.startDate) {
        conditions.push(gte(itineraryItems.startDate, new Date(filters.startDate)))
      }
      if (filters.endDate) {
        conditions.push(lte(itineraryItems.startDate, new Date(filters.endDate)))
      }
    }

    if (filters.types && filters.types.length > 0) {
      conditions.push(inArray(itineraryItems.type, filters.types))
    }

    if (filters.status && filters.status.length > 0) {
      conditions.push(inArray(itineraryItems.status, filters.status))
    }

    // Build and execute query
    const query = db
      .select({
        id: itineraryItems.id,
        title: itineraryItems.title,
        description: itineraryItems.description,
        type: itineraryItems.type,
        startDate: itineraryItems.startDate,
        endDate: itineraryItems.endDate,
        isAllDay: itineraryItems.isAllDay,
        status: itineraryItems.status,
        priority: itineraryItems.priority,
        tags: itineraryItems.tags,
        notes: itineraryItems.notes,
        typeData: itineraryItems.typeData,
        createdAt: itineraryItems.createdAt,
        updatedAt: itineraryItems.updatedAt,
        tripId: itineraryItems.tripId,
        userId: itineraryItems.userId,
        locationId: itineraryItems.locationId,
        // Location info
        locationName: locations.name,
        locationAddress: locations.address,
        locationCity: locations.city,
        locationState: locations.state,
        locationLatitude: locations.latitude,
        locationLongitude: locations.longitude,
        locationType: locations.type,
      })
      .from(itineraryItems)
      .leftJoin(locations, eq(itineraryItems.locationId, locations.id))
      .where(and(...conditions))
      .orderBy(asc(itineraryItems.startDate))

    // Apply pagination and execute query
    const results = await (() => {
      const q = query
      if (filters.limit !== undefined && filters.offset !== undefined) {
        return q.limit(filters.limit).offset(filters.offset)
      } else if (filters.limit !== undefined) {
        return q.limit(filters.limit)
      } else if (filters.offset !== undefined) {
        return q.offset(filters.offset)
      } else {
        return q
      }
    })()

    // Get attendees for each item
    const itemIds = results.map((r: Record<string, unknown>) => r.id as string)
    const attendees =
      itemIds.length > 0
        ? await db
            .select({
              itemId: itineraryItemAttendees.itineraryItemId,
              personId: people.id,
              personName: people.name,
              personEmail: people.email,
              personPhone: people.phone,
              personRelationshipType: people.relationshipType,
            })
            .from(itineraryItemAttendees)
            .leftJoin(people, eq(itineraryItemAttendees.personId, people.id))
            .where(inArray(itineraryItemAttendees.itineraryItemId, itemIds))
        : []

    // Group attendees by item ID
    const attendeesByItem = attendees.reduce(
      (acc, attendee) => {
        if (!attendee.itemId) return acc
        const itemId = attendee.itemId!
        if (!acc[itemId]) acc[itemId] = []
        if (attendee.personId && attendee.personName && attendee.personRelationshipType) {
          acc[itemId].push({
            id: attendee.personId,
            name: attendee.personName,
            email: attendee.personEmail || undefined,
            phone: attendee.personPhone || undefined,
            relationshipType: attendee.personRelationshipType as
              | 'family'
              | 'friend'
              | 'colleague'
              | 'contact',
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
        return acc
      },
      {} as Record<
        string,
        Array<{
          id: string
          name: string
          email?: string
          phone?: string
          whatsapp?: string
          notes?: string
          relationshipType: 'family' | 'friend' | 'colleague' | 'contact'
          createdAt: Date
          updatedAt: Date
        }>
      >
    )

    // Transform results
    return results.map(row => ({
      id: row.id as string,
      title: row.title as string,
      description: (row.description as string | null) || undefined,
      type: row.type as ItineraryItem['type'],
      startDate: row.startDate as Date,
      endDate: (row.endDate as Date | null) || undefined,
      isAllDay: (row.isAllDay as boolean | null) || false,
      status: row.status as ItineraryItem['status'],
      priority: row.priority as ItineraryItem['priority'],
      tags: row.tags ? JSON.parse(row.tags as string) : [],
      notes: (row.notes as string | null) || undefined,
      createdAt: row.createdAt as Date,
      updatedAt: row.updatedAt as Date,
      tripId: row.tripId as string,
      userId: row.userId as string,
      locationId: (row.locationId as string | null) || undefined,
      location:
        row.locationId && row.locationName && row.locationCity && row.locationType
          ? {
              id: row.locationId,
              name: row.locationName,
              address: row.locationAddress || undefined,
              city: row.locationCity,
              state: row.locationState || undefined,
              latitude: row.locationLatitude || undefined,
              longitude: row.locationLongitude || undefined,
              type: row.locationType as
                | 'accommodation'
                | 'other'
                | 'venue'
                | 'workplace'
                | 'tourist-spot'
                | 'restaurant',
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          : undefined,
      attendees: attendeesByItem[row.id as string] || [],
      typeData: row.typeData ? JSON.parse(row.typeData as string) : undefined,
    }))
  }

  async get(id: string, userId: string): Promise<ItineraryItem | null> {
    const result = await db
      .select({
        id: itineraryItems.id,
        title: itineraryItems.title,
        description: itineraryItems.description,
        type: itineraryItems.type,
        startDate: itineraryItems.startDate,
        endDate: itineraryItems.endDate,
        isAllDay: itineraryItems.isAllDay,
        status: itineraryItems.status,
        priority: itineraryItems.priority,
        tags: itineraryItems.tags,
        notes: itineraryItems.notes,
        typeData: itineraryItems.typeData,
        createdAt: itineraryItems.createdAt,
        updatedAt: itineraryItems.updatedAt,
        tripId: itineraryItems.tripId,
        userId: itineraryItems.userId,
        locationId: itineraryItems.locationId,
        // Location info
        locationName: locations.name,
        locationAddress: locations.address,
        locationCity: locations.city,
        locationState: locations.state,
        locationLatitude: locations.latitude,
        locationLongitude: locations.longitude,
        locationType: locations.type,
      })
      .from(itineraryItems)
      .leftJoin(locations, eq(itineraryItems.locationId, locations.id))
      .leftJoin(trips, eq(itineraryItems.tripId, trips.id))
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(itineraryItems.id, id),
          or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))
        )
      )
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const item = result[0]
    if (!item) {
      return null
    }

    // Get attendees
    const attendees = await db
      .select({
        personId: people.id,
        personName: people.name,
        personEmail: people.email,
        personPhone: people.phone,
        personRelationshipType: people.relationshipType,
      })
      .from(itineraryItemAttendees)
      .leftJoin(people, eq(itineraryItemAttendees.personId, people.id))
      .where(eq(itineraryItemAttendees.itineraryItemId, id))

    return {
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      type: item.type as ItineraryItem['type'],
      startDate: item.startDate,
      endDate: item.endDate || undefined,
      isAllDay: item.isAllDay || false,
      status: item.status as ItineraryItem['status'],
      priority: item.priority as ItineraryItem['priority'],
      tags: item.tags ? JSON.parse(item.tags) : [],
      notes: item.notes || undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      tripId: item.tripId,
      userId: item.userId,
      locationId: item.locationId || undefined,
      location:
        item.locationId && item.locationName && item.locationCity && item.locationType
          ? {
              id: item.locationId,
              name: item.locationName,
              address: item.locationAddress || undefined,
              city: item.locationCity,
              state: item.locationState || undefined,
              latitude: item.locationLatitude || undefined,
              longitude: item.locationLongitude || undefined,
              type: item.locationType as
                | 'accommodation'
                | 'other'
                | 'venue'
                | 'workplace'
                | 'tourist-spot'
                | 'restaurant',
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          : undefined,
      attendees: attendees
        .filter(a => a.personId && a.personName && a.personRelationshipType)
        .map(a => ({
          id: a.personId!,
          name: a.personName!,
          email: a.personEmail || undefined,
          phone: a.personPhone || undefined,
          relationshipType: a.personRelationshipType as
            | 'family'
            | 'friend'
            | 'colleague'
            | 'contact',
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
    }
  }

  async create(input: CreateItineraryItemInput, userId: string): Promise<ItineraryItem> {
    // Verify trip access and edit permissions
    const tripAccess = await db
      .select({ id: trips.id, userId: trips.userId })
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(trips.id, input.tripId),
          or(
            eq(trips.userId, userId),
            and(
              eq(tripCollaborators.userId, userId),
              inArray(tripCollaborators.role, ['admin', 'editor'])
            )
          )
        )
      )
      .limit(1)

    if (tripAccess.length === 0) {
      throw new Error('Trip not found or insufficient permissions')
    }

    const { attendees } = input

    const insertData = {
      title: input.title,
      description: input.description || undefined,
      type: input.type,
      startDate: new Date(input.startDate),
      endDate: input.endDate ? new Date(input.endDate) : undefined,
      isAllDay: input.isAllDay,
      status: input.status,
      priority: input.priority,
      tags: input.tags ? JSON.stringify(input.tags) : undefined,
      notes: input.notes || undefined,
      typeData: input.typeData || undefined,
      tripId: input.tripId,
      userId,
      locationId: input.locationId || undefined,
    }

    // Insert the item
    await db.insert(itineraryItems).values(insertData)

    // Get the inserted item
    const createdItem = await db
      .select()
      .from(itineraryItems)
      .where(
        and(
          eq(itineraryItems.title, input.title),
          eq(itineraryItems.tripId, input.tripId),
          eq(itineraryItems.userId, userId)
        )
      )
      .orderBy(desc(itineraryItems.createdAt))
      .limit(1)

    if (createdItem.length === 0) {
      throw new Error('Failed to retrieve created item')
    }

    const item = createdItem[0]
    if (!item) {
      throw new Error('Failed to retrieve created item')
    }

    // Add attendees if provided
    if (attendees && attendees.length > 0) {
      const attendeeData = attendees.map(personId => ({
        itineraryItemId: item.id,
        personId,
      }))
      await db.insert(itineraryItemAttendees).values(attendeeData)
    }

    // Return the created item with attendees
    const result = await this.get(item.id, userId)
    if (!result) {
      throw new Error('Failed to retrieve created item after creation')
    }
    return result
  }

  async update(input: UpdateItineraryItemInput, userId: string): Promise<ItineraryItem> {
    const { id, attendees, ...updates } = input

    // Verify access and edit permissions
    const existingItem = await db
      .select({
        id: itineraryItems.id,
        tripId: itineraryItems.tripId,
      })
      .from(itineraryItems)
      .leftJoin(trips, eq(itineraryItems.tripId, trips.id))
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(itineraryItems.id, id),
          or(
            eq(trips.userId, userId),
            and(
              eq(tripCollaborators.userId, userId),
              inArray(tripCollaborators.role, ['admin', 'editor'])
            )
          )
        )
      )
      .limit(1)

    if (existingItem.length === 0) {
      throw new Error('Item not found or insufficient permissions')
    }

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.type !== undefined) updateData.type = updates.type
    if (updates.startDate !== undefined) updateData.startDate = new Date(updates.startDate)
    if (updates.endDate !== undefined)
      updateData.endDate = updates.endDate ? new Date(updates.endDate) : null
    if (updates.isAllDay !== undefined) updateData.isAllDay = updates.isAllDay
    if (updates.status !== undefined) updateData.status = updates.status
    if (updates.priority !== undefined) updateData.priority = updates.priority
    if (updates.tags !== undefined)
      updateData.tags = updates.tags ? JSON.stringify(updates.tags) : null
    if (updates.notes !== undefined) updateData.notes = updates.notes
    if (updates.typeData !== undefined) updateData.typeData = updates.typeData
    if (updates.locationId !== undefined) updateData.locationId = updates.locationId

    updateData.updatedAt = new Date()

    // Update the item
    await db.update(itineraryItems).set(updateData).where(eq(itineraryItems.id, id))

    // Update attendees if provided
    if (attendees !== undefined) {
      // Remove existing attendees
      await db.delete(itineraryItemAttendees).where(eq(itineraryItemAttendees.itineraryItemId, id))

      // Add new attendees
      if (attendees.length > 0) {
        const attendeeData = attendees.map(personId => ({
          itineraryItemId: id,
          personId,
        }))
        await db.insert(itineraryItemAttendees).values(attendeeData)
      }
    }

    // Return updated item
    return this.get(id, userId) as Promise<ItineraryItem>
  }

  async delete(id: string, userId: string): Promise<{ success: boolean }> {
    // Verify access and edit permissions
    const existingItem = await db
      .select({ id: itineraryItems.id })
      .from(itineraryItems)
      .leftJoin(trips, eq(itineraryItems.tripId, trips.id))
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(itineraryItems.id, id),
          or(
            eq(trips.userId, userId),
            and(
              eq(tripCollaborators.userId, userId),
              inArray(tripCollaborators.role, ['admin', 'editor'])
            )
          )
        )
      )
      .limit(1)

    if (existingItem.length === 0) {
      throw new Error('Item not found or insufficient permissions')
    }

    // Delete attendee associations first
    await db.delete(itineraryItemAttendees).where(eq(itineraryItemAttendees.itineraryItemId, id))

    // Delete the item
    await db.delete(itineraryItems).where(eq(itineraryItems.id, id))

    return { success: true }
  }

  async getStats(
    tripId: string,
    userId: string
  ): Promise<{
    totalItems: number
    byType: Record<string, number>
    byStatus: Record<string, number>
    timeSpan: {
      start: Date
      end: Date
      totalDays: number
    } | null
  }> {
    // Verify trip access
    const tripAccess = await db
      .select({ id: trips.id })
      .from(trips)
      .leftJoin(tripCollaborators, eq(trips.id, tripCollaborators.tripId))
      .where(
        and(
          eq(trips.id, tripId),
          or(eq(trips.userId, userId), eq(tripCollaborators.userId, userId))
        )
      )
      .limit(1)

    if (tripAccess.length === 0) {
      throw new Error('Trip not found or access denied')
    }

    const items = await db
      .select({
        type: itineraryItems.type,
        status: itineraryItems.status,
        startDate: itineraryItems.startDate,
      })
      .from(itineraryItems)
      .where(eq(itineraryItems.tripId, tripId))

    const byType: Record<string, number> = {}
    const byStatus: Record<string, number> = {}

    items.forEach(item => {
      byType[item.type] = (byType[item.type] || 0) + 1
      byStatus[item.status] = (byStatus[item.status] || 0) + 1
    })

    const dates = items.map(item => item.startDate).sort((a, b) => a.getTime() - b.getTime())
    const timeSpan =
      dates.length > 0 && dates.every(d => d != null)
        ? {
            start: dates[0]!,
            end: dates[dates.length - 1]!,
            totalDays:
              Math.ceil(
                (dates[dates.length - 1]!.getTime() - dates[0]!.getTime()) / (1000 * 60 * 60 * 24)
              ) + 1,
          }
        : null

    return {
      totalItems: items.length,
      byType,
      byStatus,
      timeSpan,
    }
  }
}
