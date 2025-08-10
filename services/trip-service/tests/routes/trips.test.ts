import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  createTestFastifyInstance,
  createAuthHeaders,
  assertions,
  createTestDatabase,
  createTestSchema,
  testTrips,
  testUsers,
  toDbFormat,
} from '@pops/test-utils'
import type { TestFastifyInstance, TestDatabase } from '@pops/test-utils'
import { tripRoutes } from '../../src/routes/trips.js'

describe('Trip Routes', () => {
  let app: TestFastifyInstance
  let testDb: TestDatabase

  beforeEach(async () => {
    testDb = createTestDatabase('trip-routes-')
    createTestSchema(testDb.db, 'trip')

    // Mock the database module
    const dbModule = await import('../../src/db/index.js')
    // @ts-expect-error - Mocking for tests
    dbModule.db = testDb.db

    app = await createTestFastifyInstance()
    await app.register(tripRoutes)
    await app.ready()
  })

  afterEach(async () => {
    await app.cleanup()
    testDb.cleanup()
  })

  describe('POST /trips', () => {
    it('should create a new trip successfully', async () => {
      const tripData = {
        title: 'Test Trip',
        description: 'A test trip description',
        destination: 'Tokyo',
        country: 'Japan',
        type: 'leisure',
        startDate: '2024-03-15',
        endDate: '2024-03-25',
      }

      const response = await app.inject({
        method: 'POST',
        url: '/trips',
        headers: createAuthHeaders(testUsers.alice.id),
        payload: tripData,
      })

      assertions.isCreatedResponse(response)
      const data = response.json().data

      expect(data).toMatchObject({
        title: tripData.title,
        description: tripData.description,
        destination: tripData.destination,
        country: tripData.country,
        type: tripData.type,
        userId: testUsers.alice.id,
      })
      expect(data.id).toBeDefined()
      expect(data.settings).toMatchObject({
        currency: 'USD',
        timezone: 'UTC',
      })
    })

    it('should create trip with budget and tags', async () => {
      const tripData = {
        title: 'Business Trip',
        destination: 'San Francisco',
        country: 'United States',
        type: 'business',
        startDate: '2024-09-15',
        endDate: '2024-09-18',
        budget: {
          total: 5000,
          currency: 'USD',
          categories: {
            accommodation: 2000,
            transport: 1500,
          },
        },
        tags: ['business', 'technology'],
      }

      const response = await app.inject({
        method: 'POST',
        url: '/trips',
        headers: createAuthHeaders(testUsers.alice.id),
        payload: tripData,
      })

      assertions.isCreatedResponse(response)
      const data = response.json().data

      expect(data.budget).toEqual(tripData.budget)
      expect(data.tags).toEqual(tripData.tags)
    })

    it('should return 401 without user ID header', async () => {
      const tripData = {
        title: 'Test Trip',
        destination: 'Tokyo',
        country: 'Japan',
        type: 'leisure',
        startDate: '2024-03-15',
        endDate: '2024-03-25',
      }

      const response = await app.inject({
        method: 'POST',
        url: '/trips',
        headers: { 'content-type': 'application/json' },
        payload: tripData,
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('GET /trips/:id', () => {
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

    it('should get trip by ID for owner', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toMatchObject({
        id: testTrips.tokyoTrip.id,
        title: testTrips.tokyoTrip.title,
        destination: testTrips.tokyoTrip.destination,
        userId: testUsers.alice.id,
      })
      expect(data.stats).toMatchObject({
        totalItems: expect.any(Number),
        totalDays: expect.any(Number),
      })
    })

    it('should return 404 for non-existent trip', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips/non-existent-id',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isNotFoundResponse(response)
    })

    it('should return 404 when user is not owner', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.bob.id),
      })

      assertions.isNotFoundResponse(response)
    })

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/trips/${testTrips.tokyoTrip.id}`,
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('GET /trips', () => {
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

    it('should list all trips for user', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(2)
      expect(data.map((t: any) => t.title)).toContain('Tokyo Adventure')
      expect(data.map((t: any) => t.title)).toContain('Romantic Paris')
    })

    it('should filter trips by status', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips?filters.status=planning',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(1)
      expect(data[0].status).toBe('planning')
    })

    it('should filter trips by type', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips?filters.type=leisure',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(2)
      data.forEach((trip: any) => {
        expect(trip.type).toBe('leisure')
      })
    })

    it('should filter trips by destination', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips?filters.destination=Tokyo',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(1)
      expect(data[0].destination).toBe('Tokyo')
    })

    it('should sort trips by start date', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips?sortBy=startDate&sortOrder=asc',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(2)
      expect(new Date(data[0].startDate).getTime()).toBeLessThan(
        new Date(data[1].startDate).getTime()
      )
    })

    it('should apply pagination', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips?limit=1&offset=0',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toHaveLength(1)
    })

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips',
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('PUT /trips/:id', () => {
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

    it('should update trip successfully', async () => {
      const updateData = {
        title: 'Updated Tokyo Trip',
        description: 'Updated description',
        status: 'active',
      }

      const response = await app.inject({
        method: 'PUT',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.alice.id),
        payload: updateData,
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data.title).toBe(updateData.title)
      expect(data.description).toBe(updateData.description)
      expect(data.status).toBe(updateData.status)
    })

    it('should return 404 for non-existent trip', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/trips/non-existent-id',
        headers: createAuthHeaders(testUsers.alice.id),
        payload: { title: 'Test' },
      })

      expect(response.statusCode).toBe(404)
      assertions.isErrorResponse(response, 404)
    })

    it('should return 404 when user is not owner', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.bob.id),
        payload: { title: 'Test' },
      })

      expect(response.statusCode).toBe(404)
      assertions.isErrorResponse(response, 404)
    })

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        payload: { title: 'Test' },
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('DELETE /trips/:id', () => {
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
      const response = await app.inject({
        method: 'DELETE',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      expect(response.json().data.success).toBe(true)
    })

    it('should return 404 for non-existent trip', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/trips/non-existent-id',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      expect(response.statusCode).toBe(404)
      assertions.isErrorResponse(response, 404)
    })

    it('should return 404 when user is not owner', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/trips/${testTrips.tokyoTrip.id}`,
        headers: createAuthHeaders(testUsers.bob.id),
      })

      expect(response.statusCode).toBe(404)
      assertions.isErrorResponse(response, 404)
    })

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/trips/${testTrips.tokyoTrip.id}`,
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('GET /trips/stats', () => {
    beforeEach(async () => {
      // Insert test trips with different statuses
      const trips = [
        {
          ...toDbFormat(testTrips.tokyoTrip),
          startDate: new Date('2024-03-15'),
          endDate: new Date('2024-03-25'),
          status: 'planning',
          type: 'leisure',
          country: 'Japan',
          budget: JSON.stringify({ total: 3000, currency: 'USD' }),
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
          budget: JSON.stringify({ total: 2500, currency: 'EUR' }),
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

    it('should return trip statistics', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips/stats',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toMatchObject({
        totalTrips: 2,
        upcomingTrips: 2,
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

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/trips/stats',
      })

      assertions.isUnauthorizedResponse(response)
    })
  })

  describe('GET /dashboard/summary', () => {
    beforeEach(async () => {
      // Insert test trips
      const trips = [
        {
          ...toDbFormat(testTrips.tokyoTrip),
          startDate: new Date('2024-12-15'), // Future date
          endDate: new Date('2024-12-25'),
          status: 'upcoming',
          type: 'leisure',
          country: 'Japan',
          budget: JSON.stringify({ total: 3000, currency: 'USD' }),
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

    it('should return dashboard summary', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/dashboard/summary',
        headers: createAuthHeaders(testUsers.alice.id),
      })

      assertions.isSuccessResponse(response)
      const data = response.json().data

      expect(data).toMatchObject({
        totalTrips: expect.any(Number),
        upcomingTrips: expect.any(Number),
        totalSpent: expect.any(Number),
        averageTripCost: expect.any(Number),
      })

      if (data.nextTrip) {
        expect(data.nextTrip).toMatchObject({
          id: expect.any(String),
          destination: expect.any(String),
          startDate: expect.any(String),
          endDate: expect.any(String),
          daysUntil: expect.any(Number),
        })
      }
    })

    it('should return 401 without user ID header', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/dashboard/summary',
      })

      assertions.isUnauthorizedResponse(response)
    })
  })
})
