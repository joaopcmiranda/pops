import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '@/config/trpc'

export const userRouter = router({
  // Get current user
  me: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!user) {
        throw new Error('User not found')
      }

      return user
    }),

  // Create user (for development/testing)
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      avatar: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })

      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      const user = await ctx.prisma.user.create({
        data: input,
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
        },
      })

      return user
    }),

  // Update user profile
  update: protectedProcedure
    .input(z.object({
      name: z.string().min(1).optional(),
      avatar: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.userId },
        data: input,
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          updatedAt: true,
        },
      })

      return user
    }),

  // Get user stats
  stats: protectedProcedure
    .query(async ({ ctx }) => {
      const [
        itineraryCount,
        contentCount,
      ] = await Promise.all([
        ctx.prisma.itineraryItem.count({ where: { userId: ctx.userId } }),
        ctx.prisma.contentItem.count({ where: { userId: ctx.userId } }),
      ])

      return {
        itineraryItems: itineraryCount,
        contentItems: contentCount,
      }
    }),
})