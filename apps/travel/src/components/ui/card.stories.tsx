import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button/button'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Card - Default Layout'
      description='Standard card component with header, content, and footer sections'
      background='gradient-blue'
    >
      <div className='max-w-md mx-auto'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area where you can put any content.</p>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline'>Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </ComponentStory>
  ),
}

export const SimpleCard: Story = {
  render: () => (
    <ComponentStory
      title='Card - Simple Content Only'
      description='Minimal card with just content section for simple layouts'
      background='gradient-green'
    >
      <div className='max-w-md mx-auto'>
        <Card className='w-full'>
          <CardContent className='pt-6'>
            <p>This is a simple card with just content, no header or footer.</p>
          </CardContent>
        </Card>
      </div>
    </ComponentStory>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <ComponentStory
      title='Card - Header Only'
      description='Card with only header section for titles and descriptions'
      background='gradient-purple'
    >
      <div className='max-w-md mx-auto'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Trip to Tokyo</CardTitle>
            <CardDescription>7 days of adventure in Japan's capital</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </ComponentStory>
  ),
}

export const TripCard: Story = {
  render: () => (
    <ComponentStory
      title='Card - Trip Information'
      description='Complete trip card with all sections and interactive elements'
      background='gradient-orange'
    >
      <div className='max-w-md mx-auto'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Rio de Janeiro</CardTitle>
            <CardDescription>March 15-22, 2024 • 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Budget:</span>
                <span className='text-sm font-medium'>$2,500</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Status:</span>
                <span className='text-sm font-medium text-green-600'>Confirmed</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>View Trip</Button>
          </CardFooter>
        </Card>
      </div>
    </ComponentStory>
  ),
}

export const CategoryCard: Story = {
  render: () => (
    <ComponentStory
      title='Card - Category Display'
      description='Icon-based category card with hover effects and centered content'
      background='gradient-red'
    >
      <div className='max-w-xs mx-auto'>
        <Card className='w-full h-[150px] hover:shadow-lg transition-shadow cursor-pointer'>
          <CardContent className='flex flex-col items-center justify-center h-full text-center p-6'>
            <div className='text-3xl mb-2'>🏨</div>
            <CardTitle className='text-lg'>Accommodation</CardTitle>
            <CardDescription className='text-xs mt-1'>Hotels & Lodging</CardDescription>
          </CardContent>
        </Card>
      </div>
    </ComponentStory>
  ),
}

export const MultipleCards: Story = {
  render: () => (
    <ComponentStory
      title='Card - Grid Layout'
      description='Multiple category cards in responsive grid layout with consistent spacing'
      background='gradient-cyan'
    >
      <div className='space-y-8'>
        <h3 className='text-2xl font-bold text-center text-gray-800'>Trip Categories</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {[
            { icon: '🌎', title: 'Destinations', desc: 'Places to visit' },
            { icon: '📅', title: 'Itinerary', desc: 'Daily schedules' },
            { icon: '✈️', title: 'Transport', desc: 'Flights & trains' },
            { icon: '🏨', title: 'Accommodation', desc: 'Hotels & lodging' },
            { icon: '🎯', title: 'Activities', desc: 'Things to do' },
            { icon: '💰', title: 'Budget', desc: 'Cost tracking' },
          ].map((item, index) => (
            <Card
              key={index}
              className='h-[150px] hover:shadow-lg transition-shadow cursor-pointer'
            >
              <CardContent className='flex flex-col items-center justify-center h-full text-center p-6'>
                <div className='text-3xl mb-2'>{item.icon}</div>
                <CardTitle className='text-lg'>{item.title}</CardTitle>
                <CardDescription className='text-xs mt-1'>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-2'>Grid Features:</h4>
          <ul className='text-sm text-cyan-800 space-y-1'>
            <li>• Responsive grid adapts to screen size</li>
            <li>• Consistent card height and hover effects</li>
            <li>• Icon-centered design with clear typography</li>
            <li>• Hover states provide visual feedback</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
