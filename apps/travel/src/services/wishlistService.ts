import type { WishlistItem, NewWishlistItem, WishlistStats } from '@pops/types'

const TRIP_SERVICE_URL = 'http://localhost:8030'

interface WishlistResponse {
  success: boolean
  data: WishlistItem[]
  error?: string
}

interface WishlistItemResponse {
  success: boolean
  data: WishlistItem
  error?: string
}

interface WishlistStatsResponse {
  success: boolean
  data: WishlistStats
  error?: string
}

/**
 * Wishlist Service Client
 * Handles API communication with the trip service for wishlist operations
 */
export class WishlistService {
  /**
   * Get all wishlist items for a trip
   */
  static async getByTripId(tripId: string): Promise<WishlistItem[]> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist`)
      const result: WishlistResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch wishlist items')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching wishlist items:', error)
      throw error
    }
  }

  /**
   * Get wishlist items by category for a trip
   */
  static async getByCategoryAndTrip(tripId: string, category: string): Promise<WishlistItem[]> {
    try {
      const response = await fetch(
        `${TRIP_SERVICE_URL}/trips/${tripId}/wishlist?category=${category}`
      )
      const result: WishlistResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch wishlist items')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching wishlist items by category:', error)
      throw error
    }
  }

  /**
   * Get wishlist item by ID
   */
  static async getById(tripId: string, wishlistId: string): Promise<WishlistItem> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist/${wishlistId}`)
      const result: WishlistItemResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch wishlist item')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching wishlist item:', error)
      throw error
    }
  }

  /**
   * Create a new wishlist item
   */
  static async create(tripId: string, data: NewWishlistItem): Promise<WishlistItem> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: WishlistItemResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create wishlist item')
      }

      return result.data
    } catch (error) {
      console.error('Error creating wishlist item:', error)
      throw error
    }
  }

  /**
   * Update a wishlist item
   */
  static async update(
    tripId: string,
    wishlistId: string,
    data: Partial<WishlistItem>
  ): Promise<WishlistItem> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist/${wishlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: WishlistItemResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to update wishlist item')
      }

      return result.data
    } catch (error) {
      console.error('Error updating wishlist item:', error)
      throw error
    }
  }

  /**
   * Delete a wishlist item
   */
  static async delete(tripId: string, wishlistId: string): Promise<void> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist/${wishlistId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete wishlist item')
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error)
      throw error
    }
  }

  /**
   * Convert wishlist item to itinerary
   */
  static async convertToItinerary(tripId: string, wishlistId: string): Promise<void> {
    try {
      const response = await fetch(
        `${TRIP_SERVICE_URL}/trips/${tripId}/wishlist/${wishlistId}/convert`,
        {
          method: 'POST',
        }
      )

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to convert wishlist item')
      }
    } catch (error) {
      console.error('Error converting wishlist item:', error)
      throw error
    }
  }

  /**
   * Get wishlist stats for a trip
   */
  static async getStats(tripId: string): Promise<WishlistStats> {
    try {
      const response = await fetch(`${TRIP_SERVICE_URL}/trips/${tripId}/wishlist/stats`)
      const result: WishlistStatsResponse = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch wishlist stats')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching wishlist stats:', error)
      throw error
    }
  }
}
