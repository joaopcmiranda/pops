import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@trip-organizer/api'

// Create tRPC React hooks
export const trpc = createTRPCReact<AppRouter>()

// Get API URL from environment or default to localhost
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser, use relative URL
    return window.location.origin.includes('localhost') 
      ? 'http://localhost:3001' 
      : ''
  }
  // Server-side, use localhost
  return 'http://localhost:3001'
}

// tRPC client configuration
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      // Optional: Add authentication headers
      headers: () => {
        return {
          // TODO: Replace with proper authentication
          // For development, use a mock user ID
          'x-user-id': 'dev-user-123',
        }
      },
    }),
  ],
})