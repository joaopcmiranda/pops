import type { FastifyInstance } from 'fastify'
import * as types from '@pops/types'
import { ItineraryService } from '../services/itinerary-service'
console.log(
  'Available types:',
  Object.keys(types).filter(k => k.includes('Itinerary'))
)
const { createItineraryItemSchema } = types

export async function itineraryRoutes(fastify: FastifyInstance) {
  const itineraryService = new ItineraryService()

  // Get user ID from headers middleware
  fastify.addHook('preHandler', async (request, reply) => {
    const userId = request.headers['x-user-id'] as string
    if (!userId) {
      reply.code(401).send({
        success: false,
        error: 'Unauthorized - User ID required in headers',
      })
      return
    }
    // Store userId in request context
    ;(request as unknown as { userId: string }).userId = userId
  })

  // List itinerary items for a trip
  fastify.get(
    '/itinerary',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['tripId'],
          properties: {
            tripId: { type: 'string' },
            startDate: { type: 'string' },
            endDate: { type: 'string' },
            types: { type: 'string' }, // comma-separated
            status: { type: 'string' }, // comma-separated
            limit: { type: 'number', minimum: 1, maximum: 100 },
            offset: { type: 'number', minimum: 0 },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const query = request.query as Record<string, unknown>
        const userId = (request as unknown as { userId: string }).userId

        const filters: Record<string, unknown> = {}

        if (query.startDate) filters.startDate = query.startDate
        if (query.endDate) filters.endDate = query.endDate
        if (query.limit) filters.limit = parseInt(query.limit as string)
        if (query.offset) filters.offset = parseInt(query.offset as string)

        if (query.types) {
          filters.types = (query.types as string).split(',')
        }

        if (query.status) {
          filters.status = (query.status as string).split(',')
        }

        const items = await itineraryService.list(query.tripId as string, userId, filters)

        reply.send({
          success: true,
          data: items,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // Get single itinerary item
  fastify.get(
    '/itinerary/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const userId = (request as unknown as { userId: string }).userId

        const item = await itineraryService.get(id, userId)

        if (!item) {
          reply.code(404).send({
            success: false,
            error: 'Itinerary item not found',
          })
          return
        }

        reply.send({
          success: true,
          data: item,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // Create itinerary item
  fastify.post('/itinerary', async (request, reply) => {
    try {
      const userId = (request as unknown as { userId: string }).userId
      const input = createItineraryItemSchema.parse(request.body)

      const item = await itineraryService.create(input, userId)

      reply.code(201).send({
        success: true,
        data: item,
      })
    } catch (error: unknown) {
      fastify.log.error(error)
      reply.code(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      })
    }
  })

  // Update itinerary item
  fastify.put(
    '/itinerary/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const userId = (request as unknown as { userId: string }).userId
        const updateData = request.body as Record<string, unknown>

        const input = { id, ...updateData }
        const item = await itineraryService.update(input, userId)

        reply.send({
          success: true,
          data: item,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status =
          error instanceof Error &&
          (error.message.includes('not found') ||
            error.message.includes('insufficient permissions'))
            ? 404
            : 500
        reply.code(status).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // Delete itinerary item
  fastify.delete(
    '/itinerary/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const userId = (request as unknown as { userId: string }).userId

        const result = await itineraryService.delete(id, userId)

        reply.send({
          success: true,
          data: result,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status =
          error instanceof Error &&
          (error.message.includes('not found') ||
            error.message.includes('insufficient permissions'))
            ? 404
            : 500
        reply.code(status).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // Get itinerary statistics for a trip
  fastify.get(
    '/itinerary/stats',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['tripId'],
          properties: {
            tripId: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const query = request.query as Record<string, unknown>
        const userId = (request as unknown as { userId: string }).userId

        const stats = await itineraryService.getStats(query.tripId as string, userId)

        reply.send({
          success: true,
          data: stats,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )
}
