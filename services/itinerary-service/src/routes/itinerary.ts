import type { FastifyInstance } from 'fastify'
import {
  createItineraryItemSchema,
  updateItineraryItemSchema,
  itemTypeSchema,
  itemStatusSchema,
} from '@pops/shared-contracts'
import { ItineraryService } from '../services/itinerary-service.js'

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
    ;(request as any).userId = userId
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
        const query = request.query as any
        const userId = (request as any).userId

        const filters: any = {}

        if (query.startDate) filters.startDate = query.startDate
        if (query.endDate) filters.endDate = query.endDate
        if (query.limit) filters.limit = parseInt(query.limit)
        if (query.offset) filters.offset = parseInt(query.offset)

        if (query.types) {
          filters.types = query.types.split(',')
        }

        if (query.status) {
          filters.status = query.status.split(',')
        }

        const items = await itineraryService.list(query.tripId, userId, filters)

        reply.send({
          success: true,
          data: items,
        })
      } catch (error: any) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error.message || 'Internal Server Error',
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
        const userId = (request as any).userId

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
      } catch (error: any) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error.message || 'Internal Server Error',
        })
      }
    }
  )

  // Create itinerary item
  fastify.post('/itinerary', async (request, reply) => {
    try {
      const userId = (request as any).userId
      const input = createItineraryItemSchema.parse(request.body)

      const item = await itineraryService.create(input, userId)

      reply.code(201).send({
        success: true,
        data: item,
      })
    } catch (error: any) {
      fastify.log.error(error)
      reply.code(500).send({
        success: false,
        error: error.message || 'Internal Server Error',
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
        const userId = (request as any).userId
        const updateData = request.body as any

        const input = { id, ...updateData }
        const item = await itineraryService.update(input, userId)

        reply.send({
          success: true,
          data: item,
        })
      } catch (error: any) {
        fastify.log.error(error)
        const status =
          error.message.includes('not found') || error.message.includes('insufficient permissions')
            ? 404
            : 500
        reply.code(status).send({
          success: false,
          error: error.message || 'Internal Server Error',
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
        const userId = (request as any).userId

        const result = await itineraryService.delete(id, userId)

        reply.send({
          success: true,
          data: result,
        })
      } catch (error: any) {
        fastify.log.error(error)
        const status =
          error.message.includes('not found') || error.message.includes('insufficient permissions')
            ? 404
            : 500
        reply.code(status).send({
          success: false,
          error: error.message || 'Internal Server Error',
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
        const query = request.query as any
        const userId = (request as any).userId

        const stats = await itineraryService.getStats(query.tripId, userId)

        reply.send({
          success: true,
          data: stats,
        })
      } catch (error: any) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: error.message || 'Internal Server Error',
        })
      }
    }
  )
}
