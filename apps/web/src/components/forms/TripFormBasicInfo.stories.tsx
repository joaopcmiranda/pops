import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TripFormBasicInfo } from './TripFormBasicInfo'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'

const DefaultForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    type: 'leisure',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormBasicInfo formData={formData} onChange={handleChange} />
      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h4 className='font-semibold mb-2'>Current Form Data:</h4>
        <pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}

const meta: Meta<typeof TripFormBasicInfo> = {
  title: 'Components/TripFormBasicInfo',
  component: TripFormBasicInfo,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Trip Form - Basic Info'
      description='Trip creation form with title, destination, and type selection'
      background='gradient-blue'
    >
      <DefaultForm />
    </ComponentStory>
  ),
}

const PrefilledForm = () => {
  const [formData, setFormData] = useState({
    title: 'Summer in Europe',
    destination: 'Paris',
    country: 'France',
    type: 'leisure',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormBasicInfo formData={formData} onChange={handleChange} />
    </div>
  )
}

export const Prefilled: Story = {
  render: () => (
    <ComponentStory
      title='Trip Form - Prefilled Data'
      description='Form with existing data for editing trip information'
      background='gradient-green'
    >
      <PrefilledForm />
    </ComponentStory>
  ),
}

const AllTripTypesForm = () => {
  const [formData, setFormData] = useState({
    title: 'Business Trip to Tokyo',
    destination: 'Tokyo',
    country: 'Japan',
    type: 'business',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='space-y-8'>
      <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
        <h3 className='text-lg font-semibold mb-4'>Try Different Trip Types</h3>
        <TripFormBasicInfo formData={formData} onChange={handleChange} />
      </div>

      <div className='p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto'>
        <h4 className='font-semibold mb-2'>Trip Type Examples:</h4>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div>
            <strong>Leisure:</strong> Vacation, relaxation
          </div>
          <div>
            <strong>Business:</strong> Work trips, conferences
          </div>
          <div>
            <strong>Family:</strong> Family vacations, reunions
          </div>
          <div>
            <strong>Adventure:</strong> Hiking, extreme sports
          </div>
          <div>
            <strong>Honeymoon:</strong> Romantic getaways
          </div>
          <div>
            <strong>Solo:</strong> Personal journeys
          </div>
          <div>
            <strong>Group:</strong> Friends, organizations
          </div>
          <div>
            <strong>Other:</strong> Custom trip types
          </div>
        </div>
      </div>
    </div>
  )
}

export const AllTripTypes: Story = {
  render: () => (
    <ComponentStory
      title='Trip Form - All Trip Types'
      description='Form showcasing all available trip type options with examples'
      background='gradient-purple'
    >
      <AllTripTypesForm />
    </ComponentStory>
  ),
}

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    type: 'leisure',
  })

  const [showValidation, setShowValidation] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setShowValidation(false)
  }

  const validateForm = () => {
    setShowValidation(true)
    const isValid = formData.title && formData.destination && formData.country
    alert(isValid ? '✅ Form is valid!' : '❌ Please fill all required fields')
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormBasicInfo formData={formData} onChange={handleChange} />

      {showValidation && (
        <div className='mt-4 space-y-2'>
          {!formData.title && <div className='text-red-600 text-sm'>• Trip title is required</div>}
          {!formData.destination && (
            <div className='text-red-600 text-sm'>• Destination is required</div>
          )}
          {!formData.country && <div className='text-red-600 text-sm'>• Country is required</div>}
        </div>
      )}

      <button
        onClick={validateForm}
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Validate Form
      </button>
    </div>
  )
}

export const WithValidation: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <ValidationForm />
    </div>
  ),
}

const InteractiveExamples = () => {
  const [currentExample, setCurrentExample] = useState(0)

  const examples = [
    {
      title: 'Tokyo Adventure',
      destination: 'Tokyo',
      country: 'Japan',
      type: 'adventure',
    },
    {
      title: 'European Business Tour',
      destination: 'Berlin',
      country: 'Germany',
      type: 'business',
    },
    {
      title: 'Maldives Honeymoon',
      destination: 'Malé',
      country: 'Maldives',
      type: 'honeymoon',
    },
    {
      title: 'Family Disney Trip',
      destination: 'Orlando',
      country: 'USA',
      type: 'family',
    },
  ]

  const [formData, setFormData] = useState(examples[0])

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const loadExample = (index: number) => {
    setCurrentExample(index)
    setFormData(examples[index])
  }

  return (
    <div className='space-y-6'>
      <div className='p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-semibold mb-3'>Try These Examples:</h3>
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
              {example.title}
            </button>
          ))}
        </div>
      </div>

      <div className='p-8 bg-white rounded-lg'>
        <TripFormBasicInfo formData={formData} onChange={handleChange} />
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
