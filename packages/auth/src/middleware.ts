import type { FastifyRequest, FastifyReply } from 'fastify'
import { JWTService } from './jwt.js'
import type { AuthPayload } from './types.js'

// Extend FastifyRequest to include user
declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthPayload
  }
}

/**
 * Authentication middleware for Fastify
 */
export async function authMiddleware(
  request: FastifyRequest, 
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization
    const token = JWTService.extractBearerToken(authHeader)
    
    if (!token) {
      reply.code(401).send({
        success: false,
        error: 'Authorization token required'
      })
      return
    }

    const payload = JWTService.verifyAccessToken(token)
    request.user = payload
  } catch (error) {
    reply.code(401).send({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    })
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token is provided
 */
export async function optionalAuthMiddleware(
  request: FastifyRequest, 
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization
    const token = JWTService.extractBearerToken(authHeader)
    
    if (token) {
      const payload = JWTService.verifyAccessToken(token)
      request.user = payload
    }
    // If no token or invalid token, continue without user (don't throw error)
  } catch (error) {
    // Silently ignore auth errors for optional middleware
    request.user = undefined
  }
}

/**
 * Check if user has required role (for future role-based access control)
 */
export function requireRole(requiredRole: string) {
  return async function(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    if (!request.user) {
      reply.code(401).send({
        success: false,
        error: 'Authentication required'
      })
      return
    }

    // For now, we'll implement a simple role check
    // In the future, this could be expanded to check roles from the database
    if (requiredRole === 'admin' && !request.user.email.endsWith('@admin.com')) {
      reply.code(403).send({
        success: false,
        error: 'Insufficient permissions'
      })
      return
    }
  }
}