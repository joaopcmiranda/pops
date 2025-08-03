import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'
import { ComponentStory } from '../StoryWrapper'
import { useState } from 'react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Checkbox />,
}

export const BasicStates: Story = {
  render: () => (
    <ComponentStory
      title='Checkbox States'
      description='All basic checkbox states including unchecked, checked, and disabled'
      background='gradient-blue'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <Checkbox id='unchecked' />
            <label htmlFor='unchecked' className='text-sm font-medium'>
              Unchecked state
            </label>
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox id='checked' defaultChecked />
            <label htmlFor='checked' className='text-sm font-medium'>
              Checked state
            </label>
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox id='disabled-unchecked' disabled />
            <label htmlFor='disabled-unchecked' className='text-sm font-medium text-gray-400'>
              Disabled unchecked
            </label>
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox id='disabled-checked' disabled defaultChecked />
            <label htmlFor='disabled-checked' className='text-sm font-medium text-gray-400'>
              Disabled checked
            </label>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>State Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Always pair checkboxes with descriptive labels</li>
            <li>• Use disabled state when options are conditionally unavailable</li>
            <li>• Ensure adequate spacing between checkbox and label</li>
            <li>• Consider using indeterminate state for partial selections</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const TripPreferences: Story = {
  render: () => (
    <ComponentStory
      title='Trip Preferences Checkboxes'
      description='Real-world example of checkboxes for selecting travel preferences'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Travel Interests</h4>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <Checkbox id='museums' />
                <label htmlFor='museums' className='text-sm font-medium'>
                  Museums & Art Galleries
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='food' defaultChecked />
                <label htmlFor='food' className='text-sm font-medium'>
                  Food & Culinary Experiences
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='adventure' defaultChecked />
                <label htmlFor='adventure' className='text-sm font-medium'>
                  Adventure Activities
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='nightlife' />
                <label htmlFor='nightlife' className='text-sm font-medium'>
                  Nightlife & Entertainment
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='nature' defaultChecked />
                <label htmlFor='nature' className='text-sm font-medium'>
                  Nature & Outdoor Activities
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Accommodation Preferences</h4>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <Checkbox id='hotel' defaultChecked />
                <label htmlFor='hotel' className='text-sm font-medium'>
                  Hotels
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='airbnb' />
                <label htmlFor='airbnb' className='text-sm font-medium'>
                  Vacation Rentals
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='hostel' />
                <label htmlFor='hostel' className='text-sm font-medium'>
                  Hostels
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='boutique' />
                <label htmlFor='boutique' className='text-sm font-medium'>
                  Boutique Properties
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Transportation</h4>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <Checkbox id='flights' defaultChecked />
                <label htmlFor='flights' className='text-sm font-medium'>
                  Flights
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='trains' defaultChecked />
                <label htmlFor='trains' className='text-sm font-medium'>
                  Trains
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='car-rental' />
                <label htmlFor='car-rental' className='text-sm font-medium'>
                  Car Rental
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Checkbox id='bus' />
                <label htmlFor='bus' className='text-sm font-medium'>
                  Bus
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const PackingChecklist: Story = {
  render: () => (
    <ComponentStory
      title='Packing Checklist'
      description='Interactive packing checklist for trip preparation'
      background='gradient-purple'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            European Summer Trip - Packing List
          </h3>

          <div className='space-y-6'>
            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Documents</h4>
              <div className='space-y-2'>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='passport' defaultChecked />
                  <label htmlFor='passport' className='text-sm'>
                    Passport
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='visa' defaultChecked />
                  <label htmlFor='visa' className='text-sm'>
                    Visa (if required)
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='tickets' />
                  <label htmlFor='tickets' className='text-sm'>
                    Flight tickets
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='insurance' />
                  <label htmlFor='insurance' className='text-sm'>
                    Travel insurance
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='hotel' />
                  <label htmlFor='hotel' className='text-sm'>
                    Hotel confirmations
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Clothing</h4>
              <div className='space-y-2'>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='shirts' defaultChecked />
                  <label htmlFor='shirts' className='text-sm'>
                    T-shirts (5)
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='pants' defaultChecked />
                  <label htmlFor='pants' className='text-sm'>
                    Pants/Jeans (3)
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='underwear' />
                  <label htmlFor='underwear' className='text-sm'>
                    Underwear (7 pairs)
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='jacket' />
                  <label htmlFor='jacket' className='text-sm'>
                    Light jacket
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='shoes' />
                  <label htmlFor='shoes' className='text-sm'>
                    Comfortable walking shoes
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Electronics</h4>
              <div className='space-y-2'>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='phone' defaultChecked />
                  <label htmlFor='phone' className='text-sm'>
                    Phone & charger
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='camera' />
                  <label htmlFor='camera' className='text-sm'>
                    Camera
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='adapter' />
                  <label htmlFor='adapter' className='text-sm'>
                    Universal power adapter
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox id='powerbank' />
                  <label htmlFor='powerbank' className='text-sm'>
                    Portable charger
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 p-3 bg-green-50 rounded-lg border border-green-100'>
            <p className='text-sm text-green-800'>
              <span className='font-medium'>Progress:</span> 5 of 16 items packed
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const PermissionsAndAgreements: Story = {
  render: () => (
    <ComponentStory
      title='Permissions & Agreements'
      description='Checkboxes for user consent, permissions, and legal agreements'
      background='gradient-orange'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div className='p-4 bg-white rounded-lg border'>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Privacy & Communications</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox id='newsletter' className='mt-0.5' />
                <label htmlFor='newsletter' className='text-sm'>
                  I want to receive travel tips and destination updates via email
                </label>
              </div>
              <div className='flex items-start space-x-3'>
                <Checkbox id='sms' className='mt-0.5' />
                <label htmlFor='sms' className='text-sm'>
                  Send me SMS notifications for important trip updates
                </label>
              </div>
              <div className='flex items-start space-x-3'>
                <Checkbox id='marketing' className='mt-0.5' />
                <label htmlFor='marketing' className='text-sm'>
                  I agree to receive promotional offers from travel partners
                </label>
              </div>
            </div>
          </div>

          <div className='p-4 bg-white rounded-lg border'>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Required Agreements</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox id='terms' className='mt-0.5' defaultChecked />
                <label htmlFor='terms' className='text-sm'>
                  I agree to the{' '}
                  <a href='#' className='text-blue-600 underline'>
                    Terms of Service
                  </a>{' '}
                  *
                </label>
              </div>
              <div className='flex items-start space-x-3'>
                <Checkbox id='privacy' className='mt-0.5' defaultChecked />
                <label htmlFor='privacy' className='text-sm'>
                  I have read and accept the{' '}
                  <a href='#' className='text-blue-600 underline'>
                    Privacy Policy
                  </a>{' '}
                  *
                </label>
              </div>
              <div className='flex items-start space-x-3'>
                <Checkbox id='cancellation' className='mt-0.5' />
                <label htmlFor='cancellation' className='text-sm'>
                  I understand the{' '}
                  <a href='#' className='text-blue-600 underline'>
                    cancellation policy
                  </a>{' '}
                  *
                </label>
              </div>
            </div>
          </div>

          <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
            <div className='flex items-start space-x-3'>
              <Checkbox id='age' className='mt-0.5' />
              <label htmlFor='age' className='text-sm text-yellow-800'>
                I confirm that I am 18 years or older and authorized to make this booking *
              </label>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
const InteractiveDemoComponent = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    destination1: false,
    destination2: true,
    destination3: false,
    destination4: false,
  })

  const handleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const selectedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <ComponentStory
      title='Interactive Checkbox Demo'
      description='Dynamic checkbox behavior with state management and real-time feedback'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Select Your Destinations</h3>

          <div className='space-y-3 mb-4'>
            <div className='flex items-center space-x-3'>
              <Checkbox
                id='destination1'
                checked={checkedItems.destination1}
                onCheckedChange={() => handleCheck('destination1')}
              />
              <label htmlFor='destination1' className='text-sm font-medium cursor-pointer'>
                Paris, France - €800 per person
              </label>
            </div>
            <div className='flex items-center space-x-3'>
              <Checkbox
                id='destination2'
                checked={checkedItems.destination2}
                onCheckedChange={() => handleCheck('destination2')}
              />
              <label htmlFor='destination2' className='text-sm font-medium cursor-pointer'>
                Rome, Italy - €650 per person
              </label>
            </div>
            <div className='flex items-center space-x-3'>
              <Checkbox
                id='destination3'
                checked={checkedItems.destination3}
                onCheckedChange={() => handleCheck('destination3')}
              />
              <label htmlFor='destination3' className='text-sm font-medium cursor-pointer'>
                Barcelona, Spain - €600 per person
              </label>
            </div>
            <div className='flex items-center space-x-3'>
              <Checkbox
                id='destination4'
                checked={checkedItems.destination4}
                onCheckedChange={() => handleCheck('destination4')}
              />
              <label htmlFor='destination4' className='text-sm font-medium cursor-pointer'>
                Amsterdam, Netherlands - €700 per person
              </label>
            </div>
          </div>

          <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
            <h4 className='font-semibold text-blue-900 mb-2'>Selection Summary</h4>
            <p className='text-sm text-blue-800'>
              {selectedCount} destination{selectedCount !== 1 ? 's' : ''} selected
            </p>
            {selectedCount > 0 && (
              <p className='text-sm text-blue-800 mt-1'>
                Estimated total: €
                {Object.entries(checkedItems)
                  .filter(([, checked]) => checked)
                  .reduce((total, [key]) => {
                    const prices: Record<string, number> = {
                      destination1: 800,
                      destination2: 650,
                      destination3: 600,
                      destination4: 700,
                    }
                    return total + (prices[key] || 0)
                  }, 0)}{' '}
                per person
              </p>
            )}
          </div>
        </div>

        <div className='p-4 bg-pink-50 rounded-lg border border-pink-100'>
          <h4 className='font-semibold text-pink-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-pink-800 space-y-1'>
            <li>• Real-time selection count updates</li>
            <li>• Dynamic price calculation</li>
            <li>• Clickable labels for better UX</li>
            <li>• Visual feedback on state changes</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
}

export const ErrorStates: Story = {
  render: () => (
    <ComponentStory
      title='Checkbox Error States'
      description='Error handling and validation states for checkbox inputs'
      background='gradient-red'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div className='p-4 bg-white rounded-lg border'>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Required Selection</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox
                  id='required-terms'
                  className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
                  aria-invalid='true'
                />
                <div>
                  <label htmlFor='required-terms' className='text-sm font-medium'>
                    I agree to the Terms of Service *
                  </label>
                  <p className='text-xs text-red-600 mt-1'>This field is required</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox
                  id='age-verification'
                  className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
                  aria-invalid='true'
                />
                <div>
                  <label htmlFor='age-verification' className='text-sm font-medium'>
                    I confirm I am 18 or older *
                  </label>
                  <p className='text-xs text-red-600 mt-1'>
                    Age verification is required to proceed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='p-4 bg-red-50 rounded-lg border border-red-200'>
            <p className='text-sm text-red-800'>
              <span className='font-medium'>Error:</span> Please accept all required terms before
              continuing.
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
