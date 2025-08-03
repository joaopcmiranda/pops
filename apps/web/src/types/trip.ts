export interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  type: string
  status: string
  coverImage?: string
}

export interface TripContextType {
  currentTrip: Trip | null
  setCurrentTrip: (trip: Trip | null) => void
  isSelectingTrip: boolean
  setIsSelectingTrip: (selecting: boolean) => void
  showNewTripModal: boolean
  setShowNewTripModal: (show: boolean) => void
}
