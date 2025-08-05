import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TripGrid } from './TripGrid'
import { EmptyTripsState } from './EmptyTripsState'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { TripFormBasicInfo } from './forms/TripFormBasicInfo'
import { TripFormDates } from './forms/TripFormDates'
import { TripFormDescription } from './forms/TripFormDescription'
import { Button } from './ui/button/button'

// Mock trip data
const initialTrips = [
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
]

// Complete Trip Management Component
function TripManagement() {
  const [trips, setTrips] = useState(initialTrips)
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    type: 'leisure',
    startDate: '',
    endDate: '',
    description: '',
  })

  const handleTripSelect = (tripId: string) => {
    setSelectedTripId(tripId)
    const trip = trips.find(t => t.id === tripId)
    if (trip) {
      alert(`🎯 Opening "${trip.title}" trip dashboard...`)
    }
  }

  const handleNewTrip = () => {
    setIsNewTripModalOpen(true)
  }

  const handleTripSettings = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId)
    if (trip) {
      alert(`⚙️ Opening settings for "${trip.title}"...`)
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault()
    const newTrip = {
      id: Date.now().toString(),
      title: formData.title,
      destination: `${formData.destination}, ${formData.country}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      type: formData.type,
      status: 'planning' as const,
    }

    setTrips(prev => [newTrip, ...prev])
    setIsNewTripModalOpen(false)

    // Reset form
    setFormData({
      title: '',
      destination: '',
      country: '',
      type: 'leisure',
      startDate: '',
      endDate: '',
      description: '',
    })

    alert(`🎉 "${newTrip.title}" trip created successfully!`)
  }

  if (trips.length === 0) {
    return (
      <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome to Trip Organizer! 🌎</h1>
          <p className='text-gray-600'>Start your journey by creating your first trip</p>
        </div>

        <EmptyTripsState onCreateTrip={handleNewTrip} />

        {/* New Trip Modal */}
        <Dialog open={isNewTripModalOpen} onOpenChange={open => setIsNewTripModalOpen(open)}>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>Create Your First Trip</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTrip}>
              <TripFormBasicInfo formData={formData} onChange={handleFormChange} />
              <TripFormDates formData={formData} onChange={handleFormChange} />
              <TripFormDescription formData={formData} onChange={handleFormChange} />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0',
                }}
              >
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsNewTripModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Create Trip</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Your Trips ✈️</h1>
          <p className='text-gray-600'>Manage all your travel adventures in one place</p>
        </div>
        <div className='text-right'>
          <div className='text-sm text-gray-500'>Total Trips</div>
          <div className='text-2xl font-bold text-blue-600'>{trips.length}</div>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='text-sm text-gray-500'>Active</div>
          <div className='text-xl font-bold text-green-600'>
            {trips.filter(t => t.status === 'active').length}
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='text-sm text-gray-500'>Upcoming</div>
          <div className='text-xl font-bold text-blue-600'>
            {trips.filter(t => t.status === 'upcoming').length}
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='text-sm text-gray-500'>Planning</div>
          <div className='text-xl font-bold text-yellow-600'>
            {trips.filter(t => t.status === 'planning').length}
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='text-sm text-gray-500'>Completed</div>
          <div className='text-xl font-bold text-gray-600'>
            {trips.filter(t => t.status === 'completed').length}
          </div>
        </div>
      </div>

      {/* Trip Grid */}
      <TripGrid
        trips={trips}
        selectedTripId={selectedTripId}
        onTripSelect={handleTripSelect}
        onNewTrip={handleNewTrip}
        onTripSettings={handleTripSettings}
      />

      {/* New Trip Modal */}
      <Dialog open={isNewTripModalOpen} onOpenChange={open => setIsNewTripModalOpen(open)}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Create New Trip</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTrip}>
            <TripFormBasicInfo formData={formData} onChange={handleFormChange} />
            <TripFormDates formData={formData} onChange={handleFormChange} />
            <TripFormDescription formData={formData} onChange={handleFormChange} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <Button type='button' variant='outline' onClick={() => setIsNewTripModalOpen(false)}>
                Cancel
              </Button>
              <Button type='submit'>Create Trip</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const meta: Meta<typeof TripGrid> = {
  title: 'Components/TripManagement',
  component: TripGrid,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const CompleteWorkflow: Story = {
  render: () => <TripManagement />,
}

export const EmptyState: Story = {
  render: () => {
    const EmptyTripManagement = () => {
      const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false)
      const [formData, setFormData] = useState({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
        startDate: '',
        endDate: '',
        description: '',
      })

      const handleFormChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
      }

      const handleCreateTrip = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`🎉 "${formData.title}" would be your first trip!`)
        setIsNewTripModalOpen(false)
      }

      return (
        <div className='p-8 bg-gray-50 min-h-screen'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome to Trip Organizer! 🌎</h1>
            <p className='text-gray-600'>Start your journey by creating your first trip</p>
          </div>

          <EmptyTripsState onCreateTrip={() => setIsNewTripModalOpen(true)} />

          <Dialog open={isNewTripModalOpen} onOpenChange={open => setIsNewTripModalOpen(open)}>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Create Your First Trip</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTrip}>
                <TripFormBasicInfo formData={formData} onChange={handleFormChange} />
                <TripFormDates formData={formData} onChange={handleFormChange} />
                <TripFormDescription formData={formData} onChange={handleFormChange} />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0',
                  }}
                >
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsNewTripModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Create Trip</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )
    }

    return <EmptyTripManagement />
  },
}

export const Interactive: Story = {
  render: () => {
    const InteractiveTripManagement = () => {
      const [trips, setTrips] = useState(initialTrips)
      const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
      const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false)
      const [formData, setFormData] = useState({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
        startDate: '',
        endDate: '',
        description: '',
      })

      const handleTripSelect = (tripId: string) => {
        setSelectedTripId(tripId)
        const trip = trips.find(t => t.id === tripId)
        if (trip) {
          alert(
            `🎯 Selected "${trip.title}"\n\nIn a real app, this would:\n• Navigate to trip dashboard\n• Show trip details\n• Allow editing and planning`
          )
        }
      }

      const handleDeleteTrip = (tripId: string) => {
        const trip = trips.find(t => t.id === tripId)
        if (trip && confirm(`Are you sure you want to delete "${trip.title}"?`)) {
          setTrips(prev => prev.filter(t => t.id !== tripId))
          alert(`🗑️ "${trip.title}" has been deleted.`)
        }
      }

      const handleFormChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
      }

      const handleCreateTrip = (e: React.FormEvent) => {
        e.preventDefault()
        const newTrip = {
          id: Date.now().toString(),
          title: formData.title,
          destination: `${formData.destination}, ${formData.country}`,
          startDate: formData.startDate,
          endDate: formData.endDate,
          type: formData.type,
          status: 'planning' as const,
        }

        setTrips(prev => [newTrip, ...prev])
        setIsNewTripModalOpen(false)

        // Reset form
        setFormData({
          title: '',
          destination: '',
          country: '',
          type: 'leisure',
          startDate: '',
          endDate: '',
          description: '',
        })

        alert(
          `🎉 "${newTrip.title}" created successfully!\n\nYou can now:\n• Plan your itinerary\n• Set your budget\n• Book accommodations\n• Add activities`
        )
      }

      return (
        <div className='p-8 bg-gray-50 min-h-screen'>
          {/* Header with actions */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Interactive Trip Manager ✈️</h1>
              <p className='text-gray-600'>
                Click on cards, buttons, and forms to see interactions
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() => {
                  setTrips(initialTrips)
                  alert('🔄 Trips reset to initial state')
                }}
              >
                Reset Data
              </Button>
              <Button onClick={() => setIsNewTripModalOpen(true)}>+ Add Trip</Button>
            </div>
          </div>

          {/* Quick actions */}
          <div className='bg-white p-4 rounded-lg shadow-sm mb-6'>
            <h3 className='font-semibold mb-3'>Quick Actions</h3>
            <div className='flex gap-2 flex-wrap'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  const randomTrips = [
                    {
                      title: 'Iceland Adventure',
                      destination: 'Reykjavik, Iceland',
                      type: 'adventure',
                    },
                    { title: 'Bali Retreat', destination: 'Ubud, Bali', type: 'leisure' },
                    { title: 'NYC Business', destination: 'New York, USA', type: 'business' },
                  ]

                  const randomTrip = randomTrips[Math.floor(Math.random() * randomTrips.length)]

                  setFormData({
                    title: randomTrip.title,
                    destination: randomTrip.destination.split(',')[0],
                    country: randomTrip.destination.split(',')[1].trim(),
                    type: randomTrip.type,
                    startDate: '2024-07-15',
                    endDate: '2024-07-22',
                    description: '',
                  })

                  setIsNewTripModalOpen(true)
                }}
              >
                🎲 Random Trip
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  const completed = trips.map(trip => ({ ...trip, status: 'completed' as const }))
                  setTrips(completed)
                  alert('📋 All trips marked as completed')
                }}
              >
                ✅ Mark All Complete
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  if (confirm('Delete all trips? This cannot be undone.')) {
                    setTrips([])
                    alert('🗑️ All trips deleted')
                  }
                }}
              >
                🗑️ Clear All
              </Button>
            </div>
          </div>

          {/* Trips */}
          {trips.length === 0 ? (
            <EmptyTripsState onCreateTrip={() => setIsNewTripModalOpen(true)} />
          ) : (
            <TripGrid
              trips={trips}
              selectedTripId={selectedTripId}
              onTripSelect={handleTripSelect}
              onNewTrip={() => setIsNewTripModalOpen(true)}
              onTripSettings={tripId => {
                const actions = [
                  '✏️ Edit trip details',
                  '📅 Manage itinerary',
                  '💰 Update budget',
                  '🏨 Book accommodation',
                  '✈️ Add flights',
                  '🗑️ Delete trip',
                ]

                const action = prompt(
                  `Choose action for trip:\n\n${actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nEnter number (1-${actions.length}):`
                )

                if (action === '6') {
                  handleDeleteTrip(tripId)
                } else if (action && parseInt(action) >= 1 && parseInt(action) <= actions.length) {
                  alert(`${actions[parseInt(action) - 1]} - Feature coming soon!`)
                }
              }}
            />
          )}

          {/* New Trip Modal */}
          <Dialog open={isNewTripModalOpen} onOpenChange={open => setIsNewTripModalOpen(open)}>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTrip}>
                <TripFormBasicInfo formData={formData} onChange={handleFormChange} />
                <TripFormDates formData={formData} onChange={handleFormChange} />
                <TripFormDescription formData={formData} onChange={handleFormChange} />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0',
                  }}
                >
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      setIsNewTripModalOpen(false)
                      setFormData({
                        title: '',
                        destination: '',
                        country: '',
                        type: 'leisure',
                        startDate: '',
                        endDate: '',
                        description: '',
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Create Trip</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )
    }

    return <InteractiveTripManagement />
  },
}
