import type { Meta, StoryObj } from '@storybook/react'
import { TripGrid } from './TripGrid'
import { ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const mockTrips = [
  {
    id: '1',
    title: 'Rio de Janeiro Adventure',
    destination: 'Rio de Janeiro, Brazil',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    type: 'leisure',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
  },
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
  {
    id: '6',
    title: 'Family Vacation',
    destination: 'Orlando, Florida',
    startDate: '2024-07-10',
    endDate: '2024-07-17',
    type: 'family',
    status: 'planning',
  },
]

const meta: Meta<typeof TripGrid> = {
  title: 'Components/TripGrid',
  component: TripGrid,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Trip Grid - Complete Layout'
      description='Grid of trip cards with new trip creation functionality'
      background='gradient-blue'
    >
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Your Trips</h2>
        <TripGrid
          trips={mockTrips}
          onTripSelect={id => alert(`🎯 Selected trip: ${id}`)}
          onNewTrip={() => alert('✨ Create new trip!')}
          onTripSettings={id => alert(`⚙️ Settings for: ${id}`)}
        />
      </div>
    </ComponentStory>
  ),
}

export const WithSelection: Story = {
  render: () => (
    <ComponentStory
      title='Trip Grid - With Selection'
      description='Trip grid showing selected state highlighting'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Trip Grid with Selection</h2>
        <TripGrid
          trips={mockTrips}
          selectedTripId='2'
          onTripSelect={id => alert(`🎯 Selected trip: ${id}`)}
          onNewTrip={() => alert('✨ Create new trip!')}
          onTripSettings={id => alert(`⚙️ Settings for: ${id}`)}
        />
      </div>
    </ComponentStory>
  ),
}

export const WithoutNewTripCard: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6'>Existing Trips Only</h2>
      <TripGrid
        trips={mockTrips}
        showNewTripCard={false}
        onTripSelect={id => alert(`Selected trip: ${id}`)}
        onNewTrip={() => alert('Create new trip!')}
      />
    </div>
  ),
}

export const FewTrips: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6'>Just Getting Started</h2>
      <TripGrid
        trips={mockTrips.slice(0, 2)}
        onTripSelect={id => alert(`Selected trip: ${id}`)}
        onNewTrip={() => alert('Create new trip!')}
      />
    </div>
  ),
}

export const SingleTrip: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6'>Your First Trip</h2>
      <TripGrid
        trips={[mockTrips[0]]}
        onTripSelect={id => alert(`Selected trip: ${id}`)}
        onNewTrip={() => alert('Create another trip!')}
      />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    let selectedTrip: string | null = null

    const handleTripSelect = (id: string) => {
      selectedTrip = id
      const trip = mockTrips.find(t => t.id === id)
      alert(`🎯 Opening trip: ${trip?.title}`)
    }

    return (
      <ComponentStory
        title='Trip Grid - Interactive Demo'
        description='Fully interactive trip management with selection and actions'
        background='gradient-purple'
      >
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Interactive Trip Management</h2>
          <TripGrid
            trips={mockTrips}
            selectedTripId={selectedTrip}
            onTripSelect={handleTripSelect}
            onNewTrip={() => {
              const name = prompt('Trip name?')
              if (name) alert(`✨ Creating "${name}" trip!`)
            }}
            onTripSettings={id => {
              const trip = mockTrips.find(t => t.id === id)
              alert(`⚙️ Settings for "${trip?.title}"`)
            }}
          />
        </div>
      </ComponentStory>
    )
  },
}

export const ResponsiveLayout: Story = {
  render: () => (
    <div className='p-4 bg-gray-50 min-h-screen'>
      <h2 className='text-xl md:text-2xl font-bold mb-6'>Responsive Grid Layout</h2>
      <div className='text-sm text-gray-600 mb-4'>
        Resize your browser to see the responsive behavior
      </div>
      <TripGrid
        trips={mockTrips}
        onTripSelect={id => alert(`Selected: ${id}`)}
        onNewTrip={() => alert('New trip!')}
      />
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen space-y-8'>
      <div>
        <h2 className='text-2xl font-bold mb-6'>Normal State</h2>
        <TripGrid trips={mockTrips.slice(0, 3)} onTripSelect={() => {}} onNewTrip={() => {}} />
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-6'>Many Trips</h2>
        <TripGrid
          trips={[...mockTrips, ...mockTrips.map(t => ({ ...t, id: t.id + '_copy' }))]}
          onTripSelect={() => {}}
          onNewTrip={() => {}}
        />
      </div>
    </div>
  ),
}
