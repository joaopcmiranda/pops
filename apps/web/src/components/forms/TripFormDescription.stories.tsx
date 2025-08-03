import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TripFormDescription } from './TripFormDescription'

const DefaultForm = () => {
  const [formData, setFormData] = useState({
    description: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDescription formData={formData} onChange={handleChange} />

      <div className='mt-4 text-sm text-gray-600'>
        <p>Character count: {formData.description.length}</p>
      </div>

      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h4 className='font-semibold mb-2'>Current Description:</h4>
        <p className='text-sm'>{formData.description || '(empty)'}</p>
      </div>
    </div>
  )
}

const meta: Meta<typeof TripFormDescription> = {
  title: 'Components/TripFormDescription',
  component: TripFormDescription,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <DefaultForm />
    </div>
  ),
}

const PrefilledForm = () => {
  const [formData, setFormData] = useState({
    description:
      "A week-long adventure through the beautiful cities of Brazil. We'll explore Rio de Janeiro's beaches, visit Christ the Redeemer, and experience the vibrant nightlife. This trip includes visits to Sugarloaf Mountain, Copacabana Beach, and several local restaurants to taste authentic Brazilian cuisine.",
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDescription formData={formData} onChange={handleChange} />

      <div className='mt-4 text-sm text-gray-600'>
        <p>Character count: {formData.description.length}</p>
      </div>
    </div>
  )
}

export const Prefilled: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <PrefilledForm />
    </div>
  ),
}

const InteractiveExamples = () => {
  const [currentExample, setCurrentExample] = useState(0)

  const examples = [
    {
      name: 'Adventure Trip',
      description:
        'An exciting adventure through mountain trails and scenic landscapes. Perfect for thrill-seekers and nature lovers!',
    },
    {
      name: 'Business Trip',
      description:
        'Professional meetings and conferences in the city center. Includes networking events and client presentations.',
    },
    {
      name: 'Family Vacation',
      description:
        'A fun-filled family vacation with activities for all ages. Theme parks, beaches, and memorable experiences await!',
    },
    {
      name: 'Romantic Getaway',
      description:
        'A romantic escape to a beautiful destination. Candlelit dinners, sunset walks, and couples spa treatments included.',
    },
    {
      name: 'Cultural Journey',
      description:
        'Immerse yourself in local culture, visit historic sites, museums, and traditional markets. Learn about the rich heritage and customs.',
    },
  ]

  const [formData, setFormData] = useState({ description: examples[0].description })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const loadExample = (index: number) => {
    setCurrentExample(index)
    setFormData({ description: examples[index].description })
  }

  return (
    <div className='space-y-6'>
      <div className='p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-semibold mb-3'>Try These Description Examples:</h3>
        <div className='flex flex-wrap gap-2'>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(index)}
              className={`px-3 py-1 rounded text-sm ${
                currentExample === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-600'
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      <div className='p-8 bg-white rounded-lg'>
        <TripFormDescription formData={formData} onChange={handleChange} />

        <div className='mt-4 flex justify-between text-sm text-gray-600'>
          <span>Character count: {formData.description.length}</span>
          <span>
            {formData.description.length > 500 ? '⚠️ Long description' : '✅ Good length'}
          </span>
        </div>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <InteractiveExamples />
    </div>
  ),
}

const WritingTips = () => {
  const [formData, setFormData] = useState({
    description: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getWritingTip = () => {
    const length = formData.description.length
    if (length === 0) return 'Start by describing what makes this trip special...'
    if (length < 50) return 'Tell us more! What activities are you planning?'
    if (length < 100) return 'Great start! Consider adding details about locations or experiences.'
    if (length < 200) return 'Excellent! Your description is detailed and engaging.'
    return 'Comprehensive description! This will help you remember all the details.'
  }

  return (
    <div className='space-y-6'>
      <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
        <h3 className='font-semibold text-green-800 mb-2'>Writing Tips</h3>
        <ul className='text-green-700 text-sm space-y-1'>
          <li>• Describe what makes this trip unique</li>
          <li>• Include planned activities and experiences</li>
          <li>• Mention specific locations you want to visit</li>
          <li>• Add personal goals or expectations</li>
          <li>• Keep it personal - this is for you!</li>
        </ul>
      </div>

      <div className='p-8 bg-white rounded-lg'>
        <TripFormDescription formData={formData} onChange={handleChange} />

        <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
          <p className='text-blue-700 text-sm font-medium'>💡 {getWritingTip()}</p>
        </div>

        <div className='mt-4 text-sm text-gray-600'>
          <p>
            Characters: {formData.description.length} | Words:{' '}
            {formData.description.split(' ').filter(w => w.length > 0).length}
          </p>
        </div>
      </div>
    </div>
  )
}

export const WithWritingTips: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <WritingTips />
    </div>
  ),
}

const CharacterCounter = () => {
  const [formData, setFormData] = useState({
    description: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const maxLength = 500
  const remaining = maxLength - formData.description.length
  const isNearLimit = remaining < 50
  const isOverLimit = remaining < 0

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDescription formData={formData} onChange={handleChange} />

      <div className='mt-4 flex justify-between items-center'>
        <div className='text-sm text-gray-600'>
          <p>
            Characters: {formData.description.length} / {maxLength}
          </p>
        </div>
        <div
          className={`text-sm font-medium ${
            isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-green-600'
          }`}
        >
          {isOverLimit ? '❌ Too long' : isNearLimit ? '⚠️ Almost full' : '✅ Good'}
        </div>
      </div>

      <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
        <div
          className={`h-2 rounded-full transition-all ${
            isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(100, (formData.description.length / maxLength) * 100)}%` }}
        />
      </div>
    </div>
  )
}

export const WithCharacterCounter: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <CharacterCounter />
    </div>
  ),
}
