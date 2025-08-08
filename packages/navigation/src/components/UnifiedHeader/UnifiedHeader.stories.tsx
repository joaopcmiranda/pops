/**
 * @fileoverview Storybook Stories for UnifiedHeader Component
 *
 * Comprehensive stories showcasing the POps Unified Header component across different
 * authentication states, applications, and feature combinations. Demonstrates
 * responsive behavior, search functionality, and notification integration.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { UnifiedHeader } from './UnifiedHeader'
import { AppSuiteProvider } from '../../contexts/AppSuiteContext'
import { Button } from '@pops/ui'
import { Plus, Filter, Download } from 'lucide-react'
import type { PopsAppId } from '../../config/domains'
import type { PopsUser, AuthState, PopsNotification } from '../../types'

const meta: Meta<typeof UnifiedHeader> = {
  title: 'Navigation/UnifiedHeader',
  component: UnifiedHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The UnifiedHeader provides consistent navigation and functionality across all POps applications. It includes app switching, global search, notifications, and user management.',
      },
    },
  },
  argTypes: {
    currentApp: {
      control: 'select',
      options: [
        'hub',
        'travel',
        'money',
        'accounts',
        'events',
        'documents',
        'recipes',
        'home',
        'health',
        'admin',
      ],
      description: 'The currently active POps application',
    },
    title: {
      control: 'text',
      description: 'Page title to display',
    },
    showDomainSwitcher: {
      control: 'boolean',
      description: 'Whether to show the domain switcher',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Whether to show notifications',
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show global search',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock users for different scenarios
const mockUsers = {
  standard: {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    preferences: {
      theme: 'system' as const,
      locale: 'en-US',
      timezone: 'America/New_York',
      notifications: {
        push: true,
        email: true,
        inApp: true,
        frequency: 'immediate' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
  longName: {
    id: '2',
    email: 'alexandra.christina.montgomery@verylongdomainname.com',
    name: 'Alexandra Christina Montgomery-Williams',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    preferences: {
      theme: 'light' as const,
      locale: 'en-US',
      timezone: 'Europe/London',
      notifications: {
        push: false,
        email: true,
        inApp: true,
        frequency: 'daily' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
  noAvatar: {
    id: '3',
    email: 'jane.smith@company.org',
    name: 'Jane Smith',
    preferences: {
      theme: 'dark' as const,
      locale: 'en-US',
      timezone: 'America/Los_Angeles',
      notifications: {
        push: true,
        email: false,
        inApp: true,
        frequency: 'hourly' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
} satisfies Record<string, PopsUser>

// Mock notifications for different scenarios
const mockNotifications: PopsNotification[] = [
  {
    id: '1',
    app: 'travel',
    type: 'info',
    title: 'Trip Planning Update',
    message: 'Your Tokyo trip itinerary has been updated with new restaurant recommendations.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: 'https://travel.mypops.io/trips/tokyo-2024',
  },
  {
    id: '2',
    app: 'money',
    type: 'warning',
    title: 'Budget Alert',
    message: 'You are approaching your monthly dining budget limit.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '3',
    app: 'events',
    type: 'success',
    title: 'RSVP Confirmed',
    message: 'Your RSVP for "Summer BBQ Party" has been confirmed.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
]

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  currentApp = 'travel',
  user = mockUsers.standard,
  authenticated = true,
  _notifications = mockNotifications,
}: {
  children: React.ReactNode
  currentApp?: PopsAppId
  user?: PopsUser
  authenticated?: boolean
  _notifications?: PopsNotification[]
}) {
  const authState: AuthState = authenticated
    ? {
        isAuthenticated: true,
        user,
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        refreshToken: 'mock-refresh-token',
      }
    : {
        isAuthenticated: false,
        user: null,
        token: null,
        expiresAt: null,
        refreshToken: null,
      }

  return (
    <AppSuiteProvider currentApp={currentApp} initialAuthState={authState}>
      <div className='bg-gray-50 min-h-screen'>
        {children}

        {/* Sample content to show header in context */}
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>Sample Page Content</h2>
            <p className='text-gray-600'>
              This content demonstrates how the Unified Header appears at the top of a page. The
              header is sticky and will remain visible when scrolling.
            </p>
          </div>
        </div>
      </div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <UnifiedHeader {...args} />
    </StoryWrapper>
  ),
  args: {
    currentApp: 'travel',
    title: 'Trip Organizer',
    showDomainSwitcher: true,
    showNotifications: true,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default unified header with all features enabled for an authenticated user in the Travel app.',
      },
    },
  },
}

export const AllApplications: Story = {
  render: () => (
    <div className='space-y-1'>
      {(
        [
          'hub',
          'travel',
          'money',
          'accounts',
          'events',
          'documents',
          'recipes',
          'home',
          'health',
          'admin',
        ] as PopsAppId[]
      ).map(app => (
        <div key={app} className='border-b border-gray-200 last:border-b-0'>
          <StoryWrapper currentApp={app}>
            <UnifiedHeader
              currentApp={app}
              showDomainSwitcher={true}
              showNotifications={true}
              showSearch={true}
            />
          </StoryWrapper>
        </div>
      ))}

      <div className='p-6 bg-blue-50 border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>Application Headers:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>• Each app displays its distinctive icon and name</li>
          <li>• App colors are consistent with the design system</li>
          <li>• Domain switcher shows current app context</li>
          <li>• All headers maintain consistent functionality</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of unified headers across all POps applications to demonstrate consistency and branding.',
      },
    },
  },
}

