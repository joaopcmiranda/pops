import type { FastifyInstance } from 'fastify'
import {
  tripListInputSchema,
  createTripSchema,
  updateTripSchema,
  tripTemplateListInputSchema,
} from '@pops/shared-contracts'
import { TripService } from '../services/trip-service.js'

export async function tripRoutes(fastify: FastifyInstance) {
  const tripService = new TripService()

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

  // List trips
  fastify.get(
    '/trips',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            'filters.status': { type: 'string' },
            'filters.type': { type: 'string' },
            'filters.destination': { type: 'string' },
            'filters.country': { type: 'string' },
            'filters.startDate': { type: 'string' },
            'filters.endDate': { type: 'string' },
            'filters.tags': { type: 'string' },
            'filters.collaborator': { type: 'boolean' },
            sortBy: { type: 'string', enum: ['title', 'startDate', 'createdAt', 'updatedAt'] },
            sortOrder: { type: 'string', enum: ['asc', 'desc'] },
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

        // Parse query parameters into TripListInput format
        const input: any = {}

        if (query.sortBy) input.sortBy = query.sortBy
        if (query.sortOrder) input.sortOrder = query.sortOrder
        if (query.limit) input.limit = parseInt(query.limit)
        if (query.offset) input.offset = parseInt(query.offset)

        // Parse filters
        const filters: any = {}
        if (query['filters.status']) {
          filters.status = query['filters.status'].split(',')
        }
        if (query['filters.type']) {
          filters.type = query['filters.type'].split(',')
        }
        if (query['filters.destination']) {
          filters.destination = query['filters.destination']
        }
        if (query['filters.country']) {
          filters.country = query['filters.country']
        }
        if (query['filters.startDate'] && query['filters.endDate']) {
          filters.dateRange = {
            start: query['filters.startDate'],
            end: query['filters.endDate'],
          }
        }
        if (query['filters.tags']) {
          filters.tags = query['filters.tags'].split(',')
        }
        if (query['filters.collaborator'] !== undefined) {
          filters.collaborator = query['filters.collaborator']
        }

        if (Object.keys(filters).length > 0) {
          input.filters = filters
        }

        const trips = await tripService.list(input, userId)

        reply.send({
          success: true,
          data: trips,
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

  // Get single trip
  fastify.get(
    '/trips/:id',
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

        const trip = await tripService.get(id, userId)

        if (!trip) {
          reply.code(404).send({
            success: false,
            error: 'Trip not found',
          })
          return
        }

        reply.send({
          success: true,
          data: trip,
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

  // Create trip
  fastify.post('/trips', async (request, reply) => {
    try {
      const userId = (request as any).userId
      const input = createTripSchema.parse(request.body)

      const trip = await tripService.create(input, userId)

      reply.code(201).send({
        success: true,
        data: trip,
      })
    } catch (error: any) {
      fastify.log.error(error)
      reply.code(500).send({
        success: false,
        error: error.message || 'Internal Server Error',
      })
    }
  })

  // Update trip
  fastify.put(
    '/trips/:id',
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
        const trip = await tripService.update(input, userId)

        reply.send({
          success: true,
          data: trip,
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

  // Delete trip
  fastify.delete(
    '/trips/:id',
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

        const result = await tripService.delete(id, userId)

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

  // Get trip statistics
  fastify.get('/trips/stats', async (request, reply) => {
    try {
      const userId = (request as any).userId

      const stats = await tripService.getStats(userId)

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
  })

  // Get trip templates (public endpoint)
  fastify.get('/trips/templates', async (request, reply) => {
    try {
      // TODO: Implement trip templates
      reply.send({
        success: true,
        data: [],
      })
    } catch (error: any) {
      fastify.log.error(error)
      reply.code(500).send({
        success: false,
        error: error.message || 'Internal Server Error',
      })
    }
  })
}
