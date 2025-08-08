import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Label } from '../label'
import { Button } from '../button'

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'file',
      ],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default input field
 */
export const Default: Story = {
  render: args => <Input {...args} />,
  args: {
    type: 'text',
    placeholder: 'Enter text here...',
  },
}

/**
 * All input types showcase
 */
export const AllTypes: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='text-input'>Text Input</Label>
        <Input id='text-input' type='text' placeholder='Enter text' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email-input'>Email Input</Label>
        <Input id='email-input' type='email' placeholder='Enter your email' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password-input'>Password Input</Label>
        <Input id='password-input' type='password' placeholder='Enter your password' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='number-input'>Number Input</Label>
        <Input id='number-input' type='number' placeholder='Enter a number' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='tel-input'>Phone Input</Label>
        <Input id='tel-input' type='tel' placeholder='(555) 123-4567' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='url-input'>URL Input</Label>
        <Input id='url-input' type='url' placeholder='https://example.com' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='search-input'>Search Input</Label>
        <Input id='search-input' type='search' placeholder='Search...' />
      </div>
    </div>
  ),
}

/**
 * Date and time input types
 */
export const DateTimeTypes: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='date-input'>Date Input</Label>
        <Input id='date-input' type='date' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='time-input'>Time Input</Label>
        <Input id='time-input' type='time' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='datetime-input'>DateTime Local Input</Label>
        <Input id='datetime-input' type='datetime-local' />
      </div>

      <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>Date/Time Input Notes:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• Date inputs show a date picker on most browsers</li>
          <li>• Time inputs provide time selection widgets</li>
          <li>• DateTime inputs combine both date and time selection</li>
          <li>• Appearance may vary between browsers and devices</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * Input states (normal, disabled, error)
 */
export const States: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='normal-input'>Normal State</Label>
        <Input id='normal-input' type='text' placeholder='Normal input' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='focused-input'>Focused State (click to focus)</Label>
        <Input id='focused-input' type='text' placeholder='Click to focus' autoFocus />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='disabled-input' className='text-muted-foreground'>
          Disabled State
        </Label>
        <Input id='disabled-input' type='text' placeholder='Disabled input' disabled />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='error-input' className='text-destructive'>
          Error State
        </Label>
        <Input
          id='error-input'
          type='text'
          placeholder='Input with error'
          aria-invalid='true'
          className='border-destructive'
        />
        <p className='text-sm text-destructive'>This field is required</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='readonly-input'>Read-only State</Label>
        <Input
          id='readonly-input'
          type='text'
          value='Read-only value'
          readOnly
          className='bg-muted'
        />
      </div>
    </div>
  ),
}

/**
 * File input type
 */
export const FileInput: Story = {
  render: () => (
    <div className='space-y-6 w-96'>
      <div className='space-y-2'>
        <Label htmlFor='file-single'>Single File Upload</Label>
        <Input id='file-single' type='file' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='file-multiple'>Multiple Files Upload</Label>
        <Input id='file-multiple' type='file' multiple />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='file-accept'>Images Only</Label>
        <Input id='file-accept' type='file' accept='image/*' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='file-documents'>Documents Only</Label>
        <Input id='file-documents' type='file' accept='.pdf,.doc,.docx,.txt' />
      </div>

      <div className='p-4 bg-amber-50 rounded-lg border border-amber-100'>
        <h4 className='font-semibold text-amber-900 mb-2'>File Input Notes:</h4>
        <ul className='text-sm text-amber-800 space-y-1'>
          <li>• File inputs have special styling for the "Choose File" button</li>
          <li>• Use `accept` attribute to limit file types</li>
          <li>• Add `multiple` for selecting multiple files</li>
          <li>• File inputs cannot be fully styled with CSS</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * Input with various sizes using custom classes
 */
export const Sizes: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='small-input'>Small Input</Label>
        <Input id='small-input' type='text' placeholder='Small input' className='h-8 text-sm' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='default-input'>Default Input</Label>
        <Input id='default-input' type='text' placeholder='Default input' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='large-input'>Large Input</Label>
        <Input id='large-input' type='text' placeholder='Large input' className='h-12 text-lg' />
      </div>

      <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
        <h4 className='font-semibold text-green-900 mb-2'>Size Guidelines:</h4>
        <ul className='text-sm text-green-800 space-y-1'>
          <li>• Small: Use in compact spaces or dense forms</li>
          <li>• Default: Standard size for most use cases</li>
          <li>• Large: Use for prominent inputs or accessibility</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * Form examples with validation
 */
export const FormExamples: Story = {
  render: () => (
    <div className='space-y-8 w-96'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>User Registration Form</h3>
        <div className='space-y-4 p-6 border rounded-lg'>
          <div className='space-y-2'>
            <Label htmlFor='reg-email'>Email Address *</Label>
            <Input id='reg-email' type='email' placeholder='john@example.com' required />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-password'>Password *</Label>
            <Input id='reg-password' type='password' placeholder='••••••••' required />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-confirm'>Confirm Password *</Label>
            <Input id='reg-confirm' type='password' placeholder='••••••••' required />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-phone'>Phone Number</Label>
            <Input id='reg-phone' type='tel' placeholder='(555) 123-4567' />
          </div>

          <Button className='w-full'>Create Account</Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Search Form</h3>
        <div className='flex gap-2 p-6 border rounded-lg'>
          <Input type='search' placeholder='Search products...' className='flex-1' />
          <Button>Search</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Input with custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className='space-y-6 w-80'>
      <div className='space-y-2'>
        <Label htmlFor='custom-border'>Custom Border Color</Label>
        <Input
          id='custom-border'
          type='text'
          placeholder='Custom border'
          className='border-blue-500 focus-visible:border-blue-600'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='custom-bg'>Custom Background</Label>
        <Input id='custom-bg' type='text' placeholder='Custom background' className='bg-slate-50' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='rounded-full'>Fully Rounded</Label>
        <Input
          id='rounded-full'
          type='text'
          placeholder='Fully rounded input'
          className='rounded-full'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='no-shadow'>No Shadow</Label>
        <Input id='no-shadow' type='text' placeholder='No shadow input' className='shadow-none' />
      </div>
    </div>
  ),
}
