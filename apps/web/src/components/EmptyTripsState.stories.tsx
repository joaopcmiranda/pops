import type { Meta, StoryObj } from '@storybook/react'
import { EmptyTripsState } from './EmptyTripsState'
import { ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const meta: Meta<typeof EmptyTripsState> = {
  title: 'Components/EmptyTripsState',
  component: EmptyTripsState,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Empty Trips State - Default'
      description='Empty state for when user has no trips created yet'
      background='gradient-blue'
    >
      <EmptyTripsState onCreateTrip={() => alert('✨ Creating your first trip!')} />
    </ComponentStory>
  ),
}
export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='Empty Trips State - Interactive'
      description='Interactive empty state with user input for destination selection'
      background='gradient-green'
    >
      <EmptyTripsState
        onCreateTrip={() => {
          const destination = prompt('Where would you like to go?')
          if (destination) {
            alert(`✈️ Let's plan your trip to ${destination}!`)
          }
        }}
      />
    </ComponentStory>
  ),
}
export const InContext: Story = {
  render: () => (
    <ComponentStory
      title='Empty Trips State - Welcome Context'
      description='Empty state within welcome flow showing app capabilities'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome to Trip Organizer! 🌎</h1>
          <p className='text-gray-600'>Start your journey by creating your first trip</p>
        </div>

        <EmptyTripsState
          onCreateTrip={() => alert("🎉 Welcome aboard! Let's create your first trip!")}
        />

        <div className='text-center text-sm text-gray-500 space-y-2'>
          <p>Once you create a trip, you'll be able to:</p>
          <ul className='space-y-1'>
            <li>📍 Add destinations and locations</li>
            <li>📅 Plan your daily itinerary</li>
            <li>💰 Track your budget</li>
            <li>🏨 Book accommodations</li>
            <li>✈️ Manage transportation</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const MultipleVariants: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen space-y-12'>
      <div>
        <h2 className='text-xl font-bold mb-6 text-center'>Standard Empty State</h2>
        <EmptyTripsState onCreateTrip={() => alert('Standard create!')} />
      </div>

      <div>
        <h2 className='text-xl font-bold mb-6 text-center'>First Time User Experience</h2>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center'>
              <div className='text-blue-500 text-2xl mr-3'>👋</div>
              <div>
                <h3 className='font-semibold text-blue-900'>Welcome to Trip Organizer!</h3>
                <p className='text-blue-700 text-sm'>
                  Let's get you started with your first adventure.
                </p>
              </div>
            </div>
          </div>
          <EmptyTripsState onCreateTrip={() => alert('First time user!')} />
        </div>
      </div>
    </div>
  ),
}
export const WithDifferentActions: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen space-y-8'>
      <div>
        <h2 className='text-xl font-bold mb-4 text-center'>Quick Start Actions</h2>
        <EmptyTripsState
          onCreateTrip={() => {
            const action = prompt(
              'Choose action:\n1. Quick trip\n2. Detailed planning\n3. Import existing'
            )
            switch (action) {
              case '1':
                alert('🚀 Quick trip creation started!')
                break
              case '2':
                alert('📋 Detailed planning mode activated!')
                break
              case '3':
                alert('📥 Import your existing trip data!')
                break
              default:
                alert('✨ Standard trip creation!')
            }
          }}
        />
      </div>
    </div>
  ),
}
export const ErrorRecovery: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen space-y-8'>
      <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
        <div className='flex items-center'>
          <div className='text-red-500 text-xl mr-3'>⚠️</div>
          <div>
            <h3 className='font-semibold text-red-900'>Connection Error</h3>
            <p className='text-red-700 text-sm'>
              Unable to load your trips. Create a new one to get started.
            </p>
          </div>
        </div>
      </div>

      <EmptyTripsState onCreateTrip={() => alert('🔄 Creating new trip while offline...')} />
    </div>
  ),
}
