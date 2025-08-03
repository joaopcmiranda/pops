import type { Meta, StoryObj } from '@storybook/react'
import { AppHeader } from './AppHeader'
import { ComponentStory } from './StoryWrapper'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const mockTrip = {
  id: '1',
  title: 'Rio de Janeiro Adventure',
  destination: 'Rio de Janeiro, Brazil',
  startDate: '2024-03-15',
  endDate: '2024-03-22',
  type: 'leisure',
  status: 'upcoming',
}

const mockTrips = [
  mockTrip,
  {
    id: '2',
    title: 'Tokyo Business Trip',
    destination: 'Tokyo, Japan',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    type: 'business',
    status: 'active',
  },
  {
    id: '3',
    title: 'European Backpacking',
    destination: 'Multiple Cities, Europe',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    type: 'adventure',
    status: 'planning',
  },
]

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='App Header - Default'
      description='Main application header with trip selector, search, and user actions'
      background='gradient-blue'
    >
      <div className='space-y-8'>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <AppHeader currentTrip={mockTrip} onTripSwitch={() => alert('🔄 Trip switch clicked!')} />
        </div>

        <div className='bg-blue-50 rounded-xl p-6 border border-blue-100'>
          <h3 className='text-lg font-semibold mb-4 text-blue-900'>Header Features</h3>
          <ul className='text-sm text-blue-800 space-y-2'>
            <li>
              • <strong>Trip Selector:</strong> Shows current trip with destination
            </li>
            <li>
              • <strong>Search Bar:</strong> Quick search across trip content
            </li>
            <li>
              • <strong>Notifications:</strong> Bell icon for alerts and updates
            </li>
            <li>
              • <strong>User Menu:</strong> Profile and account settings
            </li>
            <li>
              • <strong>Sidebar Toggle:</strong> Built-in sidebar trigger for responsive design
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithoutTrip: Story = {
  render: () => (
    <ComponentStory
      title='App Header - No Trip Selected'
      description='Header state when no trip is currently selected'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <AppHeader onTripSwitch={() => alert('🔄 No trip selected')} />
        </div>

        <div className='bg-purple-50 rounded-xl p-6 border border-purple-100'>
          <h3 className='text-lg font-semibold mb-4 text-purple-900'>No Trip State</h3>
          <p className='text-sm text-purple-800'>
            When no trip is selected, the header shows the app title instead of trip information.
            This is the state users see when they first open the app or after logging out.
          </p>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const DifferentTrips: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800 text-center'>
          Header with Different Trips
        </h2>

        {mockTrips.map(trip => (
          <div key={trip.id} className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            <AppHeader
              currentTrip={trip}
              onTripSwitch={() => alert(`🔄 Switch from ${trip.title}`)}
            />
            <div className='p-4 bg-gray-50 border-t'>
              <div className='text-sm text-gray-600'>
                <strong>Trip Type:</strong> {trip.type} • <strong>Status:</strong> {trip.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    let currentTripIndex = 0

    const switchTrip = () => {
      currentTripIndex = (currentTripIndex + 1) % mockTrips.length
      const newTrip = mockTrips[currentTripIndex]
      alert(
        `🔄 Switched to: ${newTrip.title}\nDestination: ${newTrip.destination}\nType: ${newTrip.type}`
      )
    }

    return (
      <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8'>
        <div className='max-w-7xl mx-auto space-y-8'>
          <div className='text-center space-y-2'>
            <h2 className='text-3xl font-bold text-gray-800'>Interactive Header Demo</h2>
            <p className='text-gray-600'>Click on different elements to see interactions</p>
          </div>

          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            <AppHeader currentTrip={mockTrip} onTripSwitch={switchTrip} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-blue-50 rounded-xl p-6'>
              <h3 className='font-semibold text-blue-800 mb-3'>🔍 Search Features</h3>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• Search across all trip content</li>
                <li>• Find activities, bookings, notes</li>
                <li>• Quick keyboard shortcuts</li>
              </ul>
            </div>

            <div className='bg-green-50 rounded-xl p-6'>
              <h3 className='font-semibold text-green-800 mb-3'>🔔 Notifications</h3>
              <ul className='text-sm text-green-700 space-y-1'>
                <li>• Booking confirmations</li>
                <li>• Weather alerts</li>
                <li>• Trip reminders</li>
              </ul>
            </div>

            <div className='bg-purple-50 rounded-xl p-6'>
              <h3 className='font-semibold text-purple-800 mb-3'>👤 User Menu</h3>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Profile settings</li>
                <li>• Account preferences</li>
                <li>• Help & support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-gray-800'>Responsive Header Design</h2>
          <p className='text-gray-600'>Resize your browser to see responsive behavior</p>
        </div>

        {/* Desktop view */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>Desktop View</h3>
          <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            <AppHeader
              currentTrip={mockTrip}
              onTripSwitch={() => alert('🔄 Trip switch (desktop)')}
            />
          </div>
        </div>

        {/* Mobile simulation */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>Mobile Simulation</h3>
          <div className='max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden'>
            <AppHeader
              currentTrip={mockTrip}
              onTripSwitch={() => alert('🔄 Trip switch (mobile)')}
            />
          </div>
        </div>

        <div className='bg-orange-50 rounded-xl p-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Responsive Features:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• Mobile menu button appears on small screens</li>
            <li>• Search bar adapts to available space</li>
            <li>• Trip selector truncates long names on mobile</li>
            <li>• Action buttons stack appropriately</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

export const LongTripNames: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-yellow-50 to-amber-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800 text-center'>
          Header with Long Trip Names
        </h2>

        {[
          {
            id: '1',
            title: 'Epic 30-Day European Adventure Through 15 Countries',
            destination:
              'Multiple Cities Across Europe Including Amsterdam, Berlin, Prague, Vienna, Budapest, and More',
            startDate: '2024-06-01',
            endDate: '2024-06-30',
            type: 'leisure',
            status: 'planning',
          },
          {
            id: '2',
            title: 'Quick Weekend Getaway',
            destination: 'NYC',
            startDate: '2024-03-15',
            endDate: '2024-03-17',
            type: 'leisure',
            status: 'upcoming',
          },
        ].map(trip => (
          <div key={trip.id} className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            <AppHeader
              currentTrip={trip}
              onTripSwitch={() => alert(`🔄 Switch from ${trip.title}`)}
            />
          </div>
        ))}

        <div className='bg-yellow-50 rounded-xl p-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Text Overflow Handling:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• Long trip names are truncated with ellipsis</li>
            <li>• Destination names adapt to available space</li>
            <li>• Hover states can show full text in tooltips</li>
            <li>• Mobile view prioritizes readability</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}
