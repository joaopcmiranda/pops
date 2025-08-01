import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  type: string
  status: string
  coverImage?: string
}

interface TripContextType {
  currentTrip: Trip | null
  setCurrentTrip: (trip: Trip | null) => void
  isSelectingTrip: boolean
  setIsSelectingTrip: (selecting: boolean) => void
  showNewTripModal: boolean
  setShowNewTripModal: (show: boolean) => void
}

const TripContext = createContext<TripContextType | undefined>(undefined)

export function useTripContext() {
  const context = useContext(TripContext)
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider')
  }
  return context
}

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

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}