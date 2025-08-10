import type { FastifyRequest, FastifyReply } from 'fastify'

// Extend FastifyRequest to include user
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string
      email: string
      name: string
    }
  }
}

/**
 * Simple user ID extraction from headers for cross-service requests
 * In production, this would validate JWT tokens, but for now we'll use the x-user-id header
 * that's being set by the API client
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const userId = request.headers['x-user-id'] as string

    if (!userId) {
      reply.code(401).send({
        success: false,
        error: 'User ID required',
      })
      return
    }

    // For now, we'll use the simple user ID approach
    // Later this will be enhanced to validate JWT tokens from user-service
    request.user = {
      userId,
      email: 'user@example.com', // Placeholder
      name: 'User', // Placeholder
    }
  } catch (error) {
    reply.code(401).send({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    })
  }
}

/**
 * Extract user ID from request (from middleware)
 */
export function getUserId(request: FastifyRequest): string {
  const user = request.user
  if (!user) {
    throw new Error('User not authenticated')
  }
  return user.userId
}
