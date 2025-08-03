import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'
import { Button } from './button/button'
import { ComponentStory } from '../StoryWrapper'
import {
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  HomeIcon,
  FileIcon,
  SearchIcon,
} from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Separator> = {
  title: 'Components/UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Separators'
      description='Horizontal and vertical separators for organizing content'
      background='gradient-blue'
    >
      <div className='space-y-8 max-w-md mx-auto'>
        <div>
          <h4 className='font-medium mb-4'>Horizontal Separator</h4>
          <div className='space-y-4'>
            <p className='text-sm'>Content above the separator</p>
            <Separator />
            <p className='text-sm'>Content below the separator</p>
          </div>
        </div>

        <div>
          <h4 className='font-medium mb-4'>Vertical Separator</h4>
          <div className='flex items-center space-x-4 h-16'>
            <div className='text-sm'>Left content</div>
            <Separator orientation='vertical' />
            <div className='text-sm'>Right content</div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InMenus: Story = {
  render: () => (
    <ComponentStory
      title='Separators in Menus'
      description='Using separators to group related menu items'
      background='gradient-green'
    >
      <div className='max-w-xs mx-auto'>
        <div className='border rounded-lg bg-white shadow-sm'>
          <div className='p-1'>
            <div className='px-2 py-1.5 text-sm font-medium text-muted-foreground'>Navigation</div>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <HomeIcon className='mr-2 h-4 w-4' />
              Dashboard
            </button>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <FileIcon className='mr-2 h-4 w-4' />
              Projects
            </button>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <SearchIcon className='mr-2 h-4 w-4' />
              Search
            </button>

            <Separator className='my-1' />

            <div className='px-2 py-1.5 text-sm font-medium text-muted-foreground'>Account</div>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <UserIcon className='mr-2 h-4 w-4' />
              Profile
            </button>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <SettingsIcon className='mr-2 h-4 w-4' />
              Settings
            </button>

            <Separator className='my-1' />

            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100'>
              <HelpCircleIcon className='mr-2 h-4 w-4' />
              Help
            </button>
            <button className='w-full flex items-center px-2 py-1.5 text-sm rounded hover:bg-gray-100 text-red-600'>
              <LogOutIcon className='mr-2 h-4 w-4' />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InForms: Story = {
  render: () => (
    <ComponentStory
      title='Separators in Forms'
      description='Organizing form sections with separators'
      background='gradient-purple'
    >
      <div className='max-w-md mx-auto'>
        <div className='bg-white p-6 border rounded-lg'>
          <h3 className='text-lg font-semibold mb-4'>User Profile</h3>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>First Name</label>
              <input className='w-full p-2 border rounded-md' placeholder='John' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Last Name</label>
              <input className='w-full p-2 border rounded-md' placeholder='Doe' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input className='w-full p-2 border rounded-md' placeholder='john@example.com' />
            </div>
          </div>

          <Separator className='my-6' />

          <h4 className='font-medium mb-3'>Contact Information</h4>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Phone Number</label>
              <input className='w-full p-2 border rounded-md' placeholder='+1 (555) 123-4567' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Address</label>
              <textarea
                className='w-full p-2 border rounded-md'
                rows={3}
                placeholder='Enter your address'
              />
            </div>
          </div>

          <Separator className='my-6' />

          <h4 className='font-medium mb-3'>Preferences</h4>
          <div className='space-y-3'>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>Email notifications</span>
            </label>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>SMS notifications</span>
            </label>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>Marketing communications</span>
            </label>
          </div>

          <Separator className='my-6' />

          <div className='flex justify-end space-x-2'>
            <Button variant='outline'>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InToolbars: Story = {
  render: () => (
    <ComponentStory
      title='Separators in Toolbars'
      description='Grouping toolbar actions with vertical separators'
      background='gradient-orange'
    >
      <div className='max-w-2xl mx-auto space-y-6'>
        <div className='bg-white border rounded-lg p-3'>
          <div className='flex items-center space-x-2'>
            <Button size='sm' variant='outline'>
              <FileIcon className='h-4 w-4' />
            </Button>
            <Button size='sm' variant='outline'>
              Open
            </Button>
            <Button size='sm' variant='outline'>
              Save
            </Button>

            <Separator orientation='vertical' className='h-6' />

            <Button size='sm' variant='outline'>
              Cut
            </Button>
            <Button size='sm' variant='outline'>
              Copy
            </Button>
            <Button size='sm' variant='outline'>
              Paste
            </Button>

            <Separator orientation='vertical' className='h-6' />

            <Button size='sm' variant='outline'>
              Undo
            </Button>
            <Button size='sm' variant='outline'>
              Redo
            </Button>

            <Separator orientation='vertical' className='h-6' />

            <Button size='sm' variant='outline'>
              Help
            </Button>
          </div>
        </div>

        <div className='bg-white border rounded-lg p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Button size='sm' variant='ghost'>
                Bold
              </Button>
              <Button size='sm' variant='ghost'>
                Italic
              </Button>
              <Button size='sm' variant='ghost'>
                Underline
              </Button>

              <Separator orientation='vertical' className='h-6' />

              <Button size='sm' variant='ghost'>
                Left
              </Button>
              <Button size='sm' variant='ghost'>
                Center
              </Button>
              <Button size='sm' variant='ghost'>
                Right
              </Button>
            </div>

            <div className='flex items-center space-x-2'>
              <Separator orientation='vertical' className='h-6' />

              <select className='text-sm border rounded px-2 py-1'>
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Times</option>
              </select>

              <select className='text-sm border rounded px-2 py-1'>
                <option>12px</option>
                <option>14px</option>
                <option>16px</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InCards: Story = {
  render: () => (
    <ComponentStory
      title='Separators in Cards'
      description='Using separators to organize card content sections'
      background='gradient-pink'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
        <div className='bg-white border rounded-lg p-6'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
              <UserIcon className='h-5 w-5 text-blue-600' />
            </div>
            <div>
              <h3 className='font-semibold'>John Doe</h3>
              <p className='text-sm text-muted-foreground'>Software Engineer</p>
            </div>
          </div>

          <Separator />

          <div className='py-4'>
            <p className='text-sm text-muted-foreground'>
              Passionate about creating user-friendly applications and solving complex problems.
            </p>
          </div>

          <Separator />

          <div className='pt-4 flex justify-between text-sm'>
            <span>Projects: 24</span>
            <span>Experience: 5 years</span>
          </div>
        </div>

        <div className='bg-white border rounded-lg overflow-hidden'>
          <div className='p-4'>
            <h3 className='font-semibold'>Trip to Paris</h3>
            <p className='text-sm text-muted-foreground'>March 15-22, 2024</p>
          </div>

          <Separator />

          <div className='p-4'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Flight</span>
                <span className='font-medium'>$450</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Hotel (7 nights)</span>
                <span className='font-medium'>$840</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Activities</span>
                <span className='font-medium'>$320</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className='p-4 bg-gray-50'>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>$1,610</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const CustomStyles: Story = {
  render: () => (
    <ComponentStory
      title='Custom Separator Styles'
      description='Separators with different colors, thicknesses, and patterns'
      background='gradient-blue'
    >
      <div className='space-y-8 max-w-md mx-auto'>
        <div className='space-y-4'>
          <h4 className='font-medium'>Default Separator</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <Separator />
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Thick Separator</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <Separator className='h-0.5' />
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Colored Separator</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <Separator className='bg-blue-200' />
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Dashed Separator</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <Separator className='border-dashed border-t border-gray-300 bg-transparent h-0' />
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Gradient Separator</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>With Text</h4>
          <div className='text-sm text-muted-foreground'>Content above</div>
          <div className='relative'>
            <Separator />
            <div className='absolute inset-0 flex justify-center'>
              <span className='bg-white px-2 text-xs text-muted-foreground'>OR</span>
            </div>
          </div>
          <div className='text-sm text-muted-foreground'>Content below</div>
        </div>
      </div>
    </ComponentStory>
  ),
}
