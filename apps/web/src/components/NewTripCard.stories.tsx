import type { Meta, StoryObj } from '@storybook/react'
import { NewTripCard } from './NewTripCard'
import { ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const meta: Meta<typeof NewTripCard> = {
  title: 'Components/NewTripCard',
  component: NewTripCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Default'
      description='Create new trip card with call-to-action styling'
      background='gradient-blue'
    >
      <div className='max-w-sm mx-auto'>
        <NewTripCard onClick={() => alert('✨ Create new trip clicked!')} />
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Interactive'
      description='Interactive new trip card with user input and creation flow'
      background='gradient-green'
    >
      <div className='max-w-sm mx-auto'>
        <NewTripCard
          onClick={() => {
            const tripName = prompt('What would you like to name your new trip?')
            if (tripName) {
              alert(`✈️ Creating trip: "${tripName}"`)
            }
          }}
        />
      </div>
    </ComponentStory>
  ),
}

export const InGrid: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Grid Layout'
      description='New trip card displayed alongside existing trips in a grid'
      background='gradient-purple'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
        {/* Existing trip cards (mocked) */}
        <div className='bg-white rounded-xl p-6 shadow-sm border'>
          <div className='w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4'></div>
          <h3 className='font-semibold text-gray-900'>Tokyo Adventure</h3>
          <p className='text-sm text-gray-600'>March 15-22, 2024</p>
        </div>

        <div className='bg-white rounded-xl p-6 shadow-sm border'>
          <div className='w-full h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-4'></div>
          <h3 className='font-semibold text-gray-900'>European Backpacking</h3>
          <p className='text-sm text-gray-600'>June 1-30, 2024</p>
        </div>

        {/* New trip card */}
        <NewTripCard onClick={() => alert('🎯 Add another trip!')} />
      </div>
    </ComponentStory>
  ),
}

export const WithCustomStyling: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Different Styles'
      description='Various styling options for the new trip card'
      background='gradient-orange'
    >
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Standard Style</h3>
          <div className='max-w-sm mx-auto'>
            <NewTripCard onClick={() => alert('Standard style!')} />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Compact Style</h3>
          <div className='max-w-xs mx-auto'>
            <NewTripCard variant='compact' onClick={() => alert('Compact style!')} />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Minimal Style</h3>
          <div className='max-w-sm mx-auto'>
            <NewTripCard variant='minimal' onClick={() => alert('Minimal style!')} />
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithLoading: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Loading State'
      description='New trip card with loading state during trip creation'
      background='gradient-indigo'
    >
      <div className='max-w-sm mx-auto'>
        <NewTripCard loading={true} onClick={() => alert('Creating trip...')} />
      </div>
    </ComponentStory>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ComponentStory
      title='New Trip Card - Disabled State'
      description='Disabled new trip card (e.g., when user reaches trip limit)'
      background='gradient-gray'
    >
      <div className='space-y-6'>
        <div className='max-w-sm mx-auto'>
          <NewTripCard disabled={true} onClick={() => alert('Card is disabled')} />
        </div>

        <div className='bg-gray-50 rounded-lg p-4 max-w-md mx-auto'>
          <h4 className='font-semibold text-gray-700 mb-2'>Disabled States:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>• User has reached maximum trip limit</li>
            <li>• Account subscription doesn't allow new trips</li>
            <li>• System maintenance mode</li>
            <li>• Network connectivity issues</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
