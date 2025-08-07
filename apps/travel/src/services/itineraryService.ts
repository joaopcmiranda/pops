import type {
  ItineraryItem,
  ItineraryDay,
  ItineraryFilters,
  Person,
  Location,
  OverarchingEventItem,
} from '@/types/itinerary'
// TODO: Replace with API calls when itinerary service is implemented
// import { trpcClient } from '@/utils/trpc'
// import type { ItineraryItem as APIItineraryItem } from '@pops/types'

// TEMPORARY: Keep sample data until itinerary API service is implemented
// This data will be removed when we complete the backend migration for itinerary items
const samplePeople: Person[] = [
  {
    id: 'p1',
    name: 'Maria Santos',
    relationshipType: 'family',
    contactInfo: { phone: '+55 11 99999-1234' },
    notes: 'Cousin in São Paulo',
  },
  {
    id: 'p2',
    name: 'João Silva',
    relationshipType: 'friend',
    contactInfo: { whatsapp: '+55 21 88888-5678' },
    notes: 'Friend from Rio, knows great restaurants',
  },
  {
    id: 'p3',
    name: 'Ana Costa',
    relationshipType: 'colleague',
    contactInfo: { email: 'ana@company.com' },
    notes: 'Work contact for research interviews',
  },
]

const sampleLocations: Location[] = [
  {
    id: 'l1',
    name: 'Copacabana Palace Hotel',
    address: 'Av. Atlântica, 1702',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'accommodation',
  },
  {
    id: 'l2',
    name: 'Christ the Redeemer',
    address: 'Parque Nacional da Tijuca',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'tourist-spot',
  },
  {
    id: 'l3',
    name: 'Parents House',
    city: 'São Paulo',
    state: 'SP',
    type: 'accommodation',
  },
]

