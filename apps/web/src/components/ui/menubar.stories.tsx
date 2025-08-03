import type { Meta, StoryObj } from '@storybook/react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from './menubar'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'
import { useState } from 'react'

const meta: Meta<typeof Menubar> = {
  title: 'Components/UI/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Menubar - Default'
      description='Basic menubar with file operations commonly used in trip planning applications'
      background='gradient-blue'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Trip</MenubarItem>
              <MenubarItem>Open Trip</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Export</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarItem>Calendar</MenubarItem>
              <MenubarItem>Map</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Usage:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Click on menu triggers to open dropdown menus</li>
            <li>• Use keyboard navigation (arrow keys) to navigate items</li>
            <li>• Perfect for application-level navigation and actions</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithShortcuts: Story = {
  render: () => (
    <ComponentStory
      title='Menubar - With Keyboard Shortcuts'
      description='Menubar featuring keyboard shortcuts for quick access to trip planning features'
      background='gradient-green'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Trip</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Trip
                <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Open Trip
                <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Save Trip
                <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Export to PDF
                <MenubarShortcut>⌘E</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Share Trip
                <MenubarShortcut>⌘⇧S</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Planning</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Add Destination
                <MenubarShortcut>⌘D</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Schedule Activity
                <MenubarShortcut>⌘A</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Book Accommodation
                <MenubarShortcut>⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Budget Calculator
                <MenubarShortcut>⌘B</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Keyboard Shortcuts:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Display shortcuts for quick user reference</li>
            <li>• Use platform-appropriate symbols (⌘ for Mac, Ctrl for Windows)</li>
            <li>• Align shortcuts to the right edge for consistency</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

const WithCheckboxItemsComponent = () => {
  const [showCompleted, setShowCompleted] = useState(true)
  const [showPending, setShowPending] = useState(false)
  const [showCancelled, setShowCancelled] = useState(false)

  return (
    <ComponentStory
      title='Menubar - With Checkbox Items'
      description='Menubar with checkbox items for toggling trip status filters and view options'
      background='gradient-purple'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Show Trip Status</MenubarLabel>
              <MenubarSeparator />
              <MenubarCheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
                Completed Trips
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={showPending} onCheckedChange={setShowPending}>
                Pending Trips
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={showCancelled} onCheckedChange={setShowCancelled}>
                Cancelled Trips
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem>Reset Filters</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Display</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Layout Options</MenubarLabel>
              <MenubarSeparator />
              <MenubarCheckboxItem checked={true}>Show Trip Images</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={false}>Compact Mode</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={true}>Show Budget Info</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Current Filters:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Completed Trips: {showCompleted ? 'Visible' : 'Hidden'}</li>
            <li>• Pending Trips: {showPending ? 'Visible' : 'Hidden'}</li>
            <li>• Cancelled Trips: {showCancelled ? 'Visible' : 'Hidden'}</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const WithCheckboxItems: Story = {
  render: () => <WithCheckboxItemsComponent />,
}

const WithRadioGroupsComponent = () => {
  const [sortBy, setSortBy] = useState('date')
  const [viewMode, setViewMode] = useState('grid')

  return (
    <ComponentStory
      title='Menubar - With Radio Groups'
      description='Menubar with radio groups for selecting sorting options and view modes'
      background='gradient-orange'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Sort</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Sort Trips By</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioGroup value={sortBy} onValueChange={setSortBy}>
                <MenubarRadioItem value='date'>Date Created</MenubarRadioItem>
                <MenubarRadioItem value='departure'>Departure Date</MenubarRadioItem>
                <MenubarRadioItem value='destination'>Destination</MenubarRadioItem>
                <MenubarRadioItem value='budget'>Budget</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Layout</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>View Mode</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioGroup value={viewMode} onValueChange={setViewMode}>
                <MenubarRadioItem value='grid'>Grid View</MenubarRadioItem>
                <MenubarRadioItem value='list'>List View</MenubarRadioItem>
                <MenubarRadioItem value='timeline'>Timeline View</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Current Settings:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>
              • Sort By:{' '}
              {sortBy === 'date'
                ? 'Date Created'
                : sortBy === 'departure'
                  ? 'Departure Date'
                  : sortBy === 'destination'
                    ? 'Destination'
                    : 'Budget'}
            </li>
            <li>
              • View Mode:{' '}
              {viewMode === 'grid'
                ? 'Grid View'
                : viewMode === 'list'
                  ? 'List View'
                  : 'Timeline View'}
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const WithRadioGroups: Story = {
  render: () => <WithRadioGroupsComponent />,
}

export const WithSubmenus: Story = {
  render: () => (
    <ComponentStory
      title='Menubar - With Submenus'
      description='Menubar featuring nested submenus for organizing complex trip planning actions'
      background='gradient-red'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Create</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Trip</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Add Transportation</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Flight</MenubarItem>
                  <MenubarItem>Train</MenubarItem>
                  <MenubarItem>Bus</MenubarItem>
                  <MenubarItem>Car Rental</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Custom Transport</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Add Accommodation</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Hotel</MenubarItem>
                  <MenubarItem>Airbnb</MenubarItem>
                  <MenubarItem>Hostel</MenubarItem>
                  <MenubarItem>Resort</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Other Lodging</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Plan Activities</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Tours & Excursions</MenubarItem>
                  <MenubarItem>Restaurants</MenubarItem>
                  <MenubarItem>Entertainment</MenubarItem>
                  <MenubarItem>Shopping</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Custom Activity</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Export</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Export Itinerary</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PDF Document</MenubarItem>
                  <MenubarItem>Excel Spreadsheet</MenubarItem>
                  <MenubarItem>Google Calendar</MenubarItem>
                  <MenubarItem>iCal Format</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Share Trip</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email Link</MenubarItem>
                  <MenubarItem>Generate QR Code</MenubarItem>
                  <MenubarItem>Social Media</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Collaboration Link</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-red-50 rounded-lg border border-red-100'>
          <h4 className='font-semibold text-red-900 mb-2'>Submenu Features:</h4>
          <ul className='text-sm text-red-800 space-y-1'>
            <li>• Hover over submenu triggers to reveal nested options</li>
            <li>• Use arrow keys to navigate between menu levels</li>
            <li>• Perfect for organizing related actions hierarchically</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripPlannerMenubar: Story = {
  render: () => (
    <ComponentStory
      title='Menubar - Complete Trip Planner'
      description='Full-featured menubar for a comprehensive trip planning application'
      background='gradient-cyan'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Trip</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Trip
                <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Open Trip
                <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Save Trip
                <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Duplicate Trip</MenubarItem>
              <MenubarItem>Trip Templates</MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant='destructive'>Delete Trip</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Planning</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Quick Add Destination</MenubarItem>
              <MenubarItem>Budget Planner</MenubarItem>
              <MenubarItem>Weather Forecast</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Booking Tools</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Flight Search</MenubarItem>
                  <MenubarItem>Hotel Finder</MenubarItem>
                  <MenubarItem>Car Rental</MenubarItem>
                  <MenubarItem>Activity Booking</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>Travel Documents</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Layout</MenubarLabel>
              <MenubarSeparator />
              <MenubarCheckboxItem checked={true}>Show Sidebar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={false}>Compact Mode</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={true}>Show Map</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup defaultValue='dashboard'>
                <MenubarRadioItem value='dashboard'>Dashboard View</MenubarRadioItem>
                <MenubarRadioItem value='calendar'>Calendar View</MenubarRadioItem>
                <MenubarRadioItem value='timeline'>Timeline View</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Tools</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Currency Converter</MenubarItem>
              <MenubarItem>Time Zone Helper</MenubarItem>
              <MenubarItem>Packing List Generator</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Import from Calendar</MenubarItem>
              <MenubarItem>Sync with Google Maps</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Preferences
                <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Getting Started</MenubarItem>
              <MenubarItem>Keyboard Shortcuts</MenubarItem>
              <MenubarItem>Video Tutorials</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Report a Bug</MenubarItem>
              <MenubarItem>Feature Request</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>About Trip Planner</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-8 grid md:grid-cols-2 gap-4'>
          <div className='p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
            <h4 className='font-semibold text-cyan-900 mb-2'>Key Features:</h4>
            <ul className='text-sm text-cyan-800 space-y-1'>
              <li>• Complete trip management workflow</li>
              <li>• Integrated booking and planning tools</li>
              <li>• Customizable view options</li>
              <li>• Helpful utilities and converters</li>
            </ul>
          </div>

          <div className='p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
            <h4 className='font-semibold text-cyan-900 mb-2'>Design Notes:</h4>
            <ul className='text-sm text-cyan-800 space-y-1'>
              <li>• Destructive variant for dangerous actions</li>
              <li>• Consistent keyboard shortcuts</li>
              <li>• Logical menu grouping and organization</li>
              <li>• Mix of items, checkboxes, and radio groups</li>
            </ul>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <ComponentStory
      title='Menubar - Disabled States'
      description='Menubar with disabled items to show unavailable actions based on current state'
      background='gradient-gray'
    >
      <div className='w-full max-w-lg mx-auto'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>
                Undo
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Redo
                <MenubarShortcut>⌘⇧Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Copy Trip Details
                <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Paste
                <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Select All</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Actions</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Create New Trip</MenubarItem>
              <MenubarItem disabled>Archive Trip</MenubarItem>
              <MenubarItem disabled>Share Trip</MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled variant='destructive'>
                Delete Trip
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
          <h4 className='font-semibold text-gray-900 mb-2'>Disabled States:</h4>
          <ul className='text-sm text-gray-700 space-y-1'>
            <li>• Undo/Redo: No actions to undo or redo</li>
            <li>• Paste: No content in clipboard</li>
            <li>• Archive/Share/Delete: No trip selected</li>
            <li>• Items are visually dimmed and non-interactive</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
