// Itinerary-related enums

export enum ItemType {
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  ACTIVITY = 'activity',
  WORK = 'work',
  OVERARCHING_EVENT = 'overarching-event',
  OTHER = 'other',
}

export enum ItemStatus {
  PLANNED = 'planned',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ItemPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TransportationType {
  FLIGHT = 'flight',
  TRAIN = 'train',
  BUS = 'bus',
  CAR = 'car',
  BOAT = 'boat',
  OTHER = 'other',
}

export enum AccommodationType {
  HOTEL = 'hotel',
  HOSTEL = 'hostel',
  AIRBNB = 'airbnb',
  FRIEND = 'friend',
  FAMILY = 'family',
  CAMPING = 'camping',
  OTHER = 'other',
}

export enum ActivityType {
  SIGHTSEEING = 'sightseeing',
  LEISURE = 'leisure',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  FOOD = 'food',
  SHOPPING = 'shopping',
  WALKING_TOUR = 'walking-tour',
  PLANNING = 'planning',
  OTHER = 'other',
}

export enum WorkType {
  MEETING = 'meeting',
  CONFERENCE = 'conference',
  PRESENTATION = 'presentation',
  INTERVIEW = 'interview',
  OTHER = 'other',
}
