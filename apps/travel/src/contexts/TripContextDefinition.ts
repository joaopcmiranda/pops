import { createContext } from 'react'
import type { TripContextType } from '@/types/trip'

export const TripContext = createContext<TripContextType | undefined>(undefined)
