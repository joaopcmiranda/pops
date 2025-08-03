import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { ComponentStory } from '../../StoryWrapper'
import '../../../styles/story-fonts.css'

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
    <ComponentStory
      title='Button Variants'
      description='All available button variants with usage guidelines'
      background='gradient-blue'
    >
      <div className='space-y-8'>
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
    </ComponentStory>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <ComponentStory
      title='Button Sizes'
      description='All available button sizes from small to large'
      background='gradient-green'
    >
      <div className='space-y-8'>
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
              • <strong>Small:</strong> Compact spaces, tables, cards
            </li>
            <li>
              • <strong>Default:</strong> Most common use case
            </li>
            <li>
              • <strong>Large:</strong> Hero sections, important CTAs
            </li>
            <li>
              • <strong>Icon:</strong> Square buttons with just icons
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const States: Story = {
  render: () => (
    <ComponentStory
      title='Button States'
      description='Interactive and disabled states for all button variants'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-semibold mb-3 text-gray-700'>Normal vs Disabled</h4>
            <div className='flex gap-4 flex-wrap'>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-3 text-gray-700'>All Variants Disabled</h4>
            <div className='flex gap-4 flex-wrap'>
              <Button variant='default' disabled>
                Default
              </Button>
              <Button variant='destructive' disabled>
                Destructive
              </Button>
              <Button variant='outline' disabled>
                Outline
              </Button>
              <Button variant='secondary' disabled>
                Secondary
              </Button>
              <Button variant='ghost' disabled>
                Ghost
              </Button>
            </div>
          </div>
        </div>

        <div className='p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>State Usage:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Use disabled state when actions are temporarily unavailable</li>
            <li>• Consider loading states for async operations</li>
            <li>• Provide clear feedback when buttons become interactive again</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: args => (
    <ComponentStory
      title='Interactive Button'
      description='Button with click interactions and configurable properties'
      background='gradient-orange'
    >
      <div className='text-center'>
        <Button
          {...args}
          onClick={() => alert('🎉 Button clicked! This demonstrates interactive behavior.')}
        >
          Click Me
        </Button>

        <div className='mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Click the button to see the alert dialog</li>
            <li>• Use Ladle controls to change variant and size</li>
            <li>• Test different combinations of properties</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
  args: {
    variant: 'default',
    size: 'default',
  },
}
