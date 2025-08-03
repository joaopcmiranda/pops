import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { trpc } from '@/utils/trpc'

// Type for error with data property
interface ErrorWithData {
  data?: {
    code?: string
  }
}

interface TRPCProviderProps {
  children: React.ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount: number, error: unknown) => {
              const errorWithData = error as ErrorWithData
              if (errorWithData?.data?.code === 'UNAUTHORIZED') return false
              return failureCount < 3
            },
          },
        },
      })
  )

  return (
    <trpc.Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
