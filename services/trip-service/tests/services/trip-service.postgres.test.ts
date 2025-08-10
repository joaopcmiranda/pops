import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  createTestDatabase,
  createTestFixtures,
  clearTestData,
  testTrips,
  testUsers,
  createTestTrip,
  type TestDatabase,
} from '@pops/test-utils'
import { TripService } from '../../src/services/trip-service.js'

describe('TripService (PostgreSQL)', () => {
  let testDb: TestDatabase
  let tripService: TripService

  beforeEach(async () => {
    testDb = await createTestDatabase('trip_test_', 'trip')
    tripService = new TripService(testDb.db)
  })

  afterEach(async () => {
    await testDb.cleanup()
  })

  describe('create', () => {
    it('should create a new trip with default settings', async () => {
      const tripData = {
        title: 'Tokyo Adventure',
        description: 'Exploring Tokyo',
        destination: 'Tokyo',
        country: 'Japan',
        type: 'leisure' as const,
        startDate: '2024-03-15T00:00:00Z',
        endDate: '2024-03-25T23:59:59Z',
      }

      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip).toMatchObject({
        title: tripData.title,
        description: tripData.description,
        destination: tripData.destination,
        country: tripData.country,
        type: tripData.type,
        userId: testUsers.alice.id,
      })
      expect(trip.id).toBeDefined()
      expect(trip.createdAt).toBeInstanceOf(Date)
      expect(trip.updatedAt).toBeInstanceOf(Date)
      expect(trip.settings).toMatchObject({
        currency: 'USD',
        timezone: 'UTC',
        dateFormat: 'US',
        privacy: 'private',
      })
    })

    it('should create a trip with custom settings', async () => {
      const tripData = {
        title: 'European Tour',
        destination: 'Paris',
        country: 'France',
        type: 'leisure' as const,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-10T23:59:59Z',
        settings: {
          currency: 'EUR',
          timezone: 'Europe/Paris',
          dateFormat: 'EU',
          privacy: 'public' as const,
          notifications: {
            email: true,
            push: true,
            reminders: true,
          },
        },
      }

      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip.settings).toMatchObject({
        currency: 'EUR',
        timezone: 'Europe/Paris',
        dateFormat: 'EU',
        privacy: 'public',
        notifications: {
          email: true,
          push: true,
          reminders: true,
        },
      })
    })

    it('should create a trip with budget and tags', async () => {
      const tripData = {
        title: 'Business Trip',
        destination: 'San Francisco',
        country: 'United States',
        type: 'business' as const,
        startDate: '2024-09-15T00:00:00Z',
        endDate: '2024-09-18T23:59:59Z',
        budget: {
          total: 5000,
          currency: 'USD',
          categories: {
            accommodation: 2000,
            transport: 1500,
            food: 1000,
            activities: 500,
          },
        },
        tags: ['business', 'technology', 'networking'],
      }

      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip.budget).toEqual(tripData.budget)
      expect(trip.tags).toEqual(tripData.tags)
    })

    it('should set default status to planning', async () => {
      const tripData = createTestTrip({ title: 'Default Status Trip' })
      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip.status).toBe('planning')
    })

    it('should handle template creation', async () => {
      const tripData = createTestTrip({
        title: 'Template Trip',
        isTemplate: true,
      })

      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip.isTemplate).toBe(true)
    })
  })

  describe('get', () => {
    beforeEach(async () => {
      await createTestFixtures(testDb, 'trip')
    })

    it('should retrieve a trip by ID for the owner', async () => {
      const trip = await tripService.get('test-trip-1', 'test-user-1')

      expect(trip).not.toBeNull()
      expect(trip!.id).toBe('test-trip-1')
      expect(trip!.title).toBe('Test Trip to Paris')
      expect(trip!.destination).toBe('Paris')
      expect(trip!.userId).toBe('test-user-1')
      expect(trip!.stats).toMatchObject({
        totalItems: 0,
        itemsByType: {},
        itemsByStatus: {},
        totalDays: expect.any(Number),
        lastActivity: expect.any(Date),
      })
    })

    it('should return null for non-existent trip', async () => {
      const trip = await tripService.get('non-existent-id', 'test-user-1')
      expect(trip).toBeNull()
    })

    it('should return null when user is not owner or collaborator', async () => {
      const trip = await tripService.get('test-trip-1', 'unauthorized-user')
      expect(trip).toBeNull()
    })

    it('should calculate correct total days', async () => {
      const trip = await tripService.get('test-trip-1', 'test-user-1')

      expect(trip).not.toBeNull()
      expect(trip!.stats.totalDays).toBe(7) // 2024-06-01 to 2024-06-07 = 7 days
    })
  })

  describe('list', () => {
    beforeEach(async () => {
      // Create multiple trips with different properties
      const client = await testDb.pool.connect()

      try {
        await client.query(`
          INSERT INTO trips (id, title, destination, country, type, status, start_date, end_date, settings, user_id)
          VALUES 
            ('trip-1', 'Tokyo Adventure', 'Tokyo', 'Japan', 'leisure', 'planning', '2024-03-15T00:00:00Z', '2024-03-25T23:59:59Z', '{"currency": "USD", "timezone": "UTC", "dateFormat": "US", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'user-1'),
            ('trip-2', 'Paris Getaway', 'Paris', 'France', 'leisure', 'active', '2024-06-01T00:00:00Z', '2024-06-10T23:59:59Z', '{"currency": "EUR", "timezone": "Europe/Paris", "dateFormat": "EU", "privacy": "public", "notifications": {"email": true, "push": true, "reminders": true}}', 'user-1'),
            ('trip-3', 'Business Conference', 'San Francisco', 'United States', 'business', 'completed', '2024-01-15T00:00:00Z', '2024-01-18T23:59:59Z', '{"currency": "USD", "timezone": "America/Los_Angeles", "dateFormat": "US", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'user-1'),
            ('trip-4', 'Bob Solo Trip', 'London', 'United Kingdom', 'leisure', 'planning', '2024-08-01T00:00:00Z', '2024-08-10T23:59:59Z', '{"currency": "GBP", "timezone": "Europe/London", "dateFormat": "EU", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'user-2')
        `)
      } finally {
        client.release()
      }
    })

    it('should list all trips for a user', async () => {
      const trips = await tripService.list({}, 'user-1')

      expect(trips).toHaveLength(3) // user-1 owns 3 trips
      expect(trips.map(t => t.title)).toContain('Tokyo Adventure')
      expect(trips.map(t => t.title)).toContain('Paris Getaway')
      expect(trips.map(t => t.title)).toContain('Business Conference')
    })

    it('should filter trips by status', async () => {
      const trips = await tripService.list({ filters: { status: ['planning'] } }, 'user-1')

      expect(trips).toHaveLength(1)
      expect(trips[0].title).toBe('Tokyo Adventure')
      expect(trips[0].status).toBe('planning')
    })

    it('should filter trips by multiple statuses', async () => {
      const trips = await tripService.list(
        { filters: { status: ['planning', 'active'] } },
        'user-1'
      )

      expect(trips).toHaveLength(2)
      expect(trips.map(t => t.status)).toContain('planning')
      expect(trips.map(t => t.status)).toContain('active')
    })

    it('should filter trips by type', async () => {
      const trips = await tripService.list({ filters: { type: ['leisure'] } }, 'user-1')

      expect(trips).toHaveLength(2)
      trips.forEach(trip => {
        expect(trip.type).toBe('leisure')
      })
    })

    it('should filter trips by destination', async () => {
      const trips = await tripService.list({ filters: { destination: 'Tokyo' } }, 'user-1')

      expect(trips).toHaveLength(1)
      expect(trips[0].destination).toBe('Tokyo')
    })

    it('should filter trips by country', async () => {
      const trips = await tripService.list({ filters: { country: 'France' } }, 'user-1')

      expect(trips).toHaveLength(1)
      expect(trips[0].country).toBe('France')
    })

    it('should filter trips by date range', async () => {
      const trips = await tripService.list(
        {
          filters: {
            dateRange: {
              start: '2024-03-01',
              end: '2024-07-01',
            },
          },
        },
        'user-1'
      )

      expect(trips).toHaveLength(2) // Tokyo and Paris trips
      expect(trips.map(t => t.title)).toContain('Tokyo Adventure')
      expect(trips.map(t => t.title)).toContain('Paris Getaway')
    })

    it('should sort trips by start date ascending', async () => {
      const trips = await tripService.list({ sortBy: 'startDate', sortOrder: 'asc' }, 'user-1')

      expect(trips).toHaveLength(3)
      expect(new Date(trips[0].startDate).getTime()).toBeLessThan(
        new Date(trips[1].startDate).getTime()
      )
      expect(new Date(trips[1].startDate).getTime()).toBeLessThan(
        new Date(trips[2].startDate).getTime()
      )
    })

    it('should sort trips by start date descending', async () => {
      const trips = await tripService.list({ sortBy: 'startDate', sortOrder: 'desc' }, 'user-1')

      expect(trips).toHaveLength(3)
      expect(new Date(trips[0].startDate).getTime()).toBeGreaterThan(
        new Date(trips[1].startDate).getTime()
      )
    })

    it('should sort trips by title', async () => {
      const trips = await tripService.list({ sortBy: 'title', sortOrder: 'asc' }, 'user-1')

      expect(trips).toHaveLength(3)
      expect(trips[0].title).toBe('Business Conference')
      expect(trips[1].title).toBe('Paris Getaway')
      expect(trips[2].title).toBe('Tokyo Adventure')
    })

    it('should apply pagination', async () => {
      const tripsPage1 = await tripService.list({ limit: 1, offset: 0 }, 'user-1')

      const tripsPage2 = await tripService.list({ limit: 1, offset: 1 }, 'user-1')

      const tripsPage3 = await tripService.list({ limit: 1, offset: 2 }, 'user-1')

      expect(tripsPage1).toHaveLength(1)
      expect(tripsPage2).toHaveLength(1)
      expect(tripsPage3).toHaveLength(1)

      // All should be different trips
      const allIds = [tripsPage1[0].id, tripsPage2[0].id, tripsPage3[0].id]
      expect(new Set(allIds)).toHaveProperty('size', 3)
    })

    it('should combine filters and sorting', async () => {
      const trips = await tripService.list(
        {
          filters: { type: ['leisure'] },
          sortBy: 'startDate',
          sortOrder: 'asc',
        },
        'user-1'
      )

      expect(trips).toHaveLength(2)
      expect(trips[0].title).toBe('Tokyo Adventure') // March trip
      expect(trips[1].title).toBe('Paris Getaway') // June trip
      trips.forEach(trip => {
        expect(trip.type).toBe('leisure')
      })
    })
  })

  describe('update', () => {
    beforeEach(async () => {
      await createTestFixtures(testDb, 'trip')
    })

    it('should update trip title', async () => {
      const updatedTrip = await tripService.update(
        { id: 'test-trip-1', title: 'Updated Paris Adventure' },
        'test-user-1'
      )

      expect(updatedTrip.title).toBe('Updated Paris Adventure')
      expect(updatedTrip.id).toBe('test-trip-1')
      expect(updatedTrip.updatedAt).toBeInstanceOf(Date)
    })

    it('should update trip status', async () => {
      const updatedTrip = await tripService.update(
        { id: 'test-trip-1', status: 'active' },
        'test-user-1'
      )

      expect(updatedTrip.status).toBe('active')
    })

    it('should update trip dates', async () => {
      const newStartDate = '2024-07-01T00:00:00Z'
      const newEndDate = '2024-07-10T23:59:59Z'

      const updatedTrip = await tripService.update(
        {
          id: 'test-trip-1',
          startDate: newStartDate,
          endDate: newEndDate,
        },
        'test-user-1'
      )

      expect(updatedTrip.startDate.toISOString()).toBe('2024-07-01T00:00:00.000Z')
      expect(updatedTrip.endDate.toISOString()).toBe('2024-07-10T23:59:59.000Z')
    })

    it('should update trip budget', async () => {
      const newBudget = {
        total: 3000,
        currency: 'EUR',
        categories: {
          accommodation: 1500,
          transport: 800,
          food: 500,
          activities: 200,
        },
      }

      const updatedTrip = await tripService.update(
        { id: 'test-trip-1', budget: newBudget },
        'test-user-1'
      )

      expect(updatedTrip.budget).toEqual(newBudget)
    })

    it('should update trip settings', async () => {
      const newSettings = {
        currency: 'GBP',
        timezone: 'Europe/London',
        dateFormat: 'EU' as const,
        privacy: 'public' as const,
        notifications: {
          email: false,
          push: true,
          reminders: false,
        },
      }

      const updatedTrip = await tripService.update(
        { id: 'test-trip-1', settings: newSettings },
        'test-user-1'
      )

      expect(updatedTrip.settings).toEqual(newSettings)
    })

    it('should update multiple fields', async () => {
      const updatedTrip = await tripService.update(
        {
          id: 'test-trip-1',
          title: 'Multi-Update Trip',
          description: 'Updated description',
          status: 'active',
          tags: ['updated', 'multi-field'],
        },
        'test-user-1'
      )

      expect(updatedTrip.title).toBe('Multi-Update Trip')
      expect(updatedTrip.description).toBe('Updated description')
      expect(updatedTrip.status).toBe('active')
      expect(updatedTrip.tags).toEqual(['updated', 'multi-field'])
    })

    it('should throw error when trip not found', async () => {
      await expect(
        tripService.update({ id: 'non-existent', title: 'Test' }, 'test-user-1')
      ).rejects.toThrow('Trip not found or insufficient permissions')
    })

    it('should throw error when user is not owner', async () => {
      await expect(
        tripService.update({ id: 'test-trip-1', title: 'Unauthorized' }, 'unauthorized-user')
      ).rejects.toThrow('Trip not found or insufficient permissions')
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await createTestFixtures(testDb, 'trip')
    })

    it('should delete trip successfully', async () => {
      const result = await tripService.delete('test-trip-1', 'test-user-1')

      expect(result.success).toBe(true)

      // Verify trip is deleted
      const trip = await tripService.get('test-trip-1', 'test-user-1')
      expect(trip).toBeNull()
    })

    it('should throw error when trip not found', async () => {
      await expect(tripService.delete('non-existent', 'test-user-1')).rejects.toThrow(
        'Trip not found or insufficient permissions'
      )
    })

    it('should throw error when user is not owner', async () => {
      await expect(tripService.delete('test-trip-1', 'unauthorized-user')).rejects.toThrow(
        'Trip not found or insufficient permissions'
      )
    })
  })

  describe('getStats', () => {
    beforeEach(async () => {
      // Create trips with various statuses and types for stats testing
      const client = await testDb.pool.connect()

      try {
        await client.query(`
          INSERT INTO trips (id, title, destination, country, type, status, start_date, end_date, settings, user_id)
          VALUES 
            ('stats-trip-1', 'Future Leisure 1', 'Tokyo', 'Japan', 'leisure', 'planning', '2025-12-15T00:00:00Z', '2025-12-25T23:59:59Z', '{"currency": "USD", "timezone": "UTC", "dateFormat": "US", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'stats-user'),
            ('stats-trip-2', 'Future Leisure 2', 'Paris', 'France', 'leisure', 'upcoming', '2026-06-01T00:00:00Z', '2026-06-10T23:59:59Z', '{"currency": "EUR", "timezone": "Europe/Paris", "dateFormat": "EU", "privacy": "private", "notifications": {"email": true, "push": true, "reminders": true}}', 'stats-user'),
            ('stats-trip-3', 'Current Active', 'London', 'United Kingdom', 'business', 'active', '2024-01-01T00:00:00Z', '2025-12-31T23:59:59Z', '{"currency": "GBP", "timezone": "Europe/London", "dateFormat": "EU", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'stats-user'),
            ('stats-trip-4', 'Past Business', 'Berlin', 'Germany', 'business', 'completed', '2023-09-15T00:00:00Z', '2023-09-18T23:59:59Z', '{"currency": "EUR", "timezone": "Europe/Berlin", "dateFormat": "EU", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'stats-user'),
            ('stats-trip-5', 'Cancelled Trip', 'Rome', 'Italy', 'leisure', 'cancelled', '2024-12-01T00:00:00Z', '2024-12-10T23:59:59Z', '{"currency": "EUR", "timezone": "Europe/Rome", "dateFormat": "EU", "privacy": "private", "notifications": {"email": true, "push": false, "reminders": true}}', 'stats-user')
        `)
      } finally {
        client.release()
      }
    })

    it('should return correct trip statistics', async () => {
      const stats = await tripService.getStats('stats-user')

      expect(stats).toMatchObject({
        totalTrips: 5,
        upcomingTrips: 2, // Future trips that are not cancelled
        activeTrips: 1, // Currently active trip
        byStatus: {
          planning: 1,
          upcoming: 1,
          active: 1,
          completed: 1,
          cancelled: 1,
        },
        byType: {
          leisure: 3,
          business: 2,
        },
        byCountry: {
          Japan: 1,
          France: 1,
          'United Kingdom': 1,
          Germany: 1,
          Italy: 1,
        },
      })
    })

    it('should return zero stats for user with no trips', async () => {
      const stats = await tripService.getStats('user-with-no-trips')

      expect(stats).toMatchObject({
        totalTrips: 0,
        upcomingTrips: 0,
        activeTrips: 0,
        byStatus: {},
        byType: {},
        byCountry: {},
      })
    })
  })

  describe('error handling', () => {
    it('should handle database connection errors gracefully', async () => {
      // Create a fresh test database that we can close
      const errorTestDb = await createTestDatabase('error_test_', 'trip')
      const errorTripService = new TripService(errorTestDb.db)

      // Close the database connection to simulate error
      await errorTestDb.cleanup()

      await expect(
        errorTripService.create(
          {
            title: 'Test Trip',
            destination: 'Test',
            country: 'Test',
            type: 'leisure',
            startDate: '2024-01-01',
            endDate: '2024-01-07',
          },
          'test-user'
        )
      ).rejects.toThrow()
    })
  })
})
