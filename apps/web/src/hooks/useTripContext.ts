import { useContext } from 'react'
import { TripContext } from '@/contexts/TripContextDefinition'

export function useTripContext() {
  const context = useContext(TripContext)
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider')
  }
  return context
}
