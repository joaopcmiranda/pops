import jwt from 'jsonwebtoken'
import type { AuthPayload } from './types'

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h' // Longer for development

export class JWTService {
  /**
   * Generate access token
   */
  static generateAccessToken(payload: AuthPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'pops-travel-app',
      audience: 'pops-users',
    } as jwt.SignOptions)
  }

  /**
   * Verify access token
   */
  static verifyAccessToken(token: string): AuthPayload {
    try {
      const payload = jwt.verify(token, JWT_SECRET, {
        issuer: 'pops-travel-app',
        audience: 'pops-users',
      }) as AuthPayload

      return payload
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token')
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired')
      }
      throw new Error('Token verification failed')
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractBearerToken(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    return authHeader.substring(7)
  }
}
