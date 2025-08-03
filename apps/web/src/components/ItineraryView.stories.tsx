import type { Meta, StoryObj } from '@storybook/react-vite'
import { ItineraryView } from './ItineraryView'

// Mock itinerary data for ItineraryView stories
const mockItineraryDays = [
  {
    date: new Date('2024-03-15'),
    items: [
      {
        id: '1',
        title: 'Flight to Tokyo',
        type: 'transport' as const,
        startDate: new Date('2024-03-15T09:00:00'),
        endDate: new Date('2024-03-15T21:00:00'),
        isAllDay: false,
        status: 'confirmed' as const,
        description: 'Non-stop flight from JFK to Narita Airport',
        location: {
          name: 'Narita Airport',
          address: 'Terminal 1',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.7649, lng: 140.3864 },
        },
        tags: ['international-flight', 'long-haul'],
      },
      {
        id: '2',
        title: 'Hotel Check-in',
        type: 'accommodation' as const,
        startDate: new Date('2024-03-15T15:00:00'),
        endDate: new Date('2024-03-19T11:00:00'),
        isAllDay: false,
        status: 'confirmed' as const,
        description: 'Luxury hotel in Shinjuku with city views',
        location: {
          name: 'Park Hyatt Tokyo',
          address: '3-7-1-2 Nishi-Shinjuku',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.6795, lng: 139.6917 },
        },
        tags: ['luxury', 'city-view', 'concierge'],
      },
    ],
  },
  {
    date: new Date('2024-03-16'),
    items: [
      {
        id: '3',
        title: 'Morning Jog in Imperial Palace',
        type: 'activity' as const,
        startDate: new Date('2024-03-16T07:00:00'),
        endDate: new Date('2024-03-16T08:00:00'),
        isAllDay: false,
        status: 'planned' as const,
        description: 'Peaceful morning run around the Imperial Palace gardens',
        location: {
          name: 'Imperial Palace East Gardens',
          address: 'Chiyoda',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.6839, lng: 139.7544 },
        },
        tags: ['exercise', 'nature', 'early-morning'],
      },
      {
        id: '4',
        title: 'Sushi Making Class',
        type: 'activity' as const,
        startDate: new Date('2024-03-16T14:00:00'),
        endDate: new Date('2024-03-16T17:00:00'),
        isAllDay: false,
        status: 'planned' as const,
        description: 'Learn traditional sushi making techniques from a master chef',
        location: {
          name: 'Tokyo Sushi Academy',
          address: 'Ginza District',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.6714, lng: 139.7647 },
        },
        attendees: [
          { name: 'John Doe', email: 'john@example.com' },
          { name: 'Chef Yamamoto', email: 'chef@sushiacademy.jp' },
        ],
        tags: ['culinary', 'hands-on', 'cultural'],
      },
    ],
  },
  {
    date: new Date('2024-03-17'),
    items: [
      {
        id: '5',
        title: 'Cherry Blossom Festival',
        type: 'event' as const,
        startDate: new Date('2024-03-17T10:00:00'),
        endDate: new Date('2024-03-17T18:00:00'),
        isAllDay: true,
        status: 'planned' as const,
        description: 'Annual sakura viewing festival with traditional performances',
        location: {
          name: 'Ueno Park',
          address: 'Ueno, Taito',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.7141, lng: 139.7744 },
        },
        attendees: [
          { name: 'John Doe', email: 'john@example.com' },
          { name: 'Jane Smith', email: 'jane@example.com' },
          { name: 'Local Guide Tanaka', email: 'tanaka@tokyoguides.jp' },
        ],
        tags: ['sakura', 'festival', 'photography', 'cultural'],
      },
    ],
  },
  {
    date: new Date('2024-03-18'),
    items: [
      {
        id: '6',
        title: 'Business Meeting - Tokyo Office',
        type: 'work' as const,
        startDate: new Date('2024-03-18T09:00:00'),
        endDate: new Date('2024-03-18T11:00:00'),
        isAllDay: false,
        status: 'confirmed' as const,
        description: 'Quarterly review meeting with Tokyo team',
        location: {
          name: 'Tokyo Station Conference Center',
          address: 'Marunouchi, Chiyoda',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.6812, lng: 139.7671 },
        },
        attendees: [
          { name: 'John Doe', email: 'john@example.com' },
          { name: 'Hiroshi Tanaka', email: 'htanaka@company.co.jp' },
          { name: 'Sarah Kim', email: 'skim@company.co.jp' },
        ],
        tags: ['business', 'quarterly-review', 'presentation'],
      },
      {
        id: '7',
        title: 'Team Dinner',
        type: 'overarching-event' as const,
        startDate: new Date('2024-03-18T19:00:00'),
        endDate: new Date('2024-03-18T22:00:00'),
        isAllDay: false,
        status: 'confirmed' as const,
        description: 'Welcome dinner with the Tokyo team at a traditional restaurant',
        location: {
          name: 'Kikunoi Tokyo',
          address: 'Akasaka, Minato',
          city: 'Tokyo',
          country: 'Japan',
          coordinates: { lat: 35.6735, lng: 139.7367 },
        },
        attendees: [
          { name: 'John Doe', email: 'john@example.com' },
          { name: 'Hiroshi Tanaka', email: 'htanaka@company.co.jp' },
          { name: 'Sarah Kim', email: 'skim@company.co.jp' },
          { name: 'Yuki Nakamura', email: 'ynakamura@company.co.jp' },
        ],
        tags: ['business-dinner', 'kaiseki', 'team-building'],
      },
    ],
  },
]

