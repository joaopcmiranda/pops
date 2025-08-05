import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar } from './Calendar'
import '../styles/story-fonts.css'

// Mock itinerary items for calendar stories
const mockItineraryItems = [
  {
    id: '1',
    title: 'Flight to Tokyo',
    type: 'transport' as const,
    startDate: new Date('2024-03-15T09:00:00'),
    endDate: new Date('2024-03-15T21:00:00'),
    isAllDay: false,
    status: 'confirmed' as const,
    location: {
      name: 'Narita Airport',
      address: 'Tokyo, Japan',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.7649, lng: 140.3864 },
    },
  },
  {
    id: '2',
    title: 'Hotel Check-in',
    type: 'accommodation' as const,
    startDate: new Date('2024-03-15T15:00:00'),
    endDate: new Date('2024-03-19T11:00:00'),
    isAllDay: false,
    status: 'confirmed' as const,
    location: {
      name: 'Park Hyatt Tokyo',
      address: 'Shinjuku, Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6795, lng: 139.6917 },
    },
  },
  {
    id: '3',
    title: 'Sushi Making Class',
    type: 'activity' as const,
    startDate: new Date('2024-03-16T14:00:00'),
    endDate: new Date('2024-03-16T17:00:00'),
    isAllDay: false,
    status: 'planned' as const,
    location: {
      name: 'Tokyo Sushi Academy',
      address: 'Ginza, Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6714, lng: 139.7647 },
    },
    attendees: [{ name: 'John Doe', email: 'john@example.com' }],
  },
  {
    id: '4',
    title: 'Cherry Blossom Festival',
    type: 'event' as const,
    startDate: new Date('2024-03-17T10:00:00'),
    endDate: new Date('2024-03-17T18:00:00'),
    isAllDay: true,
    status: 'planned' as const,
    location: {
      name: 'Ueno Park',
      address: 'Ueno, Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.7141, lng: 139.7744 },
    },
    attendees: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ],
  },
  {
    id: '5',
    title: 'Business Meeting',
    type: 'work' as const,
    startDate: new Date('2024-03-18T09:00:00'),
    endDate: new Date('2024-03-18T11:00:00'),
    isAllDay: false,
    status: 'confirmed' as const,
    location: {
      name: 'Tokyo Station',
      address: 'Chiyoda, Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6812, lng: 139.7671 },
    },
  },
  {
    id: '6',
    title: 'Return Flight',
    type: 'transport' as const,
    startDate: new Date('2024-03-19T13:00:00'),
    endDate: new Date('2024-03-19T23:00:00'),
    isAllDay: false,
    status: 'confirmed' as const,
    location: {
      name: 'Narita Airport',
      address: 'Tokyo, Japan',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.7649, lng: 140.3864 },
    },
  },
]

// Mock the itinerary service for stories
const mockItineraryService = {
  getAllItems: () => mockItineraryItems,
}

// Override the import for stories
global.ItineraryService = mockItineraryService

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <Calendar
          onEventClick={event => alert(`📅 Event clicked: ${event.title}`)}
          onAddEvent={date => alert(`➕ Add event on: ${date.toDateString()}`)}
        />
      </div>
    </div>
  ),
}

export const WithEvents: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Calendar with Sample Events</h2>
          <p className='text-gray-600'>Tokyo trip itinerary displayed in calendar view</p>
        </div>

        <Calendar
          onEventClick={event =>
            alert(
              `📅 ${event.title}\n🕒 ${event.startDate.toLocaleString()}\n📍 ${event.location?.name || 'No location'}\n✅ Status: ${event.status}`
            )
          }
          onAddEvent={date =>
            alert(
              `➕ Add new event on ${date.toLocaleDateString()}\n\nThis would open the event creation form.`
            )
          }
        />

        <div className='bg-purple-50 rounded-xl p-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Calendar Features:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• Click on any event to view details</li>
            <li>• Click on empty days to add new events</li>
            <li>• Filter events by type using the filter buttons</li>
            <li>• Navigate between months using arrow buttons</li>
            <li>• Click "Today" to jump to current date</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

const InteractiveComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [newEventDate, setNewEventDate] = useState<string | null>(null)

  return (
    <div className='bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Interactive Calendar Demo</h2>
          <p className='text-gray-600'>Click on events and dates to see interactions</p>
        </div>

        <Calendar
          onEventClick={event => {
            setSelectedEvent(event.title)
            setNewEventDate(null)
          }}
          onAddEvent={date => {
            setNewEventDate(date.toDateString())
            setSelectedEvent(null)
          }}
        />

        {(selectedEvent || newEventDate) && (
          <div className='bg-white rounded-xl p-6 shadow-lg'>
            {selectedEvent && (
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-green-800'>📅 Event Selected</h3>
                <p className='text-green-700'>
                  You clicked on: <strong>{selectedEvent}</strong>
                </p>
                <p className='text-sm text-green-600'>
                  In a real app, this would show event details or editing options.
                </p>
              </div>
            )}

            {newEventDate && (
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-green-800'>➕ Add Event</h3>
                <p className='text-green-700'>
                  Selected date: <strong>{newEventDate}</strong>
                </p>
                <p className='text-sm text-green-600'>
                  In a real app, this would open the event creation form.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedEvent(null)
                setNewEventDate(null)
              }}
              className='mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
            >
              Clear Selection
            </button>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-green-50 rounded-xl p-6'>
            <h3 className='font-semibold text-green-800 mb-3'>🎯 Event Interactions</h3>
            <ul className='text-sm text-green-700 space-y-1'>
              <li>• Click events to view/edit details</li>
              <li>• Different colors for event types</li>
              <li>• Status indicators (confirmed/planned)</li>
              <li>• Time and location information</li>
            </ul>
          </div>

          <div className='bg-emerald-50 rounded-xl p-6'>
            <h3 className='font-semibold text-emerald-800 mb-3'>📅 Calendar Navigation</h3>
            <ul className='text-sm text-emerald-700 space-y-1'>
              <li>• Month navigation with arrows</li>
              <li>• Click empty days to add events</li>
              <li>• Filter by event types</li>
              <li>• Today button for quick navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}

export const EventTypes: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Event Types & Filtering</h2>
          <p className='text-gray-600'>Demonstration of different event types and filtering</p>
        </div>

        <Calendar
          onEventClick={event =>
            alert(
              `📅 ${event.title}\n🏷️ Type: ${event.type}\n📍 ${event.location?.name || 'No location'}`
            )
          }
          onAddEvent={date => alert(`➕ Add event on: ${date.toDateString()}`)}
        />

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {[
            {
              type: 'accommodation',
              color: 'bg-blue-500',
              icon: '🏠',
              description: 'Hotels & stays',
            },
            {
              type: 'transport',
              color: 'bg-gray-500',
              icon: '✈️',
              description: 'Flights & travel',
            },
            { type: 'activity', color: 'bg-yellow-500', icon: '🎯', description: 'Things to do' },
            { type: 'event', color: 'bg-purple-500', icon: '🎉', description: 'Special events' },
            { type: 'work', color: 'bg-green-500', icon: '💼', description: 'Business meetings' },
            {
              type: 'overarching-event',
              color: 'bg-red-500',
              icon: '🎪',
              description: 'Multi-day events',
            },
          ].map(eventType => (
            <div key={eventType.type} className='bg-white rounded-xl p-4 shadow-sm'>
              <div className='flex items-center gap-2 mb-2'>
                <div className={`w-4 h-4 ${eventType.color} rounded-full`}></div>
                <span className='text-lg'>{eventType.icon}</span>
              </div>
              <h4 className='font-semibold text-gray-800 capitalize text-sm'>
                {eventType.type.replace('-', ' ')}
              </h4>
              <p className='text-xs text-gray-600 mt-1'>{eventType.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const MobileView: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-4'>
      <div className='max-w-sm mx-auto'>
        <div className='text-center space-y-2 mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Mobile Calendar View</h2>
          <p className='text-sm text-gray-600'>Optimized for mobile devices</p>
        </div>

        <Calendar
          onEventClick={event => alert(`📱 ${event.title}`)}
          onAddEvent={date => alert(`📱 Add event: ${date.toDateString()}`)}
        />

        <div className='bg-orange-50 rounded-xl p-4 mt-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Mobile Features:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• Touch-friendly interface</li>
            <li>• Compact event display</li>
            <li>• Swipe navigation (future)</li>
            <li>• Responsive grid layout</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => {
    // Override with empty events for this story
    const emptyMockService = {
      getAllItems: () => [],
    }

    ;(global as typeof global & { ItineraryService: typeof emptyMockService }).ItineraryService =
      emptyMockService

    return (
      <div className='bg-gradient-to-br from-gray-50 to-slate-50 min-h-screen p-8'>
        <div className='max-w-7xl mx-auto space-y-6'>
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-bold text-gray-800'>Empty Calendar State</h2>
            <p className='text-gray-600'>How the calendar appears with no events</p>
          </div>

          <Calendar
            onEventClick={event => alert(`Event: ${event.title}`)}
            onAddEvent={date => alert(`Add first event on: ${date.toDateString()}`)}
          />

          <div className='bg-gray-50 rounded-xl p-6'>
            <h4 className='font-semibold text-gray-700 mb-2'>Empty State Features:</h4>
            <ul className='text-sm text-gray-600 space-y-1'>
              <li>• Clean calendar grid without events</li>
              <li>• Click any date to add first event</li>
              <li>• Filter options still available</li>
              <li>• Navigation controls remain functional</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
}
