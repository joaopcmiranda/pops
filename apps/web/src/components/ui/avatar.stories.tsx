import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Avatar> = {
  title: 'Components/UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        alt='John Doe'
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}
export const AllSizes: Story = {
  render: () => (
    <ComponentStory
      title='Avatar Sizes'
      description='Different avatar sizes for various use cases in the trip organizer'
      background='gradient-blue'
    >
      <div className='space-y-8'>
        <div className='flex items-center gap-6'>
          <div className='text-center'>
            <Avatar className='size-6'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face'
                alt='Small'
              />
              <AvatarFallback className='text-xs'>S</AvatarFallback>
            </Avatar>
            <p className='text-sm text-gray-600 mt-2'>Small (24px)</p>
          </div>

          <div className='text-center'>
            <Avatar className='size-8'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                alt='Default'
              />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <p className='text-sm text-gray-600 mt-2'>Default (32px)</p>
          </div>

          <div className='text-center'>
            <Avatar className='size-12'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
                alt='Medium'
              />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <p className='text-sm text-gray-600 mt-2'>Medium (48px)</p>
          </div>

          <div className='text-center'>
            <Avatar className='size-16'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
                alt='Large'
              />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <p className='text-sm text-gray-600 mt-2'>Large (64px)</p>
          </div>

          <div className='text-center'>
            <Avatar className='size-20'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
                alt='Extra Large'
              />
              <AvatarFallback className='text-lg'>XL</AvatarFallback>
            </Avatar>
            <p className='text-sm text-gray-600 mt-2'>Extra Large (80px)</p>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Size Usage Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>
              • <strong>Small (24px):</strong> Comments, activity feeds, compact lists
            </li>
            <li>
              • <strong>Default (32px):</strong> Navigation bars, user menus, trip member lists
            </li>
            <li>
              • <strong>Medium (48px):</strong> Trip organizer cards, user profiles in sidebar
            </li>
            <li>
              • <strong>Large (64px):</strong> Profile pages, user settings, trip leader displays
            </li>
            <li>
              • <strong>Extra Large (80px):</strong> User onboarding, profile editing, featured
              travelers
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithFallbacks: Story = {
  render: () => (
    <ComponentStory
      title='Avatar Fallbacks'
      description='Avatars with fallback initials when images fail to load'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='size-12'>
            <AvatarImage src='https://broken-image-url.jpg' alt='Alice Johnson' />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>

          <Avatar className='size-12'>
            <AvatarImage src='https://broken-image-url.jpg' alt='Bob Smith' />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>

          <Avatar className='size-12'>
            <AvatarImage src='https://broken-image-url.jpg' alt='Carol Davis' />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>

          <Avatar className='size-12'>
            <AvatarImage src='https://broken-image-url.jpg' alt='David Wilson' />
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
        </div>

        <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Fallback Best Practices:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Use 2-3 character initials from the user's name</li>
            <li>• Ensure good contrast between text and background</li>
            <li>• Consider using consistent colors for different user roles</li>
            <li>• Fallbacks should be meaningful and recognizable</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripMemberAvatars: Story = {
  render: () => (
    <ComponentStory
      title='Trip Member Avatars'
      description='Real-world examples showing trip organizer team members'
      background='gradient-purple'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>
            European Adventure 2024 - Team Members
          </h3>

          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-3 bg-white p-3 rounded-lg border'>
              <Avatar className='size-10'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                  alt='Alex Rodriguez'
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>Alex Rodriguez</p>
                <p className='text-xs text-gray-500'>Trip Organizer</p>
              </div>
            </div>

            <div className='flex items-center gap-3 bg-white p-3 rounded-lg border'>
              <Avatar className='size-10'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=40&h=40&fit=crop&crop=face'
                  alt='Sarah Chen'
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>Sarah Chen</p>
                <p className='text-xs text-gray-500'>Budget Manager</p>
              </div>
            </div>

            <div className='flex items-center gap-3 bg-white p-3 rounded-lg border'>
              <Avatar className='size-10'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                  alt='Mike Thompson'
                />
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>Mike Thompson</p>
                <p className='text-xs text-gray-500'>Activity Coordinator</p>
              </div>
            </div>

            <div className='flex items-center gap-3 bg-white p-3 rounded-lg border'>
              <Avatar className='size-10'>
                <AvatarImage src='https://broken-url.jpg' alt='Emma Wilson' />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>Emma Wilson</p>
                <p className='text-xs text-gray-500'>Travel Photographer</p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <h4 className='font-medium text-gray-700'>Quick Member List</h4>
          <div className='flex items-center gap-2'>
            <Avatar className='size-8'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                alt='Alex'
              />
              <AvatarFallback className='text-xs'>AR</AvatarFallback>
            </Avatar>
            <Avatar className='size-8'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=32&h=32&fit=crop&crop=face'
                alt='Sarah'
              />
              <AvatarFallback className='text-xs'>SC</AvatarFallback>
            </Avatar>
            <Avatar className='size-8'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                alt='Mike'
              />
              <AvatarFallback className='text-xs'>MT</AvatarFallback>
            </Avatar>
            <Avatar className='size-8'>
              <AvatarFallback className='text-xs'>EW</AvatarFallback>
            </Avatar>
            <Avatar className='size-8'>
              <AvatarFallback className='text-xs'>+3</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const StatusIndicators: Story = {
  render: () => (
    <ComponentStory
      title='Avatar with Status Indicators'
      description='Avatars enhanced with online status, notification badges, and role indicators'
      background='gradient-orange'
    >
      <div className='space-y-6'>
        <div className='flex items-center gap-6'>
          <div className='text-center'>
            <div className='relative'>
              <Avatar className='size-12'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
                  alt='Online User'
                />
                <AvatarFallback>ON</AvatarFallback>
              </Avatar>
              <div className='absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full border-2 border-white'></div>
            </div>
            <p className='text-sm text-gray-600 mt-2'>Online</p>
          </div>

          <div className='text-center'>
            <div className='relative'>
              <Avatar className='size-12'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=48&h=48&fit=crop&crop=face'
                  alt='Away User'
                />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
              <div className='absolute -bottom-0.5 -right-0.5 size-4 bg-yellow-500 rounded-full border-2 border-white'></div>
            </div>
            <p className='text-sm text-gray-600 mt-2'>Away</p>
          </div>

          <div className='text-center'>
            <div className='relative'>
              <Avatar className='size-12'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
                  alt='Offline User'
                />
                <AvatarFallback>OFF</AvatarFallback>
              </Avatar>
              <div className='absolute -bottom-0.5 -right-0.5 size-4 bg-gray-400 rounded-full border-2 border-white'></div>
            </div>
            <p className='text-sm text-gray-600 mt-2'>Offline</p>
          </div>

          <div className='text-center'>
            <div className='relative'>
              <Avatar className='size-12'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face'
                  alt='Notifications'
                />
                <AvatarFallback>NT</AvatarFallback>
              </Avatar>
              <div className='absolute -top-1 -right-1 size-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center'>
                <span className='text-xs font-bold text-white'>3</span>
              </div>
            </div>
            <p className='text-sm text-gray-600 mt-2'>Notifications</p>
          </div>
        </div>

        <div className='space-y-3'>
          <h4 className='font-medium text-gray-700'>Trip Leader with Crown</h4>
          <div className='relative inline-block'>
            <Avatar className='size-16'>
              <AvatarImage
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
                alt='Trip Leader'
              />
              <AvatarFallback className='text-lg'>TL</AvatarFallback>
            </Avatar>
            <div className='absolute -top-2 -right-2 size-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center'>
              <span className='text-sm'>👑</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Loading: Story = {
  render: () => (
    <ComponentStory
      title='Loading Avatar States'
      description='Avatar loading states and placeholder variations'
      background='gradient-pink'
    >
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <div className='size-12 rounded-full bg-gray-200 animate-pulse'></div>
          <div className='size-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'></div>
          <Avatar className='size-12'>
            <AvatarFallback className='animate-pulse bg-gray-200 text-transparent'>
              Loading
            </AvatarFallback>
          </Avatar>
        </div>

        <div className='p-4 bg-pink-50 rounded-lg border border-pink-100'>
          <h4 className='font-semibold text-pink-900 mb-2'>Loading State Recommendations:</h4>
          <ul className='text-sm text-pink-800 space-y-1'>
            <li>• Use skeleton loaders while fetching user data</li>
            <li>• Maintain consistent sizes during loading</li>
            <li>• Consider showing initials immediately if name is available</li>
            <li>• Gracefully handle failed image loads with fallbacks</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Avatars'
      description='Clickable avatars with hover effects and user interactions'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Avatar
            className='size-12 cursor-pointer ring-2 ring-transparent hover:ring-blue-300 transition-all duration-200 hover:scale-105'
            onClick={() => alert('Viewing Alex Rodriguez profile')}
          >
            <AvatarImage
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Alex Rodriguez'
            />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>

          <Avatar
            className='size-12 cursor-pointer ring-2 ring-transparent hover:ring-purple-300 transition-all duration-200 hover:scale-105'
            onClick={() => alert('Viewing Sarah Chen profile')}
          >
            <AvatarImage
              src='https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=48&h=48&fit=crop&crop=face'
              alt='Sarah Chen'
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>

          <Avatar
            className='size-12 cursor-pointer ring-2 ring-transparent hover:ring-green-300 transition-all duration-200 hover:scale-105'
            onClick={() => alert('Viewing Mike Thompson profile')}
          >
            <AvatarImage
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Mike Thompson'
            />
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
        </div>

        <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Click avatars to view user profiles</li>
            <li>• Hover effects provide visual feedback</li>
            <li>• Ring colors can indicate different user roles</li>
            <li>• Scale animations enhance interactivity</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
