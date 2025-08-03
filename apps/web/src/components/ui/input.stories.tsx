import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { ComponentStory } from '../StoryWrapper'
import { Search, Mail, Lock, User, Calendar, MapPin, DollarSign, Phone } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Input placeholder='Enter your destination...' />,
}

export const AllTypes: Story = {
  render: () => (
    <ComponentStory
      title='Input Types'
      description='All available HTML input types commonly used in trip organization'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Text Input</label>
            <Input type='text' placeholder='Enter destination name...' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <Input type='email' placeholder='your.email@example.com' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <Input type='password' placeholder='Enter your password' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Number</label>
            <Input type='number' placeholder='Number of travelers' min='1' max='20' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
            <Input type='date' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
            <Input type='time' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>URL</label>
            <Input type='url' placeholder='https://www.booking.com/...' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Search</label>
            <Input type='search' placeholder='Search destinations, hotels...' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Telephone</label>
            <Input type='tel' placeholder='+1 (555) 123-4567' />
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Type Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Use appropriate input types for better UX and validation</li>
            <li>• Date/time inputs provide native calendar pickers</li>
            <li>• Email/URL types enable browser validation</li>
            <li>• Number inputs include increment/decrement controls</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithLabelsAndHelpers: Story = {
  render: () => (
    <ComponentStory
      title='Input with Labels and Helper Text'
      description='Properly labeled inputs with helpful descriptions and error states'
      background='gradient-green'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label htmlFor='destination' className='block text-sm font-medium text-gray-700 mb-1'>
              Destination *
            </label>
            <Input
              id='destination'
              type='text'
              placeholder='e.g., Paris, France'
              aria-describedby='destination-help'
            />
            <p id='destination-help' className='text-xs text-gray-500 mt-1'>
              Enter the city and country you'd like to visit
            </p>
          </div>

          <div>
            <label htmlFor='travelers' className='block text-sm font-medium text-gray-700 mb-1'>
              Number of Travelers
            </label>
            <Input
              id='travelers'
              type='number'
              placeholder='2'
              min='1'
              max='20'
              aria-describedby='travelers-help'
            />
            <p id='travelers-help' className='text-xs text-gray-500 mt-1'>
              Including yourself (maximum 20 people)
            </p>
          </div>

          <div>
            <label htmlFor='budget' className='block text-sm font-medium text-gray-700 mb-1'>
              Budget Range
            </label>
            <Input id='budget' type='number' placeholder='1500' aria-describedby='budget-help' />
            <p id='budget-help' className='text-xs text-gray-500 mt-1'>
              Total budget in USD for the entire trip
            </p>
          </div>

          <div>
            <label htmlFor='email-error' className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address *
            </label>
            <Input
              id='email-error'
              type='email'
              placeholder='invalid-email'
              className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
              aria-describedby='email-error-message'
            />
            <p id='email-error-message' className='text-xs text-red-600 mt-1'>
              Please enter a valid email address
            </p>
          </div>

          <div>
            <label htmlFor='success-input' className='block text-sm font-medium text-gray-700 mb-1'>
              Confirmation Code
            </label>
            <Input
              id='success-input'
              type='text'
              placeholder='ABC123'
              value='XYZ789'
              className='border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
              readOnly
              aria-describedby='success-message'
            />
            <p id='success-message' className='text-xs text-green-600 mt-1'>
              ✓ Booking confirmed successfully
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ComponentStory
      title='Input with Icons'
      description='Inputs enhanced with contextual icons for better visual clarity'
      background='gradient-purple'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Search Destinations
            </label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input className='pl-10' placeholder='Search for cities, countries...' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input type='email' className='pl-10' placeholder='your.email@example.com' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input type='password' className='pl-10' placeholder='Enter password' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input className='pl-10' placeholder='John Doe' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Departure Date</label>
            <div className='relative'>
              <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input type='date' className='pl-10' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
            <div className='relative'>
              <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input className='pl-10' placeholder='Current location' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Budget</label>
            <div className='relative'>
              <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input type='number' className='pl-10' placeholder='2500' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input type='tel' className='pl-10' placeholder='+1 (555) 123-4567' />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const States: Story = {
  render: () => (
    <ComponentStory
      title='Input States'
      description='Different input states including normal, disabled, readonly, and error states'
      background='gradient-orange'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Normal State</label>
            <Input placeholder='Enter destination' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-400 mb-1'>Disabled State</label>
            <Input placeholder='Input is disabled' disabled />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Readonly State</label>
            <Input value='Paris, France' readOnly />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Error State</label>
            <Input
              placeholder='Invalid input'
              className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Success State</label>
            <Input
              value='Booking confirmed!'
              className='border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
              readOnly
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Loading State</label>
            <Input placeholder='Loading...' className='animate-pulse' />
          </div>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>State Usage:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>
              • <strong>Disabled:</strong> When input should not be interactable
            </li>
            <li>
              • <strong>Readonly:</strong> When data should be visible but not editable
            </li>
            <li>
              • <strong>Error:</strong> When validation fails or input is invalid
            </li>
            <li>
              • <strong>Success:</strong> When input is validated and confirmed
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripPlanningForm: Story = {
  render: () => (
    <ComponentStory
      title='Trip Planning Form Example'
      description='Real-world example of inputs used in a trip planning context'
      background='gradient-pink'
    >
      <div className='max-w-md space-y-6'>
        <div className='p-6 bg-white rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Plan Your Trip</h3>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Where do you want to go?
              </label>
              <div className='relative'>
                <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input className='pl-10' placeholder='Paris, Tokyo, New York...' />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Departure</label>
                <Input type='date' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Return</label>
                <Input type='date' />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Travelers</label>
                <Input type='number' placeholder='2' min='1' max='20' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Budget ($)</label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input type='number' className='pl-10' placeholder='2500' />
                </div>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Email</label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input type='email' className='pl-10' placeholder='your.email@example.com' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Special Requests
              </label>
              <Input placeholder='Dietary restrictions, accessibility needs...' />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const FileUpload: Story = {
  render: () => (
    <ComponentStory
      title='File Upload Input'
      description='File input variations for document and image uploads'
      background='gradient-green'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Upload Passport</label>
            <Input type='file' accept='image/*,.pdf' />
            <p className='text-xs text-gray-500 mt-1'>Accepted formats: JPG, PNG, PDF (max 5MB)</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Flight Tickets</label>
            <Input type='file' accept='.pdf,.jpg,.png' multiple />
            <p className='text-xs text-gray-500 mt-1'>You can select multiple files</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Travel Insurance</label>
            <Input type='file' accept='.pdf' />
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Input Demo'
      description='Interactive inputs with real-time feedback and validation'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Character Counter
            </label>
            <Input
              placeholder='Describe your trip (max 100 characters)'
              maxLength={100}
              onChange={e => {
                const remaining = 100 - e.target.value.length
                const counter = e.target.parentElement?.querySelector('.char-counter')
                if (counter) {
                  counter.textContent = `${remaining} characters remaining`
                  counter.className = `char-counter text-xs mt-1 ${remaining < 20 ? 'text-red-500' : 'text-gray-500'}`
                }
              }}
            />
            <p className='char-counter text-xs text-gray-500 mt-1'>100 characters remaining</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Live Search</label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                className='pl-10'
                placeholder='Type to search destinations...'
                onChange={e => {
                  const value = e.target.value
                  const feedback =
                    e.target.parentElement?.parentElement?.querySelector('.search-feedback')
                  if (feedback) {
                    if (value.length > 2) {
                      feedback.textContent = `Searching for "${value}"...`
                      feedback.className = 'search-feedback text-xs text-blue-600 mt-1'
                    } else if (value.length > 0) {
                      feedback.textContent = 'Type at least 3 characters to search'
                      feedback.className = 'search-feedback text-xs text-gray-500 mt-1'
                    } else {
                      feedback.textContent = ''
                    }
                  }
                }}
              />
            </div>
            <p className='search-feedback text-xs text-gray-500 mt-1'></p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Budget Calculator
            </label>
            <div className='relative'>
              <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                type='number'
                className='pl-10'
                placeholder='Enter total budget'
                onChange={e => {
                  const value = parseFloat(e.target.value)
                  const calc = e.target.parentElement?.parentElement?.querySelector('.budget-calc')
                  if (calc && !isNaN(value)) {
                    const perDay = (value / 7).toFixed(0)
                    calc.textContent = `≈ $${perDay} per day for a 7-day trip`
                    calc.className = 'budget-calc text-xs text-green-600 mt-1'
                  } else if (calc) {
                    calc.textContent = ''
                  }
                }}
              />
            </div>
            <p className='budget-calc text-xs text-gray-500 mt-1'></p>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Character counter updates in real-time</li>
            <li>• Search provides instant feedback</li>
            <li>• Budget calculator shows per-day breakdown</li>
            <li>• Visual feedback enhances user experience</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
