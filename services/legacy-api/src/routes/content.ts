import { z } from 'zod'
import { router, protectedProcedure } from '@/config/trpc'
import { slugify } from '@pops/shared'
import type { Prisma } from '@prisma/client'

// Type interfaces for better type safety
interface ContentWhereInput {
  tripId: string
  category?: string
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' }
    content?: { contains: string; mode: 'insensitive' }
  }>
}

interface ContentQueryOptions {
  where: ContentWhereInput | Prisma.ContentItemWhereInput
  orderBy: { updatedAt: 'desc' }
  take?: number
  skip?: number
}

interface ContentItemWhereInput {
  id?: string
  slug?: string
  trip: {
    OR: Array<
      | {
          userId: string
        }
      | {
          collaborators: {
            some: {
              userId: string
              role?: {
                in: string[]
              }
            }
          }
        }
    >
  }
}

interface UpdateDataFilter {
  [key: string]: unknown
}

const createContentSchema = z.object({
  tripId: z.string(),
  category: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
})

const updateContentSchema = createContentSchema.partial().extend({
  id: z.string(),
})

export const contentRouter = router({
  // Get all content items for trip
  list: protectedProcedure
    .input(
      z.object({
        tripId: z.string(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).optional(),
        offset: z.number().min(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Verify trip access
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.tripId,
          OR: [{ userId: ctx.userId }, { collaborators: { some: { userId: ctx.userId } } }],
        },
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }

      const where: ContentWhereInput = { tripId: input.tripId }

      if (input.category) {
        where.category = input.category
      }

      if (input.search) {
        where.OR = [
          { title: { contains: input.search, mode: 'insensitive' } },
          { content: { contains: input.search, mode: 'insensitive' } },
        ]
      }

      const queryOptions: ContentQueryOptions = {
        where,
        orderBy: { updatedAt: 'desc' },
      }

      if (input.limit !== undefined) {
        queryOptions.take = input.limit
      }

      if (input.offset !== undefined) {
        queryOptions.skip = input.offset
      }

      const items = await ctx.prisma.contentItem.findMany(queryOptions)

      return items.map(item => ({
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
      }))
    }),

  // Get single content item
  get: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        slug: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.id && !input.slug) {
        throw new Error('Either id or slug must be provided')
      }

      const where: ContentItemWhereInput = {
        trip: {
          OR: [{ userId: ctx.userId }, { collaborators: { some: { userId: ctx.userId } } }],
        },
      }
      if (input.id) where.id = input.id
      if (input.slug) where.slug = input.slug

      const item = await ctx.prisma.contentItem.findFirst({ where })

      if (!item) {
        throw new Error('Content item not found')
      }

      return {
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
      }
    }),

  // Create content item
  create: protectedProcedure.input(createContentSchema).mutation(async ({ ctx, input }) => {
    // Verify trip access and edit permissions
    const trip = await ctx.prisma.trip.findFirst({
      where: {
        id: input.tripId,
        OR: [
          { userId: ctx.userId },
          { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } },
        ],
      },
    })

    if (!trip) {
      throw new Error('Trip not found or insufficient permissions')
    }

    const { tags, ...itemData } = input
    const slug = slugify(input.title)

    // Check if slug already exists within this trip
    const existingSlug = await ctx.prisma.contentItem.findFirst({
      where: { slug, tripId: input.tripId },
    })

    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug

    const item = await ctx.prisma.contentItem.create({
      data: {
        ...itemData,
        slug: finalSlug,
        userId: ctx.userId,
        tags: tags ? JSON.stringify(tags) : null,
      },
    })

    return {
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }
  }),

  // Update content item
  update: protectedProcedure.input(updateContentSchema).mutation(async ({ ctx, input }) => {
    const { id, tags, ...updates } = input

    // Verify trip access and edit permissions
    const existingItem = await ctx.prisma.contentItem.findFirst({
      where: {
        id,
        trip: {
          OR: [
            { userId: ctx.userId },
            { collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } } },
          ],
        },
      },
    })

    if (!existingItem) {
      throw new Error('Content item not found or insufficient permissions')
    }

    // Update slug if title changed
    let newSlug = existingItem.slug
    if (input.title && input.title !== existingItem.title) {
      newSlug = slugify(input.title)

      // Check if new slug already exists within this trip
      const existingSlug = await ctx.prisma.contentItem.findFirst({
        where: {
          slug: newSlug,
          tripId: existingItem.tripId,
          id: { not: id },
        },
      })

      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`
      }
    }

    const item = await ctx.prisma.contentItem.update({
      where: { id },
      data: {
        ...(Object.fromEntries(
          Object.entries(updates).filter(([, value]) => value !== undefined)
        ) as UpdateDataFilter),
        slug: newSlug,
        ...(tags !== undefined && { tags: tags ? JSON.stringify(tags) : null }),
      },
    })

    return {
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }
  }),

  // Delete content item
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify trip access and edit permissions
      const existingItem = await ctx.prisma.contentItem.findFirst({
        where: {
          id: input.id,
          trip: {
            OR: [
              { userId: ctx.userId },
              {
                collaborators: { some: { userId: ctx.userId, role: { in: ['admin', 'editor'] } } },
              },
            ],
          },
        },
      })

      if (!existingItem) {
        throw new Error('Content item not found or insufficient permissions')
      }

      await ctx.prisma.contentItem.delete({
        where: { id: input.id },
      })

      return { success: true }
    }),

  // Get content categories for trip
  categories: protectedProcedure
    .input(z.object({ tripId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify trip access
      const trip = await ctx.prisma.trip.findFirst({
        where: {
          id: input.tripId,
          OR: [{ userId: ctx.userId }, { collaborators: { some: { userId: ctx.userId } } }],
        },
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }

      const categories = await ctx.prisma.contentItem.groupBy({
        by: ['category'],
        where: { tripId: input.tripId },
        _count: { category: true },
        orderBy: { category: 'asc' },
      })

      return categories.map(cat => ({
        name: cat.category,
        count: cat._count.category,
      }))
    }),

  // Get all tags for trip
  tags: protectedProcedure.input(z.object({ tripId: z.string() })).query(async ({ ctx, input }) => {
    // Verify trip access
    const trip = await ctx.prisma.trip.findFirst({
      where: {
        id: input.tripId,
        OR: [{ userId: ctx.userId }, { collaborators: { some: { userId: ctx.userId } } }],
      },
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const items = await ctx.prisma.contentItem.findMany({
      where: {
        tripId: input.tripId,
        tags: { not: null },
      },
      select: { tags: true },
    })

    const allTags = items
      .map(item => (item.tags ? JSON.parse(item.tags) : []))
      .flat()
      .filter((tag, index, arr) => arr.indexOf(tag) === index)
      .sort()

    return allTags
  }),
})
