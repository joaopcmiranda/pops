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
    {
      id: 'tokyo-japan',
      title: 'Tokyo, Japan',
      slug: 'tokyo-japan',
      category: 'destinations',
      content: `# Tokyo, Japan

## Overview
A fascinating blend of ultra-modern and traditional, Tokyo offers endless discoveries.

## Must-See Districts
- **Shibuya** - Famous crossing and trendy shopping
- **Asakusa** - Traditional Tokyo with Senso-ji Temple
- **Harajuku** - Youth culture and fashion
- **Ginza** - Upscale shopping and dining
- **Akihabara** - Electronics and anime culture

## Transportation
- **Getting There**: Narita (NRT) or Haneda (HND)
- **Getting Around**: JR Pass, metro, trains

## Best Time to Visit
- **Spring**: March-May (cherry blossoms)
- **Fall**: September-November (comfortable weather)

## Tips
- Learn basic Japanese phrases
- Carry cash - many places don't accept cards
- Bow when greeting people`,
    },
    {
      id: 'london-uk',
      title: 'London, UK',
      slug: 'london-uk',
      category: 'destinations',
      content: `# London, UK

## Overview
Historic capital with world-class museums, royal palaces, and diverse neighborhoods.

## Must-See Attractions
- **Tower of London** - Historic fortress and Crown Jewels
- **British Museum** - World's artifacts and treasures
- **Big Ben & Parliament** - Iconic landmarks
- **Buckingham Palace** - Royal residence
- **London Eye** - Giant observation wheel

## Transportation
- **Getting There**: Heathrow, Gatwick, or Eurostar
- **Getting Around**: Underground (Tube), buses, walking

## Best Time to Visit
- **Late Spring/Summer**: May-September
- **Shoulder Season**: April, October (fewer crowds)

## Tips
- Get an Oyster Card for transport
- Many museums are free
- Pack an umbrella!`,
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
  transport: [
    {
      id: 'flight-rio',
      title: 'Flight to Rio de Janeiro',
      slug: 'flight-rio',
      category: 'transport',
      content: `# Flight to Rio de Janeiro

## Flight Details
- **Airline**: TAM Airlines
- **Flight**: JJ8070
- **Departure**: March 15, 2024 - 14:30
- **Arrival**: March 15, 2024 - 22:45
- **Duration**: 8h 15m

## Confirmation
- **Confirmation Code**: ABC123
- **Seat**: 12A (Window)
- **Gate**: Will be announced 2 hours before

## Notes
- Check-in online 24 hours before
- Arrive at airport 3 hours early for international flights
- Bring passport and boarding pass`,
    },
  ],
  accommodation: [
    {
      id: 'copacabana-hotel',
      title: 'Copacabana Palace Hotel',
      slug: 'copacabana-hotel',
      category: 'accommodation',
      content: `# Copacabana Palace Hotel

## Hotel Details
- **Address**: Av. Atlântica, 1702, Copacabana
- **Check-in**: March 15, 2024 - 15:00
- **Check-out**: March 22, 2024 - 12:00
- **Room**: Ocean View Suite

## Confirmation
- **Confirmation**: CPH789456
- **Total**: $1,200 for 7 nights
- **Includes**: Breakfast, WiFi, Pool access

## Amenities
- Beachfront location
- Outdoor pool
- Spa and fitness center
- Multiple restaurants
- Concierge service

## Notes
- Late check-in available
- Request early check-in if flight arrives early`,
    },
  ],
  activities: [
    {
      id: 'christ-redeemer-tour',
      title: 'Christ the Redeemer Tour',
      slug: 'christ-redeemer-tour',
      category: 'activities',
      content: `# Christ the Redeemer Tour

## Tour Details
- **Date**: March 17, 2024
- **Time**: 09:00 - 14:00
- **Duration**: 5 hours
- **Group**: Small group (max 8 people)

## Includes
- Transportation to/from hotel
- Train ticket to Corcovado
- Professional guide
- Entrance fees

## What to Bring
- Comfortable walking shoes
- Camera
- Sun protection
- Light jacket (cooler at the top)

## Confirmation
- **Booking Reference**: CTR2024789
- **Cost**: $85 per person
- **Meeting Point**: Hotel lobby at 8:45 AM

## Notes
- Tour runs rain or shine
- Alternative date available if weather is severe`,
    },
  ],
  budget: [
    {
      id: 'rio-budget-breakdown',
      title: 'Rio Trip Budget Breakdown',
      slug: 'rio-budget-breakdown',
      category: 'budget',
      content: `# Rio Trip Budget Breakdown

## Accommodation
- **Hotel**: $1,200 (7 nights)
- **Resort fees**: $50

## Transportation
- **Flights**: $850 (roundtrip)
- **Airport transfers**: $60
- **Local transport**: $100

## Activities & Tours
- **Christ the Redeemer**: $85
- **Sugarloaf Mountain**: $75
- **City tour**: $60
- **Beach activities**: $150

## Food & Dining
- **Meals**: $500 (estimated)
- **Drinks/nightlife**: $200

## Shopping & Miscellaneous
- **Souvenirs**: $100
- **Emergency fund**: $200

## Total Estimated Cost
**$3,430** (per person)

## Tips for Saving
- Book tours in advance for discounts
- Use metro instead of taxis when possible
- Try local restaurants instead of hotel dining`,
    },
  ],
  documents: [
    {
      id: 'travel-checklist',
      title: 'Travel Document Checklist',
      slug: 'travel-checklist',
      category: 'documents',
      content: `# Travel Document Checklist

## Essential Documents
- ✅ **Passport** (valid for 6+ months)
- ✅ **Flight tickets** (printed and digital)
- ✅ **Hotel confirmations**
- ✅ **Travel insurance**
- ✅ **Driver's license**

## Financial
- ✅ **Travel credit cards**
- ✅ **Cash** (local currency)
- ✅ **Bank notification** (travel notice)

## Health & Safety
- ✅ **Vaccination records**
- ✅ **Prescription medications**
- ✅ **Emergency contacts**
- ✅ **Travel advisor registrations**

## Digital Copies
- Store copies in cloud storage
- Email copies to yourself
- Share with trusted family member

## Emergency Information
- **Embassy**: +55 11 5186-7000
- **Emergency Services**: 190 (police), 192 (medical)
- **Travel Insurance**: 1-800-555-0123`,
    },
  ],
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
