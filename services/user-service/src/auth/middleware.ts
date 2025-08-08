import type { FastifyRequest, FastifyReply } from 'fastify'
import { JWTService } from './jwt'
import type { AuthPayload } from './types'

// Extend FastifyRequest to include user
declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthPayload
  }
}

/**
 * Authentication middleware for Fastify
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const authHeader = request.headers.authorization
    const token = JWTService.extractBearerToken(authHeader)

    if (!token) {
      reply.code(401).send({
        success: false,
        error: 'Authorization token required',
      })
      return
    }

    const payload = JWTService.verifyAccessToken(token)
    request.user = payload
  } catch (error) {
    reply.code(401).send({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    })
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token is provided
 */
export async function optionalAuthMiddleware(
  request: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization
    const token = JWTService.extractBearerToken(authHeader)

    if (token) {
      const payload = JWTService.verifyAccessToken(token)
      request.user = payload
    }
    // If no token or invalid token, continue without user (don't throw error)
  } catch {
    // Silently ignore auth errors for optional middleware
    request.user = undefined
  }
}
