import { RateLimiterMemory } from 'rate-limiter-flexible'
import type { Request, Response, NextFunction } from 'express'
import { config } from '@/config/env'

// Type for rate limiter rejection response
interface RateLimiterRejection {
  msBeforeNext: number
  remainingHits?: number
  totalHits?: number
}

// Create rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: config.RATE_LIMIT_MAX_REQUESTS, // Number of requests
  duration: Math.floor(config.RATE_LIMIT_WINDOW_MS / 1000), // Per duration in seconds
  blockDuration: 60, // Block for 60 seconds if limit exceeded
})

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip || 'unknown')
    next()
  } catch (rejRes: unknown) {
    const rejection = rejRes as RateLimiterRejection
    const secs = Math.round(rejection.msBeforeNext / 1000) || 1

    res.set('Retry-After', String(secs))
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      message: `Rate limit exceeded. Try again in ${secs} seconds.`,
      retryAfter: secs,
      timestamp: new Date().toISOString(),
    })
  }
}

// Export as default for easier importing
export { rateLimiterMiddleware as rateLimiter }