export const AuthenticationStates: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Authentication States</h2>

        <div className='space-y-6'>
          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='p-4 bg-green-50 border-b border-green-100'>
              <h3 className='font-medium text-green-900'>✅ Authenticated User</h3>
              <p className='text-sm text-green-700'>
                Shows full functionality with user menu and notifications
              </p>
            </div>
            <StoryWrapper authenticated={true}>
              <UnifiedHeader
                currentApp='travel'
                title='Dashboard'
                showDomainSwitcher={true}
                showNotifications={true}
                showSearch={true}
              />
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='p-4 bg-red-50 border-b border-red-100'>
              <h3 className='font-medium text-red-900'>❌ Unauthenticated User</h3>
              <p className='text-sm text-red-700'>
                Shows sign-in button instead of user menu, no notifications
              </p>
            </div>
            <StoryWrapper authenticated={false}>
              <UnifiedHeader
                currentApp='travel'
                title='Welcome'
                showDomainSwitcher={true}
                showNotifications={true}
                showSearch={true}
              />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100'>
          <h4 className='font-semibold text-amber-900 mb-2'>Authentication Features:</h4>
          <ul className='text-sm text-amber-800 space-y-1'>
            <li>
              • <strong>Authenticated:</strong> Shows user menu with profile, settings, logout
            </li>
            <li>
              • <strong>Authenticated:</strong> Displays notification center with unread count
            </li>
            <li>
              • <strong>Unauthenticated:</strong> Shows "Sign In" button
            </li>
            <li>
              • <strong>Unauthenticated:</strong> Hides notifications and user-specific features
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison between authenticated and unauthenticated user experiences in the header.',
      },
    },
  },
}

export const UserVariations: Story = {
  render: () => (
    <div className='space-y-1'>
      <div className='bg-white'>
        <div className='p-3 bg-blue-50 text-sm text-blue-700 font-medium'>Standard User</div>
        <StoryWrapper user={mockUsers.standard}>
          <UnifiedHeader
            currentApp='money'
            title='Budget Tracker'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-purple-50 text-sm text-purple-700 font-medium'>Long Name User</div>
        <StoryWrapper user={mockUsers.longName}>
          <UnifiedHeader
            currentApp='money'
            title='Budget Tracker'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-green-50 text-sm text-green-700 font-medium'>No Avatar User</div>
        <StoryWrapper user={mockUsers.noAvatar}>
          <UnifiedHeader
            currentApp='money'
            title='Budget Tracker'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='p-6 bg-indigo-50 border border-indigo-100'>
        <h4 className='font-semibold text-indigo-900 mb-2'>User Display Features:</h4>
        <ul className='text-sm text-indigo-800 space-y-1'>
          <li>• Text truncation for long names and emails</li>
          <li>• Avatar fallback with user initials</li>
          <li>• Responsive design hides user info on small screens</li>
          <li>• Graceful handling of missing profile images</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different user profile variations showing text truncation, avatar fallbacks, and responsive behavior.',
      },
    },
  },
}

export const FeatureToggles: Story = {
  render: () => (
    <div className='space-y-1'>
      <div className='bg-white'>
        <div className='p-3 bg-gray-100 text-sm font-medium'>All Features Enabled</div>
        <StoryWrapper>
          <UnifiedHeader
            currentApp='events'
            title='Event Manager'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-gray-100 text-sm font-medium'>No Search</div>
        <StoryWrapper>
          <UnifiedHeader
            currentApp='events'
            title='Event Manager'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={false}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-gray-100 text-sm font-medium'>No Notifications</div>
        <StoryWrapper>
          <UnifiedHeader
            currentApp='events'
            title='Event Manager'
            showDomainSwitcher={true}
            showNotifications={false}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-gray-100 text-sm font-medium'>No Domain Switcher</div>
        <StoryWrapper>
          <UnifiedHeader
            currentApp='events'
            title='Event Manager'
            showDomainSwitcher={false}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-gray-100 text-sm font-medium'>Minimal (No Optional Features)</div>
        <StoryWrapper>
          <UnifiedHeader
            currentApp='events'
            title='Event Manager'
            showDomainSwitcher={false}
            showNotifications={false}
            showSearch={false}
          />
        </StoryWrapper>
      </div>

      <div className='p-6 bg-teal-50 border border-teal-100'>
        <h4 className='font-semibold text-teal-900 mb-2'>Feature Toggle Options:</h4>
        <ul className='text-sm text-teal-800 space-y-1'>
          <li>
            • <strong>showDomainSwitcher:</strong> Toggle app switcher dropdown
          </li>
          <li>
            • <strong>showSearch:</strong> Toggle global search functionality
          </li>
          <li>
            • <strong>showNotifications:</strong> Toggle notification center
          </li>
          <li>• Each feature can be disabled independently</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different feature combinations showing how the header adapts when features are disabled.',
      },
    },
  },
}

