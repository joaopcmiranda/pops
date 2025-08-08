import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './ScrollArea'
import { Button } from '../button'
import { Separator } from '../separator'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic vertical scroll area
 */
export const Default: Story = {
  render: () => (
    <ScrollArea className='h-72 w-48 rounded-md border'>
      <div className='p-4'>
        <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className='text-sm'>
            v1.2.0-beta.{i}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/**
 * Horizontal scroll area
 */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
      <div className='flex w-max space-x-4 p-4'>
        {Array.from({ length: 20 }).map((_, i) => (
          <figure key={i} className='shrink-0'>
            <div className='h-20 w-20 rounded-md bg-muted flex items-center justify-center'>
              {i + 1}
            </div>
            <figcaption className='pt-2 text-xs text-muted-foreground text-center'>
              Photo {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
}

/**
 * Both horizontal and vertical scroll
 */
export const BothDirections: Story = {
  render: () => (
    <ScrollArea className='h-72 w-96 rounded-md border'>
      <div className='p-4'>
        <h4 className='mb-4 text-sm font-medium leading-none'>Large Data Table</h4>
        <table className='w-full min-w-[600px]'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Name</th>
              <th className='text-left p-2'>Email</th>
              <th className='text-left p-2'>Role</th>
              <th className='text-left p-2'>Status</th>
              <th className='text-left p-2'>Created</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 30 }).map((_, i) => (
              <tr key={i} className='border-b hover:bg-muted/50'>
                <td className='p-2'>User {i + 1}</td>
                <td className='p-2'>user{i + 1}@example.com</td>
                <td className='p-2'>{i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer'}</td>
                <td className='p-2'>{i % 4 === 0 ? 'Inactive' : 'Active'}</td>
                <td className='p-2'>2024-01-{String(i + 1).padStart(2, '0')}</td>
                <td className='p-2'>
                  <Button variant='ghost' size='sm'>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  ),
}

/**
 * Content with mixed elements
 */
export const MixedContent: Story = {
  render: () => (
    <ScrollArea className='h-80 w-64 rounded-md border p-4'>
      <div className='space-y-4'>
        <h4 className='text-sm font-medium leading-none'>Activity Feed</h4>

        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium'>
                U{i + 1}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>User {i + 1}</p>
                <p className='text-xs text-muted-foreground'>
                  {i % 3 === 0
                    ? 'Created a new project'
                    : i % 2 === 0
                      ? 'Updated their profile'
                      : 'Added a new comment'}
                </p>
              </div>
            </div>
            {i < 24 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/**
 * Chat-like interface
 */
export const ChatInterface: Story = {
  render: () => (
    <div className='space-y-4 w-80'>
      <h3 className='text-lg font-semibold'>Chat Messages</h3>
      <ScrollArea className='h-64 w-full rounded-md border'>
        <div className='p-4 space-y-3'>
          {Array.from({ length: 20 }).map((_, i) => {
            const isUser = i % 3 === 0
            return (
              <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-2 text-sm ${
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {isUser
                    ? `My message ${Math.floor(i / 3) + 1}`
                    : `Received message ${i + 1}. This could be a longer message to show text wrapping.`}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 px-3 py-2 border rounded-md'
        />
        <Button>Send</Button>
      </div>
    </div>
  ),
}

/**
 * Code editor simulation
 */
export const CodeEditor: Story = {
  render: () => (
    <ScrollArea className='h-80 w-96 rounded-md border bg-slate-900 text-slate-100'>
      <div className='p-4'>
        <pre className='text-sm font-mono whitespace-pre'>
          {`import React from 'react'
import { ScrollArea } from './scroll-area'

export function Example() {
  const items = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    name: \`Item \${i + 1}\`,
    description: \`Description for item \${i + 1}\`,
    value: Math.random() * 1000,
    timestamp: new Date(),
    tags: ['tag1', 'tag2', 'tag3'],
    metadata: {
      createdBy: 'user@example.com',
      lastModified: new Date(),
      version: '1.0.0',
      status: 'active'
    }
  }))

  return (
    <ScrollArea className="h-80 w-full rounded-md border">
      <div className="p-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2 border-b pb-2 mb-2">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
            <div className="flex justify-between text-xs">
              <span>Value: {item.value.toFixed(2)}</span>
              <span>{item.timestamp.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

// Additional utility functions
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.value, 0)
}

export { formatDate, calculateTotal }`}
        </pre>
      </div>
    </ScrollArea>
  ),
}

/**
 * Image gallery with scroll
 */
export const ImageGallery: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Image Gallery</h3>

      {/* Vertical Gallery */}
      <div className='space-y-2'>
        <h4 className='font-medium'>Vertical Gallery</h4>
        <ScrollArea className='h-64 w-48 rounded-md border'>
          <div className='p-4 space-y-4'>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <div className='aspect-video bg-muted rounded-md flex items-center justify-center'>
                  <span className='text-muted-foreground'>Image {i + 1}</span>
                </div>
                <p className='text-xs text-center'>Photo {i + 1}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Horizontal Gallery */}
      <div className='space-y-2'>
        <h4 className='font-medium'>Horizontal Gallery</h4>
        <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
          <div className='flex w-max space-x-4 p-4'>
            {Array.from({ length: 15 }).map((_, i) => (
              <figure key={i} className='shrink-0 space-y-2'>
                <div className='h-24 w-24 bg-muted rounded-md flex items-center justify-center'>
                  <span className='text-muted-foreground text-xs'>Img {i + 1}</span>
                </div>
                <figcaption className='text-xs text-center text-muted-foreground'>
                  Image {i + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  ),
}

/**
 * Different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold'>Different Scroll Area Sizes</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Small */}
        <div className='space-y-2'>
          <h4 className='font-medium'>Small (200px height)</h4>
          <ScrollArea className='h-48 w-40 rounded-md border'>
            <div className='p-3'>
              <h5 className='text-sm font-medium mb-2'>Quick List</h5>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className='text-xs py-1'>
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Medium */}
        <div className='space-y-2'>
          <h4 className='font-medium'>Medium (300px height)</h4>
          <ScrollArea className='h-72 w-56 rounded-md border'>
            <div className='p-4'>
              <h5 className='text-sm font-medium mb-3'>Standard List</h5>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className='text-sm py-2 border-b last:border-b-0'>
                  <div className='font-medium'>Item {i + 1}</div>
                  <div className='text-xs text-muted-foreground'>Description for item {i + 1}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Large */}
        <div className='space-y-2'>
          <h4 className='font-medium'>Large (400px height)</h4>
          <ScrollArea className='h-96 w-64 rounded-md border'>
            <div className='p-4'>
              <h5 className='text-sm font-medium mb-4'>Detailed List</h5>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className='space-y-2 p-3 border rounded-md mb-3 bg-muted/25'>
                  <div className='flex justify-between items-start'>
                    <h6 className='font-medium text-sm'>Item {i + 1}</h6>
                    <span className='text-xs text-muted-foreground'>#{i + 1}</span>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    This is a detailed description for item {i + 1}. It provides more context and
                    information.
                  </p>
                  <div className='flex gap-1'>
                    <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'>
                      Tag {(i % 3) + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  ),
}

/**
 * Real-world use cases
 */
export const UseCases: Story = {
  render: () => (
    <div className='space-y-8'>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <h3 className='font-semibold mb-4'>Common ScrollArea Use Cases</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Sidebar Navigation */}
          <div className='space-y-2'>
            <h4 className='font-medium flex items-center gap-2'>🧭 Sidebar Navigation</h4>
            <ScrollArea className='h-48 w-full rounded-md border'>
              <div className='p-2 space-y-1'>
                {[
                  '🏠 Dashboard',
                  '📊 Analytics',
                  '👥 Users',
                  '📁 Projects',
                  '📋 Tasks',
                  '📅 Calendar',
                  '💬 Messages',
                  '📧 Email',
                  '⚙️ Settings',
                  '🔧 Admin',
                  '📈 Reports',
                  '🎯 Goals',
                  '📚 Documentation',
                  '🛠️ Tools',
                  '🔍 Search',
                ].map((item, i) => (
                  <div key={i} className='px-3 py-2 rounded hover:bg-muted cursor-pointer text-sm'>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Notification List */}
          <div className='space-y-2'>
            <h4 className='font-medium flex items-center gap-2'>🔔 Notifications</h4>
            <ScrollArea className='h-48 w-full rounded-md border'>
              <div className='p-3 space-y-3'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className='flex gap-3'>
                    <div className='w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0'></div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Notification {i + 1}</p>
                      <p className='text-xs text-muted-foreground'>
                        {i % 2 === 0
                          ? 'Your report has been generated'
                          : 'New message from team member'}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {i + 1} minute{i > 0 ? 's' : ''} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* File Browser */}
          <div className='space-y-2'>
            <h4 className='font-medium flex items-center gap-2'>📁 File Browser</h4>
            <ScrollArea className='h-48 w-full rounded-md border'>
              <div className='p-2 space-y-1'>
                {[
                  { name: '📁 Documents', type: 'folder' },
                  { name: '📁 Images', type: 'folder' },
                  { name: '📄 report.pdf', type: 'file' },
                  { name: '🖼️ screenshot.png', type: 'file' },
                  { name: '📊 data.xlsx', type: 'file' },
                  { name: '💻 script.js', type: 'file' },
                  { name: '🎨 design.psd', type: 'file' },
                  { name: '📝 notes.txt', type: 'file' },
                  { name: '📹 video.mp4', type: 'file' },
                  { name: '🎵 music.mp3', type: 'file' },
                  { name: '🗜️ archive.zip', type: 'file' },
                  { name: '📋 readme.md', type: 'file' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-2 px-2 py-1 rounded hover:bg-muted cursor-pointer text-sm'
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>ScrollArea Best Practices:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• Set appropriate heights to prevent layout issues</li>
          <li>• Use horizontal scroll sparingly - prefer vertical when possible</li>
          <li>• Consider mobile users - ensure scrollable areas are touch-friendly</li>
          <li>• Provide visual indicators when content is scrollable</li>
          <li>• Test with keyboard navigation for accessibility</li>
          <li>• Use consistent padding and spacing within scrollable content</li>
        </ul>
      </div>
    </div>
  ),
}
