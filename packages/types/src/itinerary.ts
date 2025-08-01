// Core itinerary types for flexible trip planning

export type ItemType =
  | 'accommodation'
  | 'event'
  | 'work'
  | 'activity'
  | 'transport'
  | 'overarching-event'

export type AccommodationType =
  | 'hotel'
  | 'friends-house'
  | 'parents-house'
  | 'own-house'
  | 'airbnb'
  | 'hostel'

export type EventType =
  | 'holiday' // Christmas, New Year's, etc.
  | 'social' // Parties, meetups
  | 'cultural' // Concerts, festivals
  | 'personal' // Birthdays, etc.

export type WorkType =
  | 'research-location'
  | 'interview'
  | 'remote-work'
  | 'networking'
  | 'conference'

export interface Person {
  id: string
  name: string
  relationshipType: 'family' | 'friend' | 'colleague' | 'contact'
  contactInfo?: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  notes?: string
}

export interface Location {
  id: string
  name: string
  address?: string
  city: string
  state?: string
  coordinates?: {
    lat: number
    lng: number
  }
  type: 'venue' | 'accommodation' | 'workplace' | 'tourist-spot' | 'restaurant' | 'other'
}

export interface BaseItineraryItem {
  id: string
  tripId: string
  title: string
  description?: string
  type: ItemType
  startDate: Date
  endDate?: Date
  isAllDay?: boolean
  location?: Location
  attendees?: Person[]
  tags?: string[]
  notes?: string
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface AccommodationItem extends BaseItineraryItem {
  type: 'accommodation'
  accommodationType: AccommodationType
  checkIn: Date
  checkOut: Date
  confirmationNumber?: string
  cost?: {
    amount: number
    currency: string
    perNight?: boolean
  }
  amenities?: string[]
  hostContact?: Person
}

export interface EventItem extends BaseItineraryItem {
  type: 'event'
  eventType: EventType
  isRecurring?: boolean
  parentEventId?: string // For sub-events under overarching events
  dresscode?: string
  giftIdeas?: string[]
}

export interface WorkItem extends BaseItineraryItem {
  type: 'work'
  workType: WorkType
  isRemote?: boolean
  company?: string
  contactPerson?: Person
  preparationNotes?: string[]
  followUpRequired?: boolean
}

export interface ActivityItem extends BaseItineraryItem {
  type: 'activity'
  category: 'sightseeing' | 'food' | 'nightlife' | 'adventure' | 'culture' | 'shopping' | 'other'
  bookingRequired?: boolean
  bookingInfo?: {
    website?: string
    phone?: string
    confirmationNumber?: string
  }
  cost?: {
    amount: number
    currency: string
    perPerson?: boolean
  }
  duration?: number // in minutes
  difficultyLevel?: 'easy' | 'moderate' | 'hard'
}

export interface TransportItem extends BaseItineraryItem {
  type: 'transport'
  transportType: 'flight' | 'bus' | 'train' | 'car-rental' | 'taxi' | 'uber'
  from: Location
  to: Location
  departureTime?: Date
  arrivalTime?: Date
  confirmationNumber?: string
  cost?: {
    amount: number
    currency: string
  }
  seatInfo?: string
}

// Overarching events like Carnival that contain multiple sub-activities
export interface OverarchingEventItem extends BaseItineraryItem {
  type: 'overarching-event'
  subEvents: string[] // IDs of related events/activities
  theme?: string
  specialNotes?: string[]
}

export type ItineraryItem =
  | AccommodationItem
  | EventItem
  | WorkItem
  | ActivityItem
  | TransportItem
  | OverarchingEventItem

// Utility types for filtering and organization
export interface ItineraryDay {
  date: Date
  items: ItineraryItem[]
}

export interface ItineraryFilters {
  types?: ItemType[]
  dateRange?: {
    start: Date
    end: Date
  }
  location?: string
  attendees?: string[] // Person IDs
  status?: ('planned' | 'confirmed' | 'completed' | 'cancelled')[]
  tags?: string[]
}

export interface ItineraryStats {
  totalItems: number
  byType: Record<ItemType, number>
  byStatus: Record<string, number>
  totalBudget: number
  timeSpan: {
    start: Date
    end: Date
    totalDays: number
  }
}
