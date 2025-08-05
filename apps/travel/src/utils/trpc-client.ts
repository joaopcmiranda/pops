import { createTRPCReact } from '@trpc/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@pops/api-client'

// Create tRPC React hooks
export const trpc = createTRPCReact<AppRouter>()

// Create standalone client for non-hook usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc', // API Gateway URL
      headers: {
        'x-user-id': 'user-demo-1', // TODO: Get from auth context
      },
    }),
  ],
})

// Create tRPC client for React Query
export const createTRPCQueryClient = () => {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3001/trpc', // API Gateway URL
        headers: {
          'x-user-id': 'user-demo-1', // TODO: Get from auth context
        },
      }),
    ],
  })
}
