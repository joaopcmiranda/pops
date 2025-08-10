import type { FastifyInstance } from 'fastify'
import { JWTService } from '../auth/jwt.js'
import { UserService } from '../services/user-service.js'
import type { LoginCredentials, RegisterCredentials, AuthPayload } from '../auth/types.js'

export async function authRoutes(fastify: FastifyInstance) {
  const userService = new UserService()

  // Login endpoint
  fastify.post<{ Body: LoginCredentials }>(
    '/auth/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body

        // Verify credentials using service
        const user = await userService.verifyPassword(email, password)

        if (!user) {
          reply.code(401).send({
            success: false,
            error: 'Invalid email or password',
          })
          return
        }

        // Generate JWT tokens
        const tokens = JWTService.generateTokenPair({
          userId: user.id,
          email: user.email,
          name: user.name,
        })

        reply.send({
          success: true,
          data: {
            user,
            tokens,
          },
        })
      } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: 'Login failed',
        })
      }
    }
  )

  // Register endpoint
  fastify.post<{ Body: RegisterCredentials }>(
    '/auth/register',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, password } = request.body

        // Create user using service
        const user = await userService.create({ name, email, password })

        // Generate JWT tokens
        const tokens = JWTService.generateTokenPair({
          userId: user.id,
          email: user.email,
          name: user.name,
        })

        reply.code(201).send({
          success: true,
          data: {
            user,
            tokens,
          },
        })
      } catch (error) {
        fastify.log.error(error)

        // Handle specific error types
        let statusCode = 500
        let errorMessage = 'Registration failed'

        if (error instanceof Error) {
          if (error.message.includes('already exists')) {
            statusCode = 409
            errorMessage = error.message
          } else if (error.message.includes('Invalid password')) {
            statusCode = 400
            errorMessage = error.message
          }
        }

        reply.code(statusCode).send({
          success: false,
          error: errorMessage,
        })
      }
    }
  )

  // Get current user endpoint (requires authentication)
  fastify.get(
    '/auth/me',
    {
      preHandler: async (request, reply) => {
        const authHeader = request.headers.authorization
        const token = JWTService.extractBearerToken(authHeader)

        if (!token) {
          reply.code(401).send({
            success: false,
            error: 'Authorization token required',
          })
          return
        }

        try {
          const payload = JWTService.verifyAccessToken(token)
          request.user = payload
        } catch {
          reply.code(401).send({
            success: false,
            error: 'Invalid token',
          })
        }
      },
    },
    async (request, reply) => {
      try {
        const user = request.user as AuthPayload
        const userData = await userService.getUserResponse(user.userId)

        if (!userData) {
          reply.code(404).send({
            success: false,
            error: 'User not found',
          })
          return
        }

        reply.send({
          success: true,
          data: userData,
        })
      } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: 'Failed to get user',
        })
      }
    }
  )

  // Update user endpoint (requires authentication)
  fastify.put(
    '/auth/me',
    {
      preHandler: async (request, reply) => {
        const authHeader = request.headers.authorization
        const token = JWTService.extractBearerToken(authHeader)

        if (!token) {
          reply.code(401).send({
            success: false,
            error: 'Authorization token required',
          })
          return
        }

        try {
          const payload = JWTService.verifyAccessToken(token)
          request.user = payload
        } catch {
          reply.code(401).send({
            success: false,
            error: 'Invalid token',
          })
        }
      },
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            avatar: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const user = request.user as AuthPayload
        const updateData = request.body as {
          name?: string
          email?: string
          password?: string
          avatar?: string
        }

        const updatedUser = await userService.update({
          id: user.userId,
          ...updateData,
        })

        reply.send({
          success: true,
          data: updatedUser,
        })
      } catch (error) {
        fastify.log.error(error)

        let statusCode = 500
        let errorMessage = 'Failed to update user'

        if (error instanceof Error) {
          if (error.message.includes('not found')) {
            statusCode = 404
            errorMessage = error.message
          } else if (
            error.message.includes('already taken') ||
            error.message.includes('Invalid password')
          ) {
            statusCode = 400
            errorMessage = error.message
          }
        }

        reply.code(statusCode).send({
          success: false,
          error: errorMessage,
        })
      }
    }
  )

  // Token refresh endpoint
  fastify.post<{ Body: { refreshToken: string } }>(
    '/auth/refresh',
    {
      schema: {
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { refreshToken } = request.body

        // Verify refresh token
        const refreshPayload = JWTService.verifyRefreshToken(refreshToken)

        // Get user data
        const user = await userService.getUserResponse(refreshPayload.userId)
        if (!user) {
          reply.code(401).send({
            success: false,
            error: 'User not found',
          })
          return
        }

        // Generate new token pair
        const tokens = JWTService.generateTokenPair({
          userId: user.id,
          email: user.email,
          name: user.name,
        })

        reply.send({
          success: true,
          data: {
            user,
            tokens,
          },
        })
      } catch (error) {
        fastify.log.error(error)
        reply.code(401).send({
          success: false,
          error: 'Invalid refresh token',
        })
      }
    }
  )

  // Logout endpoint (for completeness, JWT is stateless)
  fastify.post('/auth/logout', async (request, reply) => {
    reply.send({
      success: true,
      message: 'Logged out successfully',
    })
  })
}
