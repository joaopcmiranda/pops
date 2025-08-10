import type { FastifyInstance } from 'fastify'
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

        const items = await itineraryService.listItineraryItems(
          query.tripId as string,
          userId,
          filters
        )

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

        const item = await itineraryService.getItineraryItem(id, userId)

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
  fastify.post(
    '/itinerary',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'type', 'startDate', 'tripId'],
          properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            type: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            isAllDay: { type: 'boolean' },
            status: { type: 'string' },
            priority: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' },
            typeData: { type: 'object' },
            tripId: { type: 'string' },
            locationId: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = (request as unknown as { userId: string }).userId
        const input = request.body as {
          title: string
          description?: string
          type: string
          startDate: string
          endDate?: string
          isAllDay?: boolean
          status?: string
          priority?: string
          tags?: string[]
          notes?: string
          typeData?: Record<string, unknown>
          tripId: string
          locationId?: string
        }

        const item = await itineraryService.createItineraryItem(
          {
            ...input,
            startDate: new Date(input.startDate),
            endDate: input.endDate ? new Date(input.endDate) : undefined,
          },
          userId
        )

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
    }
  )

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
        body: {
          type: 'object',
          properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            type: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            isAllDay: { type: 'boolean' },
            status: { type: 'string' },
            priority: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' },
            typeData: { type: 'object' },
            locationId: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const userId = (request as unknown as { userId: string }).userId
        const updateData = request.body as {
          title?: string
          description?: string
          type?: string
          startDate?: string
          endDate?: string
          isAllDay?: boolean
          status?: string
          priority?: string
          tags?: string[]
          notes?: string
          typeData?: Record<string, unknown>
          locationId?: string
        }

        const item = await itineraryService.updateItineraryItem(
          {
            id,
            ...updateData,
            startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
            endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
          },
          userId
        )

        reply.send({
          success: true,
          data: item,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
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

        const result = await itineraryService.deleteItineraryItem(id, userId)

        reply.send({
          success: true,
          data: result,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
        reply.code(status).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // List content items for a trip
  fastify.get(
    '/content',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['tripId'],
          properties: {
            tripId: { type: 'string' },
            category: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const query = request.query as { tripId: string; category?: string }
        const userId = (request as unknown as { userId: string }).userId

        const items = await itineraryService.listContentItems(query.tripId, userId, query.category)

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

  // Get single content item
  fastify.get(
    '/content/:id',
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

        const item = await itineraryService.getContentItem(id, userId)

        if (!item) {
          reply.code(404).send({
            success: false,
            error: 'Content item not found',
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

  // Create content item
  fastify.post(
    '/content',
    {
      schema: {
        body: {
          type: 'object',
          required: ['category', 'title', 'content', 'slug', 'tripId'],
          properties: {
            category: { type: 'string', minLength: 1 },
            title: { type: 'string', minLength: 1 },
            content: { type: 'string', minLength: 1 },
            slug: { type: 'string', minLength: 1 },
            tags: { type: 'array', items: { type: 'string' } },
            tripId: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = (request as unknown as { userId: string }).userId
        const input = request.body as {
          category: string
          title: string
          content: string
          slug: string
          tags?: string[]
          tripId: string
        }

        const item = await itineraryService.createContentItem(input, userId)

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
    }
  )

  // Update content item
  fastify.put(
    '/content/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            category: { type: 'string', minLength: 1 },
            title: { type: 'string', minLength: 1 },
            content: { type: 'string', minLength: 1 },
            slug: { type: 'string', minLength: 1 },
            tags: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const userId = (request as unknown as { userId: string }).userId
        const updateData = request.body as {
          category?: string
          title?: string
          content?: string
          slug?: string
          tags?: string[]
        }

        const item = await itineraryService.updateContentItem(
          {
            id,
            ...updateData,
          },
          userId
        )

        reply.send({
          success: true,
          data: item,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
        reply.code(status).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )

  // Delete content item
  fastify.delete(
    '/content/:id',
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

        const result = await itineraryService.deleteContentItem(id, userId)

        reply.send({
          success: true,
          data: result,
        })
      } catch (error: unknown) {
        fastify.log.error(error)
        const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
        reply.code(status).send({
          success: false,
          error: error instanceof Error ? error.message : 'Internal Server Error',
        })
      }
    }
  )
}
