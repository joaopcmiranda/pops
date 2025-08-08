import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../button'
import { Toaster } from './Toaster'

const meta: Meta<typeof Toaster> = {
  title: 'Components/UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic toaster functionality
 */
export const Default: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Toast Notifications</h3>
      <div className='flex gap-2 flex-wrap'>
        <Button onClick={() => toast('Hello World!')}>Default Toast</Button>
        <Button onClick={() => toast.success('Operation successful!')}>Success Toast</Button>
        <Button onClick={() => toast.error('Something went wrong!')}>Error Toast</Button>
        <Button onClick={() => toast.info('Information message')}>Info Toast</Button>
        <Button onClick={() => toast.warning('Warning message')}>Warning Toast</Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        Click the buttons above to see different types of toast notifications.
      </p>
    </div>
  ),
}

/**
 * Toast with actions
 */
export const WithActions: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Toast with Actions</h3>
      <div className='flex gap-2 flex-wrap'>
        <Button
          onClick={() =>
            toast('File saved successfully!', {
              action: {
                label: 'Undo',
                onClick: () => toast('Action undone!'),
              },
            })
          }
        >
          Toast with Action
        </Button>

        <Button
          onClick={() =>
            toast.success('Profile updated!', {
              action: {
                label: 'View',
                onClick: () => toast('Viewing profile...'),
              },
            })
          }
        >
          Success with Action
        </Button>

        <Button
          onClick={() =>
            toast.error('Failed to delete item', {
              action: {
                label: 'Retry',
                onClick: () => toast('Retrying...'),
              },
            })
          }
        >
          Error with Action
        </Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        These toasts include action buttons that users can click.
      </p>
    </div>
  ),
}

/**
 * Toast with custom duration
 */
export const CustomDuration: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Custom Duration</h3>
      <div className='flex gap-2 flex-wrap'>
        <Button
          onClick={() =>
            toast('Quick message (1 second)', {
              duration: 1000,
            })
          }
        >
          1 Second
        </Button>

        <Button
          onClick={() =>
            toast('Standard message (4 seconds)', {
              duration: 4000,
            })
          }
        >
          4 Seconds (Default)
        </Button>

        <Button
          onClick={() =>
            toast('Long message (10 seconds)', {
              duration: 10000,
            })
          }
        >
          10 Seconds
        </Button>

        <Button
          onClick={() =>
            toast('Persistent message (click to dismiss)', {
              duration: Infinity,
            })
          }
        >
          Persistent
        </Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        Control how long toasts remain visible before auto-dismissing.
      </p>
    </div>
  ),
}

/**
 * Toast positioning
 */
export const Positioning: Story = {
  render: () => {
    const [position, setPosition] = useState<
      'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    >('bottom-right')

    return (
      <div className='space-y-6'>
        <h3 className='text-lg font-semibold'>Toast Positioning</h3>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium mb-2 block'>Select Position:</label>
            <select
              value={position}
              onChange={e =>
                setPosition(
                  e.target.value as
                    | 'top-left'
                    | 'top-center'
                    | 'top-right'
                    | 'bottom-left'
                    | 'bottom-center'
                    | 'bottom-right'
                )
              }
              className='px-3 py-2 border rounded-md'
            >
              <option value='top-left'>Top Left</option>
              <option value='top-center'>Top Center</option>
              <option value='top-right'>Top Right</option>
              <option value='bottom-left'>Bottom Left</option>
              <option value='bottom-center'>Bottom Center</option>
              <option value='bottom-right'>Bottom Right</option>
            </select>
          </div>

          <Button onClick={() => toast(`Toast positioned at ${position}`)}>
            Show Toast at {position.replace('-', ' ')}
          </Button>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Note:</h4>
          <p className='text-sm text-blue-800'>
            Position changes require recreating the Toaster component with the new position prop. In
            a real application, you would typically set this once in your app configuration.
          </p>
        </div>

        <Toaster position={position} />
      </div>
    )
  },
}

/**
 * Rich toast content
 */
export const RichContent: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Rich Toast Content</h3>
      <div className='flex gap-2 flex-wrap'>
        <Button
          onClick={() =>
            toast('Task completed', {
              description: 'Your file has been uploaded successfully to the server.',
            })
          }
        >
          With Description
        </Button>

        <Button
          onClick={() =>
            toast('New message received', {
              description: 'John Doe sent you a message about the project.',
              action: {
                label: 'Reply',
                onClick: () => toast('Opening reply dialog...'),
              },
            })
          }
        >
          Message + Action
        </Button>

        <Button
          onClick={() =>
            toast.success('Payment processed', {
              description: 'Your payment of $29.99 has been successfully processed.',
              action: {
                label: 'View Receipt',
                onClick: () => toast('Opening receipt...'),
              },
            })
          }
        >
          Payment Success
        </Button>

        <Button
          onClick={() =>
            toast.error('Upload failed', {
              description: 'The file could not be uploaded. Please check your connection.',
              action: {
                label: 'Retry',
                onClick: () => toast('Retrying upload...'),
              },
            })
          }
        >
          Upload Error
        </Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        Toasts can include descriptions and action buttons for richer interactions.
      </p>
    </div>
  ),
}

/**
 * Loading and promise toasts
 */
