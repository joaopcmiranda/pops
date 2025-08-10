import { FastifyInstance } from 'fastify'
import { WishlistService } from '../services/wishlist-service.js'

// Type definitions for request bodies and params
interface CreateWishlistBody {
  title: string
  description?: string
  type: 'food' | 'place' | 'experience' | 'accommodation' | 'transport' | 'activity'
  category: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
}

interface UpdateWishlistBody extends Partial<CreateWishlistBody> {
  status?: 'wishlist' | 'planned' | 'booked' | 'completed'
}

interface WishlistParams {
  tripId: string
  wishlistId?: string
}

interface WishlistQueryParams {
  category?: string
  type?: string
}

/**
 * Wishlist API Routes
 */
export async function wishlistRoutes(fastify: FastifyInstance) {
  const wishlistService = new WishlistService()

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

  // Get all wishlist items for a trip
  fastify.get<{
    Params: Pick<WishlistParams, 'tripId'>
    Querystring: WishlistQueryParams
  }>('/trips/:tripId/wishlist', async (request, reply) => {
    try {
      const { tripId } = request.params
      const { category, type } = request.query
      const userId = (request as unknown as { userId: string }).userId

      const filters: Record<string, unknown> = {}
      if (category) filters.category = [category]
      if (type) filters.type = [type]

      const items = await wishlistService.list(tripId, userId, { filters })

      return {
        success: true,
        data: items,
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch wishlist items',
      })
    }
  })

  // Get wishlist item by ID
  fastify.get<{
    Params: Required<WishlistParams>
  }>('/trips/:tripId/wishlist/:wishlistId', async (request, reply) => {
    try {
      const { wishlistId } = request.params
      const userId = (request as unknown as { userId: string }).userId

      const item = await wishlistService.get(wishlistId, userId)
      if (!item) {
        return reply.status(404).send({
          success: false,
          error: 'Wishlist item not found',
        })
      }

      return {
        success: true,
        data: item,
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch wishlist item',
      })
    }
  })

  // Create new wishlist item
  fastify.post<{
    Params: Pick<WishlistParams, 'tripId'>
    Body: CreateWishlistBody
  }>('/trips/:tripId/wishlist', async (request, reply) => {
    try {
      const { tripId } = request.params
      const body = request.body
      const userId = (request as unknown as { userId: string }).userId

      const item = await wishlistService.create(
        {
          ...body,
          tripId,
        },
        userId
      )

      return reply.status(201).send({
        success: true,
        data: item,
      })
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Failed to create wishlist item',
      })
    }
  })

  // Update wishlist item
  fastify.put<{
    Params: Required<WishlistParams>
    Body: UpdateWishlistBody
  }>('/trips/:tripId/wishlist/:wishlistId', async (request, reply) => {
    try {
      const { wishlistId } = request.params
      const body = request.body
      const userId = (request as unknown as { userId: string }).userId

      const updateData = {
        id: wishlistId,
        ...body,
      }

      const item = await wishlistService.update(updateData, userId)

      return {
        success: true,
        data: item,
      }
    } catch (error) {
      fastify.log.error(error)
      const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
      return reply.status(status).send({
        success: false,
        error: 'Failed to update wishlist item',
      })
    }
  })

  // Delete wishlist item
  fastify.delete<{
    Params: Required<WishlistParams>
  }>('/trips/:tripId/wishlist/:wishlistId', async (request, reply) => {
    try {
      const { wishlistId } = request.params
      const userId = (request as unknown as { userId: string }).userId

      const result = await wishlistService.delete(wishlistId, userId)

      return {
        success: true,
        message: 'Wishlist item deleted successfully',
        data: result,
      }
    } catch (error) {
      fastify.log.error(error)
      const status = error instanceof Error && error.message.includes('not found') ? 404 : 500
      return reply.status(status).send({
        success: false,
        error: 'Failed to delete wishlist item',
      })
    }
  })

  // Convert wishlist item to itinerary
  fastify.post<{
    Params: Required<WishlistParams>
  }>('/trips/:tripId/wishlist/:wishlistId/convert', async (request, reply) => {
    try {
      const { wishlistId: _wishlistId } = request.params
      const _userId = (request as unknown as { userId: string }).userId

      // TODO: Implement convert to itinerary functionality
      // This would require integration with the itinerary service
      return reply.status(501).send({
        success: false,
        error: 'Convert to itinerary not yet implemented',
      })
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Failed to convert wishlist item',
      })
    }
  })

  // Get wishlist stats for a trip
  fastify.get<{
    Params: Pick<WishlistParams, 'tripId'>
  }>('/trips/:tripId/wishlist/stats', async (request, reply) => {
    try {
      const { tripId } = request.params
      const userId = (request as unknown as { userId: string }).userId

      const stats = await wishlistService.getStats(tripId, userId)

      return {
        success: true,
        data: stats,
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch wishlist stats',
      })
    }
  })
}
