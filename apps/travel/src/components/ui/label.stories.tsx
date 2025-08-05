import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Input } from './input'
import { Checkbox } from './checkbox'
import { ComponentStory } from '../StoryWrapper'
import { Asterisk, Info, AlertCircle } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Label> = {
  title: 'Components/UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Label>Default Label</Label>,
}

export const BasicLabels: Story = {
  render: () => (
    <ComponentStory
      title='Basic Labels'
      description='Different label styles and configurations for form elements'
      background='gradient-blue'
    >
      <div className='space-y-6'>
        <div className='space-y-4 max-w-md'>
          <div>
            <Label htmlFor='basic-input'>Basic Label</Label>
            <Input id='basic-input' placeholder='Enter text...' className='mt-1' />
          </div>

          <div>
            <Label htmlFor='required-input' className='font-semibold'>
              Required Field
              <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
            </Label>
            <Input id='required-input' placeholder='This field is required' className='mt-1' />
          </div>

          <div>
            <Label htmlFor='optional-input' className='text-gray-600'>
              Optional Field
              <span className='text-xs font-normal text-gray-400 ml-1'>(optional)</span>
            </Label>
            <Input id='optional-input' placeholder='This field is optional' className='mt-1' />
          </div>

          <div>
            <Label htmlFor='disabled-input' className='opacity-50'>
              Disabled Field
            </Label>
            <Input id='disabled-input' placeholder='Disabled input' disabled className='mt-1' />
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Label Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Always associate labels with form controls using htmlFor</li>
            <li>• Use required indicators (*) for mandatory fields</li>
            <li>• Keep label text concise and descriptive</li>
            <li>• Consider visual hierarchy with font weights</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripFormLabels: Story = {
  render: () => (
    <ComponentStory
      title='Trip Planning Form Labels'
      description='Real-world examples of labels used in trip organization forms'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Trip Details</h3>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='trip-name' className='font-medium'>
                Trip Name
                <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
              </Label>
              <Input id='trip-name' placeholder='European Adventure 2024' className='mt-1' />
            </div>

            <div>
              <Label htmlFor='destination' className='font-medium'>
                Primary Destination
                <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
              </Label>
              <Input id='destination' placeholder='Paris, France' className='mt-1' />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label htmlFor='start-date' className='font-medium'>
                  Start Date
                  <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
                </Label>
                <Input id='start-date' type='date' className='mt-1' />
              </div>
              <div>
                <Label htmlFor='end-date' className='font-medium'>
                  End Date
                  <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
                </Label>
                <Input id='end-date' type='date' className='mt-1' />
              </div>
            </div>

            <div>
              <Label htmlFor='travelers' className='font-medium'>
                Number of Travelers
              </Label>
              <Input
                id='travelers'
                type='number'
                placeholder='2'
                min='1'
                max='20'
                className='mt-1'
              />
            </div>

            <div>
              <Label htmlFor='budget' className='font-medium'>
                Budget (USD)
                <span className='text-xs font-normal text-gray-500 ml-1'>(optional)</span>
              </Label>
              <Input id='budget' type='number' placeholder='3000' className='mt-1' />
            </div>

            <div>
              <Label htmlFor='notes' className='font-medium'>
                Special Requirements
                <span className='text-xs font-normal text-gray-500 ml-1'>(optional)</span>
              </Label>
              <Input
                id='notes'
                placeholder='Dietary restrictions, accessibility needs...'
                className='mt-1'
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithHelpText: Story = {
  render: () => (
    <ComponentStory
      title='Labels with Help Text'
      description='Labels enhanced with helpful descriptions and contextual information'
      background='gradient-purple'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-5'>
          <div>
            <Label htmlFor='passport-number' className='font-medium flex items-center gap-2'>
              Passport Number
              <Asterisk className='w-3 h-3 text-red-500' />
              <Info className='w-4 h-4 text-gray-400' />
            </Label>
            <Input id='passport-number' placeholder='A12345678' className='mt-1' />
            <p className='text-xs text-gray-500 mt-1'>
              Found on the information page of your passport (usually starts with a letter)
            </p>
          </div>

          <div>
            <Label htmlFor='emergency-contact' className='font-medium flex items-center gap-2'>
              Emergency Contact
              <Asterisk className='w-3 h-3 text-red-500' />
              <Info className='w-4 h-4 text-gray-400' />
            </Label>
            <Input id='emergency-contact' placeholder='+1 (555) 123-4567' className='mt-1' />
            <p className='text-xs text-gray-500 mt-1'>
              Phone number of someone who should be contacted in case of emergency
            </p>
          </div>

          <div>
            <Label htmlFor='dietary-restrictions' className='font-medium flex items-center gap-2'>
              Dietary Restrictions
              <Info className='w-4 h-4 text-gray-400' />
            </Label>
            <Input
              id='dietary-restrictions'
              placeholder='Vegetarian, gluten-free, etc.'
              className='mt-1'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Help us accommodate your dietary needs when booking restaurants and activities
            </p>
          </div>

          <div>
            <Label htmlFor='insurance-provider' className='font-medium flex items-center gap-2'>
              Travel Insurance Provider
              <span className='text-xs font-normal text-gray-500'>(recommended)</span>
              <Info className='w-4 h-4 text-gray-400' />
            </Label>
            <Input
              id='insurance-provider'
              placeholder='World Nomads, Allianz, etc.'
              className='mt-1'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Having travel insurance is highly recommended for international trips
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const ErrorAndWarningLabels: Story = {
  render: () => (
    <ComponentStory
      title='Error and Warning Labels'
      description='Labels with error states, warnings, and validation feedback'
      background='gradient-orange'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-5'>
          <div>
            <Label
              htmlFor='invalid-email'
              className='font-medium text-red-700 flex items-center gap-2'
            >
              Email Address
              <Asterisk className='w-3 h-3 text-red-500' />
              <AlertCircle className='w-4 h-4 text-red-500' />
            </Label>
            <Input
              id='invalid-email'
              type='email'
              placeholder='invalid-email'
              className='mt-1 border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
            />
            <p className='text-xs text-red-600 mt-1'>Please enter a valid email address</p>
          </div>

          <div>
            <Label
              htmlFor='expired-passport'
              className='font-medium text-amber-700 flex items-center gap-2'
            >
              Passport Expiry Date
              <Asterisk className='w-3 h-3 text-red-500' />
              <AlertCircle className='w-4 h-4 text-amber-500' />
            </Label>
            <Input
              id='expired-passport'
              type='date'
              className='mt-1 border-amber-300 focus-visible:border-amber-500 focus-visible:ring-amber-200'
            />
            <p className='text-xs text-amber-600 mt-1'>
              Warning: Your passport expires in less than 6 months. Some countries may deny entry.
            </p>
          </div>

          <div>
            <Label
              htmlFor='missing-field'
              className='font-medium text-red-700 flex items-center gap-2'
            >
              Travel Dates
              <Asterisk className='w-3 h-3 text-red-500' />
              <AlertCircle className='w-4 h-4 text-red-500' />
            </Label>
            <Input
              id='missing-field'
              type='date'
              className='mt-1 border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
            />
            <p className='text-xs text-red-600 mt-1'>
              This field is required to calculate your itinerary
            </p>
          </div>

          <div>
            <Label
              htmlFor='success-field'
              className='font-medium text-green-700 flex items-center gap-2'
            >
              Booking Reference
              <span className='w-4 h-4 text-green-500'>✓</span>
            </Label>
            <Input
              id='success-field'
              value='ABC123XYZ'
              className='mt-1 border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
              readOnly
            />
            <p className='text-xs text-green-600 mt-1'>Booking confirmed successfully</p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const CheckboxLabels: Story = {
  render: () => (
    <ComponentStory
      title='Checkbox Labels'
      description='Labels specifically designed for checkbox and radio button interactions'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-5'>
          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Travel Preferences</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox id='luxury' className='mt-0.5' />
                <Label htmlFor='luxury' className='cursor-pointer'>
                  I prefer luxury accommodations and experiences
                </Label>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox id='budget' className='mt-0.5' />
                <Label htmlFor='budget' className='cursor-pointer'>
                  I'm looking for budget-friendly options
                </Label>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox id='adventure' className='mt-0.5' />
                <Label htmlFor='adventure' className='cursor-pointer'>
                  I enjoy adventure activities and outdoor experiences
                </Label>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox id='cultural' className='mt-0.5' />
                <Label htmlFor='cultural' className='cursor-pointer'>
                  I'm interested in cultural sites and local experiences
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Notifications</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox id='email-updates' className='mt-0.5' defaultChecked />
                <Label htmlFor='email-updates' className='cursor-pointer'>
                  Send me email updates about my trip
                  <span className='text-xs text-gray-500 block'>
                    Includes booking confirmations and travel tips
                  </span>
                </Label>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox id='sms-alerts' className='mt-0.5' />
                <Label htmlFor='sms-alerts' className='cursor-pointer'>
                  Send SMS alerts for urgent updates
                  <span className='text-xs text-gray-500 block'>
                    Flight delays, gate changes, etc.
                  </span>
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Legal Agreements</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <Checkbox id='terms-checkbox' className='mt-0.5' />
                <Label htmlFor='terms-checkbox' className='cursor-pointer'>
                  I agree to the{' '}
                  <a href='#' className='text-blue-600 underline'>
                    Terms of Service
                  </a>
                  <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
                </Label>
              </div>

              <div className='flex items-start space-x-3'>
                <Checkbox id='privacy-checkbox' className='mt-0.5' />
                <Label htmlFor='privacy-checkbox' className='cursor-pointer'>
                  I have read the{' '}
                  <a href='#' className='text-blue-600 underline'>
                    Privacy Policy
                  </a>
                  <Asterisk className='w-3 h-3 text-red-500 inline ml-1' />
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const ResponsiveLabels: Story = {
  render: () => (
    <ComponentStory
      title='Responsive Label Layouts'
      description='Labels that adapt to different screen sizes and form layouts'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>
              Stacked Layout (Mobile-first)
            </h4>
            <div className='space-y-4 max-w-sm'>
              <div>
                <Label htmlFor='mobile-destination' className='block font-medium'>
                  Destination
                </Label>
                <Input id='mobile-destination' placeholder='Where to?' className='mt-1 w-full' />
              </div>
              <div>
                <Label htmlFor='mobile-dates' className='block font-medium'>
                  Travel Dates
                </Label>
                <Input id='mobile-dates' type='date' className='mt-1 w-full' />
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>
              Horizontal Layout (Desktop)
            </h4>
            <div className='space-y-4 max-w-2xl'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-center'>
                <Label htmlFor='desktop-destination' className='font-medium md:text-right'>
                  Destination:
                </Label>
                <div className='md:col-span-3'>
                  <Input id='desktop-destination' placeholder='Enter your destination' />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-center'>
                <Label htmlFor='desktop-travelers' className='font-medium md:text-right'>
                  Travelers:
                </Label>
                <div className='md:col-span-3'>
                  <Input id='desktop-travelers' type='number' placeholder='Number of people' />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Inline Labels</h4>
            <div className='flex flex-wrap gap-4 items-center'>
              <Label htmlFor='quick-search' className='font-medium'>
                Quick Search:
              </Label>
              <Input id='quick-search' placeholder='City or country' className='flex-1 min-w-48' />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
