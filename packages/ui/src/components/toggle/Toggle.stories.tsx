import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './Toggle'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

const meta: Meta<typeof Toggle> = {
  title: 'Components/UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle aria-label='Toggle bold'>
      <BoldIcon />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: () => <Toggle aria-label='Toggle italic'>Bold</Toggle>,
}

export const Variants: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <Toggle variant='default' aria-label='Toggle bold'>
        <BoldIcon />
      </Toggle>
      <Toggle variant='outline' aria-label='Toggle italic'>
        <ItalicIcon />
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <Toggle size='sm' aria-label='Toggle bold'>
        <BoldIcon />
      </Toggle>
      <Toggle size='default' aria-label='Toggle italic'>
        <ItalicIcon />
      </Toggle>
      <Toggle size='lg' aria-label='Toggle underline'>
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
}

export const TextEditor: Story = {
  render: () => (
    <div className='flex items-center space-x-1 p-2 border rounded-lg'>
      <Toggle size='sm' aria-label='Toggle bold'>
        <BoldIcon />
      </Toggle>
      <Toggle size='sm' aria-label='Toggle italic'>
        <ItalicIcon />
      </Toggle>
      <Toggle size='sm' aria-label='Toggle underline'>
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
}
