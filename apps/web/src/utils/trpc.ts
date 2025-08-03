// Mock tRPC implementation for development
// This provides a compatible interface while the full tRPC setup is being configured

export const trpc = {
  health: {
    check: {
      useQuery: () => ({
        data: { status: 'healthy', timestamp: new Date().toISOString() },
        isLoading: false,
        error: null,
      }),
    },
  },
  trip: {
    create: {
      useMutation: () => ({
        mutate: (data: unknown) => {
          console.log('Mock trip create:', data)
        },
        isLoading: false,
        error: null,
      }),
    },
    list: {
      useQuery: () => ({
        data: [],
        isLoading: false,
        error: null,
      }),
    },
  },
  Provider: ({ children }: { children: React.ReactNode }) => children,
}

export const trpcClient = {}
