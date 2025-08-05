import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Progress value={50} className='w-80' />,
}

export const Values: Story = {
  render: () => (
    <div className='space-y-4 w-80'>
      <div>
        <div className='flex justify-between text-sm mb-1'>
          <span>0%</span>
          <span>0/100</span>
        </div>
        <Progress value={0} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-1'>
          <span>25%</span>
          <span>25/100</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-1'>
          <span>50%</span>
          <span>50/100</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-1'>
          <span>75%</span>
          <span>75/100</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className='flex justify-between text-sm mb-1'>
          <span>100%</span>
          <span>100/100</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
}
