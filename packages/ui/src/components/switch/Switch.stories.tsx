import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'
import { Label } from '../label'

const meta: Meta<typeof Switch> = {
  title: 'Components/UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Switch />,
}

export const WithLabel: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2'>
        <Switch id='enabled' />
        <Label htmlFor='enabled'>Enabled</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch id='checked' defaultChecked />
        <Label htmlFor='checked'>Checked</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch id='disabled' disabled />
        <Label htmlFor='disabled'>Disabled</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch id='disabled-checked' disabled defaultChecked />
        <Label htmlFor='disabled-checked'>Disabled & Checked</Label>
      </div>
    </div>
  ),
}
