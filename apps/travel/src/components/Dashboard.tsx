import { useState, useEffect } from 'react'
import {
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  Target,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { Card, CardContent, Button, SkeletonCard } from '@pops/ui'
import { ContentService } from '@/services/contentService'
import { ItineraryService } from '@/services/itineraryService'
import { ErrorScreen } from '@/components/ErrorScreen'
import type { ItineraryItem } from '@/types/itinerary'

interface DashboardProps {
  onCategorySelect: (category: string) => void
}

export function Dashboard({ onCategorySelect }: DashboardProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryMetadata, setCategoryMetadata] = useState<Record<string, number>>({})
  const [upcomingItems, setUpcomingItems] = useState<ItineraryItem[]>([])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load category metadata
      const metadata = ContentService.getCategorySummary()
      setCategoryMetadata(metadata)

      // Load upcoming items
      const allItems = ItineraryService.getAllItems()
      const upcoming = allItems
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5)
      setUpcomingItems(upcoming)

      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setError('Failed to load dashboard data')
      setLoading(false)
      // TODO: Replace with Sonner toast
      console.error('Loading Error: Unable to load your trip data. Please try refreshing the page.')
    }
  }

  useEffect(() => {
    // Simulate loading delay for demonstration
    setTimeout(loadDashboardData, 200)
  }, [])

  const handleRetry = () => {
    loadDashboardData()
  }

  if (error) {
    return (
      <ErrorScreen
        type='loading'
        title='Dashboard Loading Error'
        description={error}
        onRetry={handleRetry}
        showHome={false}
      />
    )
  }

  const quickStats = [
    {
      icon: MapPin,
      label: 'Destinations',
      value: (categoryMetadata.destinations || 0).toString(),
      change: '+2',
      color: 'text-blue-600',
    },
    {
      icon: Clock,
      label: 'Itinerary Items',
      value: (categoryMetadata.itinerary || 0).toString(),
      change: '+3',
      color: 'text-green-600',
    },
    {
      icon: DollarSign,
      label: 'Budget Items',
      value: (categoryMetadata.budget || 0).toString(),
      change: '+$320',
      color: 'text-yellow-600',
    },
    {
      icon: Target,
      label: 'Activities',
      value: (categoryMetadata.activities || 0).toString(),
      change: '+5',
      color: 'text-purple-600',
    },
  ]

  return (
    <main className='app-content animate-fade-in mobile-scroll'>
      {/* Welcome Section */}
      <div style={{ marginBottom: '2rem' }} className='animate-fade-in-up'>
        <h1
          className='mobile-title'
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '0.5rem',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Welcome back! ✈️
        </h1>

        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Your adventure is taking shape. Here's your trip overview.
        </p>
      </div>

      {/* Quick Stats */}
      <div
        className='app-grid'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(0.75rem, 2vw, 1rem)',
          marginBottom: '2rem',
        }}
      >
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card
              key={index}
              style={{ padding: '1.5rem' }}
              className={`card-hover animate-fade-in stagger-${index + 1}`}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#10b981',
                      marginTop: '0.25rem',
                      margin: 0,
                    }}
                  >
                    {stat.change} this week
                  </p>
                </div>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className='icon-bounce'
                >
                  <IconComponent style={{ width: '24px', height: '24px', color: '#64748b' }} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* What's Next Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(1rem, 3vw, 2rem)',
          marginBottom: '2rem',
        }}
        className='lg:!grid-cols-[2fr_1fr]'
      >
        {/* Upcoming Items */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#0f172a',
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              What's Next
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                variant='default'
                className='button-hover button-premium button-entrance'
                onClick={() => onCategorySelect('itinerary')}
              >
                <Calendar style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                View Itinerary
              </Button>
            </div>
          </div>

          {loading ? (
            <div className='space-y-3'>
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <SkeletonCard />
                </Card>
              ))}
            </div>
          ) : upcomingItems.length > 0 ? (
            <div className='space-y-3'>
              {upcomingItems.map((item, index) => (
                <Card
                  key={item.id}
                  className={`card-hover animate-fade-in-up stagger-${index + 1}`}
                >
                  <CardContent style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor:
                            item.type === 'event'
                              ? '#ef4444'
                              : item.type === 'accommodation'
                                ? '#f97316'
                                : '#3b82f6',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#0f172a',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                          {new Date(item.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <ArrowRight style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card style={{ textAlign: 'center', padding: '3rem' }}>
              <CardContent>
                <Calendar
                  style={{ width: '48px', height: '48px', color: '#94a3b8', margin: '0 auto 1rem' }}
                />
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
                  No upcoming events
                </h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                  Start planning your trip by adding events to your itinerary.
                </p>
                <Button
                  className='button-hover button-premium button-entrance'
                  onClick={() => onCategorySelect('itinerary')}
                >
                  <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                  Add Your First Event
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <Card
              className='card-hover cursor-pointer'
              onClick={() => onCategorySelect('destinations')}
            >
              <CardContent style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      Explore Destinations
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      {categoryMetadata.destinations || 0} saved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className='card-hover cursor-pointer'
              onClick={() => onCategorySelect('calendar')}
            >
              <CardContent style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      View Calendar
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      Full trip timeline
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='card-hover cursor-pointer' onClick={() => onCategorySelect('budget')}>
              <CardContent style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <DollarSign style={{ width: '20px', height: '20px', color: '#eab308' }} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      Manage Budget
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      Track expenses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className='card-hover cursor-pointer'
              onClick={() => onCategorySelect('documents')}
            >
              <CardContent style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      Travel Documents
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      Keep organized
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
