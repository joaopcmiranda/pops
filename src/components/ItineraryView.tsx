import { useState, useEffect } from 'react'
import { Plus, Calendar, MapPin, Users, Clock, Tag, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ItineraryService } from '@/services/itineraryService'
import type { ItineraryDay, ItemType } from '@/types/itinerary'

export function ItineraryView() {
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([])
  // const [selectedFilters, setSelectedFilters] = useState<ItemType[]>([])
  const [stats, setStats] = useState(ItineraryService.getStats())

  useEffect(() => {
    const days = ItineraryService.getItemsByDay()
    setItineraryDays(days)
    setStats(ItineraryService.getStats())
  }, [])

  const getItemTypeColor = (type: ItemType) => {
    const colors = {
      accommodation: 'bg-orange-500',
      event: 'bg-red-500',
      work: 'bg-blue-500',
      activity: 'bg-green-500',
      transport: 'bg-purple-500',
      'overarching-event': 'bg-yellow-500',
    }
    return colors[type] || 'bg-gray-500'
  }

  const getItemTypeIcon = (type: ItemType) => {
    switch (type) {
      case 'accommodation':
        return '🏠'
      case 'event':
        return '🎉'
      case 'work':
        return '💼'
      case 'activity':
        return '🎯'
      case 'transport':
        return '✈️'
      case 'overarching-event':
        return '🎪'
      default:
        return '📅'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className='app-content animate-fade-in page-enter'>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Trip Itinerary
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            {stats.totalItems} items planned • {stats.timeSpan.totalDays} days total
          </p>
        </div>

        <Button>
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Add Item
        </Button>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {Object.entries(stats.byType).map(([type, count]) => (
          <Card key={type} style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                className={`${getItemTypeColor(type as ItemType)}`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                {getItemTypeIcon(type as ItemType)}
              </div>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                  {count}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    margin: 0,
                    textTransform: 'capitalize',
                  }}
                >
                  {type.replace('-', ' ')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      {itineraryDays.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <CardContent>
            <Calendar
              style={{
                width: '48px',
                height: '48px',
                color: '#94a3b8',
                margin: '0 auto 1rem',
              }}
            />
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.5rem',
              }}
            >
              No itinerary items yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Start planning your Brazilian adventure by adding your first item.
            </p>
            <Button>
              <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {itineraryDays.map(day => (
            <div key={day.date.toISOString()}>
              {/* Day Header */}
              <div
                style={{
                  position: 'sticky',
                  top: '80px',
                  backgroundColor: '#f8fafc',
                  padding: '1rem 0',
                  borderBottom: '2px solid #e2e8f0',
                  marginBottom: '1rem',
                  zIndex: 10,
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
                  {formatDate(day.date)}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
                  {day.items.length} {day.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Day Items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  paddingLeft: '1rem',
                }}
              >
                {day.items.map(item => (
                  <Card key={item.id} className='category-card'>
                    <CardHeader style={{ paddingBottom: '12px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}
                        >
                          <div
                            className={`${getItemTypeColor(item.type)}`}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.9rem',
                              flexShrink: 0,
                            }}
                          >
                            {getItemTypeIcon(item.type)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <CardTitle style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                              {item.title}
                            </CardTitle>
                            {!item.isAllDay && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                <Clock
                                  style={{ width: '14px', height: '14px', color: '#64748b' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {formatTime(item.startDate)}
                                  {item.endDate && ` - ${formatTime(item.endDate)}`}
                                </span>
                              </div>
                            )}
                            {item.location && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                <MapPin
                                  style={{ width: '14px', height: '14px', color: '#64748b' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {item.location.name}, {item.location.city}
                                </span>
                              </div>
                            )}
                            {item.attendees && item.attendees.length > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users
                                  style={{ width: '14px', height: '14px', color: '#64748b' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {item.attendees.map(p => p.name).join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              backgroundColor: item.status === 'confirmed' ? '#dcfce7' : '#f1f5f9',
                              color: item.status === 'confirmed' ? '#166534' : '#64748b',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              textTransform: 'capitalize',
                            }}
                          >
                            {item.status}
                          </span>
                          <Button variant='ghost' style={{ padding: '0.25rem' }}>
                            <MoreHorizontal style={{ width: '16px', height: '16px' }} />
                          </Button>
                        </div>
                      </div>

                      {item.description && (
                        <CardDescription style={{ marginTop: '0.5rem' }}>
                          {item.description}
                        </CardDescription>
                      )}

                      {item.tags && item.tags.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          <Tag style={{ width: '14px', height: '14px', color: '#64748b' }} />
                          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                            {item.tags.map(tag => (
                              <span
                                key={tag}
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  color: '#64748b',
                                  padding: '2px 6px',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
