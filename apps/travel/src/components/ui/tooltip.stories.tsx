import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'
import { Button } from './button/button'
import { ComponentStory } from '../StoryWrapper'
import {
  InfoIcon,
  HelpCircleIcon,
  UserIcon,
  SettingsIcon,
  TrashIcon,
  EditIcon,
  CopyIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
} from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Tooltip, TooltipTrigger, TooltipContent, TooltipProvider> = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Tooltips'
      description='Simple tooltips with different trigger elements'
      background='gradient-blue'
    >
      <TooltipProvider>
        <div className='flex items-center justify-center space-x-8'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a basic tooltip</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon'>
                <InfoIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Information tooltip</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className='cursor-pointer text-blue-600 underline'>Hover this text</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip on text element</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}

export const Positioning: Story = {
  render: () => (
    <ComponentStory
      title='Tooltip Positioning'
      description='Tooltips positioned on different sides of the trigger element'
      background='gradient-green'
    >
      <TooltipProvider>
        <div className='grid grid-cols-3 gap-8 place-items-center max-w-md mx-auto'>
          <div></div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Top</Button>
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>Tooltip on top</p>
            </TooltipContent>
          </Tooltip>
          <div></div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Left</Button>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Tooltip on left</p>
            </TooltipContent>
          </Tooltip>

          <div className='text-center text-sm text-muted-foreground'>
            Hover buttons
            <br />
            to see tooltips
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Right</Button>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>Tooltip on right</p>
            </TooltipContent>
          </Tooltip>

          <div></div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Tooltip on bottom</p>
            </TooltipContent>
          </Tooltip>
          <div></div>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <ComponentStory
      title='Icon Button Tooltips'
      description='Tooltips providing context for icon-only buttons'
      background='gradient-purple'
    >
      <TooltipProvider>
        <div className='flex items-center justify-center space-x-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <UserIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Profile</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <SettingsIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <EditIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <CopyIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <ShareIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share Item</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size='icon' variant='outline'>
                <TrashIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Item</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}

export const HelpTooltips: Story = {
  render: () => (
    <ComponentStory
      title='Help & Information Tooltips'
      description='Tooltips providing helpful information and explanations'
      background='gradient-orange'
    >
      <TooltipProvider>
        <div className='max-w-md mx-auto space-y-6'>
          <div className='bg-white p-4 border rounded-lg'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>API Key</label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircleIcon className='h-4 w-4 text-muted-foreground cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>
                    <p>
                      Your API key is used to authenticate requests. Keep it secure and never share
                      it publicly.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input className='w-full p-2 border rounded' placeholder='sk-1234567890...' />

              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>Rate Limit</label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className='h-4 w-4 text-muted-foreground cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>
                    <p>Maximum number of requests per hour. Upgrade your plan for higher limits.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <select className='w-full p-2 border rounded'>
                <option>100 requests/hour</option>
                <option>1,000 requests/hour</option>
                <option>10,000 requests/hour</option>
              </select>

              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>Webhook URL</label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircleIcon className='h-4 w-4 text-muted-foreground cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>
                    <p>
                      Optional endpoint to receive real-time notifications about events. Must be
                      HTTPS.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                className='w-full p-2 border rounded'
                placeholder='https://yoursite.com/webhook'
              />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}

export const InteractiveElements: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Element Tooltips'
      description='Tooltips on various interactive elements like links, badges, and cards'
      background='gradient-pink'
    >
      <TooltipProvider>
        <div className='space-y-8'>
          <div className='text-center'>
            <h4 className='font-medium mb-4'>Social Actions</h4>
            <div className='flex items-center justify-center space-x-4'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className='flex items-center space-x-1 text-red-500 hover:text-red-600'>
                    <HeartIcon className='h-5 w-5' />
                    <span>24</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>24 people liked this</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className='flex items-center space-x-1 text-yellow-500 hover:text-yellow-600'>
                    <StarIcon className='h-5 w-5' />
                    <span>12</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>12 people starred this</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className='flex items-center space-x-1 text-blue-500 hover:text-blue-600'>
                    <ShareIcon className='h-5 w-5' />
                    <span>5</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>5 people shared this</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className='text-center'>
            <h4 className='font-medium mb-4'>Status Badges</h4>
            <div className='flex items-center justify-center space-x-3'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-help'>
                    Active
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Service is running normally</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 cursor-help'>
                    Pending
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Waiting for approval</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 cursor-help'>
                    Error
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Service encountered an error</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className='text-center'>
            <h4 className='font-medium mb-4'>User Mentions</h4>
            <p className='text-sm max-w-md mx-auto'>
              This feature was implemented by{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='text-blue-600 cursor-pointer hover:underline'>@johndoe</span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className='text-center'>
                    <p className='font-medium'>John Doe</p>
                    <p className='text-xs text-muted-foreground'>Senior Developer</p>
                  </div>
                </TooltipContent>
              </Tooltip>{' '}
              and reviewed by{' '}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='text-blue-600 cursor-pointer hover:underline'>@sarahsmith</span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className='text-center'>
                    <p className='font-medium'>Sarah Smith</p>
                    <p className='text-xs text-muted-foreground'>Tech Lead</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}

export const DelayedTooltips: Story = {
  render: () => (
    <ComponentStory
      title='Tooltip Timing & Delays'
      description='Tooltips with different delay and timing configurations'
      background='gradient-blue'
    >
      <div className='space-y-8 text-center'>
        <div>
          <h4 className='font-medium mb-4'>No Delay (Instant)</h4>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline'>Instant Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears immediately on hover</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <h4 className='font-medium mb-4'>Short Delay (300ms)</h4>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline'>Short Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears after a short delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <h4 className='font-medium mb-4'>Medium Delay (700ms)</h4>
          <TooltipProvider delayDuration={700}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline'>Medium Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears after a medium delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <h4 className='font-medium mb-4'>Long Delay (1000ms)</h4>
          <TooltipProvider delayDuration={1000}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline'>Long Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears after a long delay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-lg mx-auto'>
          <h4 className='font-semibold text-blue-900 mb-2'>Tooltip Timing Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1 text-left'>
            <li>
              • <strong>Instant (0ms):</strong> For critical information that users need immediately
            </li>
            <li>
              • <strong>Short (300ms):</strong> Good balance for most interactive elements
            </li>
            <li>
              • <strong>Medium (700ms):</strong> For supplementary information
            </li>
            <li>
              • <strong>Long (1000ms+):</strong> For detailed help text or documentation
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const ComplexContent: Story = {
  render: () => (
    <ComponentStory
      title='Rich Tooltip Content'
      description='Tooltips with complex content including lists, formatting, and multiple elements'
      background='gradient-green'
    >
      <TooltipProvider>
        <div className='flex items-center justify-center space-x-8'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Keyboard Shortcuts</Button>
            </TooltipTrigger>
            <TooltipContent className='max-w-xs'>
              <div className='space-y-2'>
                <p className='font-medium'>Quick Actions:</p>
                <div className='space-y-1 text-xs'>
                  <div className='flex justify-between'>
                    <span>New File</span>
                    <kbd className='bg-gray-100 px-1 rounded text-xs'>⌘N</kbd>
                  </div>
                  <div className='flex justify-between'>
                    <span>Save</span>
                    <kbd className='bg-gray-100 px-1 rounded text-xs'>⌘S</kbd>
                  </div>
                  <div className='flex justify-between'>
                    <span>Find</span>
                    <kbd className='bg-gray-100 px-1 rounded text-xs'>⌘F</kbd>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Project Stats</Button>
            </TooltipTrigger>
            <TooltipContent className='max-w-sm'>
              <div className='space-y-2'>
                <p className='font-medium'>Trip Organizer Project</p>
                <div className='text-xs space-y-1'>
                  <div className='flex justify-between'>
                    <span>Files:</span>
                    <span>1,247</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Lines of Code:</span>
                    <span>45,302</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Contributors:</span>
                    <span>8</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Last Updated:</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className='pt-1 border-t'>
                  <div className='flex space-x-1'>
                    <span className='inline-block w-2 h-2 bg-blue-400 rounded-full'></span>
                    <span className='text-xs'>TypeScript 68%</span>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Feature List</Button>
            </TooltipTrigger>
            <TooltipContent className='max-w-xs'>
              <div className='space-y-2'>
                <p className='font-medium'>Available Features:</p>
                <ul className='text-xs space-y-1'>
                  <li>✅ Trip Planning</li>
                  <li>✅ Itinerary Management</li>
                  <li>✅ Budget Tracking</li>
                  <li>✅ Document Storage</li>
                  <li>🚧 Real-time Collaboration</li>
                  <li>📋 Mobile App (Planned)</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ComponentStory>
  ),
}
