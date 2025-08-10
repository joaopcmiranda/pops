import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  createTestDatabase,
  createTestSchema,
  testTrips,
  testUsers,
  toDbFormat,
} from '@pops/test-utils'
import { TripService } from '../../src/services/trip-service.js'
import type { TestDatabase } from '@pops/test-utils'

describe('TripService', () => {
  let testDb: TestDatabase
  let tripService: TripService

  beforeEach(async () => {
    testDb = createTestDatabase('trip-service-')
    createTestSchema(testDb.db, 'trip')

    // Mock the database module to use our test database
    const dbModule = await import('../../src/db/index.js')
    // @ts-expect-error - Mocking for tests
    dbModule.db = testDb.db

    tripService = new TripService()
  })

  afterEach(() => {
    testDb.cleanup()
  })

  describe('create', () => {
    it('should create a new trip with default settings', async () => {
      const tripData = {
        title: 'Tokyo Adventure',
        description: 'Exploring Tokyo',
        destination: 'Tokyo',
        country: 'Japan',
        type: 'leisure' as const,
        startDate: '2024-03-15',
        endDate: '2024-03-25',
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
        startDate: '2024-06-01',
        endDate: '2024-06-10',
        settings: {
          currency: 'EUR',
          timezone: 'Europe/Paris',
          privacy: 'public' as const,
        },
      }

      const trip = await tripService.create(tripData, testUsers.alice.id)

      expect(trip.settings).toMatchObject({
        currency: 'EUR',
        timezone: 'Europe/Paris',
        privacy: 'public',
      })
    })

    it('should create a trip with budget and tags', async () => {
      const tripData = {
        title: 'Business Trip',
        destination: 'San Francisco',
        country: 'United States',
        type: 'business' as const,
        startDate: '2024-09-15',
        endDate: '2024-09-18',
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
  })

  describe('get', () => {
    beforeEach(async () => {
      // Insert test trip directly into database
      const tripData = toDbFormat({
        id: testTrips.tokyoTrip.id,
        title: testTrips.tokyoTrip.title,
        description: testTrips.tokyoTrip.description,
        destination: testTrips.tokyoTrip.destination,
        country: testTrips.tokyoTrip.country,
        type: testTrips.tokyoTrip.type,
        status: testTrips.tokyoTrip.status,
        startDate: new Date(testTrips.tokyoTrip.startDate),
        endDate: new Date(testTrips.tokyoTrip.endDate),
        budget: JSON.stringify({
          total: testTrips.tokyoTrip.budget,
          currency: testTrips.tokyoTrip.currency,
        }),
        settings: JSON.stringify({
          currency: 'USD',
          timezone: 'UTC',
          dateFormat: 'US',
          privacy: 'private',
        }),
        userId: testTrips.tokyoTrip.userId,
      })

      testDb.db
        .prepare(
          `
        INSERT INTO trips (
          id, title, description, destination, country, type, status, 
          startDate, endDate, budget, settings, userId, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
        )
        .run([
          tripData.id,
          tripData.title,
          tripData.description,
          tripData.destination,
          tripData.country,
          tripData.type,
          tripData.status,
          tripData.startDate.toISOString(),
          tripData.endDate.toISOString(),
          tripData.budget,
          tripData.settings,
          tripData.userId,
          tripData.createdAt,
          tripData.updatedAt,
        ])
    })

    it('should retrieve a trip by ID for the owner', async () => {
      const trip = await tripService.get(testTrips.tokyoTrip.id, testUsers.alice.id)

      expect(trip).not.toBeNull()
      expect(trip!.id).toBe(testTrips.tokyoTrip.id)
      expect(trip!.title).toBe(testTrips.tokyoTrip.title)
      expect(trip!.destination).toBe(testTrips.tokyoTrip.destination)
      expect(trip!.userId).toBe(testUsers.alice.id)
      expect(trip!.stats).toMatchObject({
        totalItems: 0,
        itemsByType: {},
        itemsByStatus: {},
        totalDays: expect.any(Number),
      })
    })

    it('should return null for non-existent trip', async () => {
      const trip = await tripService.get('non-existent-id', testUsers.alice.id)
      expect(trip).toBeNull()
    })

    it('should return null when user is not owner or collaborator', async () => {
      const trip = await tripService.get(testTrips.tokyoTrip.id, testUsers.bob.id)
      expect(trip).toBeNull()
    })
  })

  describe('list', () => {
    beforeEach(async () => {
      // Insert multiple test trips
      const trips = [
        {
          ...toDbFormat(testTrips.tokyoTrip),
          startDate: new Date(testTrips.tokyoTrip.startDate),
          endDate: new Date(testTrips.tokyoTrip.endDate),
          budget: JSON.stringify({
            total: testTrips.tokyoTrip.budget,
            currency: testTrips.tokyoTrip.currency,
          }),
          settings: JSON.stringify({
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            privacy: 'private',
          }),
        },
        {
          ...toDbFormat(testTrips.parisTrip),
          startDate: new Date(testTrips.parisTrip.startDate),
          endDate: new Date(testTrips.parisTrip.endDate),
          budget: JSON.stringify({
            total: testTrips.parisTrip.budget,
            currency: testTrips.parisTrip.currency,
          }),
          settings: JSON.stringify({
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            privacy: 'private',
          }),
        },
        {
          ...toDbFormat(testTrips.businessTrip),
          startDate: new Date(testTrips.businessTrip.startDate),
          endDate: new Date(testTrips.businessTrip.endDate),
          budget: JSON.stringify({
            total: testTrips.businessTrip.budget,
            currency: testTrips.businessTrip.currency,
          }),
          settings: JSON.stringify({
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            privacy: 'private',
          }),
        },
      ]

      for (const trip of trips) {
        testDb.db
          .prepare(
            `
          INSERT INTO trips (
            id, title, description, destination, country, type, status, 
            startDate, endDate, budget, settings, userId, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
          )
          .run([
            trip.id,
            trip.title,
            trip.description,
            trip.destination,
            trip.country,
            trip.type,
            trip.status,
            trip.startDate.toISOString(),
            trip.endDate.toISOString(),
            trip.budget,
            trip.settings,
            trip.userId,
            trip.createdAt,
            trip.updatedAt,
          ])
      }
    })

    it('should list all trips for a user', async () => {
      const trips = await tripService.list({}, testUsers.alice.id)

      expect(trips).toHaveLength(2) // Alice owns 2 trips
      expect(trips.map(t => t.title)).toContain('Tokyo Adventure')
      expect(trips.map(t => t.title)).toContain('Romantic Paris')
    })

    it('should filter trips by status', async () => {
      const trips = await tripService.list(
        { filters: { status: ['planning'] } },
        testUsers.alice.id
      )

      expect(trips).toHaveLength(1)
      expect(trips[0].title).toBe('Tokyo Adventure')
      expect(trips[0].status).toBe('planning')
    })

    it('should filter trips by type', async () => {
      const trips = await tripService.list({ filters: { type: ['leisure'] } }, testUsers.alice.id)

      expect(trips).toHaveLength(2)
      trips.forEach(trip => {
        expect(trip.type).toBe('leisure')
      })
    })

    it('should filter trips by destination', async () => {
      const trips = await tripService.list(
        { filters: { destination: 'Tokyo' } },
        testUsers.alice.id
      )

      expect(trips).toHaveLength(1)
      expect(trips[0].destination).toBe('Tokyo')
    })

    it('should sort trips by start date ascending', async () => {
      const trips = await tripService.list(
        { sortBy: 'startDate', sortOrder: 'asc' },
        testUsers.alice.id
      )

      expect(trips).toHaveLength(2)
      expect(new Date(trips[0].startDate).getTime()).toBeLessThan(
        new Date(trips[1].startDate).getTime()
      )
    })

    it('should sort trips by start date descending', async () => {
      const trips = await tripService.list(
        { sortBy: 'startDate', sortOrder: 'desc' },
        testUsers.alice.id
      )

      expect(trips).toHaveLength(2)
      expect(new Date(trips[0].startDate).getTime()).toBeGreaterThan(
        new Date(trips[1].startDate).getTime()
      )
    })

    it('should apply pagination', async () => {
      const tripsPage1 = await tripService.list({ limit: 1, offset: 0 }, testUsers.alice.id)

      const tripsPage2 = await tripService.list({ limit: 1, offset: 1 }, testUsers.alice.id)

      expect(tripsPage1).toHaveLength(1)
      expect(tripsPage2).toHaveLength(1)
      expect(tripsPage1[0].id).not.toBe(tripsPage2[0].id)
    })
  })

  describe('update', () => {
    beforeEach(async () => {
      // Insert test trip
      const tripData = toDbFormat({
        id: testTrips.tokyoTrip.id,
        title: testTrips.tokyoTrip.title,
        description: testTrips.tokyoTrip.description,
        destination: testTrips.tokyoTrip.destination,
        country: testTrips.tokyoTrip.country,
        type: testTrips.tokyoTrip.type,
        status: testTrips.tokyoTrip.status,
        startDate: new Date(testTrips.tokyoTrip.startDate),
        endDate: new Date(testTrips.tokyoTrip.endDate),
        budget: JSON.stringify({
          total: testTrips.tokyoTrip.budget,
          currency: testTrips.tokyoTrip.currency,
        }),
        settings: JSON.stringify({
          currency: 'USD',
          timezone: 'UTC',
          dateFormat: 'US',
          privacy: 'private',
        }),
        userId: testTrips.tokyoTrip.userId,
      })

      testDb.db
        .prepare(
          `
        INSERT INTO trips (
          id, title, description, destination, country, type, status, 
          startDate, endDate, budget, settings, userId, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
        )
        .run([
          tripData.id,
          tripData.title,
          tripData.description,
          tripData.destination,
          tripData.country,
          tripData.type,
          tripData.status,
          tripData.startDate.toISOString(),
          tripData.endDate.toISOString(),
          tripData.budget,
          tripData.settings,
          tripData.userId,
          tripData.createdAt,
          tripData.updatedAt,
        ])
    })

    it('should update trip title', async () => {
      const updatedTrip = await tripService.update(
        { id: testTrips.tokyoTrip.id, title: 'Updated Tokyo Trip' },
        testUsers.alice.id
      )

      expect(updatedTrip.title).toBe('Updated Tokyo Trip')
      expect(updatedTrip.id).toBe(testTrips.tokyoTrip.id)
    })

    it('should update trip status', async () => {
      const updatedTrip = await tripService.update(
        { id: testTrips.tokyoTrip.id, status: 'active' },
        testUsers.alice.id
      )

      expect(updatedTrip.status).toBe('active')
    })

    it('should update multiple fields', async () => {
      const updatedTrip = await tripService.update(
        {
          id: testTrips.tokyoTrip.id,
          title: 'Updated Tokyo Trip',
          description: 'Updated description',
          status: 'active',
        },
        testUsers.alice.id
      )

      expect(updatedTrip.title).toBe('Updated Tokyo Trip')
      expect(updatedTrip.description).toBe('Updated description')
      expect(updatedTrip.status).toBe('active')
    })

    it('should throw error when trip not found', async () => {
      await expect(
        tripService.update({ id: 'non-existent', title: 'Test' }, testUsers.alice.id)
      ).rejects.toThrow('Trip not found or insufficient permissions')
    })

    it('should throw error when user is not owner', async () => {
      await expect(
        tripService.update({ id: testTrips.tokyoTrip.id, title: 'Test' }, testUsers.bob.id)
      ).rejects.toThrow('Trip not found or insufficient permissions')
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      // Insert test trip
      const tripData = toDbFormat({
        id: testTrips.tokyoTrip.id,
        title: testTrips.tokyoTrip.title,
        description: testTrips.tokyoTrip.description,
        destination: testTrips.tokyoTrip.destination,
        country: testTrips.tokyoTrip.country,
        type: testTrips.tokyoTrip.type,
        status: testTrips.tokyoTrip.status,
        startDate: new Date(testTrips.tokyoTrip.startDate),
        endDate: new Date(testTrips.tokyoTrip.endDate),
        budget: JSON.stringify({
          total: testTrips.tokyoTrip.budget,
          currency: testTrips.tokyoTrip.currency,
        }),
        settings: JSON.stringify({
          currency: 'USD',
          timezone: 'UTC',
          dateFormat: 'US',
          privacy: 'private',
        }),
        userId: testTrips.tokyoTrip.userId,
      })

      testDb.db
        .prepare(
          `
        INSERT INTO trips (
          id, title, description, destination, country, type, status, 
          startDate, endDate, budget, settings, userId, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
        )
        .run([
          tripData.id,
          tripData.title,
          tripData.description,
          tripData.destination,
          tripData.country,
          tripData.type,
          tripData.status,
          tripData.startDate.toISOString(),
          tripData.endDate.toISOString(),
          tripData.budget,
          tripData.settings,
          tripData.userId,
          tripData.createdAt,
          tripData.updatedAt,
        ])
    })

    it('should delete trip successfully', async () => {
      const result = await tripService.delete(testTrips.tokyoTrip.id, testUsers.alice.id)

      expect(result.success).toBe(true)

      // Verify trip is deleted
      const trip = await tripService.get(testTrips.tokyoTrip.id, testUsers.alice.id)
      expect(trip).toBeNull()
    })

    it('should throw error when trip not found', async () => {
      await expect(tripService.delete('non-existent', testUsers.alice.id)).rejects.toThrow(
        'Trip not found or insufficient permissions'
      )
    })

    it('should throw error when user is not owner', async () => {
      await expect(tripService.delete(testTrips.tokyoTrip.id, testUsers.bob.id)).rejects.toThrow(
        'Trip not found or insufficient permissions'
      )
    })
  })

  describe('getStats', () => {
    beforeEach(async () => {
      // Insert multiple test trips with different statuses and types
      const trips = [
        {
          ...toDbFormat(testTrips.tokyoTrip),
          startDate: new Date('2024-03-15'),
          endDate: new Date('2024-03-25'),
          status: 'planning',
          type: 'leisure',
          country: 'Japan',
          budget: JSON.stringify({
            total: testTrips.tokyoTrip.budget,
            currency: testTrips.tokyoTrip.currency,
          }),
          settings: JSON.stringify({
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            privacy: 'private',
          }),
        },
        {
          ...toDbFormat(testTrips.parisTrip),
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-10'),
          status: 'upcoming',
          type: 'leisure',
          country: 'France',
          budget: JSON.stringify({
            total: testTrips.parisTrip.budget,
            currency: testTrips.parisTrip.currency,
          }),
          settings: JSON.stringify({
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'US',
            privacy: 'private',
          }),
        },
      ]

      for (const trip of trips) {
        testDb.db
          .prepare(
            `
          INSERT INTO trips (
            id, title, description, destination, country, type, status, 
            startDate, endDate, budget, settings, userId, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
          )
          .run([
            trip.id,
            trip.title,
            trip.description,
            trip.destination,
            trip.country,
            trip.type,
            trip.status,
            trip.startDate.toISOString(),
            trip.endDate.toISOString(),
            trip.budget,
            trip.settings,
            trip.userId,
            trip.createdAt,
            trip.updatedAt,
          ])
      }
    })

    it('should return correct trip statistics', async () => {
      const stats = await tripService.getStats(testUsers.alice.id)

      expect(stats).toMatchObject({
        totalTrips: 2,
        upcomingTrips: 2, // Both trips are in the future
        activeTrips: 0,
        byStatus: {
          planning: 1,
          upcoming: 1,
        },
        byType: {
          leisure: 2,
        },
        byCountry: {
          Japan: 1,
          France: 1,
        },
      })
    })

    it('should return zero stats for user with no trips', async () => {
      const stats = await tripService.getStats(testUsers.charlie.id)

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
})
