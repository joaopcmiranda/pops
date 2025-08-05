import type { Request, Response, NextFunction } from 'express'
import { config } from '@/config/env'

export interface AppError extends Error {
  statusCode?: number
  code?: string
}

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(error)
  }

  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  // Log error details
  console.error(`❌ Error ${statusCode}:`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    code: error.code,
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && {
      stack: error.stack,
      details: {
        url: req.url,
        method: req.method,
      },
    }),
  })
}

// Create custom error types
export class ValidationError extends Error {
  statusCode = 400
  code = 'VALIDATION_ERROR'

  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  statusCode = 404
  code = 'NOT_FOUND'

  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends Error {
  statusCode = 401
  code = 'UNAUTHORIZED'

  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  statusCode = 403
  code = 'FORBIDDEN'

  constructor(message: string = 'Forbidden') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class ConflictError extends Error {
  statusCode = 409
  code = 'CONFLICT'

  constructor(message: string) {
    super(message)
    this.name = 'ConflictError'
  }
}
