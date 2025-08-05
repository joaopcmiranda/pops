import type { SuccessResponse, ErrorResponse } from '@pops/shared-contracts'
import { z } from 'zod'

export interface HttpClientConfig {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
}

export class HttpClientError extends Error {
  constructor(
    public override message: string,
    public status: number,
    public response?: ErrorResponse
  ) {
    super(message)
    Object.setPrototypeOf(this, HttpClientError.prototype)
  }
}

export class HttpClient {
  private baseUrl: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.timeout = config.timeout ?? 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const requestHeaders = { ...this.defaultHeaders, ...headers }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: data ? JSON.stringify(data) : null,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseData: unknown = await response.json()

      if (!response.ok) {
        const errorResponse = responseData as ErrorResponse
        throw new HttpClientError(
          errorResponse.error || `HTTP ${response.status}`,
          response.status,
          errorResponse
        )
      }

      // If it's a success response, extract the data
      if (
        typeof responseData === 'object' &&
        responseData !== null &&
        'success' in responseData &&
        responseData.success === true
      ) {
        const successResponse = responseData as SuccessResponse<T>
        return successResponse.data
      }

      // Otherwise assume the response data is the actual data
      return responseData as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof HttpClientError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new HttpClientError('Request timeout', 408)
        }
        throw new HttpClientError(error.message, 0)
      }

      throw new HttpClientError('Unknown error occurred', 0)
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, headers)
  }

  async post<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('POST', endpoint, data, headers)
  }

  async put<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('PUT', endpoint, data, headers)
  }

  async patch<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, headers)
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, headers)
  }

  // Helper method to validate response with Zod schema
  async getValidated<T>(
    endpoint: string,
    schema: z.ZodSchema<T>,
    headers?: Record<string, string>
  ): Promise<T> {
    const data = await this.get(endpoint, headers)
    return schema.parse(data)
  }

  async postValidated<TInput, TOutput>(
    endpoint: string,
    data: TInput,
    inputSchema: z.ZodSchema<TInput>,
    outputSchema: z.ZodSchema<TOutput>,
    headers?: Record<string, string>
  ): Promise<TOutput> {
    const validatedInput = inputSchema.parse(data)
    const response = await this.post(endpoint, validatedInput, headers)
    return outputSchema.parse(response)
  }

  // Method to set authorization header
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  // Method to set user ID header (for current API compatibility)
  setUserId(userId: string): void {
    this.defaultHeaders['x-user-id'] = userId
  }

  // Method to remove authorization
  clearAuth(): void {
    delete this.defaultHeaders['Authorization']
    delete this.defaultHeaders['x-user-id']
  }
}
