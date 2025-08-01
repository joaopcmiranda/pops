// Content service for managing markdown files
export interface ContentItem {
  id: string
  title: string
  content: string
  category: string
  slug: string
  lastModified?: Date
  metadata?: Record<string, unknown>
}

// For now, we'll manually import the content files
// Later, we can implement dynamic loading with a build step

const contentDatabase: Record<string, ContentItem[]> = {
  destinations: [
    {
      id: 'rio-de-janeiro',
      title: 'Rio de Janeiro',
      slug: 'rio-de-janeiro',
      category: 'destinations',
      content: `# Rio de Janeiro

## Overview
The vibrant city known for its beaches, culture, and iconic landmarks.

## Must-See Attractions
- **Christ the Redeemer** - Iconic statue atop Corcovado Mountain
- **Sugarloaf Mountain** - Cable car with panoramic views
- **Copacabana Beach** - Famous beach with stunning coastline
- **Ipanema Beach** - Trendy beach neighborhood
- **Santa Teresa** - Historic neighborhood with colonial architecture

## Transportation
- **Getting There**: Galeão International Airport (GIG)
- **Getting Around**: Metro, buses, taxis, Uber

## Best Time to Visit
- **Dry Season**: May to September (less rain, cooler temperatures)
- **Summer**: December to March (hot, more crowded, Carnival season)

## Notes
- Plan for at least 3-4 days to see main attractions
- Book Christ the Redeemer tickets in advance
- Be aware of safety in certain areas, especially at night`,
    },
  ],
  itinerary: [
    {
      id: 'sample-day',
      title: 'Day 1 - Arrival in Rio de Janeiro',
      slug: 'sample-day',
      category: 'itinerary',
      content: `# Day 1 - Arrival in Rio de Janeiro

## Morning
- **9:00 AM** - Land at Galeão International Airport
- **10:30 AM** - Take taxi/Uber to hotel in Copacabana
- **11:30 AM** - Check in to hotel (if available) or store luggage
- **12:00 PM** - Light lunch at local café

## Afternoon  
- **2:00 PM** - Walk along Copacabana Beach
- **3:30 PM** - Visit Forte de Copacabana (Fort)
- **5:00 PM** - Explore local shops and markets

## Evening
- **7:00 PM** - Dinner at local restaurant
- **9:00 PM** - Early rest to recover from travel

## Budget Estimate
- Transportation from airport: $25-35
- Lunch: $10-15
- Fort entrance: $3
- Dinner: $20-30
- **Total**: ~$60-85

## Notes
- Keep first day light due to jet lag
- Confirm hotel check-in time in advance
- Have local currency ready for small purchases`,
    },
  ],
  transport: [],
  accommodation: [],
  activities: [],
  budget: [],
  documents: [],
}

export class ContentService {
  // Get all content for a specific category
  static getContentByCategory(category: string): ContentItem[] {
    return contentDatabase[category] || []
  }

  // Get a specific content item by category and slug
  static getContentItem(category: string, slug: string): ContentItem | null {
    const categoryContent = contentDatabase[category] || []
    return categoryContent.find(item => item.slug === slug) || null
  }

  // Get all categories with their content counts
  static getCategorySummary(): Record<string, number> {
    const summary: Record<string, number> = {}
    Object.keys(contentDatabase).forEach(category => {
      summary[category] = contentDatabase[category].length
    })
    return summary
  }

  // Search content across all categories
  static searchContent(query: string): ContentItem[] {
    const results: ContentItem[] = []
    const searchQuery = query.toLowerCase()

    Object.values(contentDatabase).forEach(categoryItems => {
      categoryItems.forEach(item => {
        if (
          item.title.toLowerCase().includes(searchQuery) ||
          item.content.toLowerCase().includes(searchQuery)
        ) {
          results.push(item)
        }
      })
    })

    return results
  }

  // Add new content item
  static addContentItem(item: ContentItem): void {
    if (!contentDatabase[item.category]) {
      contentDatabase[item.category] = []
    }
    contentDatabase[item.category].push(item)
  }

  // Update existing content item
  static updateContentItem(category: string, slug: string, updates: Partial<ContentItem>): boolean {
    const categoryContent = contentDatabase[category]
    if (!categoryContent) return false

    const itemIndex = categoryContent.findIndex(item => item.slug === slug)
    if (itemIndex === -1) return false

    contentDatabase[category][itemIndex] = {
      ...categoryContent[itemIndex],
      ...updates,
      lastModified: new Date(),
    }
    return true
  }

  // Delete content item
  static deleteContentItem(category: string, slug: string): boolean {
    const categoryContent = contentDatabase[category]
    if (!categoryContent) return false

    const itemIndex = categoryContent.findIndex(item => item.slug === slug)
    if (itemIndex === -1) return false

    contentDatabase[category].splice(itemIndex, 1)
    return true
  }
}
