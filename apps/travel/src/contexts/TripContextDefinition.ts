import { createContext } from 'react'
import type { Trip } from '@pops/types'

export interface TripContextType {
  currentTrip: Trip | null
  setCurrentTrip: (trip: Trip | null) => void
  isSelectingTrip: boolean
  setIsSelectingTrip: (selecting: boolean) => void
  showNewTripModal: boolean
  setShowNewTripModal: (show: boolean) => void
}

export const TripContext = createContext<TripContextType | undefined>(undefined)