export const WithCustomActions: Story = {
  render: args => {
    const customActions = (
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm'>
          <Filter className='h-4 w-4 mr-2' />
          Filter
        </Button>
        <Button variant='default' size='sm'>
          <Plus className='h-4 w-4 mr-2' />
          New Trip
        </Button>
        <Button variant='ghost' size='sm'>
          <Download className='h-4 w-4' />
        </Button>
      </div>
    )

    return (
      <div className='bg-gray-50 min-h-screen'>
        <StoryWrapper>
          <UnifiedHeader {...args} customActions={customActions} />
        </StoryWrapper>

        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Custom Actions Example</h2>
            <p className='text-gray-600 mb-4'>
              The header can accept custom action buttons that appear to the right of the search and
              before the notification/user menu area.
            </p>

            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-2'>Custom Actions Features:</h3>
              <ul className='text-sm text-gray-700 space-y-1'>
                <li>• Flexible ReactNode prop for custom content</li>
                <li>• Integrates seamlessly with existing layout</li>
                <li>• Maintains responsive behavior</li>
                <li>• Can include buttons, dropdowns, or other components</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  args: {
    currentApp: 'travel',
    title: 'Trip Dashboard',
    showDomainSwitcher: true,
    showNotifications: true,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header with custom action buttons demonstrating the flexibility of the customActions prop.',
      },
    },
  },
}

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Responsive Behavior</h2>

        <div className='space-y-6'>
          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='p-4 bg-blue-50 border-b border-blue-100'>
              <h3 className='font-medium text-blue-900'>🖥️ Desktop View</h3>
              <p className='text-sm text-blue-700'>Full functionality with search bar in center</p>
            </div>
            <div className='w-full'>
              <StoryWrapper>
                <UnifiedHeader
                  currentApp='documents'
                  title='Document Manager'
                  showDomainSwitcher={true}
                  showNotifications={true}
                  showSearch={true}
                />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='p-4 bg-green-50 border-b border-green-100'>
              <h3 className='font-medium text-green-900'>📱 Mobile Simulation</h3>
              <p className='text-sm text-green-700'>
                Search becomes button, user info hidden on small screens
              </p>
            </div>
            <div className='max-w-sm mx-auto border-x-2 border-gray-300'>
              <StoryWrapper>
                <UnifiedHeader
                  currentApp='documents'
                  title='Documents'
                  showDomainSwitcher={true}
                  showNotifications={true}
                  showSearch={true}
                />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-8 p-4 bg-violet-50 rounded-lg border border-violet-100'>
          <h4 className='font-semibold text-violet-900 mb-2'>Responsive Features:</h4>
          <ul className='text-sm text-violet-800 space-y-1'>
            <li>
              • <strong>Search:</strong> Full bar on desktop, button icon on mobile
            </li>
            <li>
              • <strong>User Info:</strong> Name/email visible on desktop, avatar only on mobile
            </li>
            <li>
              • <strong>Title:</strong> Truncates gracefully on smaller screens
            </li>
            <li>
              • <strong>Spacing:</strong> Adjusts padding and gaps for different screen sizes
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how the header adapts to different screen sizes and maintains usability.',
      },
    },
  },
}

export const NotificationStates: Story = {
  render: () => (
    <div className='space-y-1'>
      <div className='bg-white'>
        <div className='p-3 bg-red-50 text-sm text-red-700 font-medium'>No Notifications</div>
        <StoryWrapper _notifications={[]}>
          <UnifiedHeader
            currentApp='health'
            title='Health & Fitness'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-yellow-50 text-sm text-yellow-700 font-medium'>
          2 Unread Notifications
        </div>
        <StoryWrapper _notifications={mockNotifications.slice(0, 2)}>
          <UnifiedHeader
            currentApp='health'
            title='Health & Fitness'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='bg-white'>
        <div className='p-3 bg-blue-50 text-sm text-blue-700 font-medium'>
          Many Notifications (9+ Badge)
        </div>
        <StoryWrapper
          _notifications={[
            ...mockNotifications,
            ...Array.from({ length: 8 }, (_, i) => ({
              ...mockNotifications[0],
              id: `extra-${i}`,
              title: `Notification ${i + 4}`,
              read: i % 3 === 0,
            })),
          ]}
        >
          <UnifiedHeader
            currentApp='health'
            title='Health & Fitness'
            showDomainSwitcher={true}
            showNotifications={true}
            showSearch={true}
          />
        </StoryWrapper>
      </div>

      <div className='p-6 bg-orange-50 border border-orange-100'>
        <h4 className='font-semibold text-orange-900 mb-2'>Notification Badge Logic:</h4>
        <ul className='text-sm text-orange-800 space-y-1'>
          <li>• Shows count for 1-9 unread notifications</li>
          <li>• Shows "9+" for 10 or more unread notifications</li>
          <li>• Badge animates with pulse effect</li>
          <li>• No badge shown when all notifications are read</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different notification count states showing how the notification badge behaves.',
      },
    },
  },
}
