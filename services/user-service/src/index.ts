import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import compress from '@fastify/compress'
import rateLimit from '@fastify/rate-limit'
import { config } from './config/env'

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
fastify.get('/health', async () => {
  return {
    status: 'healthy',
    service: 'user-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
  }
})

// Placeholder user routes - future authentication service
fastify.get('/users/me', async (request, reply) => {
  const userId = request.headers['x-user-id'] as string

  if (!userId) {
    reply.code(401).send({
      success: false,
      error: 'Unauthorized - User ID required in headers',
    })
    return
  }

  // TODO: Implement actual user lookup from database
  reply.send({
    success: true,
    data: {
      id: userId,
      name: 'Demo User',
      email: 'demo@pops.travel',
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
})

// Placeholder authentication endpoints
fastify.post('/auth/login', async (request, reply) => {
  reply.code(501).send({
    success: false,
    error: 'Authentication not implemented yet - placeholder service',
  })
})

fastify.post('/auth/register', async (request, reply) => {
  reply.code(501).send({
    success: false,
    error: 'Registration not implemented yet - placeholder service',
  })
})

fastify.post('/auth/logout', async (request, reply) => {
  reply.send({
    success: true,
    message: 'Logout successful (placeholder)',
  })
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

    fastify.log.info(`🚀 User Service running on http://${config.HOST}:${config.PORT}`)
    fastify.log.info(`📊 Health check: http://${config.HOST}:${config.PORT}/health`)
    fastify.log.info(`👤 Users API: http://${config.HOST}:${config.PORT}/users`)
    fastify.log.info(`🔐 Auth API: http://${config.HOST}:${config.PORT}/auth`)
    fastify.log.info(`🌍 Environment: ${config.NODE_ENV}`)
  } catch (err) {
    console.error('❌ Failed to start server:', err)
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

start()
