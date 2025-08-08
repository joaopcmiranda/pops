/**
 * @fileoverview Quick Stats Component
 *
 * Displays key metrics and statistics from across all POps applications
 * in a compact grid format.
 */

import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react'
import { useAppSuite } from '@pops/navigation'
import { useCrossDomainData } from '@pops/widgets'
import { cn } from '@pops/ui'

interface QuickStatsProps {
  className?: string
}

interface StatsData {
  totalTrips: number
  upcomingTrips: number
  totalSpent: number
  activeProjects: number
}

export function QuickStats({ className }: QuickStatsProps) {
  const { appStatuses } = useAppSuite()

  // Fetch stats from travel app (other apps will be added later)
  const { data: travelStats, loading } = useCrossDomainData<StatsData>({
    app: 'travel',
    endpoint: '/api/dashboard/quick-stats',
    refreshInterval: 600000, // 10 minutes
    enabled: appStatuses.travel?.status === 'online',
    initialData: {
      totalTrips: 0,
      upcomingTrips: 0,
      totalSpent: 0,
      activeProjects: 0,
    },
  })

  const stats = [
    {
      label: 'Total Trips',
      value: travelStats?.totalTrips || 0,
      icon: Calendar,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Upcoming',
      value: travelStats?.upcomingTrips || 0,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Total Spent',
      value: `$${(travelStats?.totalSpent || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Active Projects',
      value: travelStats?.activeProjects || 0,
      icon: Users,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  return (
    <div className={cn('quick-stats', className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <div key={index} className='stat-card'>
            <div
              className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3',
                stat.bgColor
              )}
            >
              <Icon className={cn('h-6 w-6', stat.color)} />
            </div>

            <div className='stat-value'>
              {loading ? <div className='loading-spinner mx-auto' /> : stat.value}
            </div>

            <div className='stat-label'>{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
