import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'
import { Input } from '../input'
import { Checkbox } from '../checkbox'
import { Button } from '../button'
import { HelpCircle, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof Label> = {
  title: 'Components/UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    htmlFor: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic label example
 */
export const Default: Story = {
  render: args => <Label {...args}>Default Label</Label>,
}

/**
 * Label with associated input
 */
export const WithInput: Story = {
  render: () => (
    <div className='space-y-2 w-80'>
      <Label htmlFor='email-input'>Email Address</Label>
      <Input id='email-input' type='email' placeholder='Enter your email' />
    </div>
  ),
}

/**
 * Required field with asterisk
 */
export const Required: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='required-input'>
          Full Name
          <span className='text-destructive ml-1'>*</span>
        </Label>
        <Input id='required-input' type='text' placeholder='Enter your full name' required />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='required-email'>
          Email Address
          <span className='text-destructive ml-1'>*</span>
        </Label>
        <Input id='required-email' type='email' placeholder='Enter your email' required />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='optional-phone'>Phone Number (optional)</Label>
        <Input id='optional-phone' type='tel' placeholder='Enter your phone number' />
      </div>
    </div>
  ),
}

/**
 * Label with icon
 */
export const WithIcon: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='help-input' className='flex items-center gap-2'>
          Username
          <HelpCircle className='h-4 w-4 text-muted-foreground' />
        </Label>
        <Input id='help-input' type='text' placeholder='Choose a username' />
        <p className='text-xs text-muted-foreground'>Must be unique and at least 3 characters</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='warning-input' className='flex items-center gap-2 text-amber-700'>
          <AlertTriangle className='h-4 w-4' />
          Sensitive Information
        </Label>
        <Input id='warning-input' type='password' placeholder='Enter sensitive data' />
        <p className='text-xs text-amber-600'>This information will be encrypted</p>
      </div>
    </div>
  ),
}

/**
 * Label states (disabled, error)
 */
export const States: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='normal-state'>Normal State</Label>
        <Input id='normal-state' type='text' placeholder='Normal input' />
      </div>

      <div className='space-y-2 group' data-disabled='true'>
        <Label htmlFor='disabled-state' className='text-muted-foreground'>
          Disabled State
        </Label>
        <Input id='disabled-state' type='text' placeholder='Disabled input' disabled />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='error-state' className='text-destructive'>
          Error State
        </Label>
        <Input
          id='error-state'
          type='text'
          placeholder='Invalid input'
          aria-invalid='true'
          className='border-destructive'
        />
        <p className='text-sm text-destructive'>This field contains an error</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='success-state' className='text-green-700'>
          Success State
        </Label>
        <Input
          id='success-state'
          type='text'
          value='Valid input'
          className='border-green-500'
          readOnly
        />
        <p className='text-sm text-green-600'>This field is valid</p>
      </div>
    </div>
  ),
}

/**
 * Label with checkbox and radio inputs
 */
export const WithCheckboxAndRadio: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <fieldset className='space-y-3'>
        <legend className='text-sm font-medium mb-3'>Preferences</legend>

        <div className='flex items-center space-x-2'>
          <Checkbox id='newsletter' />
          <Label htmlFor='newsletter'>Subscribe to newsletter</Label>
        </div>

        <div className='flex items-center space-x-2'>
          <Checkbox id='notifications' />
          <Label htmlFor='notifications'>Enable notifications</Label>
        </div>

        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <Label htmlFor='terms'>
            I agree to the terms and conditions
            <span className='text-destructive ml-1'>*</span>
          </Label>
        </div>
      </fieldset>

      <fieldset className='space-y-3'>
        <legend className='text-sm font-medium mb-3'>Contact Method</legend>

        <div className='flex items-center space-x-2'>
          <input type='radio' id='contact-email' name='contact' value='email' />
          <Label htmlFor='contact-email'>Email</Label>
        </div>

        <div className='flex items-center space-x-2'>
          <input type='radio' id='contact-phone' name='contact' value='phone' />
          <Label htmlFor='contact-phone'>Phone</Label>
        </div>

        <div className='flex items-center space-x-2'>
          <input type='radio' id='contact-mail' name='contact' value='mail' />
          <Label htmlFor='contact-mail'>Postal Mail</Label>
        </div>
      </fieldset>
    </div>
  ),
}

/**
 * Label with custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='large-label' className='text-lg font-bold'>
          Large Bold Label
        </Label>
        <Input id='large-label' type='text' placeholder='Large label input' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='small-label' className='text-xs uppercase tracking-wide'>
          Small Uppercase Label
        </Label>
        <Input id='small-label' type='text' placeholder='Small label input' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='colored-label' className='text-blue-600 font-semibold'>
          Colored Label
        </Label>
        <Input id='colored-label' type='text' placeholder='Colored label input' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='bg-label' className='bg-gray-100 px-2 py-1 rounded text-sm'>
          Background Label
        </Label>
        <Input id='bg-label' type='text' placeholder='Background label input' />
      </div>
    </div>
  ),
}

/**
 * Complex form with grouped labels
 */
export const ComplexForm: Story = {
  render: () => (
    <div className='space-y-8 w-96'>
      <div className='space-y-6'>
        <h3 className='text-lg font-semibold'>User Profile Form</h3>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='first-name'>
              First Name
              <span className='text-destructive ml-1'>*</span>
            </Label>
            <Input id='first-name' type='text' placeholder='John' required />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='last-name'>
              Last Name
              <span className='text-destructive ml-1'>*</span>
            </Label>
            <Input id='last-name' type='text' placeholder='Doe' required />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='profile-email'>
            Email Address
            <span className='text-destructive ml-1'>*</span>
          </Label>
          <Input id='profile-email' type='email' placeholder='john.doe@example.com' required />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='profile-bio'>Bio (optional)</Label>
          <textarea
            id='profile-bio'
            placeholder='Tell us about yourself...'
            className='w-full px-3 py-2 border border-input rounded-md min-h-20 resize-none'
          />
          <p className='text-xs text-muted-foreground'>Maximum 500 characters</p>
        </div>

        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Privacy Settings</Label>

          <div className='space-y-2 ml-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='profile-public' />
              <Label htmlFor='profile-public' className='text-sm'>
                Make profile public
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox id='email-visible' />
              <Label htmlFor='email-visible' className='text-sm'>
                Show email address
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox id='allow-messages' />
              <Label htmlFor='allow-messages' className='text-sm'>
                Allow direct messages
              </Label>
            </div>
          </div>
        </div>

        <Button className='w-full'>Save Profile</Button>
      </div>
    </div>
  ),
}

/**
 * Accessibility examples
 */
export const Accessibility: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>Accessibility Best Practices:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• Always associate labels with form controls using `htmlFor`</li>
          <li>• Use required indicators (* or text) for required fields</li>
          <li>• Provide clear, descriptive label text</li>
          <li>• Include help text when needed</li>
          <li>• Use proper contrast ratios for text</li>
        </ul>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='accessible-input' className='font-medium'>
            Accessible Input Example
            <span className='text-destructive ml-1' aria-label='required'>
              *
            </span>
          </Label>
          <Input
            id='accessible-input'
            type='text'
            placeholder='This input follows accessibility guidelines'
            aria-describedby='accessible-input-help'
            required
          />
          <p id='accessible-input-help' className='text-sm text-muted-foreground'>
            This field is required and properly described for screen readers
          </p>
        </div>
      </div>
    </div>
  ),
}
