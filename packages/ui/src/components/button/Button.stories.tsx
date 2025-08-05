import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <Button {...args}>Default Button</Button>,
  args: {
    variant: 'default',
    size: 'default',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-8 max-w-4xl'>
      <div className='flex gap-4 flex-wrap'>
        <Button variant='default'>Default</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>
      </div>

      <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>Usage Guidelines:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>
            • <strong>Default:</strong> Primary actions like "Save" or "Create"
          </li>
          <li>
            • <strong>Destructive:</strong> Dangerous actions like "Delete"
          </li>
          <li>
            • <strong>Outline:</strong> Secondary actions like "Cancel"
          </li>
          <li>
            • <strong>Secondary:</strong> Tertiary actions or alternative options
          </li>
          <li>
            • <strong>Ghost:</strong> Subtle actions that don't need emphasis
          </li>
          <li>
            • <strong>Link:</strong> Navigation or text-like actions
          </li>
        </ul>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className='space-y-8 max-w-4xl'>
      <div className='flex gap-4 items-center flex-wrap'>
        <Button size='sm'>Small</Button>
        <Button size='default'>Default</Button>
        <Button size='lg'>Large</Button>
        <Button size='icon'>🎯</Button>
      </div>

      <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
        <h4 className='font-semibold text-green-900 mb-2'>Size Guidelines:</h4>
        <ul className='text-sm text-green-800 space-y-1'>
          <li>
            • <strong>Small:</strong> Compact spaces, inline actions
          </li>
          <li>
            • <strong>Default:</strong> Standard button size for most use cases
          </li>
          <li>
            • <strong>Large:</strong> Primary actions, call-to-action buttons
          </li>
          <li>
            • <strong>Icon:</strong> Single icon buttons, toggle buttons
          </li>
        </ul>
      </div>
    </div>
  ),
}
