/**
 * @fileoverview Storybook Stories for NotificationCenter Component
 *
 * Comprehensive stories showcasing the POps Notification Center component with
 * various notification types, states, and interactive behaviors. Demonstrates
 * empty states, notification management, and real-time updates.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationCenter } from './NotificationCenter'
import { AppSuiteProvider } from '../../contexts/AppSuiteContext'
import type { PopsNotification, PopsUser, AuthState } from '../../types'

const meta: Meta<typeof NotificationCenter> = {
  title: 'Navigation/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The NotificationCenter displays notifications from all POps applications in a unified interface. It supports real-time updates, marking as read, and navigation to sources.',
      },
    },
  },
  argTypes: {
    maxVisible: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Maximum number of notifications to display',
    },
    onMarkAsRead: {
      action: 'mark-as-read',
      description: 'Callback fired when a notification is marked as read',
    },
    onNotificationClick: {
      action: 'notification-click',
      description: 'Callback fired when a notification is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock user for stories
const mockUser: PopsUser = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  preferences: {
    theme: 'system',
    locale: 'en-US',
    timezone: 'America/New_York',
    notifications: {
      push: true,
      email: true,
      inApp: true,
      frequency: 'immediate',
    },
  },
  lastActive: new Date().toISOString(),
}

const mockAuthState: AuthState = {
  isAuthenticated: true,
  user: mockUser,
  token: 'mock-jwt-token',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  refreshToken: 'mock-refresh-token',
}

// Sample notifications for different scenarios
const sampleNotifications = {
  recent: [
    {
      id: '1',
      app: 'travel' as const,
      type: 'info' as const,
      title: 'Trip Planning Update',
      message:
        'Your Tokyo trip itinerary has been updated with new restaurant recommendations in Shibuya district.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: 'https://travel.mypops.io/trips/tokyo-2024',
    },
    {
      id: '2',
      app: 'money' as const,
      type: 'warning' as const,
      title: 'Budget Alert',
      message: 'You are approaching your monthly dining budget limit. $847 of $900 used.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '3',
      app: 'events' as const,
      type: 'success' as const,
      title: 'RSVP Confirmed',
      message: 'Your RSVP for "Summer BBQ Party" has been confirmed. See you on Saturday!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
  varied: [
    {
      id: '4',
      app: 'documents' as const,
      type: 'info' as const,
      title: 'Document Shared',
      message: 'Sarah shared "Project Proposal 2024.pdf" with you.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: 'https://documents.mypops.io/shared/project-proposal-2024',
    },
    {
      id: '5',
      app: 'health' as const,
      type: 'success' as const,
      title: 'Workout Goal Achieved!',
      message: 'Congratulations! You completed your weekly fitness goal of 150 minutes.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '6',
      app: 'recipes' as const,
      type: 'info' as const,
      title: 'New Recipe Suggestion',
      message: 'Based on your preferences, try this "Mediterranean Quinoa Bowl" recipe.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: 'https://recipes.mypops.io/recipe/mediterranean-quinoa-bowl',
    },
    {
      id: '7',
      app: 'home' as const,
      type: 'warning' as const,
      title: 'Maintenance Reminder',
      message: 'Your HVAC filter replacement is due this week.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '8',
      app: 'admin' as const,
      type: 'error' as const,
      title: 'System Alert',
      message: 'Backup process failed. Please check system logs.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
  longMessages: [
    {
      id: '9',
      app: 'travel' as const,
      type: 'info' as const,
      title: 'Comprehensive Travel Itinerary Update for Your Upcoming European Adventure',
      message:
        'We have made significant updates to your European travel itinerary including new restaurant recommendations, updated transportation schedules, additional sightseeing opportunities, and weather-based activity suggestions. Please review the changes and confirm your preferences for the upcoming trip. The changes include modifications to your Paris, Rome, and Barcelona segments with enhanced local experiences and cultural activities that align with your interests in art, cuisine, and historical sites.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: 'https://travel.mypops.io/trips/europe-2024',
    },
    {
      id: '10',
      app: 'money' as const,
      type: 'warning' as const,
      title: 'Detailed Monthly Budget Analysis and Spending Recommendations',
      message:
        'Your detailed spending analysis for this month shows several areas where you can optimize your budget. Dining expenses have exceeded the planned amount by 23%, entertainment costs are within normal ranges, but transportation costs have decreased due to remote work. We recommend adjusting your budget allocations for next month and consider setting up automatic savings transfers to better manage your financial goals.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
} satisfies Record<string, PopsNotification[]>

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  _notifications = sampleNotifications.recent,
}: {
  children: React.ReactNode
  _notifications?: PopsNotification[]
}) {
  return (
    <AppSuiteProvider currentApp='travel' initialAuthState={mockAuthState}>
      <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='flex justify-center'>{children}</div>
      </div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <NotificationCenter {...args} notifications={sampleNotifications.recent} />
    </StoryWrapper>
  ),
  args: {
    maxVisible: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default notification center with a mix of read and unread notifications from different apps.',
      },
    },
  },
}

export const EmptyState: Story = {
  render: args => (
    <StoryWrapper _notifications={[]}>
      <NotificationCenter {...args} notifications={[]} />
    </StoryWrapper>
  ),
  args: {
    maxVisible: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty notification center showing the "no notifications" state with encouraging message.',
      },
    },
  },
}

export const NotificationTypes: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Notification Types & Sources</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Information Notifications</h3>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.recent.filter(n => n.type === 'info')}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Warning Notifications</h3>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.recent.filter(n => n.type === 'warning')}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Success Notifications</h3>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.recent.filter(n => n.type === 'success')}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Error Notifications</h3>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.varied.filter(n => n.type === 'error')}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100'>
          <h4 className='font-semibold text-indigo-900 mb-2'>Notification Type System:</h4>
          <ul className='text-sm text-indigo-800 space-y-1'>
            <li>
              • 🔵 <strong>Info:</strong> General updates, shares, and informational messages
            </li>
            <li>
              • 🟡 <strong>Warning:</strong> Alerts that require attention but aren't critical
            </li>
            <li>
              • 🟢 <strong>Success:</strong> Confirmations, achievements, and positive updates
            </li>
            <li>
              • 🔴 <strong>Error:</strong> Critical issues that need immediate attention
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different notification types with their distinct styling and icons.',
      },
    },
  },
}

export const AllApplicationSources: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Notifications from All POps Applications
        </h2>

        <StoryWrapper>
          <NotificationCenter notifications={sampleNotifications.varied} maxVisible={20} />
        </StoryWrapper>

        <div className='mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100'>
          <h4 className='font-semibold text-teal-900 mb-2'>Cross-App Notifications:</h4>
          <ul className='text-sm text-teal-800 space-y-1'>
            <li>• Each app has distinctive icons and branding</li>
            <li>• Unified experience across all POps applications</li>
            <li>• Consistent interaction patterns</li>
            <li>• Smart time formatting (just now, 2m ago, 4h ago, etc.)</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive view showing notifications from all POps applications with varied content and types.',
      },
    },
  },
}

export const ReadUnreadStates: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Read vs Unread States</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Unread Notifications</h3>
            <p className='text-sm text-gray-600'>
              Unread notifications have bright background colors, bold text, and show a blue
              indicator dot.
            </p>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.recent.map(n => ({ ...n, read: false }))}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Read Notifications</h3>
            <p className='text-sm text-gray-600'>
              Read notifications have muted colors, normal text weight, and no indicator dots.
            </p>
            <StoryWrapper>
              <NotificationCenter
                notifications={sampleNotifications.recent.map(n => ({ ...n, read: true }))}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 space-y-4'>
          <h3 className='text-lg font-medium text-gray-900'>Mixed Read/Unread</h3>
          <p className='text-sm text-gray-600'>
            Normal notification center with mix of read and unread states as they would appear in
            practice.
          </p>
          <div className='flex justify-center'>
            <StoryWrapper>
              <NotificationCenter
                notifications={[
                  ...sampleNotifications.recent,
                  ...sampleNotifications.varied.slice(0, 3),
                ]}
                maxVisible={10}
              />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Read State Features:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Visual distinction between read and unread notifications</li>
            <li>• Unread count badge in header</li>
            <li>• One-click mark as read functionality</li>
            <li>• Bulk "Clear all" action</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison between read and unread notification states showing visual and interactive differences.',
      },
    },
  },
}

export const InteractiveBehaviors: Story = {
  render: args => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Interactive Notification Center
        </h2>

        <p className='text-gray-600 mb-6 text-center'>
          Click on notifications to navigate to their source, use the mark as read buttons, or try
          the clear all and refresh actions in the header.
        </p>

        <StoryWrapper>
          <NotificationCenter
            {...args}
            notifications={sampleNotifications.recent}
            onMarkAsRead={id => {
              console.log('Mark as read:', id)
              alert(`Marked notification ${id} as read`)
            }}
            onNotificationClick={notification => {
              console.log('Notification clicked:', notification)
              alert(`Clicked: ${notification.title}`)
            }}
          />
        </StoryWrapper>

        <div className='mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='font-semibold text-yellow-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-yellow-800 space-y-1'>
            <li>• Click notifications to navigate to source application</li>
            <li>• Individual "mark as read" buttons for unread items</li>
            <li>• Bulk actions: "Clear all" and "Refresh"</li>
            <li>• Keyboard navigation support</li>
            <li>• Automatic read state when clicking notification</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    maxVisible: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive notification center with callback demonstrations for marking as read and clicking notifications.',
      },
    },
  },
}

export const LongContent: Story = {
  render: args => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Long Content Handling
        </h2>

        <p className='text-gray-600 mb-6 text-center'>
          Demonstrates how the notification center handles long titles and messages with proper
          truncation and responsive design.
        </p>

        <StoryWrapper>
          <NotificationCenter {...args} notifications={sampleNotifications.longMessages} />
        </StoryWrapper>

        <div className='mt-8 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Long Content Features:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Title truncation with full title available on hover</li>
            <li>• Message text uses line-clamp for consistent height</li>
            <li>• Responsive design maintains readability</li>
            <li>• Graceful handling of very long content</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    maxVisible: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Examples with very long notification titles and messages to test truncation and layout handling.',
      },
    },
  },
}

export const LimitedVisibility: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Visibility Limits</h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Limit: 3 notifications</h3>
            <StoryWrapper>
              <NotificationCenter notifications={sampleNotifications.varied} maxVisible={3} />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Limit: 5 notifications</h3>
            <StoryWrapper>
              <NotificationCenter notifications={sampleNotifications.varied} maxVisible={5} />
            </StoryWrapper>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>No limit (all 8)</h3>
            <StoryWrapper>
              <NotificationCenter notifications={sampleNotifications.varied} maxVisible={50} />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Visibility Control:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>
              • <strong>maxVisible prop:</strong> Controls how many notifications to display
            </li>
            <li>• Newest notifications shown first (sorted by timestamp)</li>
            <li>• Scrollable area when content exceeds container height</li>
            <li>• Optimal default is 10 notifications for performance</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing different maxVisible limits and how they affect the displayed notifications.',
      },
    },
  },
}

export const WithCloseButton: Story = {
  render: args => (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Notification Center with Close Button
        </h2>

        <p className='text-gray-600 mb-6 text-center'>
          This example shows the notification center as it would appear in a dropdown or modal with
          a close button in the header.
        </p>

        <StoryWrapper>
          <NotificationCenter
            {...args}
            notifications={sampleNotifications.recent}
            onClose={() => {
              console.log('Close clicked')
              alert('Notification center closed')
            }}
          />
        </StoryWrapper>

        <div className='mt-8 p-4 bg-rose-50 rounded-lg border border-rose-100'>
          <h4 className='font-semibold text-rose-900 mb-2'>Close Button Features:</h4>
          <ul className='text-sm text-rose-800 space-y-1'>
            <li>• Optional onClose prop adds close button to header</li>
            <li>• Typically used when notification center is in overlay/dropdown</li>
            <li>• Fires callback when clicked for parent component handling</li>
            <li>• Accessible with proper ARIA labeling</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    maxVisible: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Notification center with close button functionality for use in dropdowns or modals.',
      },
    },
  },
}
