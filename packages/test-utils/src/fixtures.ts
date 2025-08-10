import { createId } from '@paralleldrive/cuid2'

/**
 * Test data fixtures for consistent testing across services.
 */

export const testUsers = {
  alice: {
    id: 'user_alice_test',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    avatar: null,
  },
  bob: {
    id: 'user_bob_test',
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password456',
    avatar: 'https://example.com/avatar.jpg',
  },
  charlie: {
    id: 'user_charlie_test',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password789',
    avatar: null,
  },
} as const

export const testTrips = {
  tokyoTrip: {
    id: 'trip_tokyo_test',
    title: 'Tokyo Adventure',
    description: 'Exploring the vibrant city of Tokyo',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: '2024-03-15',
    endDate: '2024-03-25',
    status: 'planning' as const,
    type: 'leisure' as const,
    tags: ['culture', 'food', 'technology'],
    budget: 3000,
    currency: 'USD',
    collaborators: [],
    isPublic: false,
    userId: testUsers.alice.id,
  },
  parisTrip: {
    id: 'trip_paris_test',
    title: 'Romantic Paris',
    description: 'A romantic getaway to Paris',
    destination: 'Paris',
    country: 'France',
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    status: 'upcoming' as const,
    type: 'leisure' as const,
    tags: ['romance', 'culture', 'food'],
    budget: 2500,
    currency: 'EUR',
    collaborators: [testUsers.bob.id],
    isPublic: true,
    userId: testUsers.alice.id,
  },
  businessTrip: {
    id: 'trip_business_test',
    title: 'Business Conference',
    description: 'Annual tech conference in San Francisco',
    destination: 'San Francisco',
    country: 'United States',
    startDate: '2024-09-15',
    endDate: '2024-09-18',
    status: 'completed' as const,
    type: 'business' as const,
    tags: ['business', 'technology', 'networking'],
    budget: 4000,
    currency: 'USD',
    collaborators: [],
    isPublic: false,
    userId: testUsers.bob.id,
  },
} as const

export const testItineraryItems = {
  flightToTokyo: {
    id: 'itinerary_flight_tokyo_test',
    tripId: testTrips.tokyoTrip.id,
    type: 'flight',
    title: 'Flight to Tokyo',
    description: 'Direct flight from NYC to NRT',
    startDateTime: new Date('2024-03-15T10:00:00Z').getTime(),
    endDateTime: new Date('2024-03-15T14:30:00Z').getTime(),
    location: 'Narita International Airport',
    address: '1-1 Furugome, Narita, Chiba 282-0004, Japan',
    coordinates: { lat: 35.7647, lng: 140.3864 },
    status: 'planned' as const,
    priority: 1,
    cost: 800,
    currency: 'USD',
    bookingReference: 'ABC123XYZ',
    notes: 'Check-in online 24h before',
    attachments: [],
    userId: testUsers.alice.id,
  },
  hotelInTokyo: {
    id: 'itinerary_hotel_tokyo_test',
    tripId: testTrips.tokyoTrip.id,
    type: 'accommodation',
    title: 'Hotel Stay in Shibuya',
    description: 'Luxury hotel in the heart of Tokyo',
    startDateTime: new Date('2024-03-15T15:00:00Z').getTime(),
    endDateTime: new Date('2024-03-25T11:00:00Z').getTime(),
    location: 'Shibuya Grand Hotel',
    address: '1-1-1 Shibuya, Shibuya City, Tokyo 150-0002, Japan',
    coordinates: { lat: 35.6594, lng: 139.7016 },
    status: 'booked' as const,
    priority: 1,
    cost: 2000,
    currency: 'USD',
    bookingReference: 'HTL789ABC',
    notes: 'Request room with city view',
    attachments: [],
    userId: testUsers.alice.id,
  },
  sushiDinner: {
    id: 'itinerary_dinner_tokyo_test',
    tripId: testTrips.tokyoTrip.id,
    type: 'dining',
    title: 'Sushi Dinner at Jiro',
    description: 'Famous sushi experience',
    startDateTime: new Date('2024-03-16T19:00:00Z').getTime(),
    endDateTime: new Date('2024-03-16T21:00:00Z').getTime(),
    location: 'Sukiyabashi Jiro',
    address: 'Tsukamoto Sogyo Building B1F, 4-2-15 Ginza, Chuo City, Tokyo',
    coordinates: { lat: 35.6717, lng: 139.7632 },
    status: 'planned' as const,
    priority: 2,
    cost: 300,
    currency: 'USD',
    bookingReference: null,
    notes: 'Reservation required',
    attachments: [],
    userId: testUsers.alice.id,
  },
} as const

export const testWishlistItems = {
  tokyoMuseum: {
    id: 'wishlist_museum_test',
    tripId: testTrips.tokyoTrip.id,
    title: 'Visit Tokyo National Museum',
    description: 'Explore Japanese art and culture',
    category: 'activity',
    priority: 2,
    status: 'pending' as const,
    estimatedCost: 50,
    actualCost: null,
    currency: 'USD',
    url: 'https://www.tnm.jp/',
    notes: 'Check opening hours before visiting',
    userId: testUsers.alice.id,
  },
  tokyoFood: {
    id: 'wishlist_ramen_test',
    tripId: testTrips.tokyoTrip.id,
    title: 'Try Authentic Ramen',
    description: 'Find the best ramen shop in Tokyo',
    category: 'dining',
    priority: 1,
    status: 'completed' as const,
    estimatedCost: 15,
    actualCost: 18,
    currency: 'USD',
    url: null,
    notes: 'Found amazing shop in Shibuya',
    userId: testUsers.alice.id,
  },
} as const

/**
 * Helper functions to create test data with generated IDs
 */
export const createTestTrip = (overrides: Partial<typeof testTrips.tokyoTrip> = {}) => ({
  ...testTrips.tokyoTrip,
  id: createId(),
  ...overrides,
})

export const createTestUser = (overrides: Partial<typeof testUsers.alice> = {}) => ({
  ...testUsers.alice,
  id: createId(),
  ...overrides,
})

export const createTestItineraryItem = (
  overrides: Partial<typeof testItineraryItems.flightToTokyo> = {}
) => ({
  ...testItineraryItems.flightToTokyo,
  id: createId(),
  ...overrides,
})

export const createTestWishlistItem = (
  overrides: Partial<typeof testWishlistItems.tokyoMuseum> = {}
) => ({
  ...testWishlistItems.tokyoMuseum,
  id: createId(),
  ...overrides,
})

/**
 * Helper to convert test data to database format with timestamps
 */
export const toDbFormat = (data: Record<string, unknown>) => {
  const now = Date.now()
  return {
    ...data,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now,
  }
}
