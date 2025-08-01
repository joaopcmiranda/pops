import { initTRPC } from '@trpc/server'
import type { Context } from '@/middleware/context'

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        code: error.code,
        httpStatus: shape.data.httpStatus,
      },
    }
  },
})

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // TODO: Add proper authentication middleware
  // For now, we'll just check if userId exists in headers
  if (!ctx.userId) {
    throw new Error('Unauthorized - User ID required in headers')
  }
  
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  })
})

export const middleware = t.middleware
export const mergeRouters = t.mergeRouters