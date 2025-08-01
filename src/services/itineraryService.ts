import { 
  ItineraryItem, 
  ItineraryDay, 
  ItineraryFilters,
  Person,
  Location,
  OverarchingEventItem
} from '@/types/itinerary'

// Sample data for development
const samplePeople: Person[] = [
  {
    id: 'p1',
    name: 'Maria Santos',
    relationshipType: 'family',
    contactInfo: { phone: '+55 11 99999-1234' },
    notes: 'Cousin in São Paulo'
  },
  {
    id: 'p2', 
    name: 'João Silva',
    relationshipType: 'friend',
    contactInfo: { whatsapp: '+55 21 88888-5678' },
    notes: 'Friend from Rio, knows great restaurants'
  },
  {
    id: 'p3',
    name: 'Ana Costa',
    relationshipType: 'colleague',
    contactInfo: { email: 'ana@company.com' },
    notes: 'Work contact for research interviews'
  }
]

const sampleLocations: Location[] = [
  {
    id: 'l1',
    name: 'Copacabana Palace Hotel',
    address: 'Av. Atlântica, 1702',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'accommodation'
  },
  {
    id: 'l2',
    name: 'Christ the Redeemer',
    address: 'Parque Nacional da Tijuca',
    city: 'Rio de Janeiro', 
    state: 'RJ',
    type: 'tourist-spot'
  },
  {
    id: 'l3',
    name: 'Parents House',
    city: 'São Paulo',
    state: 'SP',
    type: 'accommodation'
  }
]

// Sample itinerary items
const sampleItinerary: ItineraryItem[] = [
  {
    id: 'acc1',
    title: 'Stay at Parents House',
    description: 'Christmas holidays with family',
    type: 'accommodation',
    accommodationType: 'parents-house',
    startDate: new Date('2024-12-20'),
    checkIn: new Date('2024-12-20T15:00:00'),
    checkOut: new Date('2024-12-27T11:00:00'),
    endDate: new Date('2024-12-27'),
    isAllDay: false,
    location: sampleLocations[2],
    attendees: [samplePeople[0]],
    status: 'confirmed',
    priority: 'high',
    tags: ['family', 'holidays'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'event1',
    title: 'Christmas Dinner',
    description: 'Traditional family Christmas celebration',
    type: 'event',
    eventType: 'holiday',
    startDate: new Date('2024-12-24T19:00:00'),
    endDate: new Date('2024-12-24T23:00:00'),
    isAllDay: false,
    location: sampleLocations[2],
    attendees: [samplePeople[0]],
    status: 'confirmed',
    priority: 'high',
    tags: ['family', 'christmas'],
    dresscode: 'Semi-formal',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'work1',
    title: 'Research Interview - Local Startup',
    description: 'Interview with fintech startup for research project',
    type: 'work',
    workType: 'interview',
    startDate: new Date('2024-12-30T14:00:00'),
    endDate: new Date('2024-12-30T16:00:00'),
    isAllDay: false,
    location: { 
      id: 'l4', 
      name: 'Startup Hub SP', 
      city: 'São Paulo', 
      type: 'workplace' 
    },
    attendees: [samplePeople[2]],
    status: 'planned',
    priority: 'medium',
    tags: ['research', 'fintech'],
    company: 'TechBrasil',
    contactPerson: samplePeople[2],
    preparationNotes: ['Review company background', 'Prepare interview questions'],
    followUpRequired: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
      updatedAt: new Date()
    })
  }

  static updateItem(id: string, updates: Partial<ItineraryItem>): boolean {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return false

    this.items[index] = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date()
    }
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
      filtered = filtered.filter(item => 
        item.startDate >= filters.dateRange!.start && 
        item.startDate <= filters.dateRange!.end
      )
    }

    if (filters.location) {
      filtered = filtered.filter(item => 
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
      filtered = filtered.filter(item =>
        item.tags?.some(tag => filters.tags!.includes(tag))
      )
    }

    return filtered
  }

  // Get items organized by day
  static getItemsByDay(startDate?: Date, endDate?: Date): ItineraryDay[] {
    const items = startDate && endDate 
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
        items: dayItems.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  // Statistics
  static getStats() {
    const items = this.getAllItems()
    if (items.length === 0) {
      return {
        totalItems: 0,
        byType: {} as Record<any, number>,
        byStatus: {},
        totalBudget: 0,
        timeSpan: {
          start: new Date(),
          end: new Date(),
          totalDays: 0
        }
      }
    }

    const byType = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byStatus = items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

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
      timeSpan: { start, end, totalDays }
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