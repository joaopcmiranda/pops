import { tripApiClient } from '@/lib/api-client'

// Content service for managing trip content via backend API
export interface ContentItem {
  id: string
  title: string
  content: string
  category: string
  slug: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
  tripId: string
  userId: string
}

export class ContentService {
  private static getCurrentTripId(): string {
    // Get current trip ID from localStorage (fallback for non-React contexts)
    const storedTrip = localStorage.getItem('currentTrip')
    if (storedTrip) {
      const trip = JSON.parse(storedTrip)
      return trip.id
    }
    throw new Error('No active trip found')
  }

  // Get all content for a specific category
  static async getContentByCategory(category: string): Promise<ContentItem[]> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      const response = await client.get(`/trips/${tripId}/content/category/${category}`)
      return response.data || []
    } catch (error) {
      console.error('Error fetching content by category:', error)
      return []
    }
  }

  // Get a specific content item by ID
  static async getContentItem(category: string, slug: string): Promise<ContentItem | null> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      // First get all items in category, then find by slug
      const response = await client.get(`/trips/${tripId}/content/category/${category}`)
      const items = response.data || []
      return items.find((item: ContentItem) => item.slug === slug) || null
    } catch (error) {
      console.error('Error fetching content item:', error)
      return null
    }
  }

  // Get all categories with their content counts
  static async getCategorySummary(): Promise<Record<string, number>> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      const response = await client.get(`/trips/${tripId}/content`)
      const items: ContentItem[] = response.data || []

      const summary: Record<string, number> = {}
      items.forEach(item => {
        summary[item.category] = (summary[item.category] || 0) + 1
      })

      return summary
    } catch (error) {
      console.error('Error fetching category summary:', error)
      return {}
    }
  }

  // Search content across all categories
  static async searchContent(query: string): Promise<ContentItem[]> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      const response = await client.get(
        `/trips/${tripId}/content/search?q=${encodeURIComponent(query)}`
      )
      return response.data || []
    } catch (error) {
      console.error('Error searching content:', error)
      return []
    }
  }

  // Add new content item
  static async addContentItem(
    item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'tripId' | 'userId'>
  ): Promise<ContentItem | null> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      const response = await client.post(`/trips/${tripId}/content`, {
        title: item.title,
        content: item.content,
        category: item.category,
        slug: item.slug,
        tags: item.tags,
      })

      return response.data || null
    } catch (error) {
      console.error('Error adding content item:', error)
      return null
    }
  }

  // Update existing content item
  static async updateContentItem(
    category: string,
    slug: string,
    updates: Partial<ContentItem>
  ): Promise<boolean> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      // First find the content item by category and slug
      const existingItem = await this.getContentItem(category, slug)
      if (!existingItem) return false

      const response = await client.put(`/trips/${tripId}/content/${existingItem.id}`, {
        title: updates.title || existingItem.title,
        content: updates.content || existingItem.content,
        category: updates.category || existingItem.category,
        slug: updates.slug || existingItem.slug,
        tags: updates.tags || existingItem.tags,
      })

      return !!response.data
    } catch (error) {
      console.error('Error updating content item:', error)
      return false
    }
  }

  // Delete content item
  static async deleteContentItem(category: string, slug: string): Promise<boolean> {
    try {
      const tripId = this.getCurrentTripId()
      const client = tripApiClient()

      // First find the content item by category and slug
      const existingItem = await this.getContentItem(category, slug)
      if (!existingItem) return false

      await client.delete(`/trips/${tripId}/content/${existingItem.id}`)
      return true
    } catch (error) {
      console.error('Error deleting content item:', error)
      return false
    }
  }

  // Initialize default content for a new trip
  static async initializeDefaultContent(tripId?: string): Promise<boolean> {
    try {
      const activeTrip = tripId || this.getCurrentTripId()
      const client = tripApiClient()

      const defaultContent = [
        {
          category: 'destinations',
          title: 'Primary Destination',
          slug: 'primary-destination',
          content:
            '# Primary Destination\n\nAdd details about your main travel destination here.\n\n## Overview\n- Location: \n- Best time to visit: \n- Key attractions: \n\n## Notes\nAdd your research and planning notes here.',
        },
        {
          category: 'itinerary',
          title: 'Day 1 - Arrival',
          slug: 'day-1-arrival',
          content:
            '# Day 1 - Arrival\n\n## Morning\n- Arrival details\n- Check-in\n\n## Afternoon\n- Initial exploration\n\n## Evening\n- Dinner plans\n\n## Notes\nAdjust this template based on your specific plans.',
        },
        {
          category: 'documents',
          title: 'Travel Checklist',
          slug: 'travel-checklist',
          content:
            "# Travel Checklist\n\n## Essential Documents\n- [ ] Passport (valid for 6+ months)\n- [ ] Flight tickets\n- [ ] Accommodation confirmations\n- [ ] Travel insurance\n- [ ] Driver's license\n\n## Financial\n- [ ] Travel credit cards\n- [ ] Local currency\n- [ ] Bank notifications\n\n## Health & Safety\n- [ ] Medications\n- [ ] Emergency contacts\n- [ ] Travel advisories",
        },
      ]

      // Create default content items
      for (const content of defaultContent) {
        await client.post(`/trips/${activeTrip}/content`, content)
      }

      return true
    } catch (error) {
      console.error('Error initializing default content:', error)
      return false
    }
  }
}
