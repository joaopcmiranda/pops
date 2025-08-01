import { router, publicProcedure } from '@/config/trpc'
import { itineraryRouter } from './itinerary'
import { contentRouter } from './content'
import { userRouter } from './user'
import { tripRouter } from './trip'

// Health check procedure
const healthRouter = router({
  check: publicProcedure
    .query(async () => {
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      }
    }),
})

// Main app router
export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  trip: tripRouter,
  itinerary: itineraryRouter,
  content: contentRouter,
})

export type AppRouter = typeof appRouter