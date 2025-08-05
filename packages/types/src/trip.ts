// Trip-related types for multi-trip support

export type TripStatus = 'planning' | 'upcoming' | 'active' | 'completed' | 'cancelled'

export type TripType =
  | 'leisure'
  | 'business'
  | 'family'
  | 'adventure'
  | 'honeymoon'
  | 'solo'
  | 'group'
  | 'other'

export interface TripBudget {
  total?: number
  currency: string
  categories: {
    accommodation?: number
    transport?: number
    activities?: number
    food?: number
    shopping?: number
    other?: number
  }
  spent?: number
}

export interface TripSettings {
  timezone: string
  dateFormat: 'US' | 'EU' | 'ISO'
  currency: string
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
  }
  privacy: 'private' | 'shared' | 'public'
  collaborators?: string[] // User IDs who can edit
}

export interface Trip {
  id: string
  title: string
  description?: string
  destination: string
  country: string
  type: TripType
  status: TripStatus

  // Dates
  startDate: Date
  endDate: Date

  // Budget and settings
  budget?: TripBudget
  settings: TripSettings

  // Metadata
  coverImage?: string
  tags?: string[]
  isTemplate?: boolean
  templateId?: string // If created from template

  // Ownership and collaboration
  userId: string // Owner
  collaborators?: TripCollaborator[]

  // Timestamps
  createdAt: Date
  updatedAt: Date

  // Statistics (computed)
  stats?: TripStats
}

export interface TripCollaborator {
  id: string
  userId: string
  role: 'viewer' | 'editor' | 'admin'
  permissions: {
    canEdit: boolean
    canDelete: boolean
    canInvite: boolean
    canExport: boolean
  }
  invitedAt: Date
  acceptedAt?: Date
  invitedBy: string // User ID
}

export interface TripStats {
  totalItems: number
  itemsByType: Record<string, number>
  itemsByStatus: Record<string, number>
  totalDays: number
  budgetUtilization?: number // percentage
  completionRate?: number // percentage of completed items
  lastActivity: Date
}

export interface TripTemplate {
  id: string
  title: string
  description: string
  destination: string
  country: string
  type: TripType
  duration: number // days
  tags: string[]

  // Template data
  itineraryTemplate: string // JSON
  contentTemplate: string // JSON

  // Metadata
  createdBy: string
  isPublic: boolean
  usageCount: number
  rating?: number

  createdAt: Date
  updatedAt: Date
}

// Trip creation and update types
export interface CreateTripInput {
  title: string
  description?: string
  destination: string
  country: string
  type: TripType
  startDate: string // ISO date
  endDate: string // ISO date
  budget?: Omit<TripBudget, 'spent'>
  settings?: Partial<TripSettings>
  coverImage?: string
  tags?: string[]
  templateId?: string
}

export interface UpdateTripInput extends Partial<CreateTripInput> {
  id: string
  status?: TripStatus
}

// Trip filters and search
export interface TripFilters {
  status?: TripStatus[]
  type?: TripType[]
  destination?: string
  country?: string
  dateRange?: {
    start: Date
    end: Date
  }
  tags?: string[]
  collaborator?: boolean // Only trips where user is collaborator
}

export interface TripSearchInput {
  query?: string
  filters?: TripFilters
  sortBy?: 'title' | 'startDate' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}
