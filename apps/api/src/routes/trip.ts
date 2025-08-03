import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '@/config/trpc'

// Type interfaces for better type safety
interface TripWhereInput {
  OR?: Array<{
    userId: string
  } | {
    collaborators: {
      some: {
        userId: string
        role?: {
          in: string[]
        }
      }
    }
  }>
  status?: {
    in: string[]
  }
  type?: {
    in: string[]
  }
  destination?: {
    contains: string
    mode: 'insensitive'
  }
  country?: {
    contains: string
    mode: 'insensitive'
  }
  startDate?: {
    gte: Date
    lte: Date
  }
  collaborators?: {
    some: {
      userId: string
    }
  }
}

interface TripOrderBy {
  [key: string]: 'asc' | 'desc'
}

interface TripCreateData {
  [key: string]: unknown
  title: string
  destination: string
  country: string
  type: string
  startDate: Date
  endDate: Date
  userId: string
  budget: string | null
  settings: string
  tags: string | null
}

interface TripUpdateData {
  [key: string]: unknown
  startDate?: Date
  endDate?: Date
  budget?: string | null
  settings?: string
  tags?: string | null
}

interface TemplateWhereInput {
  isPublic: boolean
  type?: string
  destination?: {
    contains: string
    mode: 'insensitive'
  }
}

// Validation schemas
const tripTypeSchema = z.enum(['leisure', 'business', 'family', 'adventure', 'honeymoon', 'solo', 'group', 'other'])
const tripStatusSchema = z.enum(['planning', 'upcoming', 'active', 'completed', 'cancelled'])

const tripBudgetSchema = z.object({
  total: z.number().optional(),
  currency: z.string(),
  categories: z.object({
    accommodation: z.number().optional(),
    transport: z.number().optional(),
    activities: z.number().optional(),
    food: z.number().optional(),
    shopping: z.number().optional(),
    other: z.number().optional(),
  }),
  spent: z.number().optional(),
})

const tripSettingsSchema = z.object({
  timezone: z.string(),
  dateFormat: z.enum(['US', 'EU', 'ISO']),
  currency: z.string(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    reminders: z.boolean(),
  }),
  privacy: z.enum(['private', 'shared', 'public']),
  collaborators: z.array(z.string()).optional(),
})

const createTripSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  destination: z.string().min(1),
  country: z.string().min(1),
  type: tripTypeSchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  budget: tripBudgetSchema.optional(),
  settings: tripSettingsSchema.optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  templateId: z.string().optional(),
})

const updateTripSchema = createTripSchema.partial().extend({
  id: z.string(),
  status: tripStatusSchema.optional(),
})

const tripFiltersSchema = z.object({
  status: z.array(tripStatusSchema).optional(),
  type: z.array(tripTypeSchema).optional(),
  destination: z.string().optional(),
  country: z.string().optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  collaborator: z.boolean().optional(),
})

