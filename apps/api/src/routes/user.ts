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

      // Convert undefined to null for avatar field
      const createData = {
        ...input,
        avatar: input.avatar ?? null,
      }

      const user = await ctx.prisma.user.create({
        data: createData,
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
      // Filter out undefined values and convert avatar appropriately
      const updateData: any = {}
      
      if (input.name !== undefined) {
        updateData.name = input.name
      }
      
      if (input.avatar !== undefined) {
        updateData.avatar = input.avatar ?? null
      }

      const user = await ctx.prisma.user.update({
        where: { id: ctx.userId },
        data: updateData,
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