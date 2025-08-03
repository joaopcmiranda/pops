import type { Meta, StoryObj } from '@storybook/react-vite'
import { TripCard } from './TripCard'
import { ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const mockTrip = {
  id: '1',
  title: 'Rio de Janeiro Adventure',
  destination: 'Rio de Janeiro, Brazil',
  startDate: '2024-03-15',
  endDate: '2024-03-22',
  type: 'leisure',
  status: 'upcoming',
  coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
}

const trips = [
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
    coverImage: 'https://images.unsplash.com/photo-1520637836862-4d197d17c17a?w=400&h=240&fit=crop',
  },
  {
    id: '4',
    title: 'Honeymoon in Maldives',
    destination: 'Maldives',
    startDate: '2023-12-20',
    endDate: '2023-12-30',
    type: 'honeymoon',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=240&fit=crop',
  },
  {
    id: '5',
    title: 'Cancelled Vegas Trip',
    destination: 'Las Vegas, USA',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    type: 'leisure',
    status: 'cancelled',
  },
]

const meta: Meta<typeof TripCard> = {
  title: 'Components/TripCard',
  component: TripCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Trip Card - Default State'
      description='Standard trip card with cover image and interactive elements'
      background='gradient-blue'
    >
      <div className='max-w-sm mx-auto'>
        <TripCard
          trip={mockTrip}
          onSelect={id => alert(`🎯 Selected trip: ${id}`)}
          onSettings={id => alert(`⚙️ Settings for trip: ${id}`)}
        />
      </div>
    </ComponentStory>
  ),
}

export const Selected: Story = {
  render: () => (
    <ComponentStory
      title='Trip Card - Selected State'
      description='Trip card in selected state with visual highlight'
      background='gradient-green'
    >
      <div className='max-w-sm mx-auto'>
        <TripCard
          trip={mockTrip}
          isSelected={true}
          onSelect={id => alert(`🎯 Selected trip: ${id}`)}
          onSettings={id => alert(`⚙️ Settings for trip: ${id}`)}
        />
      </div>
    </ComponentStory>
  ),
}

export const WithoutCoverImage: Story = {
  render: () => (
    <ComponentStory
      title='Trip Card - No Cover Image'
      description='Trip card layout without cover image, showing text-only design'
      background='gradient-purple'
    >
      <div className='max-w-sm mx-auto'>
        <TripCard
          trip={{ ...mockTrip, coverImage: undefined }}
          onSelect={id => alert(`🎯 Selected trip: ${id}`)}
          onSettings={id => alert(`⚙️ Settings for trip: ${id}`)}
        />
      </div>
    </ComponentStory>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <ComponentStory
      title='Trip Card - All Status Types'
      description='Trip cards showing different status states and visual indicators'
      background='gradient-orange'
    >
      <div className='space-y-8'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Trip Card States</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {trips.map(trip => (
            <div key={trip.id}>
              <h3 className='text-lg font-semibold mb-2 text-center capitalize text-gray-700'>
                {trip.status}
              </h3>
              <TripCard
                trip={trip}
                onSelect={id => alert(`🎯 Selected trip: ${id}`)}
                onSettings={id => alert(`⚙️ Settings for trip: ${id}`)}
              />
            </div>
          ))}
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Status Types:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>
              • <strong>Upcoming:</strong> Planned trips not yet started
            </li>
            <li>
              • <strong>Active:</strong> Currently ongoing trips
            </li>
            <li>
              • <strong>Planning:</strong> Draft trips being organized
            </li>
            <li>
              • <strong>Completed:</strong> Past trips that have finished
            </li>
            <li>
              • <strong>Cancelled:</strong> Trips that were cancelled
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Interactive Trip Cards</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
        {trips.slice(0, 4).map(trip => (
          <TripCard
            key={trip.id}
            trip={trip}
            onSelect={() => alert(`🎯 Selected trip: ${trip.title}`)}
            onSettings={() => alert(`⚙️ Opening settings for: ${trip.title}`)}
          />
        ))}
      </div>
    </div>
  ),
}

export const Comparison: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Trip Types Comparison</h2>
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>With Cover Images</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <TripCard trip={trips[0]} onSelect={() => {}} />
            <TripCard trip={trips[2]} onSelect={() => {}} />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4'>Without Cover Images</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <TripCard trip={trips[1]} onSelect={() => {}} />
            <TripCard trip={trips[4]} onSelect={() => {}} />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-sm mx-auto'>
        <TripCard
          trip={{
            ...mockTrip,
            title: 'Very Long Trip Title That Should Wrap to Multiple Lines Properly',
            destination: 'A Very Long Destination Name That Might Overflow',
          }}
          onSelect={id => alert(`Selected trip: ${id}`)}
        />
      </div>
    </div>
  ),
}
