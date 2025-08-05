import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
import { ComponentStory, ModalStory } from '../StoryWrapper'
import {
  SearchIcon,
  FileIcon,
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
} from 'lucide-react'
import { Button } from './button/button'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Command> = {
  title: 'Components/UI/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Command Menu'
      description='A simple command menu with search functionality and grouped items'
      background='gradient-blue'
    >
      <div className='w-96 mx-auto'>
        <Command className='border border-gray-200 shadow-md'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>
                <FileIcon />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SearchIcon />
                <span>Search Files</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <UserIcon />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Settings'>
              <CommandItem>
                <SettingsIcon />
                <span>Preferences</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <HelpCircleIcon />
                <span>Help</span>
                <CommandShortcut>⌘?</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </ComponentStory>
  ),
}

export const CommandPalette: Story = () => {
  const [open, setOpen] = useState(false)

  return (
    <ModalStory
      title='Command Palette Dialog'
      description='A modal command palette for quick actions and navigation'
      background='gradient-purple'
    >
      <div className='text-center space-y-4'>
        <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
        <p className='text-sm text-muted-foreground'>
          Press the button to open the command palette
        </p>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Quick Actions'>
            <CommandItem
              onSelect={() => {
                console.log('New Trip')
                setOpen(false)
              }}
            >
              <FileIcon />
              <span>Create New Trip</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('Search Trips')
                setOpen(false)
              }}
            >
              <SearchIcon />
              <span>Search Trips</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('Profile')
                setOpen(false)
              }}
            >
              <UserIcon />
              <span>View Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Navigation'>
            <CommandItem
              onSelect={() => {
                console.log('Dashboard')
                setOpen(false)
              }}
            >
              <span>Go to Dashboard</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('Trips')
                setOpen(false)
              }}
            >
              <span>Browse Trips</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('Settings')
                setOpen(false)
              }}
            >
              <SettingsIcon />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Account'>
            <CommandItem
              onSelect={() => {
                console.log('Help')
                setOpen(false)
              }}
            >
              <HelpCircleIcon />
              <span>Help & Support</span>
              <CommandShortcut>⌘?</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('Logout')
                setOpen(false)
              }}
            >
              <LogOutIcon />
              <span>Sign Out</span>
              <CommandShortcut>⌘Q</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </ModalStory>
  )
}

