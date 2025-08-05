import { initTRPC } from '@trpc/server'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ApiClient } from '@pops/api-client'
import { config } from '../config/env.js'
import { z } from 'zod'

// Create context for tRPC
export interface Context {
  req: FastifyRequest
  res: FastifyReply
  userId: string | undefined
  tripClient: ApiClient
  itineraryClient: ApiClient
  userClient: ApiClient
}

export const createContext = async ({
  req,
  res,
}: {
  req: FastifyRequest
  res: FastifyReply
}): Promise<Context> => {
  // Extract user ID from headers (temporary auth solution)
  const userId = req.headers['x-user-id'] as string | undefined

  // Create API clients for different services
  const tripClient = new ApiClient({
    baseUrl: config.TRIP_SERVICE_URL,
    ...(userId && { userId }),
  })

  const itineraryClient = new ApiClient({
    baseUrl: config.ITINERARY_SERVICE_URL,
    ...(userId && { userId }),
  })

  const userClient = new ApiClient({
    baseUrl: config.USER_SERVICE_URL,
    ...(userId && { userId }),
  })

  return {
    req,
    res,
    userId,
    tripClient,
    itineraryClient,
    userClient,
  }
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        code: error.code,
        httpStatus: shape.data.httpStatus,
      },
    }
  },
})

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error('Unauthorized - User ID required in headers')
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  })
})

// Import and re-export existing schemas as API gateway routes
import {
  tripTypeSchema,
  tripStatusSchema,
  tripBudgetSchema,
  tripSettingsSchema,
  createTripSchema,
  updateTripSchema,
  tripFiltersSchema,
  createItineraryItemSchema,
  updateItineraryItemSchema,
  itemTypeSchema,
  itemStatusSchema,
} from '@pops/shared-contracts'

// Trip router that proxies to trip service
export const tripRouter = router({
  // Get all trips for user
  list: protectedProcedure
    .input(
      z.object({
        filters: tripFiltersSchema.optional(),
        sortBy: z.enum(['title', 'startDate', 'createdAt', 'updatedAt']).optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        limit: z.number().min(1).max(100).optional(),
        offset: z.number().min(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.tripClient.trips.list(input)
    }),

  // Get single trip
  get: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const trip = await ctx.tripClient.trips.get(input.id)
    if (!trip) {
      throw new Error('Trip not found')
    }
    return trip
  }),

  // Create trip
  create: protectedProcedure.input(createTripSchema).mutation(async ({ ctx, input }) => {
    return ctx.tripClient.trips.create(input)
  }),

  // Update trip
  update: protectedProcedure.input(updateTripSchema).mutation(async ({ ctx, input }) => {
    return ctx.tripClient.trips.update(input)
  }),

  // Delete trip
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.tripClient.trips.delete(input.id)
    }),

  // Get trip templates (public)
  templates: publicProcedure
    .input(
      z.object({
        type: tripTypeSchema.optional(),
        destination: z.string().optional(),
        limit: z.number().min(1).max(50).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.tripClient.trips.getTemplates(input)
    }),

  // Get trip statistics summary
  stats: protectedProcedure.query(async ({ ctx }) => {
    return ctx.tripClient.trips.getStats()
  }),
})

// Itinerary router that proxies to itinerary service
export const itineraryRouter = router({
  // Get itinerary items for trip
  list: protectedProcedure
    .input(
      z.object({
        tripId: z.string(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        types: z.array(itemTypeSchema).optional(),
        status: z.array(itemStatusSchema).optional(),
        limit: z.number().min(1).max(100).optional(),
        offset: z.number().min(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.itineraryClient.get('/itinerary', { params: input })
    }),

  // Get single itinerary item
  get: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const item = await ctx.itineraryClient.get(`/itinerary/${input.id}`)
    if (!item) {
      throw new Error('Itinerary item not found')
    }
    return item
  }),

  // Create itinerary item
  create: protectedProcedure.input(createItineraryItemSchema).mutation(async ({ ctx, input }) => {
    return ctx.itineraryClient.post('/itinerary', input)
  }),

  // Update itinerary item
  update: protectedProcedure.input(updateItineraryItemSchema).mutation(async ({ ctx, input }) => {
    const { id, ...updates } = input
    return ctx.itineraryClient.put(`/itinerary/${id}`, updates)
  }),

  // Delete itinerary item
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.itineraryClient.delete(`/itinerary/${input.id}`)
    }),

  // Get itinerary statistics
  stats: protectedProcedure
    .input(z.object({ tripId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.itineraryClient.get('/itinerary/stats', { params: input })
    }),
})

// Health check router
export const healthRouter = router({
  check: publicProcedure.query(async () => {
    return {
      status: 'healthy' as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  }),
})

// Main app router
export const appRouter = router({
  health: healthRouter,
  trip: tripRouter,
  itinerary: itineraryRouter,
})

export type AppRouter = typeof appRouter
