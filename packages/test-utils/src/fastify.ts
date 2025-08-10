import fastify from 'fastify'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export interface TestFastifyInstance extends FastifyInstance {
  cleanup: () => Promise<void>
}

/**
 * Creates a test Fastify instance with common configuration.
 * Automatically handles cleanup of resources.
 */
export async function createTestFastifyInstance(
  options: FastifyServerOptions = {}
): Promise<TestFastifyInstance> {
  const app = fastify({
    logger: false, // Disable logging in tests
    disableRequestLogging: true,
    ...options,
  })

  // Add cleanup method
  const testApp = app as unknown as TestFastifyInstance
  testApp.cleanup = async () => {
    await app.close()
  }

  return testApp
}

/**
 * Helper to create headers for authenticated requests.
 */
export function createAuthHeaders(userId: string): Record<string, string> {
  return {
    'x-user-id': userId,
    'content-type': 'application/json',
  }
}

/**
 * Helper to create JWT auth headers.
 */
export function createJWTHeaders(token: string): Record<string, string> {
  return {
    authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  }
}

/**
 * Common test response assertion helpers that work with any testing framework.
 * Import the global expect from your test framework before using these.
 */

declare global {
  // Allow expect to be undefined when not in test environment
  var expect: {
    (actual: unknown): {
      toBe: (expected: unknown) => void
      toHaveProperty: (property: string, value?: unknown) => void
    }
  }
}

export const assertions = {
  /**
   * Assert that a response has the expected success structure.
   */
  isSuccessResponse: (response: { statusCode: number; json: () => Record<string, unknown> }) => {
    expect(response.statusCode).toBe(200)
    expect(response.json()).toHaveProperty('success', true)
    expect(response.json()).toHaveProperty('data')
  },

  /**
   * Assert that a response has the expected error structure.
   */
  isErrorResponse: (
    response: { statusCode: number; json: () => Record<string, unknown> },
    expectedStatus = 500
  ) => {
    expect(response.statusCode).toBe(expectedStatus)
    expect(response.json()).toHaveProperty('success', false)
    expect(response.json()).toHaveProperty('error')
  },

  /**
   * Assert that a response indicates a resource was created.
   */
  isCreatedResponse: (response: { statusCode: number; json: () => Record<string, unknown> }) => {
    expect(response.statusCode).toBe(201)
    expect(response.json()).toHaveProperty('success', true)
    expect(response.json()).toHaveProperty('data')
  },

  /**
   * Assert that a response indicates a resource was not found.
   */
  isNotFoundResponse: (response: { statusCode: number; json: () => Record<string, unknown> }) => {
    expect(response.statusCode).toBe(404)
    expect(response.json()).toHaveProperty('success', false)
    expect(response.json()).toHaveProperty('error')
  },

  /**
   * Assert that a response indicates unauthorized access.
   */
  isUnauthorizedResponse: (response: {
    statusCode: number
    json: () => Record<string, unknown>
  }) => {
    expect(response.statusCode).toBe(401)
    expect(response.json()).toHaveProperty('success', false)
    expect(response.json()).toHaveProperty('error')
  },
}
