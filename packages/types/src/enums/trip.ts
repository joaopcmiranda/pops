// Trip-related enums

export enum TripType {
  LEISURE = 'leisure',
  BUSINESS = 'business',
  FAMILY = 'family',
  ADVENTURE = 'adventure',
  HONEYMOON = 'honeymoon',
  SOLO = 'solo',
  GROUP = 'group',
  OTHER = 'other',
}

export enum TripStatus {
  PLANNING = 'planning',
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TripSortBy {
  TITLE = 'title',
  START_DATE = 'startDate',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
