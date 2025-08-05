// Export all types
export * from './itinerary'
export * from './trip'

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Auth types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthToken {
  token: string
  refreshToken: string
  expiresAt: Date
}

// Content types
export interface ContentItem {
  id: string
  tripId: string
  category: string
  title: string
  content: string
  slug: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}
