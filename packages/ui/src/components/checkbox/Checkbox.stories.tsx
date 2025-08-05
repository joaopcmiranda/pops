import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

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
    </div>
  )
}

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
}

export const ErrorStates: Story = {
  render: () => (
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
                <p className='text-xs text-red-600 mt-1'>Age verification is required to proceed</p>
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
  ),
}