// Sample itinerary items
const sampleItinerary: ItineraryItem[] = [
  // Rio de Janeiro Trip Items
  {
    id: 'rio-arrival',
    title: 'Flight Arrival - Rio de Janeiro',
    description: 'TAM Airlines JJ8070 - Land at Galeão International Airport',
    type: 'transport',
    transportType: 'flight',
    startDate: new Date('2024-03-15T22:45:00'),
    endDate: new Date('2024-03-15T23:30:00'),
    isAllDay: false,
    from: {
      id: 'origin-airport',
      name: 'Origin Airport',
      city: 'Origin City',
      type: 'other',
    },
    to: {
      id: 'galeao-airport',
      name: 'Galeão International Airport',
      city: 'Rio de Janeiro',
      type: 'other',
    },
    location: {
      id: 'galeao-airport',
      name: 'Galeão International Airport',
      city: 'Rio de Janeiro',
      type: 'other',
    },
    status: 'confirmed',
    priority: 'high',
    tags: ['travel', 'arrival'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'rio-hotel-checkin',
    title: 'Hotel Check-in - Copacabana Palace',
    description: 'Check into Ocean View Suite',
    type: 'accommodation',
    accommodationType: 'hotel',
    startDate: new Date('2024-03-16T15:00:00'),
    endDate: new Date('2024-03-22T12:00:00'),
    checkIn: new Date('2024-03-16T15:00:00'),
    checkOut: new Date('2024-03-22T12:00:00'),
    isAllDay: false,
    location: sampleLocations[0],
    status: 'confirmed',
    priority: 'high',
    tags: ['accommodation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'christ-redeemer-visit',
    title: 'Christ the Redeemer Tour',
    description: 'Small group tour with professional guide',
    type: 'activity',
    category: 'sightseeing',
    startDate: new Date('2024-03-17T09:00:00'),
    endDate: new Date('2024-03-17T14:00:00'),
    isAllDay: false,
    location: sampleLocations[1],
    status: 'confirmed',
    priority: 'high',
    tags: ['sightseeing', 'tour'],
    cost: { amount: 85, currency: 'USD' },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'copacabana-beach',
    title: 'Copacabana Beach Day',
    description: 'Relax on the famous beach, try local food',
    type: 'activity',
    category: 'other',
    startDate: new Date('2024-03-18T10:00:00'),
    endDate: new Date('2024-03-18T17:00:00'),
    isAllDay: false,
    location: {
      id: 'copacabana-beach',
      name: 'Copacabana Beach',
      city: 'Rio de Janeiro',
      type: 'beach',
    },
    status: 'planned',
    priority: 'medium',
    tags: ['beach', 'leisure'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'sugarloaf-mountain',
    title: 'Sugarloaf Mountain Cable Car',
    description: 'Panoramic views of Rio at sunset',
    type: 'activity',
    category: 'sightseeing',
    startDate: new Date('2024-03-19T16:00:00'),
    endDate: new Date('2024-03-19T19:00:00'),
    isAllDay: false,
    location: {
      id: 'sugarloaf',
      name: 'Sugarloaf Mountain',
      city: 'Rio de Janeiro',
      type: 'tourist-spot',
    },
    status: 'confirmed',
    priority: 'high',
    tags: ['sightseeing', 'sunset'],
    cost: { amount: 75, currency: 'USD' },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'santa-teresa-walk',
    title: 'Santa Teresa Neighborhood Walk',
    description: 'Explore historic neighborhood with colonial architecture',
    type: 'activity',
    category: 'sightseeing',
    startDate: new Date('2024-03-20T14:00:00'),
    endDate: new Date('2024-03-20T17:00:00'),
    isAllDay: false,
    location: {
      id: 'santa-teresa',
      name: 'Santa Teresa',
      city: 'Rio de Janeiro',
      type: 'other',
    },
    status: 'planned',
    priority: 'medium',
    tags: ['culture', 'walking', 'historic'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'rio-departure',
    title: 'Departure Flight',
    description: 'Return flight to home',
    type: 'transport',
    transportType: 'flight',
    startDate: new Date('2024-03-22T15:30:00'),
    endDate: new Date('2024-03-22T16:30:00'),
    isAllDay: false,
    from: {
      id: 'galeao-airport',
      name: 'Galeão International Airport',
      city: 'Rio de Janeiro',
      type: 'other',
    },
    to: {
      id: 'destination-airport',
      name: 'Home Airport',
      city: 'Home City',
      type: 'other',
    },
    location: {
      id: 'galeao-airport',
      name: 'Galeão International Airport',
      city: 'Rio de Janeiro',
      type: 'other',
    },
    status: 'confirmed',
    priority: 'high',
    tags: ['travel', 'departure'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Some additional items for different dates to populate the calendar
  {
    id: 'tokyo-arrival',
    title: 'Arrive in Tokyo',
    description: 'Business trip arrival at Narita Airport',
    type: 'transport',
    transportType: 'flight',
    startDate: new Date('2024-02-10T18:30:00'),
    endDate: new Date('2024-02-10T19:30:00'),
    isAllDay: false,
    from: {
      id: 'origin-airport-tokyo',
      name: 'Origin Airport',
      city: 'Origin City',
      type: 'other',
    },
    to: {
      id: 'narita-airport',
      name: 'Narita International Airport',
      city: 'Tokyo',
      type: 'other',
    },
    location: {
      id: 'narita-airport',
      name: 'Narita International Airport',
      city: 'Tokyo',
      type: 'other',
    },
    status: 'confirmed',
    priority: 'high',
    tags: ['business', 'travel'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tokyo-meeting',
    title: 'Business Meeting - Shibuya Office',
    description: 'Quarterly review meeting with Japan team',
    type: 'work',
    workType: 'conference',
    startDate: new Date('2024-02-12T10:00:00'),
    endDate: new Date('2024-02-12T16:00:00'),
    isAllDay: false,
    location: {
      id: 'shibuya-office',
      name: 'Shibuya Business Tower',
      city: 'Tokyo',
      type: 'workplace',
    },
    status: 'confirmed',
    priority: 'high',
    tags: ['business', 'meeting'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // London trip items
  {
    id: 'london-planning',
    title: 'Plan London Itinerary',
    description: 'Research attractions and book tickets',
    type: 'activity',
    category: 'other',
    startDate: new Date('2024-06-15T10:00:00'),
    endDate: new Date('2024-06-15T12:00:00'),
    isAllDay: false,
    status: 'planned',
    priority: 'medium',
    tags: ['planning', 'research'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export class ItineraryService {
  private static items: ItineraryItem[] = [...sampleItinerary]
  private static people: Person[] = [...samplePeople]
  private static locations: Location[] = [...sampleLocations]

  // CRUD Operations for Items
  static getAllItems(): ItineraryItem[] {
    return [...this.items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  static getItemById(id: string): ItineraryItem | null {
    return this.items.find(item => item.id === id) || null
  }

  static addItem(item: ItineraryItem): void {
    this.items.push({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static updateItem(id: string, updates: Partial<ItineraryItem>): boolean {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return false

    // Type assertion to ensure TypeScript understands the update is valid
    this.items[index] = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date(),
    } as ItineraryItem
    return true
  }

  static deleteItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return false

    this.items.splice(index, 1)
    return true
  }

  // Filtering and Search
  static getFilteredItems(filters: ItineraryFilters): ItineraryItem[] {
    let filtered = this.getAllItems()

    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(item => filters.types!.includes(item.type))
    }

    if (filters.dateRange) {
      filtered = filtered.filter(
        item =>
          item.startDate >= filters.dateRange!.start && item.startDate <= filters.dateRange!.end
      )
    }

    if (filters.location) {
      filtered = filtered.filter(
        item =>
          item.location?.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
          item.location?.name.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    if (filters.attendees && filters.attendees.length > 0) {
      filtered = filtered.filter(item =>
        item.attendees?.some(attendee => filters.attendees!.includes(attendee.id))
      )
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(item => filters.status!.includes(item.status))
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item => item.tags?.some(tag => filters.tags!.includes(tag)))
    }

    return filtered
  }

  // Get items organized by day
  static getItemsByDay(startDate?: Date, endDate?: Date): ItineraryDay[] {
    const items =
      startDate && endDate
        ? this.getFilteredItems({ dateRange: { start: startDate, end: endDate } })
        : this.getAllItems()

    const itemsByDate = new Map<string, ItineraryItem[]>()

    items.forEach(item => {
      const dateKey = item.startDate.toISOString().split('T')[0]
      if (!itemsByDate.has(dateKey)) {
        itemsByDate.set(dateKey, [])
      }
      itemsByDate.get(dateKey)!.push(item)
    })

    return Array.from(itemsByDate.entries())
      .map(([dateStr, dayItems]) => ({
        date: new Date(dateStr),
        items: dayItems.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  // Statistics
  static getStats() {
    const items = this.getAllItems()
    if (items.length === 0) {
      return {
        totalItems: 0,
        byType: {} as Record<string, number>,
        byStatus: {},
        totalBudget: 0,
        timeSpan: {
          start: new Date(),
          end: new Date(),
          totalDays: 0,
        },
      }
    }

    const byType = items.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const byStatus = items.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const dates = items.map(item => item.startDate).sort((a, b) => a.getTime() - b.getTime())
    const start = dates[0]
    const end = dates[dates.length - 1]
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

    // Calculate total budget (simplified - would need proper cost tracking)
    const totalBudget = items.reduce((sum, item) => {
      if ('cost' in item && item.cost) {
        return sum + item.cost.amount
      }
      return sum
    }, 0)

    return {
      totalItems: items.length,
      byType,
      byStatus,
      totalBudget,
      timeSpan: { start, end, totalDays },
    }
  }

  // People management
  static getAllPeople(): Person[] {
    return [...this.people]
  }

  static addPerson(person: Person): void {
    this.people.push(person)
  }

  // Locations management
  static getAllLocations(): Location[] {
    return [...this.locations]
  }

  static addLocation(location: Location): void {
    this.locations.push(location)
  }

  // Utility functions
  static getOverarchingEvents(): OverarchingEventItem[] {
    return this.items.filter(item => item.type === 'overarching-event') as OverarchingEventItem[]
  }

  static getSubEventsForOverarching(parentId: string): ItineraryItem[] {
    const parent = this.getItemById(parentId) as OverarchingEventItem
    if (!parent || parent.type !== 'overarching-event') return []

    return parent.subEvents.map(id => this.getItemById(id)).filter(Boolean) as ItineraryItem[]
  }
}
