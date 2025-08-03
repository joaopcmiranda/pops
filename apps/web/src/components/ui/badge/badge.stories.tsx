import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'
import { ComponentStory } from '../../StoryWrapper'
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  AlertTriangle,
  Plane,
} from 'lucide-react'
import '../../../styles/story-fonts.css'

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <Badge {...args}>Default Badge</Badge>,
  args: {
    variant: 'default',
  },
}

export const AllVariants: Story = {
  render: () => (
    <ComponentStory
      title='Badge Variants'
      description='All available badge variants with different visual styles'
      background='gradient-blue'
    >
      <div className='space-y-8'>
        <div className='flex gap-3 flex-wrap'>
          <Badge variant='default'>Default</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Variant Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>
              • <strong>Default:</strong> Important status, confirmed bookings, primary categories
            </li>
            <li>
              • <strong>Secondary:</strong> Neutral information, additional details, optional tags
            </li>
            <li>
              • <strong>Destructive:</strong> Warnings, cancellations, urgent issues, errors
            </li>
            <li>
              • <strong>Outline:</strong> Subtle labels, filter tags, non-critical information
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ComponentStory
      title='Badges with Icons'
      description='Badges enhanced with contextual icons for better visual communication'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Travel Status Badges</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge variant='default'>
                <CheckCircle className='w-3 h-3' />
                Confirmed
              </Badge>
              <Badge variant='secondary'>
                <Clock className='w-3 h-3' />
                Pending
              </Badge>
              <Badge variant='destructive'>
                <AlertTriangle className='w-3 h-3' />
                Cancelled
              </Badge>
              <Badge variant='outline'>
                <Plane className='w-3 h-3' />
                In Transit
              </Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Category Badges</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge variant='default'>
                <MapPin className='w-3 h-3' />
                Destination
              </Badge>
              <Badge variant='secondary'>
                <DollarSign className='w-3 h-3' />
                Budget
              </Badge>
              <Badge variant='outline'>
                <Users className='w-3 h-3' />
                Group
              </Badge>
              <Badge variant='outline'>
                <Star className='w-3 h-3' />
                Premium
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripOrganizationBadges: Story = {
  render: () => (
    <ComponentStory
      title='Trip Organization Badges'
      description='Real-world examples of badges used in trip planning and organization'
      background='gradient-purple'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Booking Status</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge variant='default'>Booked</Badge>
              <Badge variant='secondary'>Waitlist</Badge>
              <Badge variant='outline'>Available</Badge>
              <Badge variant='destructive'>Sold Out</Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Trip Types</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge variant='default'>Adventure</Badge>
              <Badge variant='secondary'>Cultural</Badge>
              <Badge variant='outline'>Relaxation</Badge>
              <Badge variant='outline'>Business</Badge>
              <Badge variant='secondary'>Family</Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Priority Levels</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge variant='destructive'>High Priority</Badge>
              <Badge variant='default'>Medium Priority</Badge>
              <Badge variant='outline'>Low Priority</Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Travel Preferences</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge variant='outline'>Budget Friendly</Badge>
              <Badge variant='secondary'>Luxury</Badge>
              <Badge variant='outline'>Eco-Friendly</Badge>
              <Badge variant='outline'>Local Experience</Badge>
              <Badge variant='secondary'>Food Tours</Badge>
              <Badge variant='outline'>Photography</Badge>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InteractiveBadges: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Badges'
      description='Clickable badges that can be used as filters or action triggers'
      background='gradient-orange'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>
              Filter Tags (Click to toggle)
            </h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-accent transition-colors'
                onClick={() => alert('Europe filter toggled!')}
              >
                Europe
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-accent transition-colors'
                onClick={() => alert('Asia filter toggled!')}
              >
                Asia
              </Badge>
              <Badge
                variant='default'
                className='cursor-pointer hover:bg-primary/90 transition-colors'
                onClick={() => alert('Beach filter active!')}
              >
                Beach
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-accent transition-colors'
                onClick={() => alert('Mountain filter toggled!')}
              >
                Mountain
              </Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Action Badges</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge
                variant='default'
                className='cursor-pointer hover:bg-primary/90 transition-colors'
                onClick={() => alert('Quick booking initiated!')}
              >
                <CheckCircle className='w-3 h-3' />
                Quick Book
              </Badge>
              <Badge
                variant='secondary'
                className='cursor-pointer hover:bg-secondary/90 transition-colors'
                onClick={() => alert('Added to wishlist!')}
              >
                <Star className='w-3 h-3' />
                Add to Wishlist
              </Badge>
              <Badge
                variant='outline'
                className='cursor-pointer hover:bg-accent transition-colors'
                onClick={() => alert('Sharing trip details!')}
              >
                <Users className='w-3 h-3' />
                Share
              </Badge>
            </div>
          </div>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Click badges to see interaction feedback</li>
            <li>• Hover effects provide visual feedback</li>
            <li>• Different variants can indicate selected/unselected states</li>
            <li>• Icons help communicate the badge function</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <ComponentStory
      title='Count and Number Badges'
      description='Badges displaying counts, numbers, and quantitative information'
      background='gradient-pink'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Notification Counts</h4>
            <div className='flex gap-3 items-center flex-wrap'>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>Messages</span>
                <Badge variant='destructive'>3</Badge>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>Bookings</span>
                <Badge variant='default'>12</Badge>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>Updates</span>
                <Badge variant='secondary'>5</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Trip Statistics</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge variant='outline'>8 Days</Badge>
              <Badge variant='outline'>4 Cities</Badge>
              <Badge variant='outline'>2 Countries</Badge>
              <Badge variant='secondary'>$2,450</Badge>
              <Badge variant='outline'>6 People</Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Progress Indicators</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge variant='default'>3/5 Booked</Badge>
              <Badge variant='secondary'>75% Complete</Badge>
              <Badge variant='outline'>2 Pending</Badge>
              <Badge variant='destructive'>1 Overdue</Badge>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const SizesAndStates: Story = {
  render: () => (
    <ComponentStory
      title='Badge Sizes and States'
      description='Different badge sizes and various states for comprehensive usage'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Different Sizes</h4>
            <div className='flex gap-3 items-center flex-wrap'>
              <Badge className='text-xs px-1.5 py-0.5'>Small</Badge>
              <Badge>Default</Badge>
              <Badge className='text-sm px-3 py-1'>Large</Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Disabled State</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge className='opacity-50 cursor-not-allowed pointer-events-none'>
                Disabled Default
              </Badge>
              <Badge
                variant='secondary'
                className='opacity-50 cursor-not-allowed pointer-events-none'
              >
                Disabled Secondary
              </Badge>
              <Badge
                variant='outline'
                className='opacity-50 cursor-not-allowed pointer-events-none'
              >
                Disabled Outline
              </Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Loading State</h4>
            <div className='flex gap-3 flex-wrap'>
              <Badge className='animate-pulse'>Loading...</Badge>
              <Badge variant='secondary'>
                <Clock className='w-3 h-3 animate-spin' />
                Processing
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: args => (
    <ComponentStory
      title='Interactive Badge Controls'
      description='Badge with configurable properties using Ladle controls'
      background='gradient-blue'
    >
      <div className='text-center space-y-4'>
        <Badge {...args}>Customizable Badge</Badge>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Control Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Use Ladle controls to change the variant</li>
            <li>• Test different badge styles and behaviors</li>
            <li>• Experiment with custom content and styling</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

Interactive.args = {
  variant: 'default',
}
