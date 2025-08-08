import type { FastifyInstance } from 'fastify'
import { DatabaseSync } from 'node:sqlite'
import { JWTService } from '../auth/jwt'
import { PasswordService } from '../auth/password'
import type { LoginCredentials, RegisterCredentials, AuthPayload } from '../auth/types'

// Raw SQLite query result types that match the database column names
interface UserRow {
  id: string
  name: string
  email: string
  password: string
  avatar: string | null
  created_at: number // SQLite integer timestamp
  updated_at: number // SQLite integer timestamp
}

// Partial user row for queries that don't select password
interface UserRowWithoutPassword {
  id: string
  name: string
  email: string
  avatar: string | null
  created_at: number // SQLite integer timestamp
  updated_at: number // SQLite integer timestamp
}

const dbFile = './data/users.db'

// Helper function to safely convert database row to API response (without password)
function userRowToResponse(row: UserRow | UserRowWithoutPassword) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar: row.avatar,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

// Type guard to safely validate database query results
function isUserRow(obj: unknown): obj is UserRow {
  if (!obj || typeof obj !== 'object') return false

  const row = obj as Record<string, unknown>
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.email === 'string' &&
    typeof row.password === 'string' &&
    (row.avatar === null || typeof row.avatar === 'string') &&
    typeof row.created_at === 'number' &&
    typeof row.updated_at === 'number'
  )
}

// Type guard for partial user row (without password)
function isUserRowWithoutPassword(obj: unknown): obj is UserRowWithoutPassword {
  if (!obj || typeof obj !== 'object') return false

  const row = obj as Record<string, unknown>
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.email === 'string' &&
    (row.avatar === null || typeof row.avatar === 'string') &&
    typeof row.created_at === 'number' &&
    typeof row.updated_at === 'number'
  )
}

export async function authRoutes(fastify: FastifyInstance) {
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
        const sqlite = new DatabaseSync(dbFile)

        try {
          // Find user by email
          const stmt = sqlite.prepare('SELECT * FROM users WHERE email = ?')
          const userResult = stmt.get(email)

          if (!userResult) {
            reply.code(401).send({
              success: false,
              error: 'Invalid email or password',
            })
            return
          }

          if (!isUserRow(userResult)) {
            reply.code(500).send({
              success: false,
              error: 'Database error: Invalid user data format',
            })
            return
          }

          const user = userResult

          // Verify password
          const isValidPassword = await PasswordService.comparePasswords(password, user.password)

          if (!isValidPassword) {
            reply.code(401).send({
              success: false,
              error: 'Invalid email or password',
            })
            return
          }

          // Generate JWT token
          const token = JWTService.generateAccessToken({
            userId: user.id,
            email: user.email,
            name: user.name,
          })

          // Return user data without password
          const userResponse = userRowToResponse(user)

          reply.send({
            success: true,
            data: {
              user: userResponse,
              tokens: {
                accessToken: token,
                refreshToken: token, // For now, using same token
              },
            },
          })
        } finally {
          sqlite.close()
        }
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

        // Validate password strength
        const passwordValidation = PasswordService.validatePassword(password)
        if (!passwordValidation.valid) {
          reply.code(400).send({
            success: false,
            error: passwordValidation.errors.join(', '),
          })
          return
        }

        const sqlite = new DatabaseSync(dbFile)

        try {
          // Check if user already exists
          const checkStmt = sqlite.prepare('SELECT id FROM users WHERE email = ?')
          const existingUser = checkStmt.get(email)

          if (existingUser) {
            reply.code(409).send({
              success: false,
              error: 'User with this email already exists',
            })
            return
          }

          // Hash password
          const hashedPassword = await PasswordService.hashPassword(password)

          // Create new user
          const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`
          const now = Date.now()

          const insertStmt = sqlite.prepare(`
          INSERT INTO users (id, name, email, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `)

          insertStmt.run(userId, name, email, hashedPassword, now, now)

          // Generate JWT token
          const token = JWTService.generateAccessToken({
            userId,
            email,
            name,
          })

          // Return user data without password
          const userResponse = {
            id: userId,
            name,
            email,
            avatar: null,
            createdAt: new Date(now),
            updatedAt: new Date(now),
          }

          reply.code(201).send({
            success: true,
            data: {
              user: userResponse,
              tokens: {
                accessToken: token,
                refreshToken: token, // For now, using same token
              },
            },
          })
        } finally {
          sqlite.close()
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: 'Registration failed',
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
        const sqlite = new DatabaseSync(dbFile)

        try {
          const stmt = sqlite.prepare(
            'SELECT id, name, email, avatar, created_at, updated_at FROM users WHERE id = ?'
          )
          const userResult = stmt.get(user.userId)

          if (!userResult) {
            reply.code(404).send({
              success: false,
              error: 'User not found',
            })
            return
          }

          if (!isUserRowWithoutPassword(userResult)) {
            reply.code(500).send({
              success: false,
              error: 'Database error: Invalid user data format',
            })
            return
          }

          const userData = userResult
          const userResponse = userRowToResponse(userData)

          reply.send({
            success: true,
            data: userResponse,
          })
        } finally {
          sqlite.close()
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({
          success: false,
          error: 'Failed to get user',
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
