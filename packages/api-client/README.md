# API Client Package

The official TypeScript SDK for consuming POPS backend APIs across all frontend applications.

## Overview

This package provides a centralized, type-safe HTTP client library for interacting with POPS backend services. It serves as the single source of truth for API communication, ensuring consistency and type safety across all frontend applications.

## Key Principles

- **Type-Safe API Calls**: All requests and responses are fully typed using schemas from `@pops/types`
- **Runtime Validation**: Zod schemas validate API responses at runtime
- **Domain-Specific Clients**: Organized by service domains (trips, itinerary, users, content)
- **Build-Only Package**: No development server - package is built and consumed by other applications
- **Unified Interface**: Single API client that combines all domain-specific clients

## Package Structure

```
packages/api-client/
├── src/
│   ├── api-client.ts        # Main unified API client
│   ├── http-client.ts       # Core HTTP client with error handling
│   ├── trip-client.ts       # Trip service API methods
│   ├── itinerary-client.ts  # Itinerary service API methods
│   ├── content-client.ts    # Content service API methods
│   ├── user-client.ts       # User service API methods
│   └── index.ts            # Main exports
└── package.json
```

## Client Architecture

### Core Clients

- **ApiClient**: Unified client that provides access to all service APIs
- **HttpClient**: Low-level HTTP client with request/response handling
- **TripClient**: Trip management, templates, and collaboration
- **ItineraryClient**: Itinerary items, schedules, and planning
- **ContentClient**: Travel content and documentation
- **UserClient**: User profiles, contacts, and locations

### Features

- **Automatic Retry**: Built-in retry logic for failed requests
- **Error Handling**: Standardized error responses with proper typing
- **Request/Response Validation**: Runtime schema validation using Zod
- **Authentication**: JWT token support with automatic header injection
- **Base URL Configuration**: Configurable API endpoints

## Development

### Building

```bash
# Build the API client package
pnpm run build
```

### Code Quality

```bash
# Run TypeScript type checking
pnpm run type-check

# Run linting
pnpm run lint

# Format code
pnpm run format
```

## Usage

### Unified API Client (Recommended)

```typescript
import { ApiClient } from '@pops/api-client'

const client = new ApiClient({
  baseUrl: 'https://api.example.com',
  userId: 'user-123',
  authToken: 'jwt-token',
})

// Trip operations
const trips = await client.trips.list()
const trip = await client.trips.create({
  title: 'Summer Vacation',
  destination: 'Hawaii',
  startDate: '2024-07-01',
  endDate: '2024-07-10',
})

// Itinerary operations
const items = await client.itinerary.list('trip-id')
const item = await client.itinerary.create({
  title: 'Flight to Hawaii',
  type: 'transport',
  startDate: '2024-07-01T08:00:00Z',
})
```

### Modular Usage

```typescript
// Import individual clients (tree-shakeable)
import { TripClient, HttpClient } from '@pops/api-client'

const httpClient = new HttpClient({
  baseUrl: 'https://api.example.com',
})

const tripClient = new TripClient(httpClient)
const trips = await tripClient.list()
```

### Granular Imports (Advanced)

```typescript
// Import only what you need for optimal bundle size
import { TripClient } from '@pops/api-client/trips'
import { HttpClient } from '@pops/api-client/http'
import { ItineraryClient } from '@pops/api-client/itinerary'
import { UserClient } from '@pops/api-client/users'
import { ContentClient } from '@pops/api-client/content'
```

### With Type Imports

```typescript
import { ApiClient, type Trip, type CreateTripInput, type ItineraryItem } from '@pops/api-client'

// All types from @pops/types are re-exported for convenience
```

## Error Handling

```typescript
import { ApiClient, HttpClientError } from '@pops/api-client'

try {
  const trip = await client.trips.getById('invalid-id')
} catch (error) {
  if (error instanceof HttpClientError) {
    console.error('API Error:', error.message)
    console.error('Status Code:', error.statusCode)
    console.error('Response:', error.response)
  }
}
```

## Configuration

### API Client Configuration

```typescript
interface ApiClientConfig {
  baseUrl: string // API base URL
  userId?: string // User ID for requests
  authToken?: string // JWT authentication token
  timeout?: number // Request timeout (default: 30s)
  retries?: number // Max retry attempts (default: 3)
}
```

### Environment-Specific Usage

```typescript
// Development
const client = new ApiClient({
  baseUrl: 'http://localhost:4003',
})

// Production
const client = new ApiClient({
  baseUrl: process.env.VITE_API_URL,
  authToken: getAuthToken(),
})
```

## Integration Examples

### React Hook

```typescript
import { useEffect, useState } from 'react'
import { ApiClient, type Trip } from '@pops/api-client'

const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      const client = new ApiClient({ baseUrl: '/api' })
      const result = await client.trips.list()
      setTrips(result)
      setLoading(false)
    }
    fetchTrips()
  }, [])

  return { trips, loading }
}
```

### Node.js Service

```typescript
import { ApiClient } from '@pops/api-client'

const client = new ApiClient({
  baseUrl: 'http://api-gateway:3000',
  authToken: process.env.SERVICE_TOKEN,
})

export const syncTrips = async () => {
  return await client.trips.list({
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  })
}
```

## Dependencies

- **@pops/types**: Type definitions and schemas
- **zod**: Runtime schema validation

## Architecture Benefits

- **Type Safety**: Compile-time and runtime type checking
- **Consistency**: Standardized API interface across all applications
- **Maintainability**: Single package to update for API changes
- **Developer Experience**: Auto-completion and IntelliSense support
- **Error Prevention**: Schema validation catches API contract mismatches
- **Reusability**: Works with any TypeScript frontend framework or Node.js service
