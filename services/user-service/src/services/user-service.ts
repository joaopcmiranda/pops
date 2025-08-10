import { eq } from 'drizzle-orm'
import { db, users } from '../db/index.js'
import { PasswordService } from '../auth/password.js'
import { createId } from '@paralleldrive/cuid2'

export interface CreateUserInput {
  name: string
  email: string
  password: string
  avatar?: string
}

export interface UpdateUserInput {
  id: string
  name?: string
  email?: string
  password?: string
  avatar?: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
  avatar: string | null
  createdAt: Date
  updatedAt: Date
}

export class UserService {
  async findByEmail(email: string): Promise<typeof users.$inferSelect | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
    return result[0] || null
  }

  async findById(id: string): Promise<typeof users.$inferSelect | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    return result[0] || null
  }

  async create(input: CreateUserInput): Promise<UserResponse> {
    // Validate password
    const passwordValidation = PasswordService.validatePassword(input.password)
    if (!passwordValidation.valid) {
      throw new Error(`Invalid password: ${passwordValidation.errors.join(', ')}`)
    }

    // Check if user already exists
    const existingUser = await this.findByEmail(input.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await PasswordService.hashPassword(input.password)

    const userData = {
      id: createId(),
      name: input.name,
      email: input.email,
      password: hashedPassword,
      avatar: input.avatar || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.insert(users).values(userData).returning()
    const createdUser = result[0]!

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      avatar: createdUser.avatar,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    }
  }

  async update(input: UpdateUserInput): Promise<UserResponse> {
    const { id, ...updates } = input

    // Check if user exists
    const existingUser = await this.findById(id)
    if (!existingUser) {
      throw new Error('User not found')
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    }

    // Handle each field that might be updated
    if (updates.name !== undefined) updateData.name = updates.name
    if (updates.email !== undefined) {
      // Check if email is already taken by another user
      const emailUser = await this.findByEmail(updates.email)
      if (emailUser && emailUser.id !== id) {
        throw new Error('Email is already taken by another user')
      }
      updateData.email = updates.email
    }
    if (updates.password !== undefined) {
      // Validate and hash new password
      const passwordValidation = PasswordService.validatePassword(updates.password)
      if (!passwordValidation.valid) {
        throw new Error(`Invalid password: ${passwordValidation.errors.join(', ')}`)
      }
      updateData.password = await PasswordService.hashPassword(updates.password)
    }
    if (updates.avatar !== undefined) updateData.avatar = updates.avatar

    const result = await db.update(users).set(updateData).where(eq(users.id, id)).returning()
    const updatedUser = result[0]!

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    // Check if user exists
    const existingUser = await this.findById(id)
    if (!existingUser) {
      throw new Error('User not found')
    }

    await db.delete(users).where(eq(users.id, id))

    return { success: true }
  }

  async verifyPassword(email: string, password: string): Promise<UserResponse | null> {
    const user = await this.findByEmail(email)
    if (!user) {
      return null
    }

    const isValidPassword = await PasswordService.comparePasswords(password, user.password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async getUserResponse(id: string): Promise<UserResponse | null> {
    const user = await this.findById(id)
    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
