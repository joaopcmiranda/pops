import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './Command'
import {
  SearchIcon,
  FileIcon,
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
} from 'lucide-react'

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
  ),
}

export const SearchResults: Story = {
  render: () => (
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
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => (
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
  ),
}

export const DisabledItems: Story = {
  render: () => (
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
    </div>
  ),
}

const InteractiveComponent = () => {
  const [selectedItem, setSelectedItem] = useState<string>('')
  const [lastAction, setLastAction] = useState<string>('')

  const handleSelect = (value: string, label: string) => {
    setSelectedItem(value)
    setLastAction(`Selected: ${label}`)
  }

  return (
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
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}
