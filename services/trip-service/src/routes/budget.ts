import type { FastifyInstance } from 'fastify'
import { BudgetService } from '../services/budget-service.js'
import { authMiddleware, getUserId } from '../auth/middleware.js'

export async function budgetRoutes(fastify: FastifyInstance) {
  const budgetService = new BudgetService()

  // Add auth middleware to all budget routes
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

  // Get budget summary for a trip
  fastify.get(
    '/trips/:tripId/budget/summary',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const userId = getUserId(request)

        const summary = await budgetService.getBudgetSummary(tripId, userId)

        reply.send({
          success: true,
          data: summary,
        })
      } catch (error) {
        fastify.log.error('Error fetching budget summary:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch budget summary',
        })
      }
    }
  )

  // Get all budget categories for a trip
  fastify.get(
    '/trips/:tripId/budget/categories',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const userId = getUserId(request)

        const categories = await budgetService.getBudgetCategories({ tripId, userId })

        reply.send({
          success: true,
          data: categories,
        })
      } catch (error) {
        fastify.log.error('Error fetching budget categories:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch budget categories',
        })
      }
    }
  )

  // Initialize default budget categories for a trip
  fastify.post(
    '/trips/:tripId/budget/categories/initialize',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
          },
          required: ['tripId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const userId = getUserId(request)

        const categories = await budgetService.initializeDefaultCategories(tripId, userId)

        reply.code(201).send({
          success: true,
          data: categories,
        })
      } catch (error) {
        fastify.log.error('Error initializing budget categories:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to initialize budget categories',
        })
      }
    }
  )

  // Create a new budget category
  fastify.post(
    '/trips/:tripId/budget/categories',
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
            name: { type: 'string', minLength: 1 },
            color: { type: 'string', minLength: 1 },
            icon: { type: 'string', minLength: 1 },
            description: { type: 'string' },
          },
          required: ['name', 'color', 'icon'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const body = request.body as {
          name: string
          color: string
          icon: string
          description?: string
        }
        const userId = getUserId(request)

        const category = await budgetService.createBudgetCategory({
          tripId,
          userId,
          name: body.name,
          color: body.color,
          icon: body.icon,
          description: body.description,
        })

        reply.code(201).send({
          success: true,
          data: category,
        })
      } catch (error) {
        fastify.log.error('Error creating budget category:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to create budget category',
        })
      }
    }
  )

  // Update a budget category
  fastify.put(
    '/trips/:tripId/budget/categories/:categoryId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            categoryId: { type: 'string' },
          },
          required: ['tripId', 'categoryId'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 1 },
            color: { type: 'string', minLength: 1 },
            icon: { type: 'string', minLength: 1 },
            description: { type: 'string' },
          },
          required: ['name', 'color', 'icon'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, categoryId } = request.params as { tripId: string; categoryId: string }
        const body = request.body as {
          name: string
          color: string
          icon: string
          description?: string
        }
        const userId = getUserId(request)

        const category = await budgetService.updateBudgetCategory({
          tripId,
          userId,
          categoryId,
          name: body.name,
          color: body.color,
          icon: body.icon,
          description: body.description,
        })

        if (!category) {
          reply.code(404).send({
            success: false,
            error: 'Budget category not found',
          })
          return
        }

        reply.send({
          success: true,
          data: category,
        })
      } catch (error) {
        fastify.log.error('Error updating budget category:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to update budget category',
        })
      }
    }
  )

  // Delete a budget category
  fastify.delete(
    '/trips/:tripId/budget/categories/:categoryId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            categoryId: { type: 'string' },
          },
          required: ['tripId', 'categoryId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, categoryId } = request.params as { tripId: string; categoryId: string }
        const userId = getUserId(request)

        const success = await budgetService.deleteBudgetCategory({
          tripId,
          userId,
          categoryId,
        })

        if (!success) {
          reply.code(404).send({
            success: false,
            error: 'Budget category not found',
          })
          return
        }

        reply.send({
          success: true,
          message: 'Budget category deleted successfully',
        })
      } catch (error) {
        fastify.log.error('Error deleting budget category:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to delete budget category',
        })
      }
    }
  )

  // Get all budget items for a trip (optionally filtered by category)
  fastify.get(
    '/trips/:tripId/budget/items',
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
            categoryId: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const { categoryId } = request.query as { categoryId?: string }
        const userId = getUserId(request)

        const items = await budgetService.getBudgetItems({ tripId, userId, categoryId })

        reply.send({
          success: true,
          data: items,
        })
      } catch (error) {
        fastify.log.error('Error fetching budget items:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to fetch budget items',
        })
      }
    }
  )

  // Create a new budget item
  fastify.post(
    '/trips/:tripId/budget/items',
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
            categoryId: { type: 'string', minLength: 1 },
            description: { type: 'string', minLength: 1 },
            budgetedAmount: { type: 'number', minimum: 0 },
            actualAmount: { type: 'number', minimum: 0 },
            notes: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            dateSpent: { type: 'string', format: 'date-time' },
          },
          required: ['categoryId', 'description', 'budgetedAmount'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId } = request.params as { tripId: string }
        const body = request.body as {
          categoryId: string
          description: string
          budgetedAmount: number
          actualAmount?: number
          notes?: string
          tags?: string[]
          dateSpent?: string
        }
        const userId = getUserId(request)

        const item = await budgetService.createBudgetItem({
          tripId,
          userId,
          categoryId: body.categoryId,
          description: body.description,
          budgetedAmount: body.budgetedAmount,
          actualAmount: body.actualAmount,
          notes: body.notes,
          tags: body.tags,
          dateSpent: body.dateSpent ? new Date(body.dateSpent) : undefined,
        })

        reply.code(201).send({
          success: true,
          data: item,
        })
      } catch (error) {
        fastify.log.error('Error creating budget item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to create budget item',
        })
      }
    }
  )

  // Update a budget item
  fastify.put(
    '/trips/:tripId/budget/items/:itemId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            itemId: { type: 'string' },
          },
          required: ['tripId', 'itemId'],
        },
        body: {
          type: 'object',
          properties: {
            description: { type: 'string', minLength: 1 },
            budgetedAmount: { type: 'number', minimum: 0 },
            actualAmount: { type: 'number', minimum: 0 },
            notes: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            dateSpent: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, itemId } = request.params as { tripId: string; itemId: string }
        const body = request.body as {
          description?: string
          budgetedAmount?: number
          actualAmount?: number
          notes?: string
          tags?: string[]
          dateSpent?: string
        }
        const userId = getUserId(request)

        const updateParams = {
          tripId,
          userId,
          itemId,
          ...body,
          dateSpent: body.dateSpent ? new Date(body.dateSpent) : undefined,
        }

        const item = await budgetService.updateBudgetItem(updateParams)

        if (!item) {
          reply.code(404).send({
            success: false,
            error: 'Budget item not found',
          })
          return
        }

        reply.send({
          success: true,
          data: item,
        })
      } catch (error) {
        fastify.log.error('Error updating budget item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to update budget item',
        })
      }
    }
  )

  // Delete a budget item
  fastify.delete(
    '/trips/:tripId/budget/items/:itemId',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            tripId: { type: 'string' },
            itemId: { type: 'string' },
          },
          required: ['tripId', 'itemId'],
        },
      },
    },
    async (request, reply) => {
      try {
        const { tripId, itemId } = request.params as { tripId: string; itemId: string }
        const userId = getUserId(request)

        const success = await budgetService.deleteBudgetItem({
          tripId,
          userId,
          itemId,
        })

        if (!success) {
          reply.code(404).send({
            success: false,
            error: 'Budget item not found',
          })
          return
        }

        reply.send({
          success: true,
          message: 'Budget item deleted successfully',
        })
      } catch (error) {
        fastify.log.error('Error deleting budget item:', error)
        reply.code(500).send({
          success: false,
          error: 'Failed to delete budget item',
        })
      }
    }
  )
}
