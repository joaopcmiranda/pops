import { useState, useEffect, type ReactNode } from 'react'
import type { Trip } from '@/types/trip'
import { TripContext } from './TripContextDefinition'

interface TripProviderProps {
  children: ReactNode
}

// Demo trip for testing the layout improvements
const DEMO_TRIP: Trip = {
  id: 'demo-trip-1',
  title: 'Amazing Paris Adventure',
  destination: 'Paris, France',
  country: 'France',
  type: 'leisure',
  status: 'upcoming',
  startDate: '2025-03-15T00:00:00.000Z',
  endDate: '2025-03-22T00:00:00.000Z',
  userId: 'demo-user',
  createdAt: new Date(),
  updatedAt: new Date(),
  settings: {
    timezone: 'Europe/Paris',
    dateFormat: 'EU',
    currency: 'EUR',
    notifications: {
      email: true,
      push: true,
      reminders: true,
    },
    privacy: 'private',
  },
}

export function TripProvider({ children }: TripProviderProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(DEMO_TRIP) // Use demo trip for testing
  const [isSelectingTrip, setIsSelectingTrip] = useState(false) // Show dashboard immediately
  const [showNewTripModal, setShowNewTripModal] = useState(false)

  // Load saved trip from localStorage on mount
  useEffect(() => {
    const savedTripId = localStorage.getItem('currentTripId')
    if (savedTripId) {
      // TODO: Fetch trip details from API using savedTripId
      // For now, we'll let the user select from the trip selector
    }
  }, [])

  // Save current trip ID to localStorage when it changes
  useEffect(() => {
    if (currentTrip) {
      localStorage.setItem('currentTripId', currentTrip.id)
      setIsSelectingTrip(false)
    } else {
      localStorage.removeItem('currentTripId')
      setIsSelectingTrip(true)
    }
  }, [currentTrip])

  const value = {
    currentTrip,
    setCurrentTrip,
    isSelectingTrip,
    setIsSelectingTrip,
    showNewTripModal,
    setShowNewTripModal,
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
