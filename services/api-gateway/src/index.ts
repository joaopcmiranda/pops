import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import compress from '@fastify/compress'
import rateLimit from '@fastify/rate-limit'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { config } from './config/env.js'
import { appRouter, createContext } from './trpc/router.js'

// Create Fastify instance
const fastify = Fastify({
  logger:
    config.NODE_ENV === 'development'
      ? {
          level: config.LOG_LEVEL,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              ignore: 'pid,hostname',
              translateTime: 'HH:MM:ss Z',
            },
          },
        }
      : {
          level: config.LOG_LEVEL,
        },
})

// Register plugins
await fastify.register(helmet, {
  contentSecurityPolicy: false, // Disable CSP for API
})

await fastify.register(compress, {
  global: true,
})

await fastify.register(cors, {
  origin: config.CORS_ORIGIN,
  credentials: true,
})

await fastify.register(rateLimit, {
  max: config.RATE_LIMIT_MAX,
  timeWindow: config.RATE_LIMIT_WINDOW,
})

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    services: {
      'trip-service': 'healthy', // TODO: Add actual health checks
      'user-service': 'healthy', // TODO: Add actual health checks
    },
  }
})

// Register tRPC plugin
await fastify.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError: ({
      error,
      type,
      path,
      input,
      ctx,
    }: {
      error: any
      type: string
      path: string | undefined
      input: unknown
      ctx: any
    }) => {
      fastify.log.error(`❌ tRPC Error on ${type} at ${path}:`, error)
      if (config.NODE_ENV === 'development') {
        fastify.log.debug('Input:', input)
        fastify.log.debug('Context:', { userId: ctx?.userId })
      }
    },
  },
})

// 404 handler
fastify.setNotFoundHandler(async (request, reply) => {
  reply.code(404).send({
    success: false,
    error: 'Endpoint not found',
    timestamp: new Date().toISOString(),
  })
})

// Error handler
fastify.setErrorHandler(async (error, request, reply) => {
  fastify.log.error(error)

  const statusCode = error.statusCode || 500

  reply.code(statusCode).send({
    success: false,
    error: config.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
    code: error.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && { stack: error.stack }),
  })
})

// Start server
const start = async () => {
  try {
    await fastify.listen({
      port: config.PORT,
      host: config.HOST,
    })

    fastify.log.info(`🚀 API Gateway running on http://${config.HOST}:${config.PORT}`)
    fastify.log.info(`📊 Health check: http://${config.HOST}:${config.PORT}/health`)
    fastify.log.info(`🔌 tRPC endpoint: http://${config.HOST}:${config.PORT}/trpc`)
    fastify.log.info(`🌍 Environment: ${config.NODE_ENV}`)
  } catch (err) {
    fastify.log.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  fastify.log.info(`🛑 ${signal} received, shutting down gracefully`)

  try {
    await fastify.close()
    fastify.log.info('✅ Server closed')
    process.exit(0)
  } catch (err) {
    fastify.log.error('❌ Error during shutdown:', err)
    process.exit(1)
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Export types for client usage
export type { AppRouter } from './trpc/router.js'

start()
