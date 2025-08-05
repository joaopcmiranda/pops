import express, { type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import type { Request } from 'express'
import { config } from '@/config/env'
import { appRouter } from '@/routes'

// Export types for client usage
export type { AppRouter } from '@/routes'
import { createContext } from '@/middleware/context'
import { errorHandler } from '@/middleware/errorHandler'
import { rateLimiterMiddleware } from '@/middleware/rateLimiter'

// Type for tRPC error handler parameters
interface TRPCErrorHandlerParams {
  error: Error
  type: 'query' | 'mutation' | 'subscription' | 'unknown'
  path: string | undefined
  input: unknown
  ctx: unknown
  req: Request
}

const app: Express = express()

// Security middleware
app.use(helmet())
app.use(compression() as unknown as express.RequestHandler)

// CORS configuration
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
)

// Logging
app.use(morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Rate limiting
app.use(rateLimiterMiddleware)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
  })
})

// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error, type, path, input, ctx }: Omit<TRPCErrorHandlerParams, 'req'>) => {
      console.error(`❌ tRPC Error on ${type} at ${path}:`, error)
      if (config.NODE_ENV === 'development') {
        console.error('Input:', input)
        console.error('Context:', ctx)
      }
    },
  })
)

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    timestamp: new Date().toISOString(),
  })
})

const startServer = async () => {
  try {
    const server = app.listen(config.PORT, () => {
      console.log(`🚀 Trip Organizer API running on port ${config.PORT}`)
      console.log(`📊 Health check: http://localhost:${config.PORT}/health`)
      console.log(`🔌 tRPC endpoint: http://localhost:${config.PORT}/trpc`)
      console.log(`🌍 Environment: ${config.NODE_ENV}`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully')
      server.close(() => {
        console.log('✅ Server closed')
        process.exit(0)
      })
    })

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully')
      server.close(() => {
        console.log('✅ Server closed')
        process.exit(0)
      })
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
