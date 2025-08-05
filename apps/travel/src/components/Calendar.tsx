import { useState, useEffect, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Calendar as CalendarIcon,
  Filter,
  Plus,
} from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button/button'
import { ItineraryService } from '@/services/itineraryService'
import type { ItineraryItem, ItemType } from '@/types/itinerary'

interface CalendarProps {
  onEventClick?: (event: ItineraryItem) => void
  onAddEvent?: (date: Date) => void
}

interface CalendarDay {
  date: Date
  events: ItineraryItem[]
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({ onEventClick, onAddEvent }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<ItineraryItem[]>([])
  const [filteredTypes, setFilteredTypes] = useState<ItemType[]>([])
  const [loading, setLoading] = useState(true)

  // Load events from service
  useEffect(() => {
    try {
      setLoading(true)
      const allEvents = ItineraryService.getAllItems()
      setEvents(allEvents)
    } catch (error) {
      console.error('Error loading calendar events:', error)
      // TODO: Replace with Sonner toast
      console.error('Calendar Error: Unable to load your itinerary events')
    } finally {
      setLoading(false)
    }
  }, [])

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Start from the first Sunday of the calendar view
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    // End at the last Saturday of the calendar view
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const currentCalendarDate = new Date(date)
      const isCurrentMonth = currentCalendarDate.getMonth() === month
      const isToday = currentCalendarDate.getTime() === today.getTime()
      const isSelected = selectedDate?.toDateString() === currentCalendarDate.toDateString()

      // Filter events for this day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.startDate)
        eventDate.setHours(0, 0, 0, 0)

        // Apply type filter
        if (filteredTypes.length > 0 && !filteredTypes.includes(event.type)) {
          return false
        }

        return eventDate.getTime() === currentCalendarDate.getTime()
      })

      days.push({
        date: new Date(currentCalendarDate),
        events: dayEvents,
        isCurrentMonth,
        isToday,
        isSelected,
      })
    }

    return days
  }, [currentDate, events, selectedDate, filteredTypes])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDate(day.date)
    if (onAddEvent && day.events.length === 0) {
      // If no events on this day, show option to add
      onAddEvent(day.date)
    }
  }

  const getEventTypeColor = (type: ItemType): string => {
    const colors = {
      accommodation: 'bg-blue-500',
      event: 'bg-purple-500',
      work: 'bg-green-500',
      activity: 'bg-yellow-500',
      transport: 'bg-gray-500',
      'overarching-event': 'bg-red-500',
    }
    return colors[type] || 'bg-gray-400'
  }

  const toggleTypeFilter = (type: ItemType) => {
    setFilteredTypes(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]))
  }

  const eventTypes: ItemType[] = [
    'accommodation',
    'event',
    'work',
    'activity',
    'transport',
    'overarching-event',
  ]
  const eventCounts = eventTypes.reduce(
    (acc, type) => {
      acc[type] = events.filter(e => e.type === type).length
      return acc
    },
    {} as Record<ItemType, number>
  )

  if (loading) {
    return (
      <div className='animate-fade-in'>
        <Card style={{ padding: '2rem', textAlign: 'center' }}>
          <div className='animate-pulse'>
            <div
              style={{
                width: '200px',
                height: '20px',
                backgroundColor: '#e2e8f0',
                borderRadius: '4px',
                margin: '0 auto 1rem',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
              }}
            />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className='animate-fade-in'>
      {/* Calendar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
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
            Trip Calendar ✈️
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Your complete trip itinerary at a glance
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant='outline' className='button-hover button-entrance' onClick={goToToday}>
            <CalendarIcon style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            Today
          </Button>

          <Button
            variant='default'
            className='button-hover button-premium button-entrance'
            onClick={() => onAddEvent?.(selectedDate || new Date())}
          >
            <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            Add Event
          </Button>
        </div>
      </div>

      {/* Event Type Filters */}
      <Card style={{ marginBottom: '1.5rem', padding: '1rem' }} className='animate-fade-in-up'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter style={{ width: '16px', height: '16px', color: '#64748b' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
              Filter:
            </span>
          </div>

          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleTypeFilter(type)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                border: filteredTypes.includes(type) ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                backgroundColor: filteredTypes.includes(type) ? '#eff6ff' : 'white',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: filteredTypes.includes(type) ? '#1d4ed8' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
              className='hover:scale-105'
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                }}
                className={getEventTypeColor(type)}
              />
              {type.replace('-', ' ')} ({eventCounts[type]})
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Main Calendar */}
        <Card className='animate-fade-in-up stagger-1'>
          <CardContent style={{ padding: '1.5rem' }}>
            {/* Month Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between',
                marginBottom: '1.5rem',
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='button-hover'
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft style={{ width: '20px', height: '20px' }} />
              </Button>

              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <Button
                variant='ghost'
                size='icon'
                className='button-hover'
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight style={{ width: '20px', height: '20px' }} />
              </Button>
            </div>

            {/* Weekday Headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                marginBottom: '1px',
              }}
            >
              {WEEKDAYS.map(day => (
                <div
                  key={day}
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.5rem',
                overflow: 'hidden',
              }}
            >
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  style={{
                    minHeight: '100px',
                    padding: '0.5rem',
                    backgroundColor: day.isCurrentMonth ? 'white' : '#f8fafc',
                    cursor: 'pointer',
                    position: 'relative',
                    border: day.isSelected ? '2px solid #3b82f6' : 'none',
                  }}
                  className='hover:bg-blue-50 transition-colors'
                >
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: day.isToday ? '700' : '500',
                      color: day.isCurrentMonth ? (day.isToday ? '#1d4ed8' : '#374151') : '#9ca3af',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {day.date.getDate()}
                    {day.isToday && (
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                        }}
                      />
                    )}
                  </div>

                  {/* Events for this day */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {day.events.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        onClick={e => {
                          e.stopPropagation()
                          onEventClick?.(event)
                        }}
                        style={{
                          fontSize: '0.625rem',
                          padding: '1px 4px',
                          borderRadius: '2px',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#1e40af',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        className='hover:bg-blue-200 transition-colors'
                        title={event.title}
                      >
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '4px',
                          }}
                          className={getEventTypeColor(event.type)}
                        />
                        {event.title}
                      </div>
                    ))}

                    {day.events.length > 3 && (
                      <div
                        style={{
                          fontSize: '0.625rem',
                          color: '#6b7280',
                          fontWeight: '500',
                        }}
                      >
                        +{day.events.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <Card className='animate-fade-in' style={{ marginTop: '1.5rem' }}>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '1rem',
              }}
            >
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>

            {calendarDays.find(day => day.date.toDateString() === selectedDate.toDateString())
              ?.events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                <CalendarIcon
                  style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: '#94a3b8' }}
                />
                <p>No events scheduled for this day</p>
                <Button
                  variant='outline'
                  className='button-hover'
                  style={{ marginTop: '1rem' }}
                  onClick={() => onAddEvent?.(selectedDate)}
                >
                  <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                  Add Event
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {calendarDays
                  .find(day => day.date.toDateString() === selectedDate.toDateString())
                  ?.events.map(event => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      style={{
                        padding: '1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                      className='hover:bg-gray-50 transition-colors card-hover'
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                        }}
                        className={getEventTypeColor(event.type)}
                      />

                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#0f172a',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {event.title}
                        </h4>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                          }}
                        >
                          {!event.isAllDay && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock style={{ width: '14px', height: '14px' }} />
                              {event.startDate.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </div>
                          )}

                          {event.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <MapPin style={{ width: '14px', height: '14px' }} />
                              {event.location.name}
                            </div>
                          )}

                          {event.attendees && event.attendees.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Users style={{ width: '14px', height: '14px' }} />
                              {event.attendees.length} attendee
                              {event.attendees.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor:
                            event.status === 'confirmed'
                              ? '#dcfce7'
                              : event.status === 'planned'
                                ? '#fef3c7'
                                : '#fee2e2',
                          color:
                            event.status === 'confirmed'
                              ? '#166534'
                              : event.status === 'planned'
                                ? '#92400e'
                                : '#991b1b',
                        }}
                      >
                        {event.status}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
