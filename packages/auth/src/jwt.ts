import jwt from 'jsonwebtoken'
import type { AuthPayload, RefreshTokenPayload } from './types.js'

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

export class JWTService {
  /**
   * Generate access token
   */
  static generateAccessToken(payload: AuthPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'pops-travel-app',
      audience: 'pops-users',
    })
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'pops-travel-app',
      audience: 'pops-users',
    })
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
   * Verify refresh token
   */
  static verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      const payload = jwt.verify(token, JWT_REFRESH_SECRET, {
        issuer: 'pops-travel-app',
        audience: 'pops-users',
      }) as RefreshTokenPayload
      
      return payload
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token')
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired')
      }
      throw new Error('Refresh token verification failed')
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