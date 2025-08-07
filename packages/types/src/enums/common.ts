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

export enum LocationType {
  ACCOMMODATION = 'accommodation',
  VENUE = 'venue',
  WORKPLACE = 'workplace',
  TOURIST_SPOT = 'tourist-spot',
  RESTAURANT = 'restaurant',
  OTHER = 'other',
}

export enum RelationshipType {
  FAMILY = 'family',
  FRIEND = 'friend',
  COLLEAGUE = 'colleague',
  CONTACT = 'contact',
}