export const SearchResults: Story = {
  render: () => (
    <ComponentStory
      title='Command Menu with Search Results'
      description='Demonstrates how the command menu filters items based on search input'
      background='gradient-green'
    >
      <div className='w-96 mx-auto'>
        <Command className='border border-gray-200 shadow-md'>
          <CommandInput placeholder="Try typing 'file', 'user', or 'help'..." />
          <CommandList>
            <CommandEmpty>No results found. Try a different search term.</CommandEmpty>
            <CommandGroup heading='Files'>
              <CommandItem value='new-file'>
                <FileIcon />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem value='open-file'>
                <FileIcon />
                <span>Open File</span>
                <CommandShortcut>⌘O</CommandShortcut>
              </CommandItem>
              <CommandItem value='save-file'>
                <FileIcon />
                <span>Save File</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='User Actions'>
              <CommandItem value='user-profile'>
                <UserIcon />
                <span>User Profile</span>
                <CommandShortcut>⌘U</CommandShortcut>
              </CommandItem>
              <CommandItem value='user-settings'>
                <UserIcon />
                <span>User Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Help'>
              <CommandItem value='help-docs'>
                <HelpCircleIcon />
                <span>Documentation</span>
                <CommandShortcut>⌘?</CommandShortcut>
              </CommandItem>
              <CommandItem value='help-support'>
                <HelpCircleIcon />
                <span>Contact Support</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <div className='mt-6 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Search Behavior:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Items are filtered based on their value and text content</li>
            <li>• Search is case-insensitive and supports partial matches</li>
            <li>• Empty state shows when no items match the search</li>
            <li>• Use arrow keys to navigate and Enter to select</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <ComponentStory
      title='Empty Command Menu'
      description='Shows the empty state when no commands are available or match the search'
      background='gradient-orange'
    >
      <div className='w-96 mx-auto'>
        <Command className='border border-gray-200 shadow-md'>
          <CommandInput placeholder="Search for something that doesn't exist..." />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col items-center gap-2 py-6'>
                <SearchIcon className='h-8 w-8 text-muted-foreground' />
                <p className='text-sm font-medium'>No commands found</p>
                <p className='text-xs text-muted-foreground'>Try a different search term</p>
              </div>
            </CommandEmpty>
            {/* No command items to show empty state */}
          </CommandList>
        </Command>
      </div>
    </ComponentStory>
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <ComponentStory
      title='Command Menu with Disabled Items'
      description='Demonstrates disabled command items and their visual appearance'
      background='gradient-pink'
    >
      <div className='w-96 mx-auto'>
        <Command className='border border-gray-200 shadow-md'>
          <CommandInput placeholder='Type a command...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Available Actions'>
              <CommandItem>
                <FileIcon />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SearchIcon />
                <span>Search Files</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Disabled Actions'>
              <CommandItem disabled>
                <UserIcon />
                <span>Delete User (No Permission)</span>
                <CommandShortcut>⌘⌫</CommandShortcut>
              </CommandItem>
              <CommandItem disabled>
                <SettingsIcon />
                <span>Admin Settings (Admin Only)</span>
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
              <CommandItem disabled>
                <LogOutIcon />
                <span>Force Logout (Maintenance Mode)</span>
                <CommandShortcut>⌘Q</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <div className='mt-6 p-4 bg-pink-50 rounded-lg border border-pink-100'>
          <h4 className='font-semibold text-pink-900 mb-2'>Disabled Items:</h4>
          <ul className='text-sm text-pink-800 space-y-1'>
            <li>• Disabled items have reduced opacity and no hover effects</li>
            <li>• They cannot be selected or triggered</li>
            <li>• Use for actions that are temporarily unavailable</li>
            <li>• Consider showing reasons in tooltips or descriptions</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = () => {
  const [selectedItem, setSelectedItem] = useState<string>('')
  const [lastAction, setLastAction] = useState<string>('')

  const handleSelect = (value: string, label: string) => {
    setSelectedItem(value)
    setLastAction(`Selected: ${label}`)
  }

  return (
    <ComponentStory
      title='Interactive Command Menu'
      description='Command menu with real interactions and state updates'
      background='gradient-blue'
    >
      <div className='w-96 mx-auto space-y-4'>
        <Command className='border border-gray-200 shadow-md'>
          <CommandInput placeholder='Select a command to see it in action...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Trip Management'>
              <CommandItem
                value='create-trip'
                onSelect={() => handleSelect('create-trip', 'Create New Trip')}
                data-selected={selectedItem === 'create-trip'}
              >
                <FileIcon />
                <span>Create New Trip</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem
                value='edit-trip'
                onSelect={() => handleSelect('edit-trip', 'Edit Current Trip')}
                data-selected={selectedItem === 'edit-trip'}
              >
                <span>Edit Current Trip</span>
                <CommandShortcut>⌘E</CommandShortcut>
              </CommandItem>
              <CommandItem
                value='delete-trip'
                onSelect={() => handleSelect('delete-trip', 'Delete Trip')}
                data-selected={selectedItem === 'delete-trip'}
              >
                <span>Delete Trip</span>
                <CommandShortcut>⌘⌫</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Navigation'>
              <CommandItem
                value='dashboard'
                onSelect={() => handleSelect('dashboard', 'Go to Dashboard')}
                data-selected={selectedItem === 'dashboard'}
              >
                <span>Go to Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem
                value='profile'
                onSelect={() => handleSelect('profile', 'View Profile')}
                data-selected={selectedItem === 'profile'}
              >
                <UserIcon />
                <span>View Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        {lastAction && (
          <div className='p-3 bg-blue-50 border border-blue-200 rounded-md'>
            <p className='text-sm text-blue-900 font-medium'>Last Action:</p>
            <p className='text-sm text-blue-700'>{lastAction}</p>
          </div>
        )}
      </div>
    </ComponentStory>
  )
}
