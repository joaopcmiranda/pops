import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TripFormDates } from './TripFormDates'

const DefaultForm = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return null
  }

  const duration = calculateDuration()

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDates formData={formData} onChange={handleChange} />

      {duration && (
        <div className='mt-4 p-4 bg-green-50 rounded-lg'>
          <h4 className='font-semibold text-green-800'>Trip Duration</h4>
          <p className='text-green-700'>
            {duration} {duration === 1 ? 'day' : 'days'}
          </p>
        </div>
      )}

      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h4 className='font-semibold mb-2'>Current Form Data:</h4>
        <pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}

const meta: Meta<typeof TripFormDates> = {
  title: 'Components/TripFormDates',
  component: TripFormDates,
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
    startDate: '2024-06-15',
    endDate: '2024-06-22',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDates formData={formData} onChange={handleChange} />
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

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  })

  const [showValidation, setShowValidation] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setShowValidation(false)
  }

  const validateDates = () => {
    setShowValidation(true)
    const errors = []
    if (!formData.startDate) errors.push('Start date is required')
    if (!formData.endDate) errors.push('End date is required')
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (start < today) errors.push('Start date cannot be in the past')
      if (end < start) errors.push('End date must be after start date')
      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 365) errors.push('Trip duration cannot exceed 1 year')
    }

    if (errors.length === 0) {
      alert('✅ Dates are valid!')
    } else {
      alert('❌ Validation errors:\n' + errors.join('\n'))
    }
  }

  return (
    <div className='p-8 bg-white rounded-lg max-w-2xl mx-auto'>
      <TripFormDates formData={formData} onChange={handleChange} />

      {showValidation && (
        <div className='mt-4 space-y-2'>
          {!formData.startDate && (
            <div className='text-red-600 text-sm'>• Start date is required</div>
          )}
          {!formData.endDate && <div className='text-red-600 text-sm'>• End date is required</div>}
          {formData.startDate &&
            formData.endDate &&
            new Date(formData.endDate) < new Date(formData.startDate) && (
              <div className='text-red-600 text-sm'>• End date must be after start date</div>
            )}
        </div>
      )}

      <button
        onClick={validateDates}
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Validate Dates
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
      name: 'Weekend Trip',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
    },
    {
      name: 'Week-long Vacation',
      startDate: '2024-06-01',
      endDate: '2024-06-08',
    },
    {
      name: 'Extended Journey',
      startDate: '2024-09-01',
      endDate: '2024-09-30',
    },
    {
      name: 'Day Trip',
      startDate: '2024-04-20',
      endDate: '2024-04-20',
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

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return null
  }

  const duration = calculateDuration()

  return (
    <div className='space-y-6'>
      <div className='p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-semibold mb-3'>Try These Date Ranges:</h3>
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
        <TripFormDates formData={formData} onChange={handleChange} />

        {duration !== null && (
          <div className='mt-4 p-4 bg-green-50 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='font-semibold text-green-800'>Trip Duration</h4>
                <p className='text-green-700'>
                  {duration} {duration === 1 ? 'day' : 'days'}
                </p>
              </div>
              <div className='text-2xl'>
                {duration === 1 ? '📅' : duration <= 7 ? '🗓️' : duration <= 30 ? '📆' : '🗓️✈️'}
              </div>
            </div>
          </div>
        )}
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

const DateConstraintsDemo = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className='space-y-6'>
      <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
        <h3 className='font-semibold text-yellow-800 mb-2'>Date Constraints Demo</h3>
        <ul className='text-yellow-700 text-sm space-y-1'>
          <li>• Start date cannot be in the past</li>
          <li>• End date is automatically constrained by start date</li>
          <li>• Try selecting dates to see the constraints in action</li>
        </ul>
      </div>

      <div className='p-8 bg-white rounded-lg'>
        <TripFormDates formData={formData} onChange={handleChange} />

        <div className='mt-4 text-sm text-gray-600'>
          <p>
            <strong>Today:</strong> {today}
          </p>
          {formData.startDate && (
            <p>
              <strong>Selected start:</strong> {formData.startDate}
            </p>
          )}
          {formData.endDate && (
            <p>
              <strong>Selected end:</strong> {formData.endDate}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const DateConstraints: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <DateConstraintsDemo />
    </div>
  ),
}