export const tripRouter = router({
  // Get all trips for user
  list: protectedProcedure
    .input(z.object({
      filters: tripFiltersSchema.optional(),
      sortBy: z.enum(['title', 'startDate', 'createdAt', 'updatedAt']).optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { filters, sortBy = 'startDate', sortOrder = 'asc', limit, offset } = input
      
      const where: TripWhereInput = {
        OR: [
          { userId: ctx.userId },
          { collaborators: { some: { userId: ctx.userId } } }
        ]
      }
      
      if (filters?.status && filters.status.length > 0) {
        where.status = { in: filters.status }
      }
      
      if (filters?.type && filters.type.length > 0) {
        where.type = { in: filters.type }
      }
      
      if (filters?.destination) {
        where.destination = { contains: filters.destination, mode: 'insensitive' }
      }
      
      if (filters?.country) {
        where.country = { contains: filters.country, mode: 'insensitive' }
      }
      
      if (filters?.dateRange) {
        where.startDate = {
          gte: new Date(filters.dateRange.start),
          lte: new Date(filters.dateRange.end),
        }
      }
      
      if (filters?.collaborator) {
        where.collaborators = { some: { userId: ctx.userId } }
        delete where.OR // Only show collaborative trips
      }

      const orderBy: TripOrderBy = {}
      orderBy[sortBy] = sortOrder

      const trips = await ctx.prisma.trip.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          collaborators: {
            include: {
              user: { select: { id: true, name: true, avatar: true } }
            }
          },
          _count: {
            select: {
              itineraryItems: true,
              contentItems: true,
            }
          }
        },
        orderBy,
        ...(limit !== undefined && { take: limit }),
        ...(offset !== undefined && { skip: offset }),
      })

      return trips.map(trip => ({
        ...trip,
        budget: trip.budget ? JSON.parse(trip.budget) : null,
        settings: JSON.parse(trip.settings),
        tags: trip.tags ? JSON.parse(trip.tags) : [],
        stats: {
          totalItems: trip._count.itineraryItems,
          contentItems: trip._count.contentItems,
        }
      }))
    }),

  // Get single trip
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.id,
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId } } }
          ]
        },
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          collaborators: {
            include: {
              user: { select: { id: true, name: true, avatar: true } }
            }
          },
          _count: {
            select: {
              itineraryItems: true,
              contentItems: true,
            }
          }
        },
      })

      if (!trip) {
        throw new Error('Trip not found')
      }

      // Get detailed stats
      const itineraryItems = await ctx.prisma.itineraryItem.findMany({
        where: { tripId: input.id },
        select: { type: true, status: true, startDate: true }
      })

      const itemsByType = itineraryItems.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const itemsByStatus = itineraryItems.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const dates = itineraryItems.map(item => item.startDate).sort()
      const totalDays = dates.length > 0 ? 
        Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 
        0

      return {
        ...trip,
        budget: trip.budget ? JSON.parse(trip.budget) : null,
        settings: JSON.parse(trip.settings),
        tags: trip.tags ? JSON.parse(trip.tags) : [],
        stats: {
          totalItems: trip._count.itineraryItems,
          contentItems: trip._count.contentItems,
          itemsByType,
          itemsByStatus,
          totalDays,
          completionRate: itineraryItems.length > 0 ? 
            (itemsByStatus.completed || 0) / itineraryItems.length * 100 : 0,
        }
      }
    }),

  // Create trip
  create: protectedProcedure
    .input(createTripSchema)
    .mutation(async ({ ctx, input }) => {
      const { budget, settings, tags, ...tripData } = input

      // Default settings
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
        ...settings,
      }

      // Filter out undefined values and convert them appropriately
      const createData: TripCreateData = {
        ...Object.fromEntries(
          Object.entries(tripData).filter(([, value]) => value !== undefined)
        ),
        title: input.title,
        destination: input.destination,
        country: input.country,
        type: input.type,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        userId: ctx.userId,
        budget: budget ? JSON.stringify(budget) : null,
        settings: JSON.stringify(defaultSettings),
        tags: tags ? JSON.stringify(tags) : null,
      }

      const trip = await ctx.prisma.trip.create({
        data: createData,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          _count: {
            select: {
              itineraryItems: true,
              contentItems: true,
            }
          }
        },
      })

      return {
        ...trip,
        budget: trip.budget ? JSON.parse(trip.budget) : null,
        settings: JSON.parse(trip.settings),
        tags: trip.tags ? JSON.parse(trip.tags) : [],
      }
    }),

  // Update trip
  update: protectedProcedure
    .input(updateTripSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, budget, settings, tags, ...updates } = input

      // Verify ownership or admin collaboration
      const existingTrip = await ctx.prisma.trip.findFirst({
        where: {
          id,
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } }
          ]
        },
      })

      if (!existingTrip) {
        throw new Error('Trip not found or insufficient permissions')
      }

      // Filter out undefined values and build update data
      const updateData: TripUpdateData = {
        ...Object.fromEntries(
          Object.entries(updates).filter(([, value]) => value !== undefined)
        ),
      }
      
      if (input.startDate !== undefined) {
        updateData.startDate = new Date(input.startDate)
      }
      
      if (input.endDate !== undefined) {
        updateData.endDate = new Date(input.endDate)
      }
      
      if (budget !== undefined) {
        updateData.budget = budget ? JSON.stringify(budget) : null
      }
      
      if (settings !== undefined) {
        updateData.settings = JSON.stringify(settings)
      }
      
      if (tags !== undefined) {
        updateData.tags = tags ? JSON.stringify(tags) : null
      }

      const trip = await ctx.prisma.trip.update({
        where: { id },
        data: updateData,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          collaborators: {
            include: {
              user: { select: { id: true, name: true, avatar: true } }
            }
          },
        },
      })

      return {
        ...trip,
        budget: trip.budget ? JSON.parse(trip.budget) : null,
        settings: JSON.parse(trip.settings),
        tags: trip.tags ? JSON.parse(trip.tags) : [],
      }
    }),

  // Delete trip
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const existingTrip = await ctx.prisma.trip.findFirst({
        where: { id: input.id, userId: ctx.userId },
      })

      if (!existingTrip) {
        throw new Error('Trip not found or insufficient permissions')
      }

      await ctx.prisma.trip.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),

  // Get trip templates (public)
  templates: publicProcedure
    .input(z.object({
      type: tripTypeSchema.optional(),
      destination: z.string().optional(),
      limit: z.number().min(1).max(50).optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where: TemplateWhereInput = { isPublic: true }
      
      if (input.type) {
        where.type = input.type
      }
      
      if (input.destination) {
        where.destination = { contains: input.destination, mode: 'insensitive' }
      }

      const templates = await ctx.prisma.tripTemplate.findMany({
        where,
        orderBy: [
          { usageCount: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' }
        ],
        take: input.limit || 20,
      })

      return templates.map(template => ({
        ...template,
        tags: JSON.parse(template.tags),
      }))
    }),

  // Get trip statistics summary
  stats: protectedProcedure
    .query(async ({ ctx }) => {
      const trips = await ctx.prisma.trip.findMany({
        where: {
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId } } }
          ]
        },
        select: { 
          status: true, 
          type: true, 
          startDate: true,
          endDate: true,
          country: true,
        },
      })

      const byStatus = trips.reduce((acc, trip) => {
        acc[trip.status] = (acc[trip.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const byType = trips.reduce((acc, trip) => {
        acc[trip.type] = (acc[trip.type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const byCountry = trips.reduce((acc, trip) => {
        acc[trip.country] = (acc[trip.country] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const currentDate = new Date()
      const upcomingTrips = trips.filter(trip => 
        trip.startDate > currentDate && trip.status !== 'cancelled'
      ).length

      const activeTrips = trips.filter(trip => 
        trip.startDate <= currentDate && trip.endDate >= currentDate && trip.status === 'active'
      ).length

      return {
        totalTrips: trips.length,
        upcomingTrips,
        activeTrips,
        byStatus,
        byType,
        byCountry,
      }
    }),
})