const mockStats = {
  totalItems: 7,
  timeSpan: {
    start: new Date('2024-03-15'),
    end: new Date('2024-03-19'),
  },
  totalDays: 4,
}

const meta: Meta<typeof ItineraryView> = {
  title: 'Components/ItineraryView',
  component: ItineraryView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <ItineraryView
          days={mockItineraryDays}
          stats={mockStats}
          onItemClick={item => alert(`📅 ${item.title} clicked!`)}
          onAddItem={date => alert(`➕ Add item for ${date.toDateString()}`)}
        />
      </div>
    </div>
  ),
}

export const WithFilters: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Itinerary with Type Filters</h2>
          <p className='text-gray-600'>Filter events by type to focus on specific categories</p>
        </div>

        <ItineraryView
          days={mockItineraryDays}
          stats={mockStats}
          onItemClick={item =>
            alert(`📅 ${item.title}\n🏷️ Type: ${item.type}\n📍 ${item.location?.name}`)
          }
          onAddItem={date => alert(`➕ Add new event for ${date.toDateString()}`)}
        />
      </div>
    </div>
  ),
}

export const TimelineView: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Timeline View</h2>
          <p className='text-gray-600'>Chronological timeline of all trip events</p>
        </div>

        <ItineraryView
          days={mockItineraryDays}
          stats={mockStats}
          viewMode='timeline'
          onItemClick={item => alert(`🕒 ${item.title}\n⏰ ${item.startDate.toLocaleString()}`)}
          onAddItem={date => alert(`➕ Add to timeline: ${date.toDateString()}`)}
        />
      </div>
    </div>
  ),
}

export const CompactView: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-orange-50 to-red-50 min-h-screen p-8'>
      <div className='max-w-3xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-gray-800'>Compact Itinerary</h2>
          <p className='text-gray-600'>Space-efficient view for mobile or sidebar display</p>
        </div>

        <ItineraryView
          days={mockItineraryDays}
          stats={mockStats}
          viewMode='compact'
          onItemClick={item => alert(`📱 ${item.title} (compact view)`)}
          onAddItem={date => alert(`➕ Quick add: ${date.toDateString()}`)}
        />
      </div>
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-gray-50 to-slate-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-gray-800'>Empty Itinerary</h2>
          <p className='text-gray-600'>How the view appears with no scheduled items</p>
        </div>

        <ItineraryView
          days={[]}
          stats={{ totalItems: 0, timeSpan: null, totalDays: 0 }}
          onItemClick={item => alert(`Item: ${item.title}`)}
          onAddItem={date => alert(`🎯 Start planning! Add first event: ${date.toDateString()}`)}
        />

        <div className='bg-gray-50 rounded-xl p-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Empty State Features:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• Encouraging call-to-action to add first event</li>
            <li>• Clear instructions for getting started</li>
            <li>• Visual placeholder maintains layout structure</li>
            <li>• Quick access to event creation tools</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}
