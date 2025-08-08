/**
 * @fileoverview Travel Summary Widget
 *
 * Displays summary information about upcoming trips and travel statistics
 * from the travel POps application.
 */

import React from 'react'
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react'
import { WidgetContainer } from '../../components/WidgetContainer'
import { useCrossDomainData } from '../../hooks'
import type { WidgetProps } from '../../types'

/**
 * Travel summary data interface
 */
interface TravelSummaryData {
  nextTrip?: {
    id: string
    destination: string
    startDate: string
    endDate: string
    daysUntil: number
  }
  totalTrips: number
  upcomingTrips: number
  totalSpent: number
  averageTripCost: number
}

/**
 * Travel Summary Widget Component
 *
 * Shows key travel statistics and information about upcoming trips.
 * Fetches data from the travel POps application.
 *
 * @param props - Widget props
 * @returns JSX element
 */
export function TravelSummaryWidget({ config, onRefresh, onRemove }: WidgetProps) {
  const { data, loading, error, refresh } = useCrossDomainData<TravelSummaryData>({
    app: 'travel',
    endpoint: '/api/dashboard/summary',
    refreshInterval: config.refreshInterval || 300000, // 5 minutes
    enabled: true,
  })

  const handleRefresh = async () => {
    await refresh()
    onRefresh?.()
  }

  return (
    <WidgetContainer
      title={config.title || 'Travel Summary'}
      icon={<MapPin className='h-4 w-4 text-blue-500' />}
      loading={loading}
      error={error}
      refreshable={true}
      removable={config.removable}
      onRefresh={handleRefresh}
      onRemove={onRemove}
      size={config.size?.w === 1 ? 'small' : 'medium'}
    >
      {data && (
        <div className='space-y-4'>
          {/* Next Trip */}
          {data.nextTrip && (
            <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                <span className='text-sm font-medium text-blue-800 dark:text-blue-200'>
                  Next Trip
                </span>
              </div>
              <div className='space-y-1'>
                <p className='font-semibold text-gray-900 dark:text-gray-100'>
                  {data.nextTrip.destination}
                </p>
                <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span>{data.nextTrip.daysUntil} days</span>
                  </div>
                  <span>{new Date(data.nextTrip.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Grid */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='text-center p-2'>
              <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {data.totalTrips}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Total Trips</p>
            </div>

            <div className='text-center p-2'>
              <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                {data.upcomingTrips}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Upcoming</p>
            </div>

            <div className='text-center p-2'>
              <div className='flex items-center justify-center gap-1'>
                <DollarSign className='h-4 w-4 text-green-600 dark:text-green-400' />
                <p className='text-lg font-bold text-green-600 dark:text-green-400'>
                  {data.totalSpent.toLocaleString()}
                </p>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Total Spent</p>
            </div>

            <div className='text-center p-2'>
              <div className='flex items-center justify-center gap-1'>
                <DollarSign className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                  {data.averageTripCost.toLocaleString()}
                </p>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Average Cost</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !data && (
        <div className='flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400'>
          <div className='text-center'>
            <MapPin className='h-8 w-8 mx-auto mb-2 opacity-50' />
            <p className='text-sm'>No travel data available</p>
          </div>
        </div>
      )}
    </WidgetContainer>
  )
}
