import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './dropdown-menu'
import { Button } from './button/button'
import { ComponentStory } from '../StoryWrapper'
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  DownloadIcon,
  PrinterIcon,
  MailIcon,
  MessageSquareIcon,
} from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/UI/Dropdown-menu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Dropdown Menu'
      description='A simple dropdown menu with various item types and shortcuts'
      background='gradient-blue'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Options
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>
              <LogOutIcon />
              Log out
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ComponentStory>
  ),
}

const WithCheckboxesComponent = () => {
  const [checkedItems, setCheckedItems] = useState({
    notifications: true,
    emails: false,
    marketing: true,
  })

  return (
    <ComponentStory
      title='Dropdown with Checkboxes'
      description='Dropdown menu with checkbox items for toggleable options'
      background='gradient-green'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Preferences
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notification Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={checkedItems.notifications}
              onCheckedChange={checked =>
                setCheckedItems(prev => ({ ...prev, notifications: !!checked }))
              }
            >
              Push Notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.emails}
              onCheckedChange={checked => setCheckedItems(prev => ({ ...prev, emails: !!checked }))}
            >
              Email Updates
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.marketing}
              onCheckedChange={checked =>
                setCheckedItems(prev => ({ ...prev, marketing: !!checked }))
              }
            >
              Marketing Communications
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='mt-6 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Current Settings:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Push Notifications: {checkedItems.notifications ? 'Enabled' : 'Disabled'}</li>
            <li>• Email Updates: {checkedItems.emails ? 'Enabled' : 'Disabled'}</li>
            <li>• Marketing: {checkedItems.marketing ? 'Enabled' : 'Disabled'}</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const WithCheckboxes: Story = {
  render: () => <WithCheckboxesComponent />,
}

const WithRadioGroupComponent = () => {
  const [selectedTheme, setSelectedTheme] = useState('light')

  return (
    <ComponentStory
      title='Dropdown with Radio Group'
      description='Dropdown menu with radio group for single-selection options'
      background='gradient-purple'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
              <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Selected Theme:</h4>
          <p className='text-sm text-purple-800'>
            Current theme is set to <strong>{selectedTheme}</strong>
          </p>
        </div>
      </div>
    </ComponentStory>
  )
}

export const WithRadioGroup: Story = {
  render: () => <WithRadioGroupComponent />,
}

export const WithSubmenus: Story = {
  render: () => (
    <ComponentStory
      title='Dropdown with Submenus'
      description='Nested dropdown menus with multiple levels of navigation'
      background='gradient-orange'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Actions
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon />
              New Item
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditIcon />
              Edit
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ShareIcon />
                Share
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <MailIcon />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareIcon />
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DownloadIcon />
                Export
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <DownloadIcon />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DownloadIcon />
                  Download CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PrinterIcon />
                  Print
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>
              <TrashIcon />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ComponentStory>
  ),
}

export const GroupedItems: Story = {
  render: () => (
    <ComponentStory
      title='Grouped Dropdown Items'
      description='Dropdown menu with multiple labeled groups and separators'
      background='gradient-pink'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Trip Manager
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Trip Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PlusIcon />
                Create New Trip
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EditIcon />
                Edit Current Trip
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Export Options</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ShareIcon />
                Share Trip
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon />
                Export Itinerary
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PrinterIcon />
                Print Details
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Dangerous Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem variant='destructive'>
                <TrashIcon />
                Delete Trip
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ComponentStory>
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <ComponentStory
      title='Dropdown with Disabled Items'
      description='Dropdown menu showing disabled states for unavailable actions'
      background='gradient-blue'
    >
      <div className='text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              File Actions
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>File Operations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon />
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <EditIcon />
              Edit (No file selected)
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <CopyIcon />
              Copy (No file selected)
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <ShareIcon />
              Share (Permission required)
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <DownloadIcon />
              Download (File too large)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' disabled>
              <TrashIcon />
              Delete (No permission)
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Disabled States:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Items can be disabled when actions are not available</li>
            <li>• Disabled items have reduced opacity and no hover effects</li>
            <li>• Consider showing reasons in the item text</li>
            <li>• Keyboard navigation skips disabled items</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

const InteractiveComponent = () => {
  const [lastAction, setLastAction] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (action: string) => {
    setLastAction(action)
    setIsOpen(false)
  }

  return (
    <ComponentStory
      title='Interactive Dropdown Menu'
      description='Dropdown menu with state tracking and real interactions'
      background='gradient-green'
    >
      <div className='text-center space-y-4'>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Interactive Menu
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose an Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleAction('Created new project')}>
              <PlusIcon />
              New Project
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleAction('Opened file browser')}>
              <EditIcon />
              Open File
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleAction('Saved current work')}>
              <DownloadIcon />
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ShareIcon />
                Share Project
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => handleAction('Shared via email')}>
                  <MailIcon />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleAction('Copied share link')}>
                  <CopyIcon />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant='destructive'
              onSelect={() => handleAction('Deleted project')}
            >
              <TrashIcon />
              Delete Project
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {lastAction && (
          <div className='p-3 bg-green-50 border border-green-200 rounded-md'>
            <p className='text-sm text-green-900 font-medium'>Last Action:</p>
            <p className='text-sm text-green-700'>{lastAction}</p>
          </div>
        )}
      </div>
    </ComponentStory>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}
