import type {
  ItineraryItem,
  ItineraryDay,
  ItineraryFilters,
  Person,
  Location,
  OverarchingEventItem,
} from '@/types/itinerary'
import { itineraryApiClient } from '@/lib/api-client'

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  private static people: Person[] = [...samplePeople]
  private static locations: Location[] = [...sampleLocations]

  private static getCurrentTripId(): string {
    // Get current trip ID from localStorage (fallback for non-React contexts)
    const storedTrip = localStorage.getItem('currentTrip')
    if (storedTrip) {
      const trip = JSON.parse(storedTrip)
      return trip.id
    }
    throw new Error('No active trip found')
  }

  // CRUD Operations for Items
  static async getAllItems(): Promise<ItineraryItem[]> {
    try {
      const tripId = this.getCurrentTripId()
      const client = itineraryApiClient()

      const response = await client.get(`/itinerary?tripId=${tripId}`)
      const apiItems = response.data || []

      // Transform API items to frontend format
      return apiItems
        .map((item: Record<string, unknown>) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: item.endDate ? new Date(item.endDate) : undefined,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          tags: item.tags ? JSON.parse(item.tags) : [],
          typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
        }))
        .sort((a: ItineraryItem, b: ItineraryItem) => a.startDate.getTime() - b.startDate.getTime())
    } catch (error) {
      console.error('Error fetching itinerary items:', error)
      return []
    }
  }

  static async getItemById(id: string): Promise<ItineraryItem | null> {
    try {
      const client = itineraryApiClient()

      const response = await client.get(`/itinerary/${id}`)
      const item = response.data

      if (!item) return null

      // Transform API item to frontend format
      return {
        ...item,
        startDate: new Date(item.startDate),
        endDate: item.endDate ? new Date(item.endDate) : undefined,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
      }
    } catch (error) {
      console.error('Error fetching itinerary item:', error)
      return null
    }
  }

  static async addItem(item: ItineraryItem): Promise<boolean> {
    try {
      const tripId = this.getCurrentTripId()
      const client = itineraryApiClient()

      // Transform frontend item to API format
      const apiItem = {
        title: item.title,
        description: item.description || '',
        type: item.type,
        startDate: item.startDate.toISOString(),
        endDate: item.endDate?.toISOString(),
        isAllDay: item.isAllDay,
        status: item.status,
        priority: item.priority,
        tags: item.tags ? JSON.stringify(item.tags) : undefined,
        notes: item.notes || '',
        typeData: item.typeData ? JSON.stringify(item.typeData) : undefined,
        tripId,
        locationId: item.location?.id,
      }

      await client.post('/itinerary', apiItem)
      return true
    } catch (error) {
      console.error('Error adding itinerary item:', error)
      return false
    }
  }

  static async updateItem(id: string, updates: Partial<ItineraryItem>): Promise<boolean> {
    try {
      const client = itineraryApiClient()

      // Transform updates to API format
      const apiUpdates: Record<string, unknown> = { ...updates }
      if (apiUpdates.startDate) {
        apiUpdates.startDate = apiUpdates.startDate.toISOString()
      }
      if (apiUpdates.endDate) {
        apiUpdates.endDate = apiUpdates.endDate.toISOString()
      }
      if (apiUpdates.tags) {
        apiUpdates.tags = JSON.stringify(apiUpdates.tags)
      }
      if (apiUpdates.typeData) {
        apiUpdates.typeData = JSON.stringify(apiUpdates.typeData)
      }
      if (apiUpdates.location) {
        apiUpdates.locationId = apiUpdates.location.id
        delete apiUpdates.location
      }

      await client.put(`/itinerary/${id}`, apiUpdates)
      return true
    } catch (error) {
      console.error('Error updating itinerary item:', error)
      return false
    }
  }

  static async deleteItem(id: string): Promise<boolean> {
    try {
      const client = itineraryApiClient()

      await client.delete(`/itinerary/${id}`)
      return true
    } catch (error) {
      console.error('Error deleting itinerary item:', error)
      return false
    }
  }

  // Filtering and Search
  static async getFilteredItems(filters: ItineraryFilters): Promise<ItineraryItem[]> {
    try {
      const tripId = this.getCurrentTripId()
      const client = itineraryApiClient()

      // Build query parameters for API filtering
      const queryParams = new URLSearchParams({ tripId })

      if (filters.types && filters.types.length > 0) {
        queryParams.set('types', filters.types.join(','))
      }

      if (filters.dateRange) {
        queryParams.set('startDate', filters.dateRange.start.toISOString())
        queryParams.set('endDate', filters.dateRange.end.toISOString())
      }

      if (filters.status && filters.status.length > 0) {
        queryParams.set('status', filters.status.join(','))
      }

      const response = await client.get(`/itinerary?${queryParams.toString()}`)
      const apiItems = response.data || []

      // Transform API items to frontend format
      let filtered = apiItems.map((item: Record<string, unknown>) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: item.endDate ? new Date(item.endDate) : undefined,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        tags: item.tags ? JSON.parse(item.tags) : [],
        typeData: item.typeData ? JSON.parse(item.typeData) : undefined,
      }))

      // Apply client-side filtering for complex filters not supported by API
      if (filters.location) {
        filtered = filtered.filter(
          (item: ItineraryItem) =>
            item.location?.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
            item.location?.name.toLowerCase().includes(filters.location!.toLowerCase())
        )
      }

      if (filters.attendees && filters.attendees.length > 0) {
        filtered = filtered.filter((item: ItineraryItem) =>
          item.attendees?.some(attendee => filters.attendees!.includes(attendee.id))
        )
      }

      if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter((item: ItineraryItem) =>
          item.tags?.some(tag => filters.tags!.includes(tag))
        )
      }

      return filtered.sort(
        (a: ItineraryItem, b: ItineraryItem) => a.startDate.getTime() - b.startDate.getTime()
      )
    } catch (error) {
      console.error('Error fetching filtered itinerary items:', error)
      return []
    }
  }

  // Get items organized by day
  static async getItemsByDay(startDate?: Date, endDate?: Date): Promise<ItineraryDay[]> {
    const items =
      startDate && endDate
        ? await this.getFilteredItems({ dateRange: { start: startDate, end: endDate } })
        : await this.getAllItems()

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
