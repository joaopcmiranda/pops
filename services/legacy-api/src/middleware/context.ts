import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { prisma } from '@/config/database'

export interface Context {
  prisma: typeof prisma
  req: CreateExpressContextOptions['req']
  res: CreateExpressContextOptions['res']
  userId: string | undefined
  user:
    | {
        id: string
        name: string
        email: string
      }
    | undefined
}

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions): Promise<Context> => {
  // TODO: Add authentication logic here
  // For now, we'll use a mock user for development
  const userId = req.headers['x-user-id'] as string

  let user = undefined
  if (userId) {
    try {
      // Try to find existing user
      let userData = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true },
      })

      // If user doesn't exist and this is development, create a mock user
      if (!userData && userId === 'dev-user-123') {
        userData = await prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: {
            id: userId,
            name: 'Development User',
            email: 'dev@example.com',
          },
          select: { id: true, name: true, email: true },
        })
      }

      if (userData) {
        user = userData
      }
    } catch (error) {
      console.warn('Failed to fetch user:', error)
    }
  }

  return {
    prisma,
    req,
    res,
    userId: userId || undefined,
    user: user || undefined,
  }
}
