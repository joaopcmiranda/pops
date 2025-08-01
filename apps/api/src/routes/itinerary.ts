import { z } from 'zod'
import { router, protectedProcedure } from '@/config/trpc'

// Validation schemas
const itemTypeSchema = z.enum([
  'accommodation',
  'event', 
  'work',
  'activity',
  'transport',
  'overarching-event'
])

const statusSchema = z.enum(['planned', 'confirmed', 'completed', 'cancelled'])
const prioritySchema = z.enum(['low', 'medium', 'high'])

const createItineraryItemSchema = z.object({
  tripId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  type: itemTypeSchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isAllDay: z.boolean().default(false),
  status: statusSchema.default('planned'),
  priority: prioritySchema.default('medium'),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  locationId: z.string().optional(),
  attendeeIds: z.array(z.string()).default([]),
  typeData: z.record(z.any()).optional(), // Type-specific data
})

const updateItineraryItemSchema = createItineraryItemSchema.partial().extend({
  id: z.string(),
})

export const itineraryRouter = router({
  // Get all itinerary items for trip
  list: protectedProcedure
    .input(z.object({
      tripId: z.string(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      types: z.array(itemTypeSchema).optional(),
      status: z.array(statusSchema).optional(),
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }))
    .query(async ({ ctx, input }) => {
      // Verify trip access
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.tripId,
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId } } }
          ]
        },
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }

      const where: any = { tripId: input.tripId }
      
      if (input.startDate || input.endDate) {
        where.startDate = {}
        if (input.startDate) where.startDate.gte = new Date(input.startDate)
        if (input.endDate) where.startDate.lte = new Date(input.endDate)
      }
      
      if (input.types && input.types.length > 0) {
        where.type = { in: input.types }
      }
      
      if (input.status && input.status.length > 0) {
        where.status = { in: input.status }
      }

      const items = await ctx.prisma.itineraryItem.findMany({
        where,
        include: {
          location: true,
          attendees: true,
        },
        orderBy: { startDate: 'asc' },
        take: input.limit,
        skip: input.offset,
      })

      return items.map(item => ({
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : {},
      }))
    }),

  // Get single itinerary item
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.prisma.itineraryItem.findFirst({
        where: { 
          id: input.id,
          trip: {
            OR: [
              { userId: ctx.userId },
              { collaborators: { some: { userId: ctx.userId } } }
            ]
          }
        },
        include: {
          location: true,
          attendees: true,
        },
      })

      if (!item) {
        throw new Error('Itinerary item not found')
      }

      return {
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : {},
      }
    }),

  // Create itinerary item
  create: protectedProcedure
    .input(createItineraryItemSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify trip access and edit permissions
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.tripId,
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } }
          ]
        },
      })

      if (!trip) {
        throw new Error('Trip not found or insufficient permissions')
      }

      const { attendeeIds, tags, typeData, ...itemData } = input

      const item = await ctx.prisma.itineraryItem.create({
        data: {
          ...itemData,
          startDate: new Date(input.startDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
          userId: ctx.userId,
          tags: tags ? JSON.stringify(tags) : null,
          typeData: typeData ? JSON.stringify(typeData) : null,
          attendees: {
            connect: attendeeIds.map(id => ({ id })),
          },
        },
        include: {
          location: true,
          attendees: true,
        },
      })

      return {
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : {},
      }
    }),

  // Update itinerary item
  update: protectedProcedure
    .input(updateItineraryItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, attendeeIds, tags, typeData, ...updates } = input

      // Verify trip access and edit permissions
      const existingItem = await ctx.prisma.itineraryItem.findFirst({
        where: { 
          id,
          trip: {
            OR: [
              { userId: ctx.userId },
              { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } }
            ]
          }
        },
      })

      if (!existingItem) {
        throw new Error('Itinerary item not found or insufficient permissions')
      }

      const item = await ctx.prisma.itineraryItem.update({
        where: { id },
        data: {
          ...updates,
          startDate: input.startDate ? new Date(input.startDate) : undefined,
          endDate: input.endDate ? new Date(input.endDate) : undefined,
          tags: tags ? JSON.stringify(tags) : undefined,
          typeData: typeData ? JSON.stringify(typeData) : undefined,
          ...(attendeeIds && {
            attendees: {
              set: attendeeIds.map(id => ({ id })),
            },
          }),
        },
        include: {
          location: true,
          attendees: true,
        },
      })

      return {
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : {},
      }
    }),

  // Delete itinerary item
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify trip access and edit permissions
      const existingItem = await ctx.prisma.itineraryItem.findFirst({
        where: { 
          id: input.id,
          trip: {
            OR: [
              { userId: ctx.userId },
              { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } }
            ]
          }
        },
      })

      if (!existingItem) {
        throw new Error('Itinerary item not found or insufficient permissions')
      }

      await ctx.prisma.itineraryItem.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),

  // Get itinerary stats for trip
  stats: protectedProcedure
    .input(z.object({ tripId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify trip access
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.tripId,
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId } } }
          ]
        },
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }

      const items = await ctx.prisma.itineraryItem.findMany({
        where: { tripId: input.tripId },
        select: { type: true, status: true, startDate: true },
      })

      const byType = items.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const byStatus = items.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const dates = items.map(item => item.startDate).sort()
      const timeSpan = dates.length > 0 ? {
        start: dates[0],
        end: dates[dates.length - 1],
        totalDays: dates.length > 0 ? 
          Math.ceil((dates[dates.length - 1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24)) + 1 : 
          0,
      } : null

      return {
        totalItems: items.length,
        byType,
        byStatus,
        timeSpan,
      }
    }),
})