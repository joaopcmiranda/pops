import { useState, useEffect, type ReactNode } from 'react'
import type { Trip } from '@/types/trip'
import { TripContext } from './TripContextDefinition'

interface TripProviderProps {
  children: ReactNode
}

export function TripProvider({ children }: TripProviderProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
  const [isSelectingTrip, setIsSelectingTrip] = useState(true)
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
