import type { FastifyInstance } from 'fastify'
import { ContentService } from '../services/content-service.js'
import { authMiddleware, getUserId } from '../auth/middleware.js'

export async function contentRoutes(fastify: FastifyInstance) {
  const contentService = new ContentService()

  // Add auth middleware to all content routes
  fastify.addHook('preHandler', authMiddleware)

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

  // Get all content items for a trip
  fastify.get(
    '/trips/:tripId/content',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
        querystring: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            limit: { type: 'number', minimum: 1, maximum: 100 },
            offset: { type: 'number', minimum: 0 },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const {
          category,
          limit = 50,
          offset = 0,
        } = request.query as {
          category?: string
          limit?: number
          offset?: number
        }
        const userId = getUserId(request)

        const result = await contentService.getContentItems({
          tripId,
          userId,
          category,
          limit,
          offset,
        })

        reply.send({
          success: true,
          data: result.items,
          pagination: {
            total: result.total,
            limit,
            offset,
            hasMore: offset + limit < result.total,
          },
        })
      } catch (error) {
        fastify.log.error('Error fetching content items:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch content items',
        })
      }
    }
  )

  // Get content by category for a trip
  fastify.get(
    '/trips/:tripId/content/category/:category',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            category: { type: 'string' },
          },
          required: ['tripId', 'category'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, category } = request.params as { tripId: string; category: string }
        const userId = getUserId(request)

        const items = await contentService.getContentByCategory({
          tripId,
          userId,
          category,
        })

        reply.send({
          success: true,
          data: items,
        })
      } catch (error) {
        fastify.log.error('Error fetching content by category:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch content by category',
        })
      }
    }
  )

  // Get a specific content item
  fastify.get(
    '/trips/:tripId/content/:contentId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            contentId: { type: 'string' },
          },
          required: ['tripId', 'contentId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, contentId } = request.params as { tripId: string; contentId: string }
        const userId = getUserId(request)

        const item = await contentService.getContentItem({
          tripId,
          userId,
          contentId,
        })

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
      } catch (error) {
        fastify.log.error('Error fetching content item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch content item',
        })
      }
    }
  )

  // Create a new content item
  fastify.post(
    '/trips/:tripId/content',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string', minLength: 1 },
            content: { type: 'string', minLength: 1 },
            category: { type: 'string', minLength: 1 },
            slug: { type: 'string', minLength: 1 },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'content', 'category', 'slug'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const body = request.body as {
          title: string
          content: string
          category: string
          slug: string
          tags?: string[]
        }
        const userId = getUserId(request)

        const item = await contentService.createContentItem({
          tripId,
          userId,
          title: body.title,
          content: body.content,
          category: body.category,
          slug: body.slug,
          tags: body.tags,
        })

        reply.code(201).send({
          success: true,
          data: item,
        })
      } catch (error) {
        fastify.log.error('Error creating content item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to create content item',
        })
      }
    }
  )

  // Update a content item
  fastify.put(
    '/trips/:tripId/content/:contentId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            contentId: { type: 'string' },
          },
          required: ['tripId', 'contentId'],
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string', minLength: 1 },
            content: { type: 'string', minLength: 1 },
            category: { type: 'string', minLength: 1 },
            slug: { type: 'string', minLength: 1 },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'content', 'category', 'slug'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, contentId } = request.params as { tripId: string; contentId: string }
        const body = request.body as {
          title: string
          content: string
          category: string
          slug: string
          tags?: string[]
        }
        const userId = getUserId(request)

        const item = await contentService.updateContentItem({
          tripId,
          userId,
          contentId,
          title: body.title,
          content: body.content,
          category: body.category,
          slug: body.slug,
          tags: body.tags,
        })

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
      } catch (error) {
        fastify.log.error('Error updating content item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to update content item',
        })
      }
    }
  )

  // Delete a content item
  fastify.delete(
    '/trips/:tripId/content/:contentId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            contentId: { type: 'string' },
          },
          required: ['tripId', 'contentId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, contentId } = request.params as { tripId: string; contentId: string }
        const userId = getUserId(request)

        const success = await contentService.deleteContentItem({
          tripId,
          userId,
          contentId,
        })

        if (!success) {
          reply.code(404).send({
            success: false,
            error: 'Content item not found',
          })
          return
        }

        reply.send({
          success: true,
          message: 'Content item deleted successfully',
        })
      } catch (error) {
        fastify.log.error('Error deleting content item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to delete content item',
        })
      }
    }
  )

  // Search content items
  fastify.get(
    '/trips/:tripId/content/search',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string', minLength: 1 },
            category: { type: 'string' },
            limit: { type: 'number', minimum: 1, maximum: 100 },
            offset: { type: 'number', minimum: 0 },
          },
          required: ['q'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const {
          q,
          category,
          limit = 50,
          offset = 0,
        } = request.query as {
          q: string
          category?: string
          limit?: number
          offset?: number
        }
        const userId = getUserId(request)

        const result = await contentService.searchContent({
          tripId,
          userId,
          query: q,
          category,
          limit,
          offset,
        })

        reply.send({
          success: true,
          data: result.items,
          pagination: {
            total: result.total,
            limit,
            offset,
            hasMore: offset + limit < result.total,
          },
        })
      } catch (error) {
        fastify.log.error('Error searching content:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to search content',
        })
      }
    }
  )
}
