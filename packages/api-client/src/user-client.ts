import {
  type User,
  type Person,
  type Location,
  type CreateUserInput,
  type UpdateUserInput,
  type CreatePersonInput,
  type UpdatePersonInput,
  type CreateLocationInput,
  type UpdateLocationInput,
  userSchema,
  personSchema,
  locationSchema,
  createUserSchema,
  updateUserSchema,
  createPersonSchema,
  updatePersonSchema,
  createLocationSchema,
  updateLocationSchema,
} from '@pops/shared-contracts'
import { HttpClient } from './http-client.js'
import { z } from 'zod'

export class UserClient {
  constructor(private httpClient: HttpClient) {}

  // User operations
  async getUser(id: string): Promise<User | null> {
    try {
      return await this.httpClient.getValidated(`/users/${id}`, userSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return this.httpClient.postValidated('/users', input, createUserSchema, userSchema)
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/users/${id}`,
      updateData,
      updateUserSchema.omit({ id: true }),
      userSchema
    )
  }

  async deleteUser(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/users/${id}`)
  }

  // Person operations
  async listPeople(): Promise<Person[]> {
    return this.httpClient.getValidated('/people', z.array(personSchema))
  }

  async getPerson(id: string): Promise<Person | null> {
    try {
      return await this.httpClient.getValidated(`/people/${id}`, personSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async createPerson(input: CreatePersonInput): Promise<Person> {
    return this.httpClient.postValidated('/people', input, createPersonSchema, personSchema)
  }

  async updatePerson(input: UpdatePersonInput): Promise<Person> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/people/${id}`,
      updateData,
      updatePersonSchema.omit({ id: true }),
      personSchema
    )
  }

  async deletePerson(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/people/${id}`)
  }

  // Location operations
  async listLocations(): Promise<Location[]> {
    return this.httpClient.getValidated('/locations', z.array(locationSchema))
  }

  async getLocation(id: string): Promise<Location | null> {
    try {
      return await this.httpClient.getValidated(`/locations/${id}`, locationSchema)
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  }

  async createLocation(input: CreateLocationInput): Promise<Location> {
    return this.httpClient.postValidated('/locations', input, createLocationSchema, locationSchema)
  }

  async updateLocation(input: UpdateLocationInput): Promise<Location> {
    const { id, ...updateData } = input
    return this.httpClient.postValidated(
      `/locations/${id}`,
      updateData,
      updateLocationSchema.omit({ id: true }),
      locationSchema
    )
  }

  async deleteLocation(id: string): Promise<{ success: boolean }> {
    return this.httpClient.delete(`/locations/${id}`)
  }
}