export const LoadingStates: Story = {
  render: () => {
    const simulateApiCall = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.5
          if (success) {
            resolve('Success!')
          } else {
            reject('Failed!')
          }
        }, 2000)
      })
    }

    return (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold mb-4'>Loading States</h3>
        <div className='flex gap-2 flex-wrap'>
          <Button onClick={() => toast.loading('Processing your request...')}>Loading Toast</Button>

          <Button
            onClick={() =>
              toast.promise(simulateApiCall(), {
                loading: 'Saving changes...',
                success: 'Changes saved successfully!',
                error: 'Failed to save changes',
              })
            }
          >
            Promise Toast
          </Button>

          <Button
            onClick={() =>
              toast.promise(
                new Promise(resolve => setTimeout(() => resolve('Data loaded!'), 3000)),
                {
                  loading: 'Loading data...',
                  success: data => `${data} All data has been loaded.`,
                  error: 'Could not load data',
                }
              )
            }
          >
            Long Promise
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>
          Show loading states and automatically update based on promise resolution.
        </p>
      </div>
    )
  },
}

/**
 * Multiple toasts
 */
export const MultipleToasts: Story = {
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Multiple Toasts</h3>
      <div className='flex gap-2 flex-wrap'>
        <Button
          onClick={() => {
            toast('First notification')
            setTimeout(() => toast.success('Second notification'), 500)
            setTimeout(() => toast.error('Third notification'), 1000)
            setTimeout(() => toast.warning('Fourth notification'), 1500)
          }}
        >
          Show Multiple
        </Button>

        <Button
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              setTimeout(() => toast(`Notification ${i}`), i * 200)
            }
          }}
        >
          Rapid Fire
        </Button>

        <Button onClick={() => toast.dismiss()}>Dismiss All</Button>
      </div>
      <p className='text-sm text-muted-foreground'>
        Multiple toasts can be shown simultaneously and stack vertically.
      </p>
    </div>
  ),
}

/**
 * Real-world use cases
 */
export const UseCases: Story = {
  render: () => (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold mb-4'>Real-World Use Cases</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Form Submission */}
        <div className='p-4 border rounded-lg space-y-3'>
          <h4 className='font-semibold'>Form Submission</h4>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='Your name'
              className='w-full px-3 py-2 border rounded-md'
            />
            <input
              type='email'
              placeholder='Your email'
              className='w-full px-3 py-2 border rounded-md'
            />
            <Button
              className='w-full'
              onClick={() =>
                toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
                  loading: 'Submitting form...',
                  success: 'Form submitted successfully!',
                  error: 'Failed to submit form',
                })
              }
            >
              Submit Form
            </Button>
          </div>
        </div>

        {/* File Operations */}
        <div className='p-4 border rounded-lg space-y-3'>
          <h4 className='font-semibold'>File Operations</h4>
          <div className='space-y-2'>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast.success('File saved!', {
                  action: {
                    label: 'Undo',
                    onClick: () => toast('File save undone'),
                  },
                })
              }
            >
              Save File
            </Button>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast.promise(
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const success = Math.random() > 0.3
                      if (success) {
                        resolve('Upload complete')
                      } else {
                        reject('Upload failed')
                      }
                    }, 3000)
                  }),
                  {
                    loading: 'Uploading file...',
                    success: 'File uploaded successfully!',
                    error: 'Upload failed. Please try again.',
                  }
                )
              }
            >
              Upload File
            </Button>
          </div>
        </div>

        {/* User Actions */}
        <div className='p-4 border rounded-lg space-y-3'>
          <h4 className='font-semibold'>User Actions</h4>
          <div className='space-y-2'>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast('User added to team', {
                  description: 'John Doe has been successfully added to the project team.',
                })
              }
            >
              Add User
            </Button>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast.error('User removed', {
                  description: 'Sarah Wilson has been removed from the team.',
                  action: {
                    label: 'Undo',
                    onClick: () => toast.success('User removal undone'),
                  },
                })
              }
            >
              Remove User
            </Button>
          </div>
        </div>

        {/* System Notifications */}
        <div className='p-4 border rounded-lg space-y-3'>
          <h4 className='font-semibold'>System Notifications</h4>
          <div className='space-y-2'>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast.warning('Session expiring soon', {
                  description: 'Your session will expire in 5 minutes.',
                  action: {
                    label: 'Extend',
                    onClick: () => toast.success('Session extended for 30 minutes'),
                  },
                })
              }
            >
              Session Warning
            </Button>
            <Button
              className='w-full'
              variant='outline'
              onClick={() =>
                toast.info('New update available', {
                  description: 'Version 2.1.0 is now available for download.',
                  action: {
                    label: 'Update',
                    onClick: () => toast.loading('Downloading update...'),
                  },
                })
              }
            >
              Update Available
            </Button>
          </div>
        </div>
      </div>

      <div className='p-4 bg-amber-50 rounded-lg border border-amber-100'>
        <h4 className='font-semibold text-amber-900 mb-2'>Best Practices:</h4>
        <ul className='text-sm text-amber-800 space-y-1'>
          <li>• Use appropriate toast types (success, error, warning, info)</li>
          <li>• Provide clear, concise messages</li>
          <li>• Include actions when users can respond to the notification</li>
          <li>• Use loading states for async operations</li>
          <li>• Don't overwhelm users with too many toasts at once</li>
        </ul>
      </div>
    </div>
  ),
}
