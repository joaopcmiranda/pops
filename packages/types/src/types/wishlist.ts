// Wishlist related types for the travel app

export interface WishlistItem {
  id: string
  title: string
  description?: string
  type: 'food' | 'place' | 'experience' | 'accommodation' | 'transport' | 'activity'
  category: string
  status: 'wishlist' | 'planned' | 'booked' | 'completed'
  priority: 'low' | 'medium' | 'high'
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
  createdAt: Date
  updatedAt: Date
  tripId: string
  userId: string
}

export interface NewWishlistItem {
  title: string
  description?: string
  type: 'food' | 'place' | 'experience' | 'accommodation' | 'transport' | 'activity'
  category: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  location?: string
  estimatedCost?: number
  notes?: string
  imageUrl?: string
  websiteUrl?: string
}

export interface WishlistStats {
  total: number
  byType: Record<string, number>
  byCategory: Record<string, number>
  totalEstimatedCost: number
}

export const WISHLIST_TYPES = [
  'food',
  'place',
  'experience',
  'accommodation',
  'transport',
  'activity',
] as const

export const WISHLIST_PRIORITIES = ['low', 'medium', 'high'] as const

export const WISHLIST_STATUSES = ['wishlist', 'planned', 'booked', 'completed'] as const
