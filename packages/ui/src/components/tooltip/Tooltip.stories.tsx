import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'
import { Button } from '../button'
import { HelpCircleIcon, InfoIcon, SettingsIcon } from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a basic tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' size='icon'>
            <HelpCircleIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Get help and support</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' size='icon'>
            <InfoIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information about this feature</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' size='icon'>
            <SettingsIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open settings panel</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-8 place-items-center'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Top</Button>
        </TooltipTrigger>
        <TooltipContent side='top'>
          <p>Tooltip positioned at top</p>
        </TooltipContent>
      </Tooltip>

      <div></div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Right</Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>Tooltip positioned at right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Left</Button>
        </TooltipTrigger>
        <TooltipContent side='left'>
          <p>Tooltip positioned at left</p>
        </TooltipContent>
      </Tooltip>

      <div></div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>Tooltip positioned at bottom</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className='space-y-4 text-center'>
      <h3 className='text-lg font-semibold'>Interactive Elements with Tooltips</h3>
      <div className='flex gap-4 justify-center'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Primary Action</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is the main action button</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='destructive'>Delete</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>⚠️ This action cannot be undone</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' disabled>
              Disabled
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This action is currently unavailable</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}
