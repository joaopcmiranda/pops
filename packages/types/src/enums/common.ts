// Common enums used across the application

export enum HealthStatus {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
}

export enum DateFormat {
  US = 'US',
  EU = 'EU',
  ISO = 'ISO',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum PrivacyLevel {
  PRIVATE = 'private',
  SHARED = 'shared',
  PUBLIC = 'public',
}

export enum CollaboratorRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